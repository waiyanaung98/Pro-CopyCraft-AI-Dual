import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { FrameworkSelector } from './components/FrameworkSelector';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { BrandManager } from './components/BrandManager';
import { Language, Framework, Tone, ContentRequest, ContentPillar, BrandProfile, AppMode } from './types';
import { generateCopy } from './services/geminiService';
import { TRANSLATIONS, DEFAULT_BRANDS } from './constants';
import { PenTool, Video } from 'lucide-react';

const App: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex flex-col font-sans transition-colors duration-300">
      <Header 
        currentLang={uiLanguage} 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Brand Manager Section */}
            <section>
              <BrandManager 
                brands={brands}
                selectedBrandId={selectedBrandId}
                onSelectBrand={setSelectedBrandId}
                onAddBrand={handleAddBrand}
                onDeleteBrand={handleDeleteBrand}
                currentLang={uiLanguage}
              />
            </section>

            {/* Mode Switcher */}
            <section className="bg-white dark:bg-[#1E2A38] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex relative">
               <button
                onClick={() => handleModeChange(AppMode.COPY)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 z-10 ${
                  formData.mode === AppMode.COPY
                    ? 'bg-[#31d190] text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
               >
                 <PenTool size={16} />
                 {TRANSLATIONS.modeCopy[uiLanguage]}
               </button>
               <button
                onClick={() => handleModeChange(AppMode.SCRIPT)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 z-10 ${
                  formData.mode === AppMode.SCRIPT
                    ? 'bg-[#31d190] text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
               >
                 <Video size={16} />
                 {TRANSLATIONS.modeScript[uiLanguage]}
               </button>
            </section>

            {/* Framework Selection (Filtered by Mode) */}
            <section>
              <FrameworkSelector 
                selected={formData.framework} 
                onSelect={(fw) => setFormData(prev => ({ ...prev, framework: fw }))}
                currentLang={uiLanguage}
                mode={formData.mode}
              />
            </section>

            {/* Input Form */}
            <section>
              <InputForm 
                request={formData} 
                onChange={setFormData} 
                onSubmit={handleGenerate}
                isLoading={loading}
                currentUiLang={uiLanguage}
                selectedBrand={brands.find(b => b.id === selectedBrandId)}
              />
            </section>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7" ref={resultRef}>
            {generatedContent ? (
              <OutputDisplay 
                content={generatedContent} 
                currentUiLang={uiLanguage}
                outputLang={formData.language}
                onClear={handleClear}
              />
            ) : (
              /* Empty State Placeholder */
              <div className="h-full min-h-[400px] bg-white dark:bg-[#1E2A38] rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-slate-500 sticky top-24 transition-colors">
                <div className="w-16 h-16 bg-slate-50 dark:bg-[#0f172a] rounded-full flex items-center justify-center mb-4">
                  {formData.mode === AppMode.SCRIPT ? (
                     <Video className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  ) : (
                     <PenTool className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-[#1E2A38] dark:text-white mb-2">
                  {formData.mode === AppMode.SCRIPT ? 'Create Your Next Viral Script' : 'Ready to Create Copy'}
                </h3>
                <p className="max-w-xs mx-auto text-sm text-slate-500 dark:text-slate-400">
                  {formData.mode === AppMode.SCRIPT 
                    ? "Select a script style, add context, and let the AI direct your video."
                    : "Select a framework, choose your pillar, and let the AI write for you."}
                </p>
              </div>
            )}
          </div>

        </div>
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

export default App;