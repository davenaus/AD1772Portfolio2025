// src/pages/Tools/components/OutlierFinder/OutlierFinder.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './styles';
import { YouTubeVideo, YouTubeChannel } from '../../../../types';

interface OutlierResult {
  video: YouTubeVideo;
  channel: YouTubeChannel;
  ratio: number;
}

export const OutlierFinder: React.FC = () => {
  const { searchQuery, type } = useParams<{ searchQuery: string; type: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShorts, setIsShorts] = useState(false);
  const [results, setResults] = useState<OutlierResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      // Decode the URL-encoded query
      const decodedQuery = decodeURIComponent(searchQuery);
      setQuery(decodedQuery);
      setIsShorts(type === 'shorts');
      handleAnalyze(decodedQuery, type === 'shorts');
    }
  }, [searchQuery, type]);

  const handleSearch = () => {
    const encodedQuery = encodeURIComponent(query);
    navigate(`/tools/outlier-finder/${encodedQuery}/${isShorts ? 'shorts' : 'videos'}`);
  };

  const handleAnalyze = async (searchQuery: string, isShorts: boolean) => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    try {
      const videos = await searchVideos(searchQuery);
      const videoDetails = await getVideoDetails(videos, isShorts);
      const channelDetails = await getChannelDetails(videos);
      const outliers = calculateOutliers(videoDetails, channelDetails);
      setResults(outliers);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching results');
    } finally {
      setIsLoading(false);
    }
  };

  const searchVideos = async (searchQuery: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&q=${encodeURIComponent(searchQuery)}&` +
      `type=video&maxResults=25&key=${API_KEY}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.items || [];
  };

  const getVideoDetails = async (videos: any[], isShorts: boolean) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const videoIds = videos.map(video => video.id.videoId).join(',');
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?` +
      `part=snippet,statistics,contentDetails&` +
      `id=${videoIds}&key=${API_KEY}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
  
    return data.items.filter((video: any) => {
      const duration = parseDuration(video.contentDetails.duration);
      return isShorts ? duration <= 60 : duration > 60;
    });
  };

  const getChannelDetails = async (videos: any[]) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const channelIdsSet = new Set<string>();
    videos.forEach(video => channelIdsSet.add(video.snippet.channelId));
    const channelIds = Array.from(channelIdsSet).join(',');
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?` +
      `part=statistics&id=${channelIds}&key=${API_KEY}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.items || [];
  };

  const calculateOutliers = (videos: any[], channels: any[]): OutlierResult[] => {
    const ratios = videos.map(video => {
      const channel = channels.find(c => c.id === video.snippet.channelId);
      if (!channel) return null;
      
      const views = parseInt(video.statistics.viewCount) || 0;
      const subscribers = parseInt(channel.statistics.subscriberCount) || 1;
      const ratio = views / subscribers;
      
      return { video, channel, ratio };
    }).filter((item): item is OutlierResult => item !== null);
  
    // Sort by ratio and return top 6 instead of 10
    ratios.sort((a, b) => b.ratio - a.ratio);
    return ratios.slice(0, 6);
  };

  const parseDuration = (duration: string): number => {
    const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!matches) return 0;
    const [, hours, minutes, seconds] = matches;
    return (parseInt(hours || '0') * 3600) +
           (parseInt(minutes || '0') * 60) +
           parseInt(seconds || '0');
  };

  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleToggle = (shorts: boolean) => {
    setIsShorts(shorts);
    if (query) {
      navigate(`/tools/outlier-finder/${encodeURIComponent(query)}/${shorts ? 'shorts' : 'videos'}`);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Outlier Finder</S.Title>
      </S.Header>

      <S.SearchContainer>
        <S.SearchBar>
          <S.SearchInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter YouTube search query"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <S.SearchButton onClick={handleSearch} disabled={isLoading}>
            <i className='bx bx-search'></i>
          </S.SearchButton>
        </S.SearchBar>

        <S.ToggleContainer>
          <S.Toggle>
            <S.ToggleOption 
              active={!isShorts} 
              onClick={() => handleToggle(false)}
            >
              Videos
            </S.ToggleOption>
            <S.ToggleOption 
              active={isShorts} 
              onClick={() => handleToggle(true)}
            >
              Shorts
            </S.ToggleOption>
          </S.Toggle>
        </S.ToggleContainer>
      </S.SearchContainer>

      <S.ResultsContainer className={showResults ? 'visible' : ''}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '2rem' }}></i>
          </div>
        ) : (
          <S.ResultsList>
            {results.map((result, index) => (
              <S.ResultCard key={result.video.id}>
                <S.Thumbnail
                  src={result.video.snippet.thumbnails.medium.url}
                  alt={result.video.snippet.title}
                />
                <S.VideoInfo>
                  <S.VideoTitle>
                    {index + 1}. {result.video.snippet.title}
                  </S.VideoTitle>
                  <S.VideoStats>
                    <p>
                      <i className='bx bx-show'></i>
                      {parseInt(result.video.statistics.viewCount).toLocaleString()} views
                    </p>
                    <p>
                      <i className='bx bx-user'></i>
                      {result.video.snippet.channelTitle}
                    </p>
                    <p>
                      <i className='bx bx-group'></i>
                      {parseInt(result.channel.statistics.subscriberCount).toLocaleString()} subscribers
                    </p>
                    <p>
                      <i className='bx bx-calendar'></i>
                      Posted on {formatDate(result.video.snippet.publishedAt)}
                    </p>
                  </S.VideoStats>
                  <S.VideoLink
                    href={`https://www.youtube.com/watch?v=${result.video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </S.VideoLink>
                </S.VideoInfo>
                <S.RatioPill ratio={Math.round(result.ratio)}>
                  x{Math.round(result.ratio)}
                </S.RatioPill>
              </S.ResultCard>
            ))}
          </S.ResultsList>
        )}
      </S.ResultsContainer>
    </S.Container>
  );
};

export default OutlierFinder;