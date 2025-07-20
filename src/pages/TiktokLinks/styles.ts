// src/pages/TiktokLinks/styles.ts - Glass/Neumorphism Version with Theme Colors
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(1deg); }
  66% { transform: translateY(10px) rotate(-1deg); }
`;

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
  overflow: hidden;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blue3};
  opacity: 0.3;
  animation: ${float} 20s ease-in-out infinite;

  &.shape-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
    animation-delay: 0s;
  }

  &.shape-2 {
    width: 200px;
    height: 200px;
    top: 50%;
    right: -100px;
    animation-delay: 7s;
  }

  &.shape-3 {
    width: 150px;
    height: 150px;
    bottom: -75px;
    left: 30%;
    animation-delay: 14s;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  z-index: 1;
  animation: ${slideIn} 0.8s ease-out;
`;

const ProfileCard = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 24px;
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
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
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
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
  margin-bottom: 2rem;
`;

const Username = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.5rem;
`;

const JobTitle = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue9};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blue4};
`;

const Bio = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

const SocialButton = styled.a`
  background: ${({ theme }) => theme.colors.blue3};
  border: 1px solid ${({ theme }) => theme.colors.blue4};
  border-radius: 16px;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    background: ${({ theme }) => theme.colors.blue4};
    border-color: ${({ theme }) => theme.colors.blue6};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.blue5}, transparent);
    opacity: 0.3;
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  i {
    font-size: 20px;
  }

  span {
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

const LinksGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.blue3};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.blue9};
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.blue4};

  i {
    font-size: 20px;
  }

  .featured & {
    background: ${({ theme }) => theme.colors.blue5};
    border-color: ${({ theme }) => theme.colors.blue6};
  }
`;

const TextContent = styled.div`
  flex: 1;
  text-align: left;
  min-width: 0;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue9};
  margin: 0 0 0.25rem 0;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.blue11};
  margin: 0;
  line-height: 1.4;
`;

const ActionIcon = styled.div`
  color: ${({ theme }) => theme.colors.blue8};
  font-size: 18px;
  flex-shrink: 0;
  transition: all 0.3s ease;

  .copied & {
    color: ${({ theme }) => theme.colors.blue9};
    transform: scale(1.2);
  }
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
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  animation: ${slideIn} 0.6s ease-out calc(var(--index) * 0.1s) both;

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

  &.more-tile {
    ${CardContent} {
      padding: 1.25rem 1.5rem;
      justify-content: space-between;
    }

    ${IconWrapper} {
      margin-right: 0;
    }

    ${TextContent} {
      display: flex;
      align-items: center;
      flex: 1;
      margin: 0 1rem;

      ${CardTitle}, ${CardDescription} {
        margin: 0;
        margin-right: 1rem;
      }

      ${CardDescription} {
        flex: 1;
      }
    }

    ${ActionIcon} {
      font-size: 24px;
    }
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

export const S = {
  Container,
  BackgroundShapes,
  Shape,
  ContentWrapper,
  ProfileCard,
  AvatarContainer,
  Avatar,
  StatusDot,
  ProfileInfo,
  Username,
  JobTitle,
  Bio,
  SocialGrid,
  SocialButton,
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
};