// src/pages/TiktokLinks/TiktokLinks.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { LinkItem } from './types';
import { S } from './styles';

const linkItems: LinkItem[] = [
  {
    href: "https://discord.com/invite/vuKtEXJ",
    icon: "bxl-discord-alt",
    title: "Join Discord",
    description: "Connect with our community of content creators"
  },
  {
    href: "https://austindavenport.com/tools",
    icon: "bx-search-alt",
    title: "FREE YouTube SEO Tools",
    description: "Comprehensive toolkit for optimizing your YouTube content"
  },
  {
    href: "https://shop.austindavenport.com/collections/all",
    icon: "bx-shopping-bag",
    title: "Templates",
    description: "Professional templates to enhance your content creation"
  },
  {
    href: "#",
    icon: "bx-envelope",
    title: "Email",
    description: "austin@austindavenport.com",
    isCopyable: true
  },
  {
    href: "/extra-links",
    icon: "bx-chevron-right",
    title: "More",
    description: "Discover additional resources and tools",
    isInternalLink: true
  }
];

export const TiktokLinks: React.FC = () => {
  const handleExternalClick = (url: string, isInternalLink = false) => {
    if (isInternalLink) {
      // Handle internal navigation
      window.location.href = url;
      return;
    }
    
    window.open(url, '_blank', 'noopener noreferrer');
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
      .then(() => {
        // Show copy notification
        const emailTile = document.querySelector('[data-email-tile]');
        if (emailTile) {
          const notification = document.createElement('div');
          notification.className = 'copy-notification';
          notification.textContent = 'Email copied!';
          emailTile.appendChild(notification);
          
          setTimeout(() => {
            notification.remove();
          }, 2000);
        }
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <S.Container>
      <S.Profile>
        <S.ProfileImage>
          <img 
            src="https://64.media.tumblr.com/44ab51b7b5c73d1a68f728d92becd3b3/029f5263603a04c1-96/s2048x3072/cd2e6fdd67cb4fe3ad30bf06ef4b75c42291e2f6.pnj" 
            alt="Profile Picture" 
          />
        </S.ProfileImage>
        <S.ProfileInfo>
          <h1>Austin Davenport</h1>
          <p>Teaching you how to edit like a Pro. Worked with Jordan Peterson, Brett Cooper, and The Money Guy Show</p>
        </S.ProfileInfo>
      </S.Profile>

      <S.SocialIcons>
        <a href="https://www.youtube.com/@AustinDavenport" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-youtube"></i>
        </a>
        <a href="https://x.com/A__Davenport" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-twitter"></i>
        </a>
        <a href="https://www.tiktok.com/@austindavenport_" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-tiktok"></i>
        </a>
      </S.SocialIcons>

      <S.MainTile>
        <S.MainTileContent>
          <h2>My Linktree Alternative</h2>
          <p>Create your professional link-in-bio page with our easy-to-use tool. Perfect for content creators and social media enthusiasts.</p>
          <Button 
            onClick={() => handleExternalClick('https://bit.ly/link-in-bio-page-maker')}
            icon="bx bx-link-external"
          >
            Try it Now
          </Button>
        </S.MainTileContent>
        <S.PreviewBox>
          <img 
            src="https://imgproxy.fourthwall.com/GVzJ1JxNmPVEeuaRpJKf1xrGKh6dQiIsweKij4N3gpA/w:900/sm:1/enc/ZWI0NGFkNjMzYjJh/YzdiZo9hrRNXK67i/aIov9MeXeWn0V-s-/0F4_cqFqrKG1phKX/mf4cJZyhTasDRFhh/zEMuFGz5ectkxzGA/WJDdo0p58u84YPaE/yJbmq_-7c5_vIooS/GIaqQ6DKId4h3GPq/-I4iOqxNrG1seOZ0/-zJ6rg48pfYSegfN/yFpNjCWoMrOwi8zo/7AuRKoBlMfsURrx5/RZlvOQ.webp" 
            alt="Preview" 
          />
        </S.PreviewBox>
      </S.MainTile>

      <S.LinksGrid>
        {linkItems.map((item, index) => (
          <S.LinkTile 
            key={index}
            onClick={() => {
              if (item.isCopyable) {
                handleCopyEmail(item.description);
              } else {
                handleExternalClick(item.href, item.isInternalLink);
              }
            }}
            data-email-tile={item.isCopyable ? true : undefined}
            className={item.isInternalLink ? 'more-tile' : ''}
          >
            <S.TileIcon>
              <i className={`bx ${item.icon}`} />
            </S.TileIcon>
            <S.TileContent>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </S.TileContent>
          </S.LinkTile>
        ))}
      </S.LinksGrid>
    </S.Container>
  );
};