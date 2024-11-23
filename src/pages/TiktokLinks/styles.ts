// src/pages/TiktokLinks/styles.ts
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  h1 {
    color: ${({ theme }) => theme.colors.blue9};
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  p {
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 0.875rem;
  }
`;

const MainTile = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue4};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const MainTileContent = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.blue9};
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

const PreviewBox = styled.div`
  background-color: ${({ theme }) => theme.colors.blue3};
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    max-width: 280px;
    margin: 0 auto;
  }
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LinkTile = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue4};
    transform: translateY(-2px);
  }
`;

const TileIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.blue3};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  i {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.blue9};
  }
`;

const TileContent = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.blue9};
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

export const S = {
  Container,
  Profile,
  ProfileImage,
  ProfileInfo,
  MainTile,
  MainTileContent,
  PreviewBox,
  LinksGrid,
  LinkTile,
  TileIcon,
  TileContent,
};