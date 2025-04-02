// src/pages/ExtraLinks/styles.ts
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
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
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
    line-height: 1.4;
    max-width: 400px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.blue3};
    color: ${({ theme }) => theme.colors.blue9};
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.blue4};
      transform: translateY(-2px);
    }
    
    i {
      font-size: 20px;
    }
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

const LinkTile = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue4};
    transform: translateY(-2px);
  }
  
  &.back-tile {
    grid-column: 1 / -1;
    height: 80px;
    display: flex;
    align-items: center;
    
    ${TileIcon} {
      margin-bottom: 0;
      margin-right: 1rem;
    }
    
    ${TileContent} {
      display: flex;
      align-items: center;
      
      h3, p {
        margin-bottom: 0;
        margin-right: 1rem;
      }
    }
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

export const S = {
  Container,
  Profile,
  ProfileImage,
  ProfileInfo,
  SocialIcons,
  LinksGrid,
  LinkTile,
  TileIcon,
  TileContent,
};