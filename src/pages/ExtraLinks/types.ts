// src/pages/ExtraLinks/types.ts
export interface LinkItem {
  href: string;
  icon: string;
  title: string;
  description: string;
  isCopyable?: boolean;
  isInternalLink?: boolean;
}