
import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  path: string;
  icon: LucideIcon;
  popular?: boolean;
  isNew?: boolean;
}

export enum ToolCategory {
  PDF = 'PDF Tools',
  SEO = 'SEO Tools',
  CALC = 'Calculators',
  IMAGE = 'Image Tools',
  TEXT = 'Text Tools',
  WEB = 'Web Utilities',
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  content: string; // HTML string for simplicity
}

export interface FAQItem {
  question: string;
  answer: string;
}
