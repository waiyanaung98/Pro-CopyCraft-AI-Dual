import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAccessDenied: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  upgradeToPremium: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAccessDenied, setIsAccessDenied] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        
        // 1. Check Whitelist in Firestore (admin_settings/whitelisted_emails)
        try {
            const whitelistRef = doc(db, 'admin_settings', 'whitelisted_emails');
            const whitelistSnap = await getDoc(whitelistRef);
            
            let allowedEmails: string[] = [];
            if (whitelistSnap.exists()) {
                allowedEmails = whitelistSnap.data().emails || [];
            }
            
            if (!allowedEmails.includes(firebaseUser.email)) {
                // Email NOT in whitelist
                setIsAccessDenied(true);
                setUser(null); // Do not set user
                setLoading(false);
                return;
            } else {
                setIsAccessDenied(false);
            }

            // 2. If Whitelisted, Fetch User Plan
            const userRef = doc(db, 'users', firebaseUser.uid);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                plan: userData.plan || 'free'
            });
            } else {
            // Initialize new user as FREE
            const newUser: UserProfile = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                plan: 'free'
            };
            await setDoc(userRef, { plan: 'free', email: firebaseUser.email });
            setUser(newUser);
            }

        } catch (error) {
            console.error("Error checking whitelist:", error);
            // Fallback: deny access on error
            setIsAccessDenied(true);
        }

      } else {
        setUser(null);
        setIsAccessDenied(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAccessDenied(false);
  };

  const upgradeToPremium = async () => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    // Simulate payment process here
    await updateDoc(userRef, { plan: 'premium' });
    setUser({ ...user, plan: 'premium' });
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAccessDenied, login, logout, upgradeToPremium }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};