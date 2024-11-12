// src/pages/Portfolio/styles.ts
import styled, { keyframes } from 'styled-components';








export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.blue11};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

export const VideoGrid = styled.div`
    padding: 2rem 0rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const VideoCard = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.blue4};
    
    .video-overlay {
      opacity: 1;
    }
  }
`;

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
  padding: 2rem;
  
  i {
    font-size: 3rem;
    color: white;
  }
`;

export const VideoInfo = styled.div`
  padding: 1.5rem;
`;

export const VideoTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.5rem;
`;

export const VideoDescription = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.9rem;
  line-height: 1.6;
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
  padding: 2rem;
`;

export const ModalContent = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
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
  
  &:hover {
    color: ${({ theme }) => theme.colors.blue11};
  }
`;

export const Categories = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.blue2};
  position: sticky;
  top: 0;
  z-index: 10;
  border-radius: 16px;
`;

export const CategoryButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: ${({ theme, active }) => active ? theme.colors.blue4 : theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue9};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
      font-family: 'Poppins', sans-serif;

  &:hover {
    background: ${({ theme }) => theme.colors.blue4};
  }
`;








const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const Hero = styled.div`
  height: 80vh; // Reduced from 100vh
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.blue1};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, ${({ theme }) => theme.colors.blue1}, transparent);
    pointer-events: none;
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
    background: rgba(0, 0, 0, 0.3); // Optional overlay to help text readability
  }

  iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%; // Makes the video wider to crop out letterbox
    height: 150vh; // Makes the video taller to ensure full coverage
    pointer-events: none;
    opacity: 0.6;
  }
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

// ... rest of your existing styles remain the same ...


export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  animation: ${fadeIn} 1s ease forwards;
`;