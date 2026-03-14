// src/components/Layout/Layout.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import { Styles as S } from './styles';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: 'bx bx-home', label: 'Home' },
  { path: '/portfolio', icon: 'bx bx-book-alt', label: 'Portfolio' },
  { path: '/projects', icon: 'bx bx-layer', label: 'Projects' },
  { path: '/blog', icon: 'bx bx-pen', label: 'Blog' },
  { path: '/contact', icon: 'bx bx-phone', label: 'Contact' },
];

const youtubeUrl = 'https://www.youtube.com/@AustinDavenport';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.path;

    return (
      <S.NavLinkWrapper
        to={item.path}
        $isActive={isActive}
        onClick={() => setIsSidebarOpen(false)}
      >
        <i className={item.icon}></i>
        {item.label}
      </S.NavLinkWrapper>
    );
  };

  return (
    <S.LayoutContainer>
      <S.MobileMenuButton
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isSidebarOpen}
      >
        <i className='bx bx-menu'></i>
      </S.MobileMenuButton>

      <S.Overlay isOpen={isSidebarOpen} onClick={toggleSidebar} />

      <S.Sidebar isOpen={isSidebarOpen}>
        <S.Profile>
          <S.ProfileImage style={{ 
            backgroundImage: `url('https://64.media.tumblr.com/6301cf4c94d066c9579b2793781d7f2f/20c99a0f9ebff902-e0/s2048x3072/39d455383d100643b051d73059a46beac9b086a4.pnj')`
          }} />
          <S.ProfileInfo>
            <h2>Austin Davenport</h2>
            <p>Video Editor</p>
          </S.ProfileInfo>
        </S.Profile>

        <nav>
          <S.NavLinks>
            {navItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </S.NavLinks>
        </nav>

        <S.SocialLinks>
          <S.YouTubeLink
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className='bx bxl-youtube'></i>
            YouTube
          </S.YouTubeLink>
        </S.SocialLinks>
      </S.Sidebar>

      <S.MainContent as="main">
        {children}
      </S.MainContent>
    </S.LayoutContainer>
  );
};