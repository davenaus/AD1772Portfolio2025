// src/pages/Tools/components/ChannelComparer/ChannelComparer.tsx
import React, { useState } from 'react';
import moment from 'moment';
import * as S from './styles';

interface ChannelData {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
    };
    country?: string;
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  };
  brandingSettings?: {
    channel?: {
      keywords?: string;
    };
  };
  topicDetails?: {
    topicCategories?: string[];
  };
}

interface ComparisonMetrics {
  subscribers: number;
  views: number;
  videos: number;
  avgViews: number;
  viewsPerSub: number;
}

export const ChannelComparer: React.FC = () => {
  const [channelUrl1, setChannelUrl1] = useState('');
  const [channelUrl2, setChannelUrl2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [channelData1, setChannelData1] = useState<ChannelData | null>(null);
  const [channelData2, setChannelData2] = useState<ChannelData | null>(null);

  const getChannelId = async (url: string): Promise<string> => {
    const patterns = {
      channel: /youtube\.com\/channel\/(UC[\w-]{22})/,
      user: /youtube\.com\/user\/(\w+)/,
      handle: /youtube\.com\/@([\w-]+)/,
      customUrl: /youtube\.com\/(c\/)?(\w+)/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      const match = url.match(pattern);
      if (match) {
        if (type === 'channel') {
          return match[1];
        } else {
          const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?` +
            `part=snippet&type=channel&q=${match[1]}&key=${API_KEY}`
          );
          const data = await response.json();
          if (data.items?.[0]) {
            return data.items[0].snippet.channelId;
          }
        }
      }
    }
    throw new Error('Invalid YouTube channel URL');
  };

  const fetchChannelData = async (channelId: string): Promise<ChannelData> => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?` +
      `part=snippet,statistics,brandingSettings,topicDetails&` +
      `id=${channelId}&key=${API_KEY}`
    );
    const data = await response.json();
    if (!data.items?.[0]) throw new Error('Channel not found');
    return data.items[0];
  };

  const calculateMetrics = (channelData: ChannelData): ComparisonMetrics => {
    const subscribers = parseInt(channelData.statistics.subscriberCount);
    const views = parseInt(channelData.statistics.viewCount);
    const videos = parseInt(channelData.statistics.videoCount);
    return {
      subscribers,
      views,
      videos,
      avgViews: Math.round(views / videos),
      viewsPerSub: parseFloat((views / subscribers).toFixed(2))
    };
  };

  const getComparison = (value1: number, value2: number): 'higher' | 'lower' | 'equal' => {
    if (value1 > value2) return 'higher';
    if (value1 < value2) return 'lower';
    return 'equal';
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatDate = (date: string): string => {
    return moment(date).format('MMMM D, YYYY');
  };

  const formatTopics = (topics?: string[]): string => {
    if (!topics?.length) return 'Not available';
    return topics
      .map(topic => topic.split('/').pop()?.replace(/_/g, ' '))
      .filter(Boolean)
      .join(', ');
  };

  const formatKeywords = (keywords?: string): string => {
    if (!keywords) return 'Not available';
    const keywordArray = keywords.split(',');
    return keywordArray.slice(0, 5).join(', ') + 
           (keywordArray.length > 5 ? '...' : '');
  };

  const handleCompare = async () => {
    if (!channelUrl1 || !channelUrl2) {
      alert('Please enter both YouTube channel URLs');
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    try {
      const [channelId1, channelId2] = await Promise.all([
        getChannelId(channelUrl1),
        getChannelId(channelUrl2)
      ]);

      const [channel1, channel2] = await Promise.all([
        fetchChannelData(channelId1),
        fetchChannelData(channelId2)
      ]);

      setChannelData1(channel1);
      setChannelData2(channel2);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error comparing channels. Please check the URLs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderChannelInfo = (channelData: ChannelData, compareWith: ChannelData) => {
    const metrics = calculateMetrics(channelData);
    const compareMetrics = calculateMetrics(compareWith);

    return (
      <S.ChannelInfo>
        <S.ChannelHeader>
          <S.ChannelLogo src={channelData.snippet.thumbnails.default.url} alt="Channel Logo" />
          <S.ChannelName>{channelData.snippet.title}</S.ChannelName>
        </S.ChannelHeader>

        <S.MetricGroup>
          <S.MetricTitle>General Statistics</S.MetricTitle>
          <S.Metric>
            <span>Subscribers: {formatNumber(metrics.subscribers)}</span>
            <S.ComparisonIndicator type={getComparison(metrics.subscribers, compareMetrics.subscribers)}>
              ({getComparison(metrics.subscribers, compareMetrics.subscribers) === 'higher' ? 'Higher' : 'Lower'})
            </S.ComparisonIndicator>
          </S.Metric>
          <S.Metric>
            <span>Total Views: {formatNumber(metrics.views)}</span>
            <S.ComparisonIndicator type={getComparison(metrics.views, compareMetrics.views)}>
              ({getComparison(metrics.views, compareMetrics.views) === 'higher' ? 'Higher' : 'Lower'})
            </S.ComparisonIndicator>
          </S.Metric>
          <S.Metric>
            <span>Total Videos: {formatNumber(metrics.videos)}</span>
            <S.ComparisonIndicator type={getComparison(metrics.videos, compareMetrics.videos)}>
              ({getComparison(metrics.videos, compareMetrics.videos) === 'higher' ? 'Higher' : 'Lower'})
            </S.ComparisonIndicator>
          </S.Metric>
          <S.Metric>
            <span>Avg. Views/Video: {formatNumber(metrics.avgViews)}</span>
            <S.ComparisonIndicator type={getComparison(metrics.avgViews, compareMetrics.avgViews)}>
              ({getComparison(metrics.avgViews, compareMetrics.avgViews) === 'higher' ? 'Higher' : 'Lower'})
            </S.ComparisonIndicator>
          </S.Metric>
          <S.Metric>
            <span>Views/Subscriber: {metrics.viewsPerSub}</span>
            <S.ComparisonIndicator type={getComparison(metrics.viewsPerSub, compareMetrics.viewsPerSub)}>
              ({getComparison(metrics.viewsPerSub, compareMetrics.viewsPerSub) === 'higher' ? 'Higher' : 'Lower'})
            </S.ComparisonIndicator>
          </S.Metric>
        </S.MetricGroup>

        <S.MetricGroup>
          <S.MetricTitle>Channel Details</S.MetricTitle>
          <S.Metric>Created: {formatDate(channelData.snippet.publishedAt)}</S.Metric>
          <S.Metric>Country: {channelData.snippet.country || 'Not specified'}</S.Metric>
          <S.Metric>Topics: {formatTopics(channelData.topicDetails?.topicCategories)}</S.Metric>
          <S.Metric>Keywords: {formatKeywords(channelData.brandingSettings?.channel?.keywords)}</S.Metric>
        </S.MetricGroup>

        <S.VisitChannel 
          href={`https://www.youtube.com/channel/${channelData.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className='bx bx-link-external'></i>
          Visit Channel
        </S.VisitChannel>
      </S.ChannelInfo>
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Channel Comparer</S.Title>
      </S.Header>

      <S.InputContainer>
        <S.InputGroup>
          <S.SearchInput
            type="text"
            value={channelUrl1}
            onChange={(e) => setChannelUrl1(e.target.value)}
            placeholder="Enter first YouTube channel URL"
            onKeyPress={(e) => e.key === 'Enter' && handleCompare()}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.SearchInput
            type="text"
            value={channelUrl2}
            onChange={(e) => setChannelUrl2(e.target.value)}
            placeholder="Enter second YouTube channel URL"
            onKeyPress={(e) => e.key === 'Enter' && handleCompare()}
          />
        </S.InputGroup>
      </S.InputContainer>

      <S.CompareButton onClick={handleCompare} disabled={isLoading}>
        <i className='bx bx-analyse'></i>
        Compare Channels
      </S.CompareButton>

      <S.ResultsContainer className={showResults ? 'visible' : ''}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '2rem' }}></i>
          </div>
        ) : channelData1 && channelData2 ? (
          <S.ComparisonResults>
            {renderChannelInfo(channelData1, channelData2)}
            {renderChannelInfo(channelData2, channelData1)}
          </S.ComparisonResults>
        ) : null}
      </S.ResultsContainer>
    </S.Container>
  );
};

export default ChannelComparer;