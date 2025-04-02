// src/pages/ExtraLinks/ExtraLinks.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { LinkItem } from './types';
import { S } from './styles';

const linkItems: LinkItem[] = [
  {
    href: "https://spoti.fi/3GNAwkd",
    icon: "bx-music",
    title: "DMCA Safe Streaming Music",
    description: "80-hour playlist of copyright-free music for your streams"
  },
  {
    href: "https://shop.austindavenport.com/products/the-youtube-blueprint-ebook",
    icon: "bx-book-open",
    title: "The YouTube Blueprint",
    description: "Complete guide to growing your YouTube channel and optimizing your content"
  },
  {
    href: "https://discord.com/template/CnvsmH38kruM",
    icon: "bxl-discord-alt",
    title: "FREE Discord Template",
    description: "Pre-configured Discord server template for content creators"
  },
  {
    href: "https://www.youtube.com/watch?v=d50kxEBrcNA",
    icon: "bx-target-lock",
    title: "FREE Fortnite Custom Healthbar",
    description: "Download our custom Fortnite healthbar template and enhance your gaming streams"
  },
  {
    href: "https://www.youtube.com/watch?v=IpPc1be2PWY",
    icon: "bx-target-lock",
    title: "FREE Apex Legends Custom Banner",
    description: "Get our professionally designed Apex Legends banner templates"
  },
  {
    href: "https://www.youtube.com/watch?v=IliDU2wBgOs",
    icon: "bx-target-lock",
    title: "FREE Warzone 2.0 Custom Banner",
    description: "Download our custom Warzone banner template for your streams"
  },
  {
    href: "https://www.youtube.com/watch?v=q_KqhytxBAs",
    icon: "bx-brush",
    title: "FREE Transition Download",
    description: "Professional streaming transitions to enhance your content"
  },
  {
    href: "/links",
    icon: "bx-chevron-left",
    title: "Back to Main Links",
    description: "Return to the main links page",
    isInternalLink: true
  }
];

export const ExtraLinks: React.FC = () => {
  const handleExternalClick = (url: string, isInternalLink = false) => {
    if (isInternalLink) {
      // Handle internal navigation
      window.location.href = url;
      return;
    }
    
    window.open(url, '_blank', 'noopener noreferrer');
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
          <h1>Austin's Extra Resources</h1>
          <p>Additional tools and resources for content creators</p>
        </S.ProfileInfo>
      </S.Profile>

      <S.SocialIcons>
        <a href="https://www.youtube.com/@AustinDavenport" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-youtube"></i>
        </a>
        <a href="https://x.com/MrDavenportable" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-twitter"></i>
        </a>
        <a href="https://www.tiktok.com/@austindavenport_" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-tiktok"></i>
        </a>
      </S.SocialIcons>

      <S.LinksGrid>
        {linkItems.map((item, index) => (
          <S.LinkTile 
            key={index}
            onClick={() => handleExternalClick(item.href, item.isInternalLink)}
            className={item.isInternalLink ? 'back-tile' : ''}
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