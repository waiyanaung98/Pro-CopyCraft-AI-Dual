import React from 'react';
import { PenLine, Moon, Sun, LogOut, Crown, User as UserIcon } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  currentLang: Language;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, isDarkMode, toggleTheme }) => {
  const { user, logout, upgradeToPremium } = useAuth();

  return (
    <header className="bg-white dark:bg-[#1E2A38] border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30 shadow-sm transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Gradient Logo Box */}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br from-[#1E2A38] to-[#31d190]">
            <PenLine size={20} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-[#1E2A38] dark:text-white leading-none transition-colors">
              {TRANSLATIONS.appTitle[currentLang]}
            </h1>
            <p className="text-xs text-[#31d190] font-semibold mt-1 tracking-wide">
              {TRANSLATIONS.appSubtitle[currentLang]}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           
           {user && (
             <div className="flex items-center gap-3 mr-2">
               {user.plan === 'free' ? (
                 <button 
                  onClick={upgradeToPremium}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#1E2A38] bg-[#31d190] hover:bg-[#28b079] rounded-full transition-colors"
                 >
                   <Crown size={14} />
                   Upgrade Plan
                 </button>
               ) : (
                 <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#31d190] bg-[#31d190]/10 border border-[#31d190]/20 rounded-full">
                   <Crown size={14} />
                   Premium Member
                 </div>
               )}
               
               <div className="flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-gray-700">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-600" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <UserIcon size={16} className="text-slate-500" />
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-[#1E2A38] dark:text-white max-w-[100px] truncate">{user.displayName || 'User'}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">{user.plan}</p>
                  </div>
               </div>

               <button
                 onClick={logout}
                 className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                 title="Log Out"
               >
                 <LogOut size={18} />
               </button>
             </div>
           )}

           {/* Theme Toggle */}
           <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-[#0f172a] text-slate-600 dark:text-[#31d190] hover:bg-slate-200 dark:hover:bg-slate-900 transition-all"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Night Mode"}
           >
             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
           </button>
        </div>
      </div>
    </header>
  );
};