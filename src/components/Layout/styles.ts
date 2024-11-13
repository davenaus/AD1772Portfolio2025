// src/components/Layout/styles.ts
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom'; // Add this import

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
  width: 260px;
  background-color: ${({ theme }) => theme.colors.blue2};
  border-right: 1px solid ${({ theme }) => theme.colors.blue3};
  padding: 1.5rem;
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 999;
  transition: transform 0.3s ease;

  @media (max-width: 1100px) {
    transform: translateX(${({ isOpen }) => isOpen ? '0' : '-100%'});
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 2rem;

  @media (max-width: 1100px) {
    margin-left: 0;
    padding: 1.5rem;
    margin-top: 70px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.blue3};
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue9};

  i {
    font-size: 24px;
  }

  @media (max-width: 1100px) {
    display: block;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue3};
  margin-bottom: 1.5rem;
`;

const ProfileImage = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
`;

const ProfileInfo = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.blue9};
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 0.875rem;
  }
`;

const NavSection = styled.div`
  margin-bottom: 2rem;
`;

const NavTitle = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SocialLinks = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.blue3};
`;

const SocialGrid = styled.div`
  display: flex;
  gap: 0.75rem;

  a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--blue-3);
    border-radius: 8px;
    color: var(--blue-11);
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--blue-4);
      color: var(--blue-9);
      transform: translateY(-2px);
    }
  }
`;

const NavLinkWrapper = styled(RouterLink)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.blue9 : theme.colors.blue11};
  background-color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.blue3 : 'transparent'};
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.blue9};
    background-color: ${({ theme }) => theme.colors.blue3};
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(2px);
  }

  i {
    font-size: 1.25rem;
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.blue3};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.blue11};
  transition: all 0.2s ease;

  i {
    font-size: 1.25rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.blue9};
    background-color: ${({ theme }) => theme.colors.blue4};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

// Fix the exports object (add comma after SocialGrid)
export const Styles = {
  LayoutContainer,
  Sidebar,
  MainContent,
  MobileMenuButton,
  Overlay,
  Profile,
  ProfileImage,
  ProfileInfo,
  NavSection,
  NavTitle,
  NavLinks,
  SocialLinks,
  SocialGrid,  // Add comma here
  NavLinkWrapper,
  SocialLink
};