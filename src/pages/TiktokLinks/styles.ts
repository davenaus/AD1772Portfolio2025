// src/pages/TiktokLinks/styles.ts - Glass/Neumorphism Version with Theme Colors
import styled, { keyframes } from 'styled-components';


const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.blue1 || '#f8f9fa'};
  position: relative;
  overflow: clip;
  padding: 2rem 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0.75rem 0.75rem 2rem;
    align-items: flex-start;
  }
`;


const ContentWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  z-index: 1;
  animation: ${slideIn} 0.8s ease-out;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const ProfileCard = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 24px;
  padding: 1.5rem 2rem;
  margin-bottom: 1.25rem;
  text-align: center;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue4};
    transform: translateY(-2px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.12),
      0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1.25rem;
    border-radius: 18px;
    margin-bottom: 1rem;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 0.875rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.blue4};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.blue6}, ${({ theme }) => theme.colors.blue8});
    z-index: -1;
    animation: ${shimmer} 3s ease-in-out infinite;
  }

  @media (max-width: 480px) {
    width: 68px;
    height: 68px;
  }
`;

const StatusDot = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: #00ff88;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.blue2};
  animation: ${pulse} 3s ease-in-out infinite;
`;

const ProfileInfo = styled.div`
  margin-bottom: 0;
`;

const Username = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.35rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const JobTitle = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue9};
  padding: 0.35rem 0.875rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0;
  border: 1px solid ${({ theme }) => theme.colors.blue4};
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

const CardContent = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    padding: 0.875rem 1rem;
    gap: 0.75rem;
  }
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.blue3};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.blue9};
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.blue4};

  i {
    font-size: 20px;
    line-height: 1;
  }
`;

const TextContent = styled.div`
  flex: 1;
  text-align: left;
  min-width: 0;
`;

const CardTitle = styled.h3`
  font-size: 0.975rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue9};
  margin: 0 0 0.15rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDescription = styled.p`
  font-size: 0.775rem;
  color: ${({ theme }) => theme.colors.blue10};
  margin: 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionIcon = styled.div`
  color: ${({ theme }) => theme.colors.blue7};
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
  transition: all 0.3s ease;
`;

const CardGlow = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.blue4}, transparent);
  opacity: 0.5;
  transition: left 0.6s ease;
`;

const LinkCard = styled.button`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 20px;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  animation: ${slideIn} 0.6s ease-out calc(var(--index) * 0.1s) both;

  @media (max-width: 480px) {
    border-radius: 16px;
  }

  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.colors.blue3};
    border-color: ${({ theme }) => theme.colors.blue4};
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  }

  &:hover ${CardGlow} {
    left: 100%;
  }

  &:hover ${ActionIcon} {
    color: ${({ theme }) => theme.colors.blue9};
    transform: translateX(3px);
  }

  &.featured {
    background: ${({ theme }) => theme.colors.blue4};
    border: 2px solid ${({ theme }) => theme.colors.blue6};

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.blue8}, ${({ theme }) => theme.colors.blue6});
      background-size: 200% 100%;
      animation: ${shimmer} 3s ease-in-out infinite;
    }
  }

  &.copied {
    background: ${({ theme }) => theme.colors.blue5};
    border-color: ${({ theme }) => theme.colors.blue7};
  }
`;

const CopiedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.blue6};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.blue1};
  font-weight: 600;
  border-radius: 20px;
  animation: ${slideIn} 0.3s ease-out;

  i {
    font-size: 24px;
  }
`;

const VideoFeature = styled.div`
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  margin-bottom: 1.25rem;
  background: #000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  position: relative;
  aspect-ratio: 16 / 9;

  iframe {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 480px) {
    border-radius: 16px;
    margin-bottom: 1rem;
  }
`;

const VideoThumbnail = styled.div`
  position: absolute;
  inset: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.35);
  }

  &::after {
    content: '';
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E");
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 40px;
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E");
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: 40px;
    transition: transform 0.2s ease;

    @media (max-width: 480px) {
      width: 52px;
      height: 52px;
      mask-size: 32px;
      -webkit-mask-size: 32px;
    }
  }

  &:hover::after {
    transform: scale(1.08);
  }
`;

const BottomSocials = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  padding-bottom: 1.5rem;
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue9};
  text-decoration: none;
  transition: all 0.25s ease;

  i {
    font-size: 20px;
    line-height: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue3};
    border-color: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;

export const S = {
  Container,
  ContentWrapper,
  ProfileCard,
  AvatarContainer,
  Avatar,
  StatusDot,
  ProfileInfo,
  Username,
  JobTitle,
  VideoFeature,
  VideoThumbnail,
  PlayButton,
  LinksGrid,
  LinkCard,
  CardGlow,
  CardContent,
  IconWrapper,
  TextContent,
  CardTitle,
  CardDescription,
  ActionIcon,
  CopiedOverlay,
  BottomSocials,
  SocialIconLink,
};