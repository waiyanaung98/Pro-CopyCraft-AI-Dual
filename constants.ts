import { Framework, Language, Tone, ContentPillar, TranslationResource, BrandProfile, AppMode } from './types';
import { 
  Megaphone, 
  AlertCircle, 
  ArrowRight, 
  Gift, 
  HelpCircle, 
  PenTool,
  Sparkles,
  BookOpen,
  Video,
  Youtube,
  Mic,
  Clapperboard,
  Smartphone
} from 'lucide-react';

export const FRAMEWORK_DETAILS = {
  // Copywriting
  [Framework.AIDA]: {
    title: 'AIDA Model',
    description: 'Attention, Interest, Desire, Action. The classic copywriting formula.',
    icon: Megaphone,
    mode: AppMode.COPY
  },
  [Framework.PAS]: {
    title: 'PAS Formula',
    description: 'Problem, Agitation, Solution. Perfect for addressing pain points.',
    icon: AlertCircle,
    mode: AppMode.COPY
  },
  [Framework.BAB]: {
    title: 'Before-After-Bridge',
    description: 'Show the current pain, the future benefit, and how to get there.',
    icon: ArrowRight,
    mode: AppMode.COPY
  },
  [Framework.FAB]: {
    title: 'Feature-Advantage-Benefit',
    description: 'Turn technical features into desirable benefits.',
    icon: Gift,
    mode: AppMode.COPY
  },
  [Framework.QUEST]: {
    title: 'QUEST',
    description: 'Qualify, Understand, Educate, Stimulate, Transition.',
    icon: HelpCircle,
    mode: AppMode.COPY
  },
  [Framework.FOUR_P]: {
    title: 'The 4 Ps',
    description: 'Promise, Picture, Proof, Push. Persuasive and visual.',
    icon: BookOpen,
    mode: AppMode.COPY
  },
  [Framework.PASTOR]: {
    title: 'PASTOR',
    description: 'Problem, Amplify, Story, Transformation, Offer, Response.',
    icon: BookOpen,
    mode: AppMode.COPY
  },
  [Framework.FREESTYLE]: {
    title: 'Freestyle / Social',
    description: 'Creative, engaging posts for social media without a strict structure.',
    icon: Sparkles,
    mode: AppMode.COPY
  },

  // Scriptwriting
  [Framework.TIKTOK_HOOK]: {
    title: 'TikTok/Reels Viral',
    description: 'High-retention structure: Visual Hook, Value/Story, CTA.',
    icon: Smartphone,
    mode: AppMode.SCRIPT
  },
  [Framework.YOUTUBE_EDT]: {
    title: 'YouTube Educate',
    description: 'Hook, Intro, Educational Content, Summary, Outro.',
    icon: Youtube,
    mode: AppMode.SCRIPT
  },
  [Framework.EXPLAINER_VIDEO]: {
    title: 'Explainer Video',
    description: 'Problem, Solution, How it Works, Social Proof, CTA.',
    icon: Video,
    mode: AppMode.SCRIPT
  },
  [Framework.UGC_AD]: {
    title: 'UGC Ad Style',
    description: 'User-Generated style: "Stop scrolling", Demo, Testimonial, Offer.',
    icon: Clapperboard,
    mode: AppMode.SCRIPT
  },
  [Framework.PODCAST_INTRO]: {
    title: 'Podcast/Audio Intro',
    description: 'Host Intro, Guest Teaser, Topic Outline, Sponsor Mention.',
    icon: Mic,
    mode: AppMode.SCRIPT
  }
};

export const TONE_LABELS: TranslationResource = {
  [Tone.PROFESSIONAL]: { [Language.EN]: 'Professional', [Language.MY]: 'ပရော်ဖက်ရှင်နယ်', [Language.TH]: 'มืออาชีพ' },
  [Tone.FRIENDLY]: { [Language.EN]: 'Friendly', [Language.MY]: 'ရင်းနှီးသော', [Language.TH]: 'เป็นกันเอง' },
  [Tone.URGENT]: { [Language.EN]: 'Urgent', [Language.MY]: 'အရေးကြီးသော', [Language.TH]: 'เร่งด่วน' },
  [Tone.WITTY]: { [Language.EN]: 'Witty', [Language.MY]: 'ဟာသဉာဏ်ရှိသော', [Language.TH]: 'ชาญฉลาด' },
  [Tone.EMOTIONAL]: { [Language.EN]: 'Emotional', [Language.MY]: 'ခံစားချက်ပါသော', [Language.TH]: 'มีอารมณ์ร่วม' },
  [Tone.LUXURY]: { [Language.EN]: 'Luxury', [Language.MY]: 'ခန့်ညားထည်ဝါသော', [Language.TH]: 'หรูหรา' }
};

