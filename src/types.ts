export enum Language {
  EN = 'en',
  MY = 'my',
  TH = 'th'
}

export enum AppMode {
  COPY = 'COPY',
  SCRIPT = 'SCRIPT'
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  plan: 'free' | 'premium'; // Subscription tier
}

export enum Framework {
  // Body Copy Frameworks
  AIDA = 'AIDA',
  PAS = 'PAS',
  BAB = 'BAB',
  FAB = 'FAB',
  QUEST = 'QUEST',
  FOUR_P = 'FOUR_P',
  PASTOR = 'PASTOR',
  FREESTYLE = 'FREESTYLE',
  
  // Script Frameworks
  TIKTOK_HOOK = 'TIKTOK_HOOK',
  YOUTUBE_EDT = 'YOUTUBE_EDT',
  EXPLAINER_VIDEO = 'EXPLAINER_VIDEO',
  UGC_AD = 'UGC_AD',
  PODCAST_INTRO = 'PODCAST_INTRO'
}

export enum ContentPillar {
  EDUCATIONAL = 'Educational',
  PROMOTIONAL = 'Promotional',
  INSPIRATIONAL = 'Inspirational',
  ENTERTAINMENT = 'Entertainment',
  BEHIND_SCENES = 'BehindTheScenes',
  COMMUNITY = 'Community'
}

export enum Tone {
  PROFESSIONAL = 'Professional',
  FRIENDLY = 'Friendly',
  URGENT = 'Urgent',
  WITTY = 'Witty',
  EMOTIONAL = 'Emotional',
  LUXURY = 'Luxury'
}

export interface BrandProfile {
  id: string;
  name: string;
  industry: string;
  description: string; // Brand story or boilerplate
  defaultTone: Tone;
  defaultAudience: string;
}

export interface ContentRequest {
  topic: string;
  description: string;
  mode: AppMode; // Added Mode
  framework: Framework;
  pillar: ContentPillar;
  language: Language;
  tone: Tone;
  targetAudience?: string;
  brand?: BrandProfile; // Optional context
}

export interface GeneratedResponse {
  content: string;
  framework: Framework;
  timestamp: number;
}

export interface TranslationResource {
  [key: string]: {
    [Language.EN]: string;
    [Language.MY]: string;
    [Language.TH]: string;
  };
}