export interface PortfolioVideo {
    id: string;
    video_id: string;
    description: string;
    tag: string;
    created_at: string;
    // Added from YouTube API
    title?: string;
    thumbnail?: string;
  }