export const PILLAR_LABELS: TranslationResource = {
  [ContentPillar.EDUCATIONAL]: { [Language.EN]: 'Educational', [Language.MY]: 'ပညာပေး', [Language.TH]: 'การศึกษา' },
  [ContentPillar.PROMOTIONAL]: { [Language.EN]: 'Promotional', [Language.MY]: 'ကြော်ငြာ', [Language.TH]: 'โปรโมชั่น' },
  [ContentPillar.INSPIRATIONAL]: { [Language.EN]: 'Inspirational', [Language.MY]: 'စိတ်ဓာတ်ခွန်အား', [Language.TH]: 'สร้างแรงบันดาลใจ' },
  [ContentPillar.ENTERTAINMENT]: { [Language.EN]: 'Entertainment', [Language.MY]: 'ဖျော်ဖြေရေး', [Language.TH]: 'บันเทิง' },
  [ContentPillar.BEHIND_SCENES]: { [Language.EN]: 'Behind the Scenes', [Language.MY]: 'နောက်ကွယ်', [Language.TH]: 'เบื้องหลัง' },
  [ContentPillar.COMMUNITY]: { [Language.EN]: 'Community/Reviews', [Language.MY]: 'သုံးသပ်ချက်များ', [Language.TH]: 'ชุมชน/รีวิว' }
};

