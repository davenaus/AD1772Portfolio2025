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

const MainTile = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 180px;
  gap: 2rem;
  align-items: center;
  transition: border-color 0.2s ease;
  height: auto;
  min-height: 180px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue4};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
    min-height: 0;
  }
`;

const MainTileContent = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.blue9};
    font-size: 1.75rem;
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
  max-height: 180px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    max-width: 240px;
    max-height: 240px;
    margin: 0 auto;
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
  
  &.more-tile {
    height: 80px;
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    
    ${TileIcon} {
      margin-bottom: 0;
      margin-right: 1rem;
    }
    
    ${TileContent} {
      display: flex;
      align-items: center;
      flex-grow: 1;
      
      h3, p {
        margin-bottom: 0;
        margin-right: 1rem;
      }
      
      p {
        flex-grow: 1;
      }
    }
    
    i.bx-chevron-right {
      font-size: 32px;
    }
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
  
  .copy-notification {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #4466BB;
    color: #FFFFFF;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0;
    z-index: 10;
    animation: fadeIn 0.3s ease forwards, fadeOut 0.3s ease 1.7s forwards;
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
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
  MainTile,
  MainTileContent,
  PreviewBox,
  LinksGrid,
  LinkTile,
  TileIcon,
  TileContent,
};