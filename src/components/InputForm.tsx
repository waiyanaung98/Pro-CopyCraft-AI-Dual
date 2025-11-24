import React from 'react';
import { Language, Tone, ContentRequest, ContentPillar, BrandProfile } from '../types';
import { TRANSLATIONS, TONE_LABELS, PILLAR_LABELS } from '../constants';

interface InputFormProps {
  request: ContentRequest;
  onChange: (newRequest: ContentRequest) => void;
  onSubmit: () => void;
  isLoading: boolean;
  currentUiLang: Language;
  selectedBrand?: BrandProfile;
}

export const InputForm: React.FC<InputFormProps> = ({ request, onChange, onSubmit, isLoading, currentUiLang, selectedBrand }) => {
  
  const handleChange = (field: keyof ContentRequest, value: any) => {
    onChange({ ...request, [field]: value });
  };

  return (
    <div className="space-y-6 bg-white dark:bg-[#1E2A38] p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-bold text-[#1E2A38] dark:text-slate-200 mb-2">
            {selectedBrand ? `${selectedBrand.name} - ` : ''}{TRANSLATIONS.productTopic[currentUiLang]}
          </label>
          <input
            type="text"
            value={request.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            placeholder={currentUiLang === Language.MY ? "ဥပမာ - မြန်မာ့လက်ဖက်ရည်" : "e.g., Wireless Earbuds"}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0f172a] text-[#1E2A38] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-[#31d190] focus:border-[#31d190] outline-none transition-all text-sm font-medium"
          />
        </div>

        {/* Target Audience */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-bold text-[#1E2A38] dark:text-slate-200 mb-2">
            {TRANSLATIONS.targetAudience[currentUiLang]}
          </label>
          <input
            type="text"
            value={request.targetAudience || ''}
            onChange={(e) => handleChange('targetAudience', e.target.value)}
            placeholder={currentUiLang === Language.MY ? "ဥပမာ - ကျောင်းသားများ" : "e.g., Tech enthusiasts"}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0f172a] text-[#1E2A38] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-[#31d190] focus:border-[#31d190] outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-[#1E2A38] dark:text-slate-200 mb-2">
          {TRANSLATIONS.productDesc[currentUiLang]}
        </label>
        <textarea
          value={request.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={5}
          placeholder={currentUiLang === Language.MY ? "ကုန်ပစ္စည်းအကြောင်းအသေးစိတ်ထည့်ပါ..." : "Describe the key features, specs, or context..."}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0f172a] text-[#1E2A38] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-[#31d190] focus:border-[#31d190] outline-none transition-all text-sm font-medium resize-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Pillar Selection */}
        <div>
          <label className="block text-sm font-bold text-[#1E2A38] dark:text-slate-200 mb-3">
            {TRANSLATIONS.pillar[currentUiLang]}
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.values(ContentPillar) as ContentPillar[]).map((pillar) => {
              const isSelected = request.pillar === pillar;
              return (
                <button
                  key={pillar}
                  onClick={() => handleChange('pillar', pillar)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border duration-200 ${
                    isSelected
                      ? 'bg-[#31d190] text-white border-[#31d190] shadow-md ring-1 ring-[#31d190]'
                      : 'bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-[#31d190] hover:text-[#31d190] hover:bg-[#31d190]/5'
                  }`}
                >
                  {PILLAR_LABELS[pillar][currentUiLang]}
                </button>
              );
            })}