export const TRANSLATIONS = {
  appTitle: {
    [Language.EN]: 'CopyCraft AI',
    [Language.MY]: 'CopyCraft AI',
    [Language.TH]: 'CopyCraft AI'
  },
  appSubtitle: {
    [Language.EN]: 'Professional Content Generator',
    [Language.MY]: 'အဆင့်မြင့် စာရေးလက်ထောက်',
    [Language.TH]: 'ผู้ช่วยเขียนคอนเทนต์มืออาชีพ'
  },
  modeCopy: {
    [Language.EN]: 'Copywriting',
    [Language.MY]: 'Copywriting',
    [Language.TH]: 'การเขียนคำโฆษณา'
  },
  modeScript: {
    [Language.EN]: 'Script Writing',
    [Language.MY]: 'Script Writing',
    [Language.TH]: 'การเขียนบท'
  },
  selectFramework: {
    [Language.EN]: 'Select Framework',
    [Language.MY]: 'Framework ရွေးချယ်ပါ',
    [Language.TH]: 'เลือกโครงสร้าง'
  },
  productTopic: {
    [Language.EN]: 'What are you writing about?',
    [Language.MY]: 'အကြောင်းအရာခေါင်းစဉ်',
    [Language.TH]: 'หัวข้อคอนเทนต์'
  },
  productDesc: {
    [Language.EN]: 'Product Details / Context',
    [Language.MY]: 'အကြောင်းအရာအသေးစိတ်',
    [Language.TH]: 'รายละเอียด'
  },
  tone: {
    [Language.EN]: 'Tone of Voice',
    [Language.MY]: 'လေသံ (Tone)',
    [Language.TH]: 'น้ำเสียง'
  },
  targetAudience: {
    [Language.EN]: 'Target Audience',
    [Language.MY]: 'ဦးတည်ပရိသတ်',
    [Language.TH]: 'กลุ่มเป้าหมาย'
  },
  outputLanguage: {
    [Language.EN]: 'Output Language',
    [Language.MY]: 'ဘာသာစကားရွေးရန်',
    [Language.TH]: 'ภาษาผลลัพธ์'
  },
  generateBtn: {
    [Language.EN]: 'Generate Content',
    [Language.MY]: 'စာရေးပါ',
    [Language.TH]: 'สร้างคอนเทนต์'
  },
  generating: {
    [Language.EN]: 'Writing magic...',
    [Language.MY]: 'ရေးသားနေပါသည်...',
    [Language.TH]: 'กำลังเขียน...'
  },
  resultTitle: {
    [Language.EN]: 'Generated Content',
    [Language.MY]: 'ရလဒ်',
    [Language.TH]: 'คอนเทนต์ที่ได้'
  },
  copyBtn: {
    [Language.EN]: 'Copy',
    [Language.MY]: 'ကူးယူမည်',
    [Language.TH]: 'คัดลอก'
  },
  copied: {
    [Language.EN]: 'Copied!',
    [Language.MY]: 'ကူးယူပြီး',
    [Language.TH]: 'คัดลอกแล้ว!'
  },
  clearBtn: {
    [Language.EN]: 'Clear',
    [Language.MY]: 'ရှင်းမည်',
    [Language.TH]: 'ล้าง'
  },
  pillar: {
    [Language.EN]: 'Content Pillar',
    [Language.MY]: 'Content အမျိုးအစား',
    [Language.TH]: 'ประเภทคอนเทนต์'
  },
  brandSection: {
    [Language.EN]: 'Brand Identity',
    [Language.MY]: 'Brand အချက်အလက်',
    [Language.TH]: 'ข้อมูลแบรนด์'
  },
  addNewBrand: {
    [Language.EN]: '+ Add New',
    [Language.MY]: '+ အသစ်ထည့်မည်',
    [Language.TH]: '+ เพิ่มใหม่'
  },
  selectBrand: {
    [Language.EN]: 'Select a Brand Profile (Optional)',
    [Language.MY]: 'Brand Profile ရွေးပါ (မရွေးလဲရသည်)',
    [Language.TH]: 'เลือกโปรไฟล์แบรนด์ (ไม่บังคับ)'
  },
  // Login & Premium
  loginTitle: {
    [Language.EN]: 'Welcome to CopyCraft',
    [Language.MY]: 'CopyCraft မှ ကြိုဆိုပါသည်',
    [Language.TH]: 'ยินดีต้อนรับสู่ CopyCraft'
  },
  loginBtn: {
    [Language.EN]: 'Sign in with Google',
    [Language.MY]: 'Google ဖြင့် အကောင့်ဝင်ပါ',
    [Language.TH]: 'เข้าสู่ระบบด้วย Google'
  },
  loginSubtitle: {
    [Language.EN]: 'Sign in to save your brands and access premium features.',
    [Language.MY]: 'Brand များကိုမှတ်ထားရန်နှင့် Premium စနစ်သုံးရန် အကောင့်ဝင်ပါ။',
    [Language.TH]: 'ลงชื่อเข้าใช้เพื่อบันทึกแบรนด์ของคุณและเข้าถึงฟีเจอร์พรีเมียม'
  },
  premiumLock: {
    [Language.EN]: 'Premium Feature',
    [Language.MY]: 'Premium အသုံးပြုသူများသာ',
    [Language.TH]: 'สำหรับสมาชิกพรีเมียม'
  },
  premiumDesc: {
    [Language.EN]: 'Upgrade to unlock Script Writing for Videos, Reels, and more.',
    [Language.MY]: 'Video Script များနှင့် အခြားဝန်ဆောင်မှုများသုံးရန် Premium သို့ပြောင်းပါ။',
    [Language.TH]: 'อัปเกรดเพื่อปลดล็อกการเขียนบทสำหรับวิดีโอและอื่นๆ'
  },
  upgradeBtn: {
    [Language.EN]: 'Unlock Premium',
    [Language.MY]: 'Premium ဝယ်ယူမည်',
    [Language.TH]: 'อัปเกรดเป็นพรีเมียม'
  },
  // Access Denied
  accessDeniedTitle: {
    [Language.EN]: 'Access Denied',
    [Language.MY]: 'ဝင်ရောက်ခွင့်မရှိပါ',
    [Language.TH]: 'ปฏิเสธการเข้าถึง'
  },
  accessDeniedDesc: {
    [Language.EN]: 'Your email is not on the allowed list. Please contact the administrator.',
    [Language.MY]: 'သင့် Email သည် အသုံးပြုခွင့်စာရင်းတွင် မပါဝင်ပါ။ Admin ကိုဆက်သွယ်ပါ။',
    [Language.TH]: 'อีเมลของคุณไม่อยู่ในรายการที่อนุญาต โปรดติดต่อผู้ดูแลระบบ'
  },
  logoutBtn: {
    [Language.EN]: 'Log Out',
    [Language.MY]: 'အကောင့်ထွက်မည်',
    [Language.TH]: 'ออกจากระบบ'
  }
};

export const DEFAULT_BRANDS: BrandProfile[] = [
  {
    id: 'demo-1',
    name: 'TechNova',
    industry: 'Consumer Electronics',
    description: 'Innovative gadgets for the modern lifestyle. High-tech meets minimal design.',
    defaultTone: Tone.WITTY,
    defaultAudience: 'Tech enthusiasts, Early adopters, Ages 18-35'
  },
  {
    id: 'demo-2',
    name: 'GreenLeaf Organics',
    industry: 'Health & Wellness',
    description: '100% organic supplements and superfoods sourced sustainably.',
    defaultTone: Tone.FRIENDLY,
    defaultAudience: 'Health-conscious individuals, Eco-friendly consumers'
  }
];