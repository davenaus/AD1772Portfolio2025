// src/pages/Tools/components/CommentPicker/CommentPicker.tsx

import React, { useState } from 'react';
import * as S from './styles';

declare const confetti: {
  (options: {
    particleCount?: number;
    angle?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
  }): void;
};

interface Comment {
  name: string;
  comment: string;
  timestamp: string;
  avatar: string;
}

const CommentPickerComponent: React.FC = () => {
  const [url, setUrl] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [winner, setWinner] = useState<Comment | null>(null);
  const [stats, setStats] = useState('');
  const [animatingName, setAnimatingName] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [totalComments, setTotalComments] = useState(0);

  const extractVideoId = (url: string): string | null => {
    if (url.match(/^[A-Za-z0-9_-]{11}$/)) {
      return url;
    }

    const patterns = [
      /v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /embed\/([^?]+)/,
      /shorts\/([^?]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const formatTimestamp = (timestamp: string): string => {
    const commentDate = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - commentDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  };

  const fetchComments = async (videoId: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const API_ENDPOINT = 'https://www.googleapis.com/youtube/v3/commentThreads';
    let allComments: Comment[] = [];
    let nextPageToken = '';
    const MAX_PAGES = 10;
    let totalPages = 0;

    try {
      do {
        const response = await fetch(
          `${API_ENDPOINT}?part=snippet&videoId=${videoId}&maxResults=100&key=${API_KEY}${
            nextPageToken ? '&pageToken=' + nextPageToken : ''
          }`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();
        
        if (!data.items || data.items.length === 0) break;

        const comments = data.items.map((item: any) => ({
          name: item.snippet.topLevelComment.snippet.authorDisplayName,
          comment: item.snippet.topLevelComment.snippet.textDisplay,
          timestamp: formatTimestamp(item.snippet.topLevelComment.snippet.publishedAt),
          avatar: item.snippet.topLevelComment.snippet.authorProfileImageUrl || '/api/placeholder/64/64'
        }));

        allComments = [...allComments, ...comments];
        nextPageToken = data.nextPageToken;
        totalPages++;

        if (!nextPageToken || totalPages >= MAX_PAGES) break;

      } while (nextPageToken);

      return allComments;

    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const animateSelection = async (comments: Comment[]) => {
    setShowResults(false);
    setShowAnimation(true);
    
    const duration = 4000;
    const startInterval = 50;
    const endInterval = 300;
    const startTime = Date.now();
    const totalNames = Math.min(comments.length, 100);
    const usedIndices = new Set();
  
    // Select winner ahead of time
    const selectedWinner = comments[Math.floor(Math.random() * comments.length)];
  
    return new Promise<void>((resolve) => {
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
  
        if (progress < 1) {
          const currentInterval = startInterval + (endInterval - startInterval) * progress;
          let randomIndex;
          
          do {
            randomIndex = Math.floor(Math.random() * totalNames);
          } while (usedIndices.has(randomIndex));
  
          usedIndices.add(randomIndex);
          if (usedIndices.size === totalNames) {
            usedIndices.clear();
          }
  
          setAnimatingName(comments[randomIndex].name);
          setTimeout(() => requestAnimationFrame(animate), currentInterval);
        } else {
          setAnimatingName('');
          setShowAnimation(false);
          // Set winner and show results immediately after animation
          setWinner(selectedWinner);
          setShowResults(true);
          fireConfetti();
          resolve();
        }
      };
      animate();
    });
  };
  
  // Simplify pickWinner to just return the promise
  const pickWinner = () => Promise.resolve();
  
  // And modify handleSubmit to remove the separate pickWinner call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      alert('Please enter a valid YouTube URL');
      return;
    }
  
    // Reset states
    setWinner(null);
    setShowResults(false);
    setShowAnimation(false);
    setAnimatingName('');
    
    // Start loading
    setShowLoader(true);
    setIsLoading(true);
    
    try {
      const fetchedComments = await fetchComments(videoId);
      
      if (fetchedComments.length === 0) {
        throw new Error('No comments found');
      }
  
      setComments(fetchedComments);
      setTotalComments(fetchedComments.length);
      
      setShowLoader(false);
      setIsLoading(false);
      
      // Just call animateSelection which now handles everything
      await animateSelection(fetchedComments);
      
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to load comments');
      setShowLoader(false);
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>YouTube Comment Picker</S.Title>
      </S.Header>

      <S.SearchContainer>
        <form onSubmit={handleSubmit}>
          <S.SearchBar>
            <S.SearchInput
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube video URL here"
              disabled={isLoading}
            />
            <S.SearchButton type="submit" disabled={isLoading}>
              <i className='bx bx-gift'></i>
            </S.SearchButton>
          </S.SearchBar>
        </form>

        {showLoader && (
          <S.Loading>
            <S.LoadingText>Loading comments...</S.LoadingText>
            <S.Spinner />
          </S.Loading>
        )}

        {showAnimation && animatingName && (
          <S.SelectingAnimation>
            {animatingName}
          </S.SelectingAnimation>
        )}

        {showResults && winner && (
          <>
            <S.Results>
              <S.Winner>
                <S.WinnerHeader>
                  <S.WinnerAvatar src={winner.avatar} alt="Winner avatar" />
                  <S.WinnerInfo>
                    <S.WinnerLabel>🎉 Winner!</S.WinnerLabel>
                    <S.WinnerName>{winner.name}</S.WinnerName>
                    <S.WinnerTimestamp>{winner.timestamp}</S.WinnerTimestamp>
                  </S.WinnerInfo>
                </S.WinnerHeader>
                <S.WinnerComment>{winner.comment}</S.WinnerComment>
                <S.ActionButtons>
                <S.ActionButton onClick={async () => {
  setShowResults(false);
  setShowAnimation(true);
  await animateSelection(comments);
}}>
                    <i className='bx bx-refresh'></i>
                    Reroll Winner
                  </S.ActionButton>
                  <S.ActionButton onClick={() => {
                    setUrl('');
                    setComments([]);
                    setWinner(null);
                    setShowResults(false);
                    setShowAnimation(false);
                    setAnimatingName('');
                    setTotalComments(0);
                  }}>
                    <i className='bx bx-reset'></i>
                    Start Over
                  </S.ActionButton>
                </S.ActionButtons>
              </S.Winner>
            </S.Results>
          </>
        )}
      </S.SearchContainer>
    </S.Container>
  );
};

export const CommentPicker = CommentPickerComponent;