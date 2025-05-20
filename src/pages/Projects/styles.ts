import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--project4) 0%, var(--project6) 100%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Loading animation
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 1.1rem;
  gap: 1.5rem;
`;

export const LoadingCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.blue3};
  border-top: 3px solid var(--project4);
  border-radius: 50%;
  animation: ${spinAnimation} 1.2s linear infinite;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.blue11};
  text-align: center;
  font-size: 1.1rem;
`;


export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ProjectCard = styled.a<{ accentColor: string }>`
  position: relative;
  background: ${({ theme }) => theme.colors.blue2};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  
  &:hover {
    transform: translateY(-3px);
    border-color: ${props => props.accentColor};
    box-shadow: 0 15px 35px ${props => `${props.accentColor}20`};
    
    & > div:first-child > div:first-child {
      transform: scale(1.05);
    }
  }
  
  &.project-tile.visible {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ProjectImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 390px; 
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 250px; /* Slightly shorter on mobile but still tall enough */
  }
`;

export const ProjectImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;
`;

export const ColorOverlay = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, ${props => props.color}90 0%, transparent 100%);
  mix-blend-mode: multiply;
  opacity: 0.5;
`;

export const FeaturedBadge = styled.div`
  position: absolute;
  top: 16px;
  right: -30px;
  background: white;
  color: #333;
  padding: 0.25rem 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  transform: rotate(45deg);
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const ProjectContent = styled.div`
  padding: 2rem; /* Increased padding for better balance with taller images */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const CategoryTag = styled.div<{ color: string }>`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  background: ${props => `${props.color}15`};
  color: ${props => props.color};
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
  width: fit-content;
`;

export const ProjectTitle = styled.h2`
  font-size: 1.875rem; /* Slightly larger to match taller images */
  color: ${({ theme }) => theme.colors.blue9};
  margin: 0 0 1rem;
  font-weight: 600;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  margin: 0 0 1.5rem;
  line-height: 1.6;
  font-size: 1rem;
  flex-grow: 1;
`;

const arrowAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

export const ExploreButton = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.color};
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: fit-content;
  margin-top: auto;
  
  i {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    i {
      animation: ${arrowAnimation} 1s ease infinite;
    }
  }
`;