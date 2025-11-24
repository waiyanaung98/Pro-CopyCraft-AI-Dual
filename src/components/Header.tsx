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
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
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
                   {TRANSLATIONS.upgradeBtn[currentLang]}
                 </button>
               ) : (
                 <span className="hidden md:flex items-center gap-1 px-3 py-1 text-xs font-bold text-[#31d190] bg-[#31d190]/10 rounded-full border border-[#31d190]/20">
                    <Crown size={12} />
                    Premium Member
                 </span>
               )}
             </div>
           )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
               <div className="text-right hidden md:block">
                 <p className="text-xs font-bold text-[#1E2A38] dark:text-white">{user.displayName || 'User'}</p>
                 <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{user.plan}</p>
               </div>
               <div className="relative group">
                 {user.photoURL ? (
                   <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" />
                 ) : (
                   <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                     <UserIcon size={16} />
                   </div>
                 )}
                 
                 {/* Dropdown for Logout */}
                 <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-[#1E2A38] rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                   <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                   >
                     <LogOut size={12} />
                     {TRANSLATIONS.logoutBtn[currentLang]}
                   </button>
                 </div>
               </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}