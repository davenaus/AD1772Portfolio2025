import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './styles';
import { ExternalLink } from 'lucide-react';

interface VideoStats {
  title: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  duration: string;
  categoryId: string;
  tags?: string[];
  language?: string;
}

interface ChannelInfo {
  id: string;
  title: string;
  thumbnailUrl: string;
  subscriberCount: string;
}

interface PlaylistAnalysis {
  totalViews: number;
  totalVideos: number;
  totalChannels: number;
  oldestVideo: Date;
  newestVideo: Date;
  avgViewsPerVideo: number;
  totalDuration: number;
  mostViewedVideo: { title: string; views: number };
  leastViewedVideo: { title: string; views: number };
  avgLikes: number;
  avgComments: number;
  channels: Map<string, ChannelInfo>;
  topTags: [string, number][];
  categories: [string, number][];
  languages: [string, number][];
}

const videoCategories: { [key: string]: string } = {
  '1': 'Film & Animation',
  '2': 'Autos & Vehicles',
  '10': 'Music',
  '15': 'Pets & Animals',
  '17': 'Sports',
  '19': 'Travel & Events',
  '20': 'Gaming',
  '22': 'People & Blogs',
  '23': 'Comedy',
  '24': 'Entertainment',
  '25': 'News & Politics',
  '26': 'Howto & Style',
  '27': 'Education',
  '28': 'Science & Technology',
  '29': 'Nonprofits & Activism',
};

