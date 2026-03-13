import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const flicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.4; }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const glitch = keyframes`
  0%, 100% { clip-path: inset(0 0 100% 0); transform: skewX(0deg); }
  10% { clip-path: inset(20% 0 60% 0); transform: skewX(-2deg); }
  20% { clip-path: inset(50% 0 30% 0); transform: skewX(2deg); }
  30% { clip-path: inset(80% 0 5% 0); transform: skewX(-1deg); }
  40% { clip-path: inset(10% 0 85% 0); transform: skewX(1deg); }
  50% { clip-path: inset(60% 0 20% 0); transform: skewX(-3deg); }
  60% { clip-path: inset(30% 0 55% 0); transform: skewX(2deg); }
  70% { clip-path: inset(5% 0 80% 0); transform: skewX(-1deg); }
  80% { clip-path: inset(75% 0 10% 0); transform: skewX(3deg); }
  90% { clip-path: inset(40% 0 45% 0); transform: skewX(-2deg); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  padding: 2rem 1.5rem;
  position: relative;
  overflow: hidden;
  text-align: center;
`;

export const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 0, 110, 0.3), transparent);
  animation: ${scanline} 6s linear infinite;
  pointer-events: none;
  z-index: 0;
`;

export const ContentWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  z-index: 1;
  animation: ${fadeUp} 0.6s ease-out both;
`;

export const TimecodeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.blue11};
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  opacity: 0.7;

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

export const TimecodeSegment = styled.span<{ highlight?: boolean }>`
  color: ${({ highlight, theme }) => highlight ? '#FF006E' : theme.colors.blue11};
`;

export const ErrorCode = styled.div`
  position: relative;
  font-size: clamp(6rem, 20vw, 10rem);
  font-weight: 800;
  line-height: 0.9;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  letter-spacing: -0.04em;
  animation: ${flicker} 4s infinite;

  &::before,
  &::after {
    content: '404';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  &::before {
    color: #FF006E;
    opacity: 0.6;
    animation: ${glitch} 2.5s infinite;
    animation-delay: 0.1s;
    mix-blend-mode: screen;
  }

  &::after {
    color: #00f5ff;
    opacity: 0.4;
    animation: ${glitch} 2.5s infinite;
    animation-delay: 0.3s;
    mix-blend-mode: screen;
  }
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 0, 110, 0.1);
  border: 1px solid rgba(255, 0, 110, 0.3);
  color: #FF006E;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #FF006E;
    animation: ${blink} 1s infinite;
  }
`;

export const ErrorTitle = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.75rem;
  line-height: 1.2;
`;

export const ErrorDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.blue11};
  margin-bottom: 2.5rem;
  line-height: 1.7;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
  background: #FF006E;
  color: #fff;
  border: none;

  i { font-size: 1.1rem; }

  &:hover {
    background: #d9005e;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 0, 110, 0.3);
  }

  &:active { transform: translateY(0); }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
  background: transparent;
  color: ${({ theme }) => theme.colors.blue9};
  border: 1px solid ${({ theme }) => theme.colors.blue4};

  i { font-size: 1.1rem; }

  &:hover {
    background: ${({ theme }) => theme.colors.blue2};
    border-color: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }

  &:active { transform: translateY(0); }
`;

export const Divider = styled.div`
  width: 40px;
  height: 1px;
  background: ${({ theme }) => theme.colors.blue4};
  margin: 0 auto 2rem;
`;

export const SuggestedLinks = styled.div``;

export const SuggestedTitle = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.blue11};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 1rem;
`;

export const SuggestedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SuggestedLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.1rem 0.75rem;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.blue9};
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;

  i {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.blue8};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue3};
    border-color: ${({ theme }) => theme.colors.blue4};
    transform: translateY(-2px);

    i { color: ${({ theme }) => theme.colors.blue9}; }
  }
`;

/* Legacy stubs — no longer rendered but kept so imports don't break */
export const IllustrationWrapper = styled.div`display: none;`;
export const TimelineBar = styled.div`display: none;`;
export const TimelineCursor = styled.div`display: none;`;
export const MissingClipText = styled.div`display: none;`;
