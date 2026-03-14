const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY2;
const PLAYLIST_ID = 'PLDZjxSO4MSJoA638nQvykQaevGgc-sV2B';

export interface PortfolioStats {
  totalViews: number;
  totalVideos: number;
  totalChannels: number;
  totalLikes: number;
}

export const fetchPortfolioStats = async (): Promise<PortfolioStats> => {
  const videos: { views: number; likes: number; channelId: string }[] = [];
  let nextPageToken = '';

  do {
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?` +
      `part=contentDetails&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=50` +
      (nextPageToken ? `&pageToken=${nextPageToken}` : '')
    );
    const playlistData = await playlistRes.json();
    if (!playlistData.items?.length) break;

    const videoIds = playlistData.items
      .map((i: any) => i.contentDetails.videoId)
      .join(',');

    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?` +
      `part=statistics,snippet&id=${videoIds}&key=${API_KEY}`
    );
    const videoData = await videoRes.json();

    for (const v of videoData.items || []) {
      videos.push({
        views: parseInt(v.statistics.viewCount) || 0,
        likes: parseInt(v.statistics.likeCount) || 0,
        channelId: v.snippet.channelId,
      });
    }

    nextPageToken = playlistData.nextPageToken || '';
  } while (nextPageToken);

  return {
    totalViews: videos.reduce((s, v) => s + v.views, 0),
    totalLikes: videos.reduce((s, v) => s + v.likes, 0),
    totalVideos: videos.length,
    totalChannels: new Set(videos.map(v => v.channelId)).size,
  };
};
