// src/pages/Tools/components/ChannelAnalyzer/ChannelAnalyzer.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import * as S from './styles';

interface ChannelAnalysis {
  achievements: string[];
  drawbacks: string[];
  flaggedWords: string[];
}

interface ChannelMetrics {
  totalViews: number;
  totalVideos: number;
  totalSubscribers: number;
  averageViewsPerVideo: number;
  viewsPerSubscriber: number;
  creationDate: Date;
  country: string;
  channelId: string;
  subscriberBenefitLevel: string;
  madeForKids: boolean;
  topicCategories: string[];
}

const flaggableWords = [
  "ahole", "anus", "ass", "asshole", "bastard", "bitch", "fuck", "shit", 
  // ... add more as needed from your list
];

export const ChannelAnalyzer: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const navigate = useNavigate();
  const [channelUrl, setChannelUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [channelData, setChannelData] = useState<any>(null);
  const [playlistData, setPlaylistData] = useState<any>(null);
  const [latestVideoData, setLatestVideoData] = useState<any>(null);
  const [analysisResults, setAnalysisResults] = useState<ChannelAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (channelId) {
      setChannelUrl(`https://youtube.com/channel/${channelId}`);
      handleAnalyze(channelId);
    }
  }, [channelId]);

  const getChannelId = async (input: string): Promise<string> => {
    // First check if it's a direct channel ID
    if (/^UC[\w-]{22}$/.test(input)) {
      return input;
    }

    const urlPatterns = {
      channel: /youtube\.com\/channel\/(UC[\w-]{22})/,
      user: /youtube\.com\/user\/(\w+)/,
      handle: /youtube\.com\/@([\w-]+)/,
      customUrl: /youtube\.com\/(c\/)?(\w+)/
    };

    for (const [type, pattern] of Object.entries(urlPatterns)) {
      const match = input.match(pattern);
      if (match) {
        if (type === 'channel') {
          return match[1];
        } else {
          const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=id&${type === 'user' ? 'forUsername' : 'forHandle'}=${match[1]}&key=${API_KEY}`
          );
          const data = await response.json();
          if (data.items?.[0]) {
            return data.items[0].id;
          }
        }
      }
    }

    throw new Error('Invalid channel URL or ID');
  };

  const handleSearch = async () => {
    try {
      const extractedId = await getChannelId(channelUrl);
      if (extractedId) {
        navigate(`/tools/channel-analyzer/${extractedId}`);
      } else {
        alert('Invalid channel URL or ID');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid channel URL or ID');
    }
  };

  const handleAnalyze = async (id?: string) => {
    if (!id && !channelUrl.trim()) {
      alert('Please enter a YouTube channel URL');
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    try {
      const channelId = id || await getChannelId(channelUrl);
      const channel = await fetchChannelData(channelId);
      const playlists = await fetchPlaylistData(channelId);
      const latestVideo = await fetchLatestVideoData(channelId);

      setChannelData(channel);
      setPlaylistData(playlists);
      setLatestVideoData(latestVideo);

      const analysis = analyzeChannelData(latestVideo, channel, playlists);
      setAnalysisResults(analysis);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while analyzing the channel');
    } finally {
      setIsLoading(false);
    }
  };

  const getFullSizeBannerUrl = (bannerUrl: string): string => {
    if (!bannerUrl) return '';
    
    // Check if the URL already has parameters
    if (bannerUrl.includes('=w')) {
      // Replace existing parameters with full size ones
      return bannerUrl.replace(/=w\d+-.+/, '=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj');
    }
    
    // Add parameters for full size if none exist
    return `${bannerUrl}=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj`;
  };

  const fetchChannelData = async (channelId: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?` +
      `part=snippet,statistics,brandingSettings,status,topicDetails&` +
      `id=${channelId}&key=${API_KEY}`
    );
    const data = await response.json();
    if (!data.items?.[0]) throw new Error('Channel not found');
    return data.items[0];
  };

  const fetchPlaylistData = async (channelId: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?` +
      `part=id&channelId=${channelId}&maxResults=2&key=${API_KEY}`
    );
    const data = await response.json();
    return data.items || [];
  };

  const fetchLatestVideoData = async (channelId: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&channelId=${channelId}&order=date&type=video&` +
      `maxResults=1&key=${API_KEY}`
    );
    const data = await response.json();
    if (!data.items?.[0]) throw new Error('No videos found');
    return data.items[0];
  };

  const analyzeChannelData = (
    latestVideoData: any, 
    channelData: any, 
    playlistData: any
  ): ChannelAnalysis => {
    const achievements: string[] = [];
    const drawbacks: string[] = [];
    const flaggedWords: string[] = [];

    const channelKeywords = channelData.brandingSettings?.channel?.keywords || '';
    const channelDescription = channelData.snippet.description;
    const lastVideoPostedDate = new Date(latestVideoData.snippet.publishedAt);
    const today = new Date();
    const differenceInWeeks = Math.floor((today.getTime() - lastVideoPostedDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

    // Check for flaggable words
    const checkContentForFlags = (content: string) => {
      return flaggableWords.filter(word => 
        content.toLowerCase().includes(word.toLowerCase())
      );
    };

    flaggedWords.push(
      ...checkContentForFlags(channelData.snippet.title),
      ...checkContentForFlags(channelKeywords),
      ...checkContentForFlags(channelDescription)
    );

    // Content moderation check
    if (flaggedWords.length === 0) {
      achievements.push("Channel content is family-friendly");
    } else {
      drawbacks.push(`Channel contains potentially inappropriate content: ${[...new Set(flaggedWords)].join(', ')}`);
    }

    // Keywords check
    if (channelKeywords) {
      const keywordCount = channelKeywords.split(',').length;
      achievements.push(`Channel uses ${keywordCount} keywords`);
    } else {
      drawbacks.push("Channel has no keywords set");
    }

    // Upload frequency check
    if (differenceInWeeks <= 1) {
      achievements.push("Very active: Posted within the last week");
    } else if (differenceInWeeks <= 3) {
      achievements.push("Active: Posted within the last 3 weeks");
    } else {
      drawbacks.push(`Inactive: No new content in ${differenceInWeeks} weeks`);
    }

    // Branding checks
    if (channelData.brandingSettings?.image?.bannerExternalUrl) {
      achievements.push("Has custom channel banner");
    } else {
      drawbacks.push("Missing channel banner");
    }

    if (channelData.brandingSettings?.channel?.unsubscribedTrailer) {
      achievements.push("Has channel trailer");
    } else {
      drawbacks.push("Missing channel trailer");
    }

    // Playlists check
    if (playlistData.length > 0) {
      achievements.push(`Has ${playlistData.length} playlists organized`);
    } else {
      drawbacks.push("No content organization through playlists");
    }

    // Description check
    if (channelDescription && channelDescription.length > 100) {
      achievements.push("Detailed channel description");
    } else if (channelDescription) {
      drawbacks.push("Channel description could be more detailed");
    } else {
      drawbacks.push("Missing channel description");
    }

    // Engagement metrics
    const viewCount = parseInt(channelData.statistics.viewCount);
    const subCount = parseInt(channelData.statistics.subscriberCount);
    const videoCount = parseInt(channelData.statistics.videoCount);

    if (viewCount / subCount > 100) {
      achievements.push("Strong view-to-subscriber ratio");
    }

    if (viewCount / videoCount > 10000) {
      achievements.push("High average views per video");
    }

    return { 
      achievements, 
      drawbacks, 
      flaggedWords: [...new Set(flaggedWords)] 
    };
  };

  const getSubscriberBenefitLevel = (subscriberCount: number): string => {
    if (subscriberCount >= 10000000) return 'Diamond (10M+)';
    if (subscriberCount >= 1000000) return 'Gold (1M-10M)';
    if (subscriberCount >= 100000) return 'Silver (100K-1M)';
    return 'Bronze (<100K)';
  };

  const calculateOverallScore = (analysis: ChannelAnalysis): string => {
    const totalPoints = analysis.achievements.length + analysis.drawbacks.length;
    const score = Math.round((analysis.achievements.length / totalPoints) * 5);
    const finalScore = Math.min(5, Math.max(1, score));
    return '⭐'.repeat(finalScore) + '🌑'.repeat(5 - finalScore);
  };



  return (
    <S.Container>
      <S.Header>
        <S.Title>Channel Analyzer</S.Title>
      </S.Header>

      <S.SearchContainer>
        <S.SearchBar>
          <S.SearchInput
            type="text"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            placeholder="Enter YouTube channel URL..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <S.SearchButton onClick={handleSearch} disabled={isLoading}>
            <i className='bx bx-search'></i>
          </S.SearchButton>
        </S.SearchBar>
      </S.SearchContainer>

      <S.ResultsContainer className={showResults ? 'visible' : ''}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '2rem' }}></i>
          </div>
        ) : channelData && analysisResults ? (
          <>
            <S.ChannelInfo>
              <S.ChannelLogo 
                src={channelData.snippet.thumbnails.default.url} 
                alt="Channel Logo" 
              />
              <S.ChannelDetails>
                <S.ChannelName>{channelData.snippet.title}</S.ChannelName>
                <S.SubscriberCount>
                  {parseInt(channelData.statistics.subscriberCount).toLocaleString()} subscribers
                </S.SubscriberCount>
              </S.ChannelDetails>
              <S.VisitButton 
                href={`https://www.youtube.com/channel/${channelData.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Channel
              </S.VisitButton>
            </S.ChannelInfo>

            <S.ResultsGrid>
              <S.GridItem>
                <S.SectionTitle>Channel Metrics</S.SectionTitle>
                <S.Metric>
                  Views: {parseInt(channelData.statistics.viewCount).toLocaleString()}
                </S.Metric>
                <S.Metric>
                  Videos: {parseInt(channelData.statistics.videoCount).toLocaleString()}
                </S.Metric>
                <S.Metric>
                  Created: {moment(channelData.snippet.publishedAt).format('MMMM D, YYYY')}
                </S.Metric>
                <S.Metric>
                  Benefit Level: {getSubscriberBenefitLevel(parseInt(channelData.statistics.subscriberCount))}
                </S.Metric>
                <S.Metric>
                  Made for Kids: {channelData.status?.madeForKids ? 'Yes' : 'No'}
                </S.Metric>
              </S.GridItem>

              <S.GridItem>
                <S.SectionTitle>Channel Branding</S.SectionTitle>
                <S.BrandingContainer>
  <S.BrandingItem>
    <S.ImageContainer>
      <S.PreviewImage
        src={channelData.snippet.thumbnails.medium.url}
        alt="Profile Picture"
      />
    </S.ImageContainer>
    <S.DownloadButton
      href={channelData.snippet.thumbnails.high.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Full Size
    </S.DownloadButton>
  </S.BrandingItem>
  {channelData.brandingSettings?.image?.bannerExternalUrl && (
    <S.BrandingItem>
      <S.ImageContainer>
        <S.PreviewImage
          src={getFullSizeBannerUrl(channelData.brandingSettings.image.bannerExternalUrl)}
          alt="Banner Image"
        />
      </S.ImageContainer>
      <S.DownloadButton
        href={getFullSizeBannerUrl(channelData.brandingSettings.image.bannerExternalUrl)}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Full Size
      </S.DownloadButton>
    </S.BrandingItem>
  )}
</S.BrandingContainer>
              </S.GridItem>

              <S.GridItem>
                <S.SectionTitle>Achievements</S.SectionTitle>
                {analysisResults.achievements.map((achievement, index) => (
                  <S.Achievement key={index}>
                    🏆 {achievement}
                  </S.Achievement>
                ))}
              </S.GridItem>

              <S.GridItem>
                <S.SectionTitle>Areas for Improvement</S.SectionTitle>
                {analysisResults.drawbacks.map((drawback, index) => (
                  <S.Drawback key={index}>
                    ⚠️ {drawback}
                  </S.Drawback>
                ))}
              </S.GridItem>

              <S.GridItem>
                <S.SectionTitle>Overall Score</S.SectionTitle>
                <S.OverallScore>
                  {calculateOverallScore(analysisResults)}
                </S.OverallScore>
              </S.GridItem>
            </S.ResultsGrid>
          </>
        ) : null}
      </S.ResultsContainer>
    </S.Container>
  );
};

export default ChannelAnalyzer;