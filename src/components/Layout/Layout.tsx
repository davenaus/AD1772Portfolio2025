// src/components/Layout/Layout.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import { Styles as S } from './styles';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const menuItems: NavItem[] = [
  { path: '/', icon: 'bx bx-home', label: 'Home' },
  { path: '/portfolio', icon: 'bx bx-book-alt', label: 'Portfolio' },
  { path: '/projects', icon: 'bx bx-layer', label: 'Projects' }, 
];

const resourceItems: NavItem[] = [
  { path: '/store', icon: 'bx bx-package', label: 'Store' },
  { path: '/blog', icon: 'bx bx-pen', label: 'Blog' },
  { path: '/tools', icon: 'bx bx-wrench', label: 'Tools' },
  { path: '/contact', icon: 'bx bx-phone', label: 'Contact' }
];

interface SocialLink {
  url: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  { url: 'https://www.youtube.com/@AustinDavenport', icon: 'bx bxl-youtube' },
  { url: 'https://x.com/A__Davenport', icon: 'bx bxl-twitter' },
  { url: 'https://discord.com/invite/vuKtEXJ', icon: 'bx bxl-discord-alt' },
  { url: 'https://www.tiktok.com/@austindavenport_', icon: 'bx bxl-tiktok' }
];

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
        $isActive={isActive} // Use $ prefix for transient props
      >
        <i className={item.icon}></i>
        {item.label}
      </S.NavLinkWrapper>
    );
  };

  return (
    <S.LayoutContainer>
      <S.MobileMenuButton onClick={toggleSidebar}>
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
          <S.NavSection>
            <S.NavTitle>Menu</S.NavTitle>
            <S.NavLinks>
              {menuItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </S.NavLinks>
          </S.NavSection>

          <S.NavSection>
            <S.NavTitle>Resources</S.NavTitle>
            <S.NavLinks>
              {resourceItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </S.NavLinks>
          </S.NavSection>
        </nav>

        <S.SocialLinks>
          <S.SocialGrid>
            {socialLinks.map((link) => (
              <S.SocialLink
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={link.icon}></i>
              </S.SocialLink>
            ))}
          </S.SocialGrid>
        </S.SocialLinks>
      </S.Sidebar>

      <S.MainContent>
        {children}
      </S.MainContent>
    </S.LayoutContainer>
  );
};