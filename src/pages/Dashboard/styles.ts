// src/pages/Dashboard/styles.ts
import styled from 'styled-components';

const DashboardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RegularTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  position: relative;
`;

const FullWidthTile = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  transition: all 0.2s ease;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  min-height: 240px;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.blue4};
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.5rem;
  }
`;

const TileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.blue9};
  line-height: 1.2;
  margin-bottom: 0.5rem;

  @media (max-width: 1100px) {
    font-size: 1.75rem;
  }
`;

const PreviewBox = styled.div`
  border-radius: 12px;
  overflow: hidden;
  width: 80%;
  margin-left: auto;


  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1100px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: center; /* Center items horizontally */
  }
`;

// Updated StoreItem to be a link with hover effects
const StoreItem = styled.a`
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.blue4};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: block;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    img {
      transform: scale(1.05);
    }

    ${/* Targeting the overlay */''} 
    & > div:last-child {
      background: rgba(15, 17, 19, 0.85);
      padding-bottom: 1.5rem;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    max-width: 250px; /* Set a max width to control size on smaller screens */
  }
`;

const StoreItemOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(15, 17, 19, 0.7);
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const CountdownBox = styled.div`
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.blue3};
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  z-index: 10;

  span:first-of-type {
    color: ${({ theme }) => theme.colors.blue11};
  }

  span:last-of-type {
    color: #ff4444;
    font-weight: 500;
  }

  i {
    color: #ff4444;
  }
`;

const VideoEmbed = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  overflow: hidden;
  margin-top: auto;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ContactTile = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.blue4};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1.5rem;
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.blue9};
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 1rem;
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.blue4};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  i {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.blue9};
  }
`;

const StoreHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  div {
    h3 {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.blue9};
      margin-bottom: 0.25rem;
      font-weight: 600;
    }

    p {
      color: ${({ theme }) => theme.colors.blue11};
      font-size: 0.875rem;
    }
  }
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

export const Styles = {
  DashboardGrid,
  RegularTiles,
  FullWidthTile,
  TileContent,
  HeroTitle,
  PreviewBox,
  StoreGrid,
  StoreItem,
  StoreItemOverlay,
  CountdownBox,
  VideoEmbed,
  ContactTile,
  ContactInfo,
  IconWrapper,
  StoreHeader,
  ToolBadge
};