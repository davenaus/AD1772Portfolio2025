// src/pages/NotFound/styles.ts
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
`;

export const ContentWrapper = styled.div`
  max-width: 800px; // Increased to accommodate wider tile row
  width: 100%;
  text-align: center;
`;

export const ErrorCode = styled.div`
  font-size: 6rem;
  font-weight: 700;
  color: var(--blue9);
  line-height: 1;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

// Timeline animation keyframes
const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const IllustrationWrapper = styled.div`
  margin: 2rem auto 3rem;
  position: relative;
  max-width: 400px;
`;

export const TimelineBar = styled.div`
  height: 40px;
  background: var(--blue3);
  border-radius: 6px;
  position: relative;
  border: 1px solid var(--blue4);
  overflow: hidden;
  
  &:before, &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 12px;
    background: var(--blue4);
    top: 0;
  }
  
  &:before {
    left: 30%;
  }
  
  &:after {
    left: 70%;
  }
`;

export const TimelineCursor = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: #FF006E;
  animation: ${cursorBlink} 1.5s infinite;
  box-shadow: 0 0 8px rgba(255, 0, 110, 0.6);
`;

export const MissingClipText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(15, 17, 19, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #FF006E;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px dashed #FF006E;
`;

export const ErrorTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: var(--blue9);
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const ErrorDescription = styled.p`
  font-size: 1.1rem;
  color: var(--blue11);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
  
  i {
    font-size: 1.25rem;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background: var(--blue3);
  color: var(--blue9);
  border: none;
  
  &:hover {
    background: var(--blue4);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: transparent;
  color: var(--blue9);
  border: 1px solid var(--blue3);
  
  &:hover {
    background: var(--blue2);
    border-color: var(--blue4);
  }
`;

export const SuggestedLinks = styled.div`
  margin-top: 2rem;
`;

export const SuggestedTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--blue9);
  margin-bottom: 1.25rem;
  font-weight: 500;
`;

export const SuggestedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // Changed to 4 columns in one row
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // 2 columns on tablet
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr; // 1 column on mobile
  }
`;

export const SuggestedLink = styled(Link)`
  display: flex;
  flex-direction: column; // Changed to column for tile appearance
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
  background: var(--blue2);
  border: 1px solid var(--blue3);
  border-radius: 8px;
  color: var(--blue9);
  text-decoration: none;
  transition: all 0.2s ease;
  aspect-ratio: 1 / 1; // Makes them square tiles
  
  i {
    font-size: 1.75rem; // Larger icons for tiles
    color: var(--blue6);
    margin-bottom: 0.5rem;
  }
  
  &:hover {
    background: var(--blue3);
    transform: translateY(-2px);
    
    i {
      color: var(--blue9);
    }
  }
`;