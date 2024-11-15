// src/pages/Portfolio/styles.ts
import styled, { keyframes } from 'styled-components';



















const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;





export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.blue11};
  animation: ${bounce} 2s infinite;
  cursor: pointer;

  i {
    font-size: 2rem;
  }

  span {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;
















export const HeroVideo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); // Slightly darker overlay for better text contrast
  }

  iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 177.77777778vh; // 16:9 aspect ratio
    height: 56.25vw; // 16:9 aspect ratio
    min-width: 100%;
    min-height: 100%;
    pointer-events: none;
    opacity: 0.6;

    @media (max-width: 768px) {
      width: 300%; // Wider on mobile to ensure full coverage
      height: 100%;
    }
  }
`;




















export const VideoModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
  aspect-ratio: 16/9;

  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
  }
`;

export const ResponsiveIframe = styled.iframe`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -3rem;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    top: -2.5rem;
    right: 0.5rem;
    font-size: 1.5rem;
  }
`;




























export const Categories = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
    position: sticky;
    margin-top: 16px;
    top: 0;
    z-index: 10;
    border-radius: 12px;
    width: 100%;
    max-width: 100%;
  
  @media (max-width: 768px) {
    background: ${({ theme }) => theme.colors.blue1};
    margin: 0;
    border-radius: 0;
    padding: 0.5rem 0;
  }
`;

export const CategoriesScroll = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 1rem 1rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  border-radius: 6px;
  width: 100%;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.25rem 1rem;
    gap: 0.5rem;
  }
`;

export const CategoryButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background: ${({ theme, active }) => active ? theme.colors.blue4 : theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue9};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  font-size: 0.9rem;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 4px;
  }
`;

// Hero section adjustments
export const Hero = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.blue1};
  
  @media (max-width: 768px) {
    height: 50vh;
    min-height: 300px;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem;
    max-width: 100%;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    padding: 0 1rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.blue11};
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
`;

export const AnalyticsButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.blue3};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
  border: .5px solid white;
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    margin: 0 1rem;
  }
`;



























export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
`;

export const VideoGrid = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

export const VideoCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  transition: all 0.3s ease;
  cursor: pointer;

  @media (max-width: 768px) {
    border-radius: 8px;
    border-width: 0.5px;
  }
`;

export const VideoInfo = styled.div`
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const VideoTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }
`;

export const VideoDescription = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.9rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Mobile Filter Components
export const MobileFilter = styled.div`
  position: relative;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.blue1};
  z-index: 20;
  margin-top: 6px;
`;

export const FilterButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.blue3};
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.blue11};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;

  i {
    font-size: 1.2rem;
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0.75rem;
  right: 0.75rem;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 8px;
  margin-top: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
















export const FilterOption = styled.button<{ active: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme, active }) => active ? theme.colors.blue4 : 'transparent'};
  border: none;
  color: ${({ theme }) => theme.colors.blue11};
  text-align: left;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.blue3};
  }

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.blue3};
  }
`;

// Existing styles with mobile optimization...
export const VideoThumbnail = styled.div<{ bgImage: string }>`
  width: 100%;
  aspect-ratio: 16/9;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
`;

export const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  i {
    font-size: 2rem;
    color: white;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;