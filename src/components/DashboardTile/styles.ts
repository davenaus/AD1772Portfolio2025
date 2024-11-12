// src/components/DashboardTile/styles.ts
import styled from 'styled-components';

const Tile = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.blue4};
    background-color: ${({ theme }) => theme.colors.blue3};
  }

  @media (max-width: 1100px) {
    padding: 1.25rem;
    min-height: auto;
  }
`;

const TileIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.blue4};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  flex-shrink: 0;

  i {
    color: ${({ theme }) => theme.colors.blue9};
    font-size: 24px;
  }
`;

const TileHeader = styled.div`
  margin-bottom: 1rem;
`;

const TileTitle = styled.h3`
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1.25rem;
  margin-bottom: 0.375rem;
  font-weight: 600;
`;

const TileSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.875rem;
  line-height: 1.5;
`;

const TileContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  p {
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 0.875rem;
    line-height: 1.6;
  }

  iframe {
    border: none;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
`;

export const Styles = {
  Tile,
  TileIcon,
  TileHeader,
  TileTitle,
  TileSubtitle,
  TileContent
};