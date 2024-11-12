// src/pages/Tools/components/VideoAnalyzer/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const SearchBar = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
      font-family: 'Poppins', sans-serif;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1rem;
      font-family: 'Poppins', sans-serif;

  &::placeholder {
    color: ${({ theme }) => theme.colors.blue11};
  }

  &:focus {
    outline: none; // Removes the focus outline
  }
`;

export const SearchButton = styled.button`
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.blue9};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.blue3};
  }

  i {
    font-size: 1.5rem;
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 2rem;
  display: none;

  &.visible {
    display: block;
  }
`;



export const Thumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const VideoDetails = styled.div`
  flex: 1;
`;



export const ChannelLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const ChannelText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChannelName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue9};
`;

export const SubscriberCount = styled.span`
  font-size: 0.8em;
  color: ${({ theme }) => theme.colors.blue11};
`;

export const AuditResults = styled.div`
  margin-top: 2rem;
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h3`
  margin: 1rem 0;
  padding-left: 1rem;
  border-left: 3px solid ${({ theme }) => theme.colors.blue9};
  color: ${({ theme }) => theme.colors.blue9};
`;



export const MetricBox = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;
`;

export const Achievement = styled.p`
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.blue11};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const Drawback = styled(Achievement)``;



export const Tag = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue9};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  margin: 0.25rem;
  font-size: 0.875rem;
`;







export const VideoInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

export const ThumbnailContainer = styled.div`
  flex: 0 0 50%;
  margin-right: 1.5rem;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    margin-right: 0;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`;

export const VideoTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.1em;
    text-align: center;
  }
`;

export const TagContainer = styled.div`
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

// ... Add similar responsive styles for the remaining components