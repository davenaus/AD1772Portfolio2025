// src/services/youtubeService.ts
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY2;
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
}

export const youtubeService = {
  async getLatestVideo(): Promise<YouTubeVideo | null> {
    try {
      // First, get the latest videos
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `key=${YOUTUBE_API_KEY}&` +
        `channelId=${CHANNEL_ID}&` +
        `part=snippet&` +
        `order=date&` +
        `type=video&` +
        `videoEmbeddable=true&` +
        `maxResults=10`
      );

      const searchData = await searchResponse.json();
      
      if (!searchData.items?.length) return null;

      // Get the video IDs to fetch their contentDetails
      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

      // Get video details including duration
      const videoResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `key=${YOUTUBE_API_KEY}&` +
        `id=${videoIds}&` +
        `part=contentDetails,snippet,statistics`
      );

      const videoData = await videoResponse.json();

      // Find the first video that's not a Short (duration > 1 minute)
      const longFormVideo = videoData.items.find((video: any) => {
        const duration = parseDuration(video.contentDetails.duration);
        return duration >= 60; // More than 60 seconds
      });

      if (!longFormVideo) return null;

      return {
        id: longFormVideo.id,
        title: longFormVideo.snippet.title,
        description: longFormVideo.snippet.description,
        thumbnail: longFormVideo.snippet.thumbnails.high.url,
        publishedAt: longFormVideo.snippet.publishedAt,
        duration: longFormVideo.contentDetails.duration
      };
    } catch (error) {
      console.error('Error fetching latest video:', error);
      return null;
    }
  },

  async getVideoDetails(videoId: string): Promise<{ title: string; thumbnail: string; } | null> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `key=${YOUTUBE_API_KEY}&` +
        `id=${videoId}&` +
        `part=snippet`
      );

      const data = await response.json();
      if (!data.items?.[0]) return null;

      const video = data.items[0];
      return {
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url
      };
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  }
};

// Helper function to parse ISO 8601 duration to seconds
function parseDuration(duration: string): number {
  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  
  if (!matches) return 0;

  const [, hours, minutes, seconds] = matches;
  
  return (
    (parseInt(hours || '0') * 3600) +
    (parseInt(minutes || '0') * 60) +
    parseInt(seconds || '0')
  );
}

export default youtubeService;