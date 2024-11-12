// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

// Add exports for other types
export * from './youtube';