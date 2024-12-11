// src/pages/Tools/components/SubscribeLinkGenerator/SubscribeLinkGenerator.tsx

import React, { useState } from 'react';
import * as S from './styles';

interface ChannelInfo {
  title: string;
  thumbnail: string;
  subscriberCount: string;
  customUrl: string;
}

const SubscribeLinkGeneratorComponent: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const extractChannelHandle = (url: string): string | null => {
    // If it's already just a handle
    if (url.match(/^@?[A-Za-z0-9_-]+$/)) {
      return url.startsWith('@') ? url.substring(1) : url;
    }

    // Handle various YouTube channel URL formats
    const patterns = [
      /youtube\.com\/@([^/?]+)/,        // Handle @username format
      /youtube\.com\/channel\/([^/?]+)/, // Handle channel ID format
      /youtube\.com\/c\/([^/?]+)/,       // Handle custom URL format
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const getSubscribeLink = (handle: string) => {
    return `https://www.youtube.com/@${handle}?sub_confirmation=1`;
  };

  const fetchChannelInfo = async (handle: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    try {
      // First try to get channel by handle
      let response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?` +
        `part=snippet,statistics&` +
        `forHandle=${handle}&` +
        `key=${API_KEY}`
      );

      let data = await response.json();

      // If no results, try searching by handle
      if (!data.items || data.items.length === 0) {
        response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&` +
          `q=@${handle}&` +
          `type=channel&` +
          `key=${API_KEY}`
        );
        
        data = await response.json();
        
        if (!data.items || data.items.length === 0) {
          throw new Error('Channel not found');
        }

        // Get full channel info using channel ID
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?` +
          `part=snippet,statistics&` +
          `id=${data.items[0].id.channelId}&` +
          `key=${API_KEY}`
        );
        
        data = await channelResponse.json();
      }

      const channel = data.items[0];
      return {
        title: channel.snippet.title,
        thumbnail: channel.snippet.thumbnails.medium.url,
        subscriberCount: parseInt(channel.statistics.subscriberCount).toLocaleString(),
        customUrl: handle
      };
    } catch (error) {
      console.error('Error fetching channel:', error);
      throw new Error('Failed to fetch channel information');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const handle = extractChannelHandle(url);
    
    if (!handle) {
      alert('Please enter a valid YouTube channel URL');
      return;
    }

    setIsLoading(true);
    setChannelInfo(null);
    setIsCopied(false);

    try {
      const info = await fetchChannelInfo(handle);
      setChannelInfo(info);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to fetch channel information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (subscribeLink: string) => {
    try {
      await navigator.clipboard.writeText(subscribeLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Subscribe Link Generator</S.Title>
      </S.Header>

      <S.SearchContainer>
        <form onSubmit={handleSubmit}>
          <S.SearchBar>
            <S.SearchInput
              type="text"
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              placeholder="Paste YouTube channel URL here"
              disabled={isLoading}
            />
            <S.SearchButton type="submit" disabled={isLoading}>
              <i className='bx bx-search'></i>
            </S.SearchButton>
          </S.SearchBar>
        </form>

        {isLoading && (
          <S.Loading>
            <S.LoadingText>Loading channel information...</S.LoadingText>
            <S.Spinner />
          </S.Loading>
        )}

        {channelInfo && (
          <S.Card>
            <S.ChannelHeader>
              <S.ChannelThumbnail src={channelInfo.thumbnail} alt={channelInfo.title} />
              <S.ChannelInfo>
                <S.ChannelTitle>{channelInfo.title}</S.ChannelTitle>
                <S.ChannelStats>{channelInfo.subscriberCount} subscribers</S.ChannelStats>
              </S.ChannelInfo>
            </S.ChannelHeader>
            
            <S.LinkContainer>
              <S.Link>{getSubscribeLink(channelInfo.customUrl)}</S.Link>
              <S.CopyButton 
                onClick={() => handleCopy(getSubscribeLink(channelInfo.customUrl))}
                success={isCopied}
              >
                {isCopied ? (
                  <><i className='bx bx-check'></i> Copied!</>
                ) : (
                  <><i className='bx bx-copy'></i> Copy Link</>
                )}
              </S.CopyButton>
            </S.LinkContainer>
          </S.Card>
        )}
      </S.SearchContainer>
    </S.Container>
  );
};

export const SubscribeLinkGenerator = SubscribeLinkGeneratorComponent;