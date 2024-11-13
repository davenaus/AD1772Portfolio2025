import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './styles';

interface ThumbnailData {
  url: string;
  title: string;
}

export const ThumbnailDownloader: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [thumbnailData, setThumbnailData] = useState<ThumbnailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (videoId) {
      const videoUrl = `https://youtube.com/watch?v=${videoId}`;
      setUrl(videoUrl);
      handleAnalyze(videoId);
    }
  }, [videoId]);

  const extractVideoId = (url: string): string | null => {
    // Handle direct video ID
    if (url.match(/^[A-Za-z0-9_-]{11}$/)) {
      return url;
    }

    const patterns = [
      /v=([^&]+)/,          // Regular youtube.com/watch?v=ID
      /youtu\.be\/([^?]+)/, // youtu.be/ID
      /embed\/([^?]+)/,     // youtube.com/embed/ID
      /shorts\/([^?]+)/     // youtube.com/shorts/ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      alert('Please enter a YouTube video URL');
      return;
    }

    const extractedId = extractVideoId(url);
    if (extractedId) {
      navigate(`/tools/thumbnail-downloader/${extractedId}`);
    } else {
      alert('Invalid YouTube URL. Please check the URL and try again.');
    }
  };

  const handleAnalyze = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await fetchThumbnail(id);
      setThumbnailData(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch thumbnail. Please try again.');
      setThumbnailData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchThumbnail = async (videoId: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `id=${videoId}&` +
        `key=${API_KEY}&` +
        `part=snippet`
      );
      
      const data = await response.json();
      
      if (!data.items?.[0]) {
        throw new Error('Video not found');
      }

      const thumbnail = data.items[0].snippet;
      const thumbnailUrl = thumbnail.thumbnails.maxres?.url || 
                          thumbnail.thumbnails.high?.url ||
                          thumbnail.thumbnails.standard?.url;

      return {
        url: thumbnailUrl,
        title: thumbnail.title
      };
    } catch (error) {
      console.error('Error fetching thumbnail:', error);
      throw error;
    }
  };

  const downloadThumbnail = async () => {
    if (!thumbnailData) return;
  
    setIsDownloading(true);
    try {
      const image = await fetch(thumbnailData.url);
      const imageBlob = await image.blob();
      const imageURL = URL.createObjectURL(imageBlob);
      
      const cleanTitle = thumbnailData.title
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()
        .substring(0, 50);
  
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = `${cleanTitle}_thumbnail.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(imageURL);
    } catch (error) {
      console.error('Error downloading thumbnail:', error);
      // Try alternative download method
      window.open(thumbnailData.url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as React.FormEvent);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Thumbnail Downloader</S.Title>
      </S.Header>

      <S.SearchContainer>
        <form onSubmit={handleSearch}>
          <S.SearchBar>
            <S.SearchInput
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter YouTube Video Link"
            />
            <S.SearchButton type="submit" disabled={isLoading}>
              <i className='bx bx-search'></i>
            </S.SearchButton>
          </S.SearchBar>
        </form>

        <S.ThumbnailContainer visible={!!thumbnailData}>
          {thumbnailData && (
            <>
              <S.ThumbnailImage 
                src={thumbnailData.url} 
                alt={thumbnailData.title} 
              />
              <S.DownloadButton 
                onClick={downloadThumbnail}
                disabled={isDownloading}
              >
                <i className='bx bx-download'></i>
                {isDownloading ? 'Downloading...' : 'Download Thumbnail'}
              </S.DownloadButton>
            </>
          )}
        </S.ThumbnailContainer>
      </S.SearchContainer>
    </S.Container>
  );
};

export default ThumbnailDownloader;