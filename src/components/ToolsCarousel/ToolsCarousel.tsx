import React from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  margin-top: 1rem;
  overflow: hidden;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    pointer-events: none;
    z-index: 2;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.blue2}, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, ${({ theme }) => theme.colors.blue2}, transparent);
  }
`;

const Track = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Row = styled.div<{ delay?: number }>`
  display: flex;
  animation: scrollTools 20s linear infinite;
  gap: 0.5rem;
  padding-left: 100%;
  animation-delay: ${props => props.delay || 0}s;

  @keyframes scrollTools {
    0% { transform: translateX(0); }
    100% { transform: translateX(-200%); }
  }
`;

const ToolItem = styled.div`
  background-color: ${({ theme }) => theme.colors.blue4};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 0.875rem;
  flex-shrink: 0;
`;

const ToolBadge = styled.div`
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  background-color: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const tools = {
  row1: ['Video Analyzer', 'Channel Analyzer', 'Playlist Analyzer', 'Tag Generator'],
  row2: ['Thumbnail Downloader', 'Comment Downloader', 'Channel Consultant', 'QR Code Generator'],
  row3: ['Channel Comparer', 'Thumbnail Tester', 'YouTube Calculator', 'Outlier Finder']
};

export const ToolsCarousel: React.FC = () => {
  const renderRow = (items: string[], delay?: number) => (
    <Row delay={delay}>
      {[...items, ...items].map((item, index) => (
        <ToolItem key={`${item}-${index}`}>{item}</ToolItem>
      ))}
    </Row>
  );

  return (
    <CarouselContainer>
      <Track>
        {renderRow(tools.row1)}
        {renderRow(tools.row2, 1)}
        {renderRow(tools.row3, 2)}
      </Track>
    </CarouselContainer>
  );
};
