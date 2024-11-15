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
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioVideos = await getPortfolioVideos();
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


  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
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
            {isMobile ? 'View Analytics' : 'View My Complete Portfolio Analytics'}
          </S.AnalyticsButton>
        </S.HeroContent>
       </S.Hero>

      {isMobile ? (
        <S.MobileFilter>
          <S.FilterButton onClick={handleFilterClick}>
            <span>{selectedCategory}</span>
            <i className='bx bx-chevron-down'></i>
          </S.FilterButton>
          {isFilterOpen && (
            <S.FilterDropdown>
              {categories.map(category => (
                <S.FilterOption
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  active={selectedCategory === category}
                >
                  {category}
                </S.FilterOption>
              ))}
            </S.FilterDropdown>
          )}
        </S.MobileFilter>
      ) : (
        <S.Categories id="categories">
          <S.CategoriesScroll>
            {categories.map(category => (
              <S.CategoryButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </S.CategoryButton>
            ))}
          </S.CategoriesScroll>
        </S.Categories>
      )}

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
            <S.ResponsiveIframe
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