export const PlaylistAnalyzer: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysis, setAnalysis] = useState<PlaylistAnalysis | null>(null);

  useEffect(() => {
    if (playlistId) {
      setPlaylistUrl(playlistId);
      analyzePlaylist(playlistId);
    }
  }, [playlistId]);

  const extractPlaylistId = (url: string): string | null => {
    try {
      // First check if it's a direct playlist ID
      if (url.match(/^[A-Za-z0-9_-]+$/)) {
        return url;
      }

      const urlObj = new URL(url);
      // Check for playlist ID in URL
      const listParam = urlObj.searchParams.get('list');
      if (listParam) return listParam;

      // If no playlist ID found but there's a video ID, try to get its playlist
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return videoId; // You might want to handle this case differently
      }

      return null;
    } catch {
      // If not a URL, assume it's a direct playlist ID
      return url.match(/^[A-Za-z0-9_-]+$/) ? url : null;
    }
  };

  const convertDurationToSeconds = (duration: string): number => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;
    const hours = (parseInt(match[1] || '0') || 0);
    const minutes = (parseInt(match[2] || '0') || 0);
    const seconds = (parseInt(match[3] || '0') || 0);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const getChannelDetails = async (channelId: string): Promise<any> => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?` +
        `part=snippet,statistics&id=${channelId}&key=${API_KEY}`
      );
      const data = await response.json();
      return data.items?.[0];
    } catch (error) {
      console.error('Error fetching channel details:', error);
      return null;
    }
  };

  const handleSearch = () => {
    const extractedId = extractPlaylistId(playlistUrl);
    if (extractedId) {
      navigate(`/tools/playlist-analyzer/${extractedId}`);
    } else {
      alert('Invalid playlist URL or ID');
    }
  };

  const analyzePlaylist = async (id?: string) => {
    const playlistId = id || extractPlaylistId(playlistUrl);
    if (!playlistId) {
      alert('Invalid playlist URL or ID');
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    try {
      const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
      let nextPageToken = '';
      const channels = new Map<string, ChannelInfo>();
      let totalViews = 0;
      let totalLikes = 0;
      let totalComments = 0;
      let totalDuration = 0;
      let videoCount = 0;
      let oldestVideo = new Date();
      let newestVideo = new Date(0);
      let mostViewedVideo = { title: '', views: 0 };
      let leastViewedVideo = { title: '', views: Infinity };
      const tags: { [key: string]: number } = {};
      const categories: { [key: string]: number } = {};
      const languages: { [key: string]: number } = {};

      do {
        const playlistResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?` +
          `part=contentDetails,snippet&playlistId=${playlistId}&` +
          `key=${API_KEY}&maxResults=50&pageToken=${nextPageToken}`
        );
        const playlistData = await playlistResponse.json();
        if (!playlistData.items) break;

        const videoIds = playlistData.items
          .map((item: any) => item.contentDetails.videoId)
          .join(',');
        
        const videoResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?` +
          `part=statistics,snippet,contentDetails&id=${videoIds}&key=${API_KEY}`
        );
        const videoData = await videoResponse.json();

        for (const video of videoData.items) {
          const viewCount = parseInt(video.statistics.viewCount);
          totalViews += viewCount;
          totalLikes += parseInt(video.statistics.likeCount || '0');
          totalComments += parseInt(video.statistics.commentCount || '0');
          
          if (!channels.has(video.snippet.channelId)) {
            channels.set(video.snippet.channelId, {
              id: video.snippet.channelId,
              title: video.snippet.channelTitle,
              thumbnailUrl: '',
              subscriberCount: '0'
            });
          }

          videoCount++;

          const durationInSeconds = convertDurationToSeconds(video.contentDetails.duration);
          totalDuration += durationInSeconds;

          const publishedAt = new Date(video.snippet.publishedAt);
          if (publishedAt < oldestVideo) oldestVideo = publishedAt;
          if (publishedAt > newestVideo) newestVideo = publishedAt;

          if (viewCount > mostViewedVideo.views) {
            mostViewedVideo = { title: video.snippet.title, views: viewCount };
          }
          if (viewCount < leastViewedVideo.views) {
            leastViewedVideo = { title: video.snippet.title, views: viewCount };
          }

          if (video.snippet.tags) {
            video.snippet.tags.forEach((tag: string) => {
              tags[tag] = (tags[tag] || 0) + 1;
            });
          }

          const categoryId = video.snippet.categoryId;
          categories[categoryId] = (categories[categoryId] || 0) + 1;

          const language = video.snippet.defaultAudioLanguage || 'Unknown';
          languages[language] = (languages[language] || 0) + 1;
        }

        nextPageToken = playlistData.nextPageToken;
      } while (nextPageToken);

      await Promise.all(
        Array.from(channels.entries()).map(async ([channelId, channelInfo]) => {
          const channelDetails = await getChannelDetails(channelId);
          if (channelDetails) {
            channels.set(channelId, {
              ...channelInfo,
              thumbnailUrl: channelDetails.snippet.thumbnails.default.url,
              subscriberCount: channelDetails.statistics.subscriberCount
            });
          }
        })
      );

      const analysisResult: PlaylistAnalysis = {
        totalViews,
        totalVideos: videoCount,
        totalChannels: channels.size,
        oldestVideo,
        newestVideo,
        avgViewsPerVideo: totalViews / videoCount,
        totalDuration,
        mostViewedVideo,
        leastViewedVideo,
        avgLikes: totalLikes / videoCount,
        avgComments: totalComments / videoCount,
        channels,
        topTags: Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 5),
        categories: Object.entries(categories).sort((a, b) => b[1] - a[1]),
        languages: Object.entries(languages).sort((a, b) => b[1] - a[1])
      };

      setAnalysis(analysisResult);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while analyzing the playlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaylistUrl = (playlistId: string) => {
    return `https://www.youtube.com/playlist?list=${playlistId}`;
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Playlist Analyzer</S.Title>
      </S.Header>

      <S.SearchBar>
        <S.SearchInput
          type="text"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          placeholder="Enter Playlist ID or Video URL"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          disabled={isLoading}
        />
        <S.SearchButton onClick={handleSearch} disabled={isLoading}>
          <i className='bx bx-search'></i>
        </S.SearchButton>
      </S.SearchBar>

      <S.ResultsContainer className={showResults ? 'visible' : ''}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '2rem' }}></i>
          </div>
        ) : analysis ? (
          <>
            <S.ViewPlaylistButton
              onClick={() => window.open(getPlaylistUrl(playlistId || ''), '_blank')}
            >
              <ExternalLink size={20} />
              View Playlist
            </S.ViewPlaylistButton>
            <S.ResultsGrid>
            <S.GridItem>
              <S.SectionTitle>Playlist Metrics</S.SectionTitle>
              <S.StatsList>
                <li>Total Views: {analysis.totalViews.toLocaleString()}</li>
                <li>Number of Videos: {analysis.totalVideos}</li>
                <li>Number of Channels: {analysis.totalChannels}</li>
                <li>Oldest Video: {analysis.oldestVideo.toDateString()}</li>
                <li>Newest Video: {analysis.newestVideo.toDateString()}</li>
                <li>Average Views per Video: {Math.round(analysis.avgViewsPerVideo).toLocaleString()}</li>
                <li>Playlist Duration: {formatDuration(analysis.totalDuration)}</li>
                <li>Most Viewed Video: {analysis.mostViewedVideo.title} ({analysis.mostViewedVideo.views.toLocaleString()} views)</li>
                <li>Least Viewed Video: {analysis.leastViewedVideo.title} ({analysis.leastViewedVideo.views.toLocaleString()} views)</li>
                <li>Average Likes per Video: {Math.round(analysis.avgLikes).toLocaleString()}</li>
                <li>Average Comments per Video: {Math.round(analysis.avgComments).toLocaleString()}</li>
              </S.StatsList>
            </S.GridItem>

            <S.GridItem>
              <S.SectionTitle>Channels in this Playlist</S.SectionTitle>
              <S.ChannelList>
                {Array.from(analysis.channels.values()).map((channel) => (
                  <S.ChannelItem key={channel.id}>
                    <S.ChannelLogo src={channel.thumbnailUrl} alt={`${channel.title} logo`} />
                    <S.ChannelInfo>
                      <S.ChannelName>{channel.title}</S.ChannelName>
                      <S.SubscriberCount>
                        {parseInt(channel.subscriberCount).toLocaleString()} subscribers
                      </S.SubscriberCount>
                    </S.ChannelInfo>
                  </S.ChannelItem>
                ))}
              </S.ChannelList>
            </S.GridItem>

            <S.GridItem>
              <S.SectionTitle>Top 5 Tags</S.SectionTitle>
              <S.StatsList>
                {analysis.topTags.map(([tag, count]) => (
                  <li key={tag}>{tag} ({count})</li>
                ))}
              </S.StatsList>
            </S.GridItem>

            <S.GridItem>
              <S.SectionTitle>Category Distribution</S.SectionTitle>
              <S.StatsList>
                {analysis.categories.map(([categoryId, count]) => (
                  <li key={categoryId}>
                    {videoCategories[categoryId] || `Unknown (${categoryId})`} ({count})
                  </li>
                ))}
              </S.StatsList>
            </S.GridItem>

            <S.GridItem>
              <S.SectionTitle>Language Distribution</S.SectionTitle>
              <S.StatsList>
                {analysis.languages.map(([language, count]) => (
                  <li key={language}>{language} ({count})</li>
                ))}
              </S.StatsList>
            </S.GridItem>
            </S.ResultsGrid>
          </>
        ) : null}
      </S.ResultsContainer>
    </S.Container>
  );
};

export default PlaylistAnalyzer;