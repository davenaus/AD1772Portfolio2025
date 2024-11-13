import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './styles';

export const CommentDownloader: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [comments, setComments] = useState<string[]>([]);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const MAX_RESULTS = 100;
  const MAX_PAGES = 10;

  useEffect(() => {
    if (videoId) {
      const videoUrl = `https://youtube.com/watch?v=${videoId}`;
      setVideoUrl(videoUrl);
      handleDownload(videoId);
    }
  }, [videoId]);

  const extractVideoId = (url: string): string | false => {
    // Regular video URL pattern
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    }

    // Shorts URL pattern
    const shortsRegExp = /^.*(youtube.com\/shorts\/)([^#&?]*).*/;
    const shortsMatch = url.match(shortsRegExp);
    if (shortsMatch && shortsMatch[2]) {
      return shortsMatch[2];
    }

    // Direct video ID
    if (url.match(/^[A-Za-z0-9_-]{11}$/)) {
      return url;
    }

    return false;
  };

  const handleSearch = () => {
    const extractedId = extractVideoId(videoUrl);
    if (extractedId) {
      navigate(`/tools/comment-downloader/${extractedId}`);
    } else {
      setStatus('Invalid YouTube URL. Please enter a valid YouTube video URL.');
    }
  };

  const handleDownload = async (id: string) => {
    setIsLoading(true);
    setShowResults(false);
    setStatus('Fetching comments...');
    const newComments: string[] = [];

    try {
      let nextPageToken = '';
      for (let i = 0; i < MAX_PAGES; i++) {
        const url = `https://www.googleapis.com/youtube/v3/commentThreads?` +
                   `part=snippet&videoId=${id}&key=${API_KEY}&` +
                   `maxResults=${MAX_RESULTS}&pageToken=${nextPageToken}`;
        
        setStatus(`Fetching comments... (Page ${i + 1})`);

        const response = await fetch(url);
        const data = await response.json();

        if (response.status !== 200) {
          throw new Error(`API Error (${response.status}): ${data.error.message}`);
        }

        const pageComments = data.items.map(
          (item: any) => item.snippet.topLevelComment.snippet.textDisplay
        );
        newComments.push(...pageComments);

        if (!data.nextPageToken) break;
        nextPageToken = data.nextPageToken;
      }

      setComments(newComments);
      setStatus(`Fetched ${newComments.length} comments.`);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'Failed to fetch comments'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadComments = () => {
    const blob = new Blob([comments.join('\n\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'youtube_comments.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Comment Downloader</S.Title>
      </S.Header>

      <S.Card>
        <S.SearchBar>
          <S.SearchInput
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <S.SearchButton onClick={handleSearch} disabled={isLoading}>
            <i className='bx bx-download'></i>
          </S.SearchButton>
        </S.SearchBar>

        {status && <S.Status>{status}</S.Status>}

        <S.ResultsContainer className={showResults ? 'visible' : ''}>
          <h2>Comments Downloaded Successfully!</h2>
          <p>Your comments are ready for download. You can use these comments with various AI chatbots for analysis or insights.</p>
          
          <S.DownloadButton onClick={downloadComments} disabled={comments.length === 0}>
            <i className='bx bxs-download'></i>
            Download Comments
          </S.DownloadButton>

          <S.AILinks>
            <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer">
              <S.AIButton color="#8eca8e">ChatGPT</S.AIButton>
            </a>
            <a href="https://gemini.google.com/chat" target="_blank" rel="noopener noreferrer">
              <S.AIButton color="#ADD8E6">Gemini</S.AIButton>
            </a>
            <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer">
              <S.AIButton color="#ebb859">Claude</S.AIButton>
            </a>
          </S.AILinks>
        </S.ResultsContainer>
      </S.Card>
    </S.Container>
  );
};

export default CommentDownloader;