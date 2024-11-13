// src/pages/Portfolio/Portfolio.tsx
import React, { useState, useEffect, useCallback } from 'react';
import * as S from './styles';
import { getPortfolioVideos, getUniqueTags } from '../../services/supabaseService';
import { youtubeService } from '../../services/youtubeService';
import type { PortfolioVideo } from '../../types/portfolio';

export const Portfolio: React.FC = () => {
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch videos from Supabase
        const portfolioVideos = await getPortfolioVideos();
        
        // Fetch YouTube details for each video
        const videosWithDetails = await Promise.all(
          portfolioVideos.map(async (video) => {
            const details = await youtubeService.getVideoDetails(video.video_id);
            return {
              ...video,
              title: details?.title,
              thumbnail: details?.thumbnail
            };
          })
        );
        
        setVideos(videosWithDetails);
        
        // Fetch unique tags
        const tags = await getUniqueTags();
        setCategories(['All', ...tags]);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(video => video.tag === selectedCategory);

  const handleVideoClick = useCallback((video: PortfolioVideo) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  const handleScrollDown = () => {
    const categoriesSection = document.querySelector('#categories');
    categoriesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <S.Container>
      <S.Hero>
        <S.HeroVideo>
        <iframe
  src="https://www.youtube.com/embed/QPRYfLCxA1g?autoplay=1&mute=1&loop=1&playlist=QPRYfLCxA1g&controls=0&showinfo=0&modestbranding=1&rel=0"
  title="Showreel"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
        </S.HeroVideo>
        <S.HeroContent>
  <S.HeroTitle>Professional Video Editor</S.HeroTitle>
  <S.HeroSubtitle>
    Crafting visual stories that inspire and engage.
  </S.HeroSubtitle>
  <S.AnalyticsButton 
    href="/tools/playlist-analyzer/PLDZjxSO4MSJoA638nQvykQaevGgc-sV2B"
  >
    <i className='bx bx-stats'></i>
    View My Complete Portfolio Analytics
  </S.AnalyticsButton>
</S.HeroContent>
      </S.Hero>

      <S.Categories id="categories">
        {categories.map(category => (
          <S.CategoryButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </S.CategoryButton>
        ))}
      </S.Categories>

      <S.VideoGrid>
        {filteredVideos.map(video => (
          <S.VideoCard key={video.id} onClick={() => handleVideoClick(video)}>
            <S.VideoThumbnail bgImage={video.thumbnail || ''} />
            <S.VideoOverlay className="video-overlay">
              <i className='bx bx-play-circle'></i>
            </S.VideoOverlay>
            <S.VideoInfo>
              <S.VideoTitle>{video.title || 'Loading...'}</S.VideoTitle>
              <S.VideoDescription>{video.description}</S.VideoDescription>
            </S.VideoInfo>
          </S.VideoCard>
        ))}
      </S.VideoGrid>

      <S.VideoModal isOpen={!!selectedVideo}>
        {selectedVideo && (
          <S.ModalContent>
            <S.CloseButton onClick={handleCloseModal}>
              <i className='bx bx-x'></i>
            </S.CloseButton>
            <iframe
              width="100%"
              height="675"
              src={`https://www.youtube.com/embed/${selectedVideo.video_id}`}
              title={selectedVideo.title || ''}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </S.ModalContent>
        )}
      </S.VideoModal>
    </S.Container>
  );
};

export default Portfolio;