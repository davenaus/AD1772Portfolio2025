// src/pages/ExtraLinks/styles.ts
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem 2rem;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  animation: ${slideIn} 0.6s ease-out;
`;

const ProfileImage = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.blue4};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  h1 {
    color: ${({ theme }) => theme.colors.blue9};
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.25rem;

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 0.875rem;
    line-height: 1.4;
    max-width: 360px;
    margin: 0 auto;
  }
`;

const VideoFeature = styled.div`
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  margin-bottom: 1.25rem;
  background: ${({ theme }) => theme.colors.blue2};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  animation: ${slideIn} 0.7s ease-out;

  iframe {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    border: none;
  }

  @media (max-width: 480px) {
    border-radius: 16px;
    margin-bottom: 1rem;
  }
`;

const TileIcon = styled.div`
  width: 44px;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.blue4};
  transition: background-color 0.2s ease;

  i {
    font-size: 20px;
    line-height: 1;
    color: ${({ theme }) => theme.colors.blue9};
  }
`;

const TileContent = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;

  h3 {
    color: ${({ theme }) => theme.colors.blue9};
    font-size: 0.975rem;
    font-weight: 600;
    margin: 0 0 0.15rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    color: ${({ theme }) => theme.colors.blue10};
    font-size: 0.775rem;
    line-height: 1.3;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const LinkTile = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 16px;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue5};
    background-color: ${({ theme }) => theme.colors.blue3};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  &.copied {
    border-color: ${({ theme }) => theme.colors.blue6};
    background-color: ${({ theme }) => theme.colors.blue4};

    ${TileIcon} {
      background-color: ${({ theme }) => theme.colors.blue6};

      i {
        color: ${({ theme }) => theme.colors.blue1};
      }
    }
  }

  &.back-tile {
    grid-column: 1 / -1;
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1rem;
    gap: 0.75rem;
    border-radius: 14px;
  }
`;

const LinksGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    gap: 0.625rem;
  }
`;

export const S = {
  Container,
  Profile,
  ProfileImage,
  ProfileInfo,
  VideoFeature,
  LinksGrid,
  LinkTile,
  TileIcon,
  TileContent,
};
