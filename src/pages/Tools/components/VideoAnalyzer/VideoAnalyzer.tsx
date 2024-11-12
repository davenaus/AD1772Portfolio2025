// src/pages/Tools/components/VideoAnalyzer/VideoAnalyzer.tsx
import React, { useState } from 'react';
import moment from 'moment';
import * as S from './styles';

interface VideoAnalysis {
  views: number;
  likes: number;
  comments: number;
  postedDate: string;
  engagementRate: number;
  subscribers: number;
  estimatedRevenue: {
    min: number;
    max: number;
  };
  tags: string[];
  category: string;
  videoLength: number;
  achievements: string[];
  drawbacks: string[];
  flaggedWords: string[];
}

const cpmRates = {
  'Film & Animation': { min: 3, max: 7 },
  'Autos & Vehicles': { min: 2, max: 4 },
  'Music': { min: 3, max: 5 },
  'Pets & Animals': { min: 2, max: 4 },
  'Sports': { min: 3, max: 5 },
  'Travel & Events': { min: 3, max: 7 },
  'Gaming': { min: 3, max: 7 },
  'People & Blogs': { min: 1, max: 3 },
  'Comedy': { min: 3, max: 5 },
  'Entertainment': { min: 2, max: 4 },
  'News & Politics': { min: 5, max: 11 },
  'Howto & Style': { min: 4, max: 8 },
  'Education': { min: 3, max: 9 },
  'Science & Technology': { min: 5, max: 11 },
  'Nonprofits & Activism': { min: 1, max: 3 }
};

export const VideoAnalyzer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<any>(null);
  const [channelData, setChannelData] = useState<any>(null);
  const [analysisResults, setAnalysisResults] = useState<VideoAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const extractVideoId = (url: string): string | null => {
    const regExpVideo = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const regExpShorts = /^.*(youtu.be\/|shorts\/)([^#\&\?]*).*/;
    
    const matchVideo = url.match(regExpVideo);
    const matchShorts = url.match(regExpShorts);

    if (matchVideo && matchVideo[2].length === 11) {
      return matchVideo[2];
    } else if (matchShorts && matchShorts[2].length === 11) {
      return matchShorts[2];
    }
    return null;
  };

  const handleAnalyze = async () => {
    if (!videoUrl.trim()) {
      alert('Please enter a YouTube video URL');
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    try {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const video = await fetchVideoData(videoId);
      const channel = await fetchChannelData(video.snippet.channelId);
      
      setVideoData(video);
      setChannelData(channel);
      
      const analysis = await performVideoAnalysis(video, channel);
      setAnalysisResults(analysis);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while analyzing the video');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideoData = async (videoId: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?` +
      `part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
    );
    const data = await response.json();
    if (!data.items?.[0]) throw new Error('Video not found');
    return data.items[0];
  };

  const fetchChannelData = async (channelId: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?` +
      `part=snippet,statistics&id=${channelId}&key=${API_KEY}`
    );
    const data = await response.json();
    if (!data.items?.[0]) throw new Error('Channel not found');
    return data.items[0];
  };

  const fetchCategoryName = async (categoryId: string): Promise<string> => {
    if (!categoryId) return 'Unknown';
    try {
      const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videoCategories?` +
        `part=snippet&id=${categoryId}&key=${API_KEY}`
      );
      const data = await response.json();
      return data.items[0].snippet.title;
    } catch (error) {
      console.error('Error fetching category name:', error);
      return 'Unknown';
    }
  };

  // Continuing VideoAnalyzer.tsx...

  const performVideoAnalysis = async (videoData: any, channelData: any): Promise<VideoAnalysis> => {
    const category = await fetchCategoryName(videoData.snippet.categoryId);
    const { achievements, drawbacks, flaggedWords } = analyzeVideo(videoData);
    const revenue = calculateEstimatedRevenue(videoData, category);

    return {
      views: parseInt(videoData.statistics.viewCount) || 0,
      likes: parseInt(videoData.statistics.likeCount) || 0,
      comments: parseInt(videoData.statistics.commentCount) || 0,
      postedDate: moment(videoData.snippet.publishedAt).format('YYYY-MM-DD'),
      engagementRate: ((parseInt(videoData.statistics.likeCount) || 0) + 
                      (parseInt(videoData.statistics.commentCount) || 0)) / 
                      (parseInt(videoData.statistics.viewCount) || 1),
      subscribers: parseInt(channelData.statistics.subscriberCount) || 0,
      estimatedRevenue: revenue,
      tags: videoData.snippet.tags || [],
      category,
      videoLength: moment.duration(videoData.contentDetails.duration).asSeconds(),
      achievements,
      drawbacks,
      flaggedWords
    };
  };

  const calculateEstimatedRevenue = (videoData: any, category: string) => {
    const views = parseInt(videoData.statistics.viewCount) || 0;
    const duration = moment.duration(videoData.contentDetails.duration).asMinutes();
    const likes = parseInt(videoData.statistics.likeCount) || 0;
    const comments = parseInt(videoData.statistics.commentCount) || 0;

    const cpmRange = cpmRates[category as keyof typeof cpmRates] || { min: 2, max: 4 };

    let adFactor = 1;
    if (duration < 8) {
      adFactor -= (8 - duration) * 0.1;
    }

    const engagementRate = (likes + comments) / views;
    const engagementFactor = 1 + (engagementRate > 0.05 ? 0.2 : 0);
    const viewFactor = Math.log10(views) / 10;

    return {
      min: ((views / 1000) * cpmRange.min * adFactor * engagementFactor * (1 + viewFactor)),
      max: ((views / 1000) * cpmRange.max * adFactor * engagementFactor * (1 + viewFactor))
    };
  };

  const analyzeVideo = (videoData: any) => {
    const achievements: string[] = [];
    const drawbacks: string[] = [];
    const flaggedWords: string[] = [];

    const title = videoData.snippet.title || '';
    const description = videoData.snippet.description || '';
    const tags = videoData.snippet.tags || [];
    const duration = moment.duration(videoData.contentDetails.duration).asSeconds();

    // Title analysis
    if (title.length >= 20 && title.length <= 60) {
      achievements.push('Title length is optimal (20-60 characters)');
    } else {
      drawbacks.push('Title length is not optimal');
    }

    // Description analysis
    if (description.length >= 200 && description.length <= 4000) {
      achievements.push('Description length is optimal (200-4,000 characters)');
    } else {
      drawbacks.push('Description length is not optimal');
    }

    // Tags analysis
    if (tags.length >= 20) {
      achievements.push('Uses 20 or more tags');
    } else {
      drawbacks.push('Uses less than 20 tags');
    }

    // Comments check
    if (videoData.statistics.commentCount !== undefined) {
      achievements.push('Comments are enabled');
    } else {
      drawbacks.push('Comments are disabled');
    }

    // Video length check
    if (duration > 480) {
      achievements.push('Video is over 8 minutes long');
    } else {
      drawbacks.push('Video is under 8 minutes long');
    }

    // Video quality check
    if (videoData.contentDetails.definition === 'hd') {
      achievements.push('Video is in HD quality');
    } else {
      drawbacks.push('Video is not in HD quality');
    }

    // Description links check
    if (description.includes('http') || description.includes('www')) {
      achievements.push('Contains links in description');
    } else {
      drawbacks.push('No links in description');
    }

    return { achievements, drawbacks, flaggedWords };
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Video Analyzer</S.Title>
      </S.Header>

      <S.SearchContainer>
        <S.SearchBar>
          <S.SearchInput
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
          />
          <S.SearchButton onClick={handleAnalyze} disabled={isLoading}>
            <i className='bx bx-search'></i>
          </S.SearchButton>
        </S.SearchBar>
      </S.SearchContainer>

      <S.ResultsContainer className={showResults ? 'visible' : ''}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '2rem' }}></i>
          </div>
        ) : videoData && channelData && analysisResults ? (
          <>
            <S.VideoInfo>
              <S.ThumbnailContainer>
                <S.Thumbnail
                  src={videoData.snippet.thumbnails.maxres?.url || videoData.snippet.thumbnails.high.url}
                  alt={videoData.snippet.title}
                />
              </S.ThumbnailContainer>
              <S.VideoDetails>
                <S.VideoTitle>{videoData.snippet.title}</S.VideoTitle>
                <S.ChannelInfo>
                  <S.ChannelLogo
                    src={channelData.snippet.thumbnails.default.url}
                    alt={channelData.snippet.title}
                  />
                  <S.ChannelText>
                    <S.ChannelName>{channelData.snippet.title}</S.ChannelName>
                    <S.SubscriberCount>
                      {parseInt(channelData.statistics.subscriberCount).toLocaleString()} subscribers
                    </S.SubscriberCount>
                  </S.ChannelText>
                </S.ChannelInfo>
              </S.VideoDetails>
            </S.VideoInfo>

            <S.MetricsGrid>
              <S.MetricBox>
                <S.SectionTitle>Video Metrics</S.SectionTitle>
                <S.Achievement>Views: {analysisResults.views.toLocaleString()}</S.Achievement>
                <S.Achievement>Likes: {analysisResults.likes.toLocaleString()}</S.Achievement>
                <S.Achievement>Comments: {analysisResults.comments.toLocaleString()}</S.Achievement>
                <S.Achievement>Posted: {analysisResults.postedDate}</S.Achievement>
              </S.MetricBox>

              <S.MetricBox>
                <S.SectionTitle>Engagement</S.SectionTitle>
                <S.Achievement>
                  Engagement Rate: {(analysisResults.engagementRate * 100).toFixed(2)}%
                </S.Achievement>
                <S.Achievement>
                  Est. Revenue: ${analysisResults.estimatedRevenue.min.toFixed(2)} - ${analysisResults.estimatedRevenue.max.toFixed(2)}
                </S.Achievement>
              </S.MetricBox>
            </S.MetricsGrid>

            <S.Section>
              <S.SectionTitle>Achievements</S.SectionTitle>
              {analysisResults.achievements.map((achievement, index) => (
                <S.Achievement key={index}>🏆 {achievement}</S.Achievement>
              ))}
            </S.Section>

            <S.Section>
              <S.SectionTitle>Areas for Improvement</S.SectionTitle>
              {analysisResults.drawbacks.map((drawback, index) => (
                <S.Drawback key={index}>⚠️ {drawback}</S.Drawback>
              ))}
            </S.Section>

            {analysisResults.tags.length > 0 && (
              <S.Section>
                <S.SectionTitle>Tags</S.SectionTitle>
                <S.TagContainer>
                  {analysisResults.tags.map((tag, index) => (
                    <S.Tag key={index}>{tag}</S.Tag>
                  ))}
                </S.TagContainer>
              </S.Section>
            )}
          </>
        ) : null}
      </S.ResultsContainer>
    </S.Container>
  );
};

export default VideoAnalyzer;