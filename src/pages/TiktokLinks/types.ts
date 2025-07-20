// src/pages/TiktokLinks/types.ts - Glass Version
export interface LinkItem {
  href: string;
  icon: string;
  title: string;
  description: string;
  isCopyable?: boolean;
  isInternalLink?: boolean;
  featured?: boolean;
}