// src/types/blog.ts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  youtube_video_id?: string;
  html_code?: string;
  featured: boolean;
  published: boolean;
  read_time: number;
  views: number;
  likes: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}