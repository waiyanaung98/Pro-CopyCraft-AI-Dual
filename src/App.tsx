import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { FrameworkSelector } from './components/FrameworkSelector';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { BrandManager } from './components/BrandManager';
import { Language, Framework, Tone, ContentRequest, ContentPillar, BrandProfile, AppMode } from './types';
import { generateCopy } from './services/geminiService';
import { TRANSLATIONS, DEFAULT_BRANDS } from './constants';
import { PenTool, Video, ShieldAlert } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Main Content Component wrapped inside AuthProvider
const AppContent: React.FC = () => {
  const { user, loading: authLoading, isAccessDenied, login, logout } = useAuth();
  
  // UI Language default to English
  const [uiLanguage] = useState<Language>(Language.EN);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  // Brand State
  const [brands, setBrands] = useState<BrandProfile[]>(DEFAULT_BRANDS);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  
  // Form Data
  const [formData, setFormData] = useState<ContentRequest>({
    topic: '',
    description: '',
    mode: AppMode.COPY, // Default mode
    framework: Framework.AIDA,
    pillar: ContentPillar.PROMOTIONAL,
    language: Language.EN,
    tone: Tone.PROFESSIONAL,
    targetAudience: ''
  });

  // Scroll to results when generated
  const resultRef = useRef<HTMLDivElement>(null);

  // Effect: Handle Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Effect: When brand changes, update formData defaults
  useEffect(() => {
    if (selectedBrandId) {
      const brand = brands.find(b => b.id === selectedBrandId);
      if (brand) {
        setFormData(prev => ({
          ...prev,
          tone: brand.defaultTone,
          targetAudience: brand.defaultAudience,
          brand: brand // Attach brand object to request for AI context
        }));
      }
    } else {
      // Reset brand context if deselected
      setFormData(prev => ({ ...prev, brand: undefined }));
    }
  }, [selectedBrandId, brands]);

  const handleAddBrand = (newBrand: BrandProfile) => {
    setBrands(prev => [...prev, newBrand]);
    setSelectedBrandId(newBrand.id); // Auto select the new brand
  };

  const handleDeleteBrand = (brandId: string) => {
    setBrands(prev => prev.filter(b => b.id !== brandId));
    if (selectedBrandId === brandId) {
      setSelectedBrandId(null);
    }
  };

  const handleModeChange = (mode: AppMode) => {
    // Reset framework to default of that mode when switching
    const defaultFramework = mode === AppMode.COPY ? Framework.AIDA : Framework.TIKTOK_HOOK;
    setFormData(prev => ({
      ...prev,
      mode: mode,
      framework: defaultFramework
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedContent(null); // Clear previous while loading
    
    try {
      const result = await generateCopy(formData);
      setGeneratedContent(result);
      
      // Scroll to result after a brief delay for render
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setGeneratedContent(null);
    setFormData(prev => ({ 
      ...prev, 
      topic: '', 
      description: '',
      // Keep target audience if brand is selected, otherwise clear
      targetAudience: selectedBrandId ? prev.targetAudience : ''
    }));
  };

  // -- AUTH LOADING STATE --
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#31d190]"></div>
      </div>
    );
  }

  // -- ACCESS DENIED SCREEN (Whitelisted Check) --
  if (isAccessDenied) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex flex-col items-center justify-center p-4 font-sans transition-colors duration-300">
            <div className="bg-white dark:bg-[#1E2A38] p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-200 dark:border-red-900/50">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-red-500 bg-red-100 dark:bg-red-900/30 mx-auto mb-6">
                    <ShieldAlert size={32} />
                </div>
                <h1 className="text-2xl font-bold text-[#1E2A38] dark:text-white mb-2">
                    {TRANSLATIONS.accessDeniedTitle[uiLanguage]}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    {TRANSLATIONS.accessDeniedDesc[uiLanguage]}
                </p>
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#1E2A38] dark:text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm"
                >
                    {TRANSLATIONS.logoutBtn[uiLanguage]}
                </button>
            </div>
        </div>
      );
  }

  // -- LOGIN SCREEN --
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex flex-col items-center justify-center p-4 font-sans transition-colors duration-300">
         <div className="bg-white dark:bg-[#1E2A38] p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200 dark:border-slate-700">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br from-[#1E2A38] to-[#31d190] mx-auto mb-6">
               <PenTool size={32} />
            </div>
            <h1 className="text-2xl font-bold text-[#1E2A38] dark:text-white mb-2">
              {TRANSLATIONS.loginTitle[uiLanguage]}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              {TRANSLATIONS.loginSubtitle[uiLanguage]}
            </p>
            <button
              onClick={login}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#1E2A38] dark:text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {TRANSLATIONS.loginBtn[uiLanguage]}
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="mt-6 flex items-center justify-center gap-2 mx-auto text-sm text-slate-400 hover:text-[#31d190] transition-colors"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
         </div>
      </div>
    );
  }

  // -- MAIN APP --
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex flex-col font-sans transition-colors duration-300">
      
      {/* STICKY HEADER ONLY - NO TABS HERE */}
      <div className="sticky top-0 z-40 bg-white dark:bg-[#1E2A38] shadow-sm transition-colors border-b border-gray-100 dark:border-gray-800">
        <Header 
            currentLang={uiLanguage} 
            isDarkMode={isDarkMode} 
            toggleTheme={() => setIsDarkMode(!isDarkMode)} 
        />
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 space-y-8">
            
        {/* PILL STYLE MODE SWITCHER */}
        <div className="flex justify-center">
            <div className="inline-flex bg-slate-100 dark:bg-[#1E2A38] p-1.5 rounded-full shadow-inner border border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => handleModeChange(AppMode.COPY)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
                        formData.mode === AppMode.COPY
                            ? 'bg-[#31d190] text-white shadow-md'
                            : 'text-slate-500 dark:text-slate-400 hover:text-[#31d190]'
                    }`}
                >
                    <PenTool size={16} />
                    {TRANSLATIONS.modeCopy[uiLanguage]}
                </button>
                <button
                    onClick={() => handleModeChange(AppMode.SCRIPT)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
                        formData.mode === AppMode.SCRIPT
                            ? 'bg-[#31d190] text-white shadow-md'
                            : 'text-slate-500 dark:text-slate-400 hover:text-[#31d190]'
                    }`}
                >
                    <Video size={16} />
                    {TRANSLATIONS.modeScript[uiLanguage]}
                </button>
            </div>
        </div>

        {/* Brand Manager Section */}
        <section className="animate-fade-in-up">
          <BrandManager 
            brands={brands}
            selectedBrandId={selectedBrandId}
            onSelectBrand={setSelectedBrandId}
            onAddBrand={handleAddBrand}
            onDeleteBrand={handleDeleteBrand}
            currentLang={uiLanguage}
          />
        </section>

        {/* Framework Selection */}
        <section className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <FrameworkSelector 
            selected={formData.framework} 
            onSelect={(fw) => setFormData(prev => ({ ...prev, framework: fw }))}
            currentLang={uiLanguage}
            mode={formData.mode}
          />
        </section>

        {/* Input Form */}
        <section className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <InputForm 
            request={formData} 
            onChange={setFormData} 
            onSubmit={handleGenerate}
            isLoading={loading}
            currentUiLang={uiLanguage}
            selectedBrand={brands.find(b => b.id === selectedBrandId)}
          />
        </section>

        {/* Output Display (Only show if content exists) */}
        {generatedContent && (
           <section ref={resultRef} className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
             <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-8"></div>
             <OutputDisplay 
                content={generatedContent} 
                currentUiLang={uiLanguage}
                outputLang={formData.language}
                onClear={handleClear}
              />
           </section>
        )}
      </main>
      
      {/* Footer with Branding */}
      <footer className="py-6 text-center border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E2A38] mt-auto transition-colors">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Powered by <span className="text-[#1E2A38] dark:text-[#31d190] font-bold">PrimeNova Digital Solution</span>
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
