// Centralized services data
export interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  unit: string;
  features: string[];
  category: 'non-technical' | 'technical' | 'presentations' | 'exams' | 'ai-refinement';
  popular?: boolean;
}

export const servicesData: ServiceData[] = [
  {
    id: 'non-technical',
    title: 'Non-Technical Writing',
    description: 'Essays, research papers, literature reviews, and general school assignments.',
    icon: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=64&h=64&fit=crop&crop=center',
    price: 8,
    unit: 'page',
    features: ['English', 'History', 'Philosophy', 'Psychology', 'Sociology', 'Business', 'Marketing'],
    category: 'non-technical'
  },
  {
    id: 'technical',
    title: 'Technical Writing',
    description: 'Specialized help with technical subjects and programming assignments.',
    icon: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=64&h=64&fit=crop&crop=center',
    price: 15,
    unit: 'page',
    features: ['Python', 'Java', 'C++', 'Data Analysis', 'Statistics', 'Mathematics', 'Engineering'],
    category: 'technical',
    popular: true
  },
  {
    id: 'presentations',
    title: 'PPT Presentations',
    description: 'Professional slides with transcripts included.',
    icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center',
    price: 5,
    unit: 'slide',
    features: ['Transcript included', 'Professional design', 'Speaker notes', 'Editable format'],
    category: 'presentations'
  },
  {
    id: 'exams',
    title: 'Exam Help',
    description: 'Professional assistance with exams, quizzes, and assessments.',
    icon: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=64&h=64&fit=crop&crop=center',
    price: 30,
    unit: 'exam',
    features: ['All subjects', 'Timely delivery', 'Guaranteed quality', 'Confidential service'],
    category: 'exams'
  },
  {
    id: 'ai-refinement',
    title: 'AI Work Refinement',
    description: 'Remove AI detection and improve quality.',
    icon: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&fit=crop&crop=center',
    price: 10,
    unit: '500 words',
    features: ['AI detection removal', 'Human-like writing', 'Quality improvement', 'Fast turnaround'],
    category: 'ai-refinement'
  }
];

// Urgency options with proper typing
export interface UrgencyOption {
  id: string;
  name: string;
  multiplier: number;
  time: string;
  color: string;
}

export const urgencyOptions: UrgencyOption[] = [
  { id: 'standard', name: 'Standard', multiplier: 1, time: '3-5 days', color: 'bg-gray-100' },
  { id: 'urgent', name: 'Urgent', multiplier: 1.5, time: '24-48 hours', color: 'bg-yellow-100' },
  { id: 'express', name: 'Express', multiplier: 2, time: '12-24 hours', color: 'bg-red-100' }
];

// Course categories
export interface Course {
  name: string;
  icon: string;
}

export interface CourseCategories {
  technical: Course[];
  nonTechnical: Course[];
}

export const courseCategories: CourseCategories = {
  technical: [
    { name: 'Python Programming', icon: '🐍' },
    { name: 'Java Development', icon: '☕' },
    { name: 'C++ Programming', icon: '⚡' },
    { name: 'Data Analysis', icon: '📊' },
    { name: 'Statistics', icon: '📈' },
    { name: 'Mathematics', icon: '🔢' },
    { name: 'Engineering', icon: '⚙️' },
    { name: 'Machine Learning', icon: '🤖' }
  ],
  nonTechnical: [
    { name: 'English Literature', icon: '📚' },
    { name: 'History', icon: '🏛️' },
    { name: 'Philosophy', icon: '🤔' },
    { name: 'Psychology', icon: '🧠' },
    { name: 'Sociology', icon: '👥' },
    { name: 'Business', icon: '💼' },
    { name: 'Marketing', icon: '📢' },
    { name: 'Economics', icon: '💰' }
  ]
};

// Sample work data
export interface SampleWork {
  name: string;
  subject: string;
  type: string;
  download: string;
  description: string;
}

export const sampleWork: SampleWork[] = [
  { 
    name: 'Research Paper - Psychology', 
    subject: 'Psychology', 
    type: 'Research Paper', 
    download: 'https://drive.google.com/uc?export=download&id=1POlzd7atqCJQq9B32fi57NhT3HFrzk7e',
    description: 'A+ quality research paper on cognitive psychology'
  },
  { 
    name: 'Python Code Analysis', 
    subject: 'Python', 
    type: 'Programming', 
    download: 'https://drive.google.com/uc?export=download&id=1FbD35TWHxrNBYww5siXK23vDS3Cuc1gx',
    description: 'Clean, well-documented Python assignment'
  },
  { 
    name: 'Business Case Study', 
    subject: 'Business', 
    type: 'Case Study', 
    download: 'https://drive.google.com/uc?export=download&id=11yuP8eMYWkwHXsIg_nkDxaY2VfOhf-8P',
    description: 'Comprehensive business analysis with real data'
  },
  { 
    name: 'Literature Review', 
    subject: 'English', 
    type: 'Literature Review', 
    download: 'https://drive.google.com/uc?export=download&id=1kIrygLick8hSlbzfSLCvaLic2LMkxIUq',
    description: 'Academic literature review with proper citations'
  },
  { 
    name: 'Statistics Report', 
    subject: 'Statistics', 
    type: 'Report', 
    download: 'https://drive.google.com/uc?export=download&id=1mPcVy15xUwXqO5lDQg1EQQtY2QQ-eHe2',
    description: 'Statistical analysis with clear explanations'
  },
  { 
    name: 'Marketing Presentation', 
    subject: 'Marketing', 
    type: 'PPT', 
    download: 'https://drive.google.com/uc?export=download&id=1FaqfrfEcELZrHUbpOFRCuThJK_UOCb08',
    description: 'Professional marketing presentation slides'
  }
];

// Configuration constants
export const CONFIG = {
  WORDS_PER_PAGE: 275,
  MIN_WORDS: 275,
  MIN_SLIDES: 1,
  DEFAULT_CURRENCY: 'USD',
  DEFAULT_COUNTRY: 'AE'
} as const;
