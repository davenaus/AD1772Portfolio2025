// src/pages/TiktokLinks/TiktokLinks.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { LinkItem } from './types';
import { S } from './styles';

const linkItems: LinkItem[] = [
  {
    href: "https://shop.austindavenport.com/products/the-youtube-blueprint-ebook",
    icon: "bx-book-open",
    title: "The YouTube Blueprint",
    description: "Complete guide to growing your YouTube channel and optimizing your content"
  },
  {
    href: "https://spoti.fi/3GNAwkd",
    icon: "bx-music",
    title: "DMCA Safe Streaming Music",
    description: "80-hour playlist of copyright-free music for your streams"
  },
  {
    href: "https://austindavenport.com/tools",
    icon: "bx-search-alt",
    title: "FREE YouTube SEO Tools",
    description: "Comprehensive toolkit for optimizing your YouTube content"
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
  }
];

export const TiktokLinks: React.FC = () => {
  const handleExternalClick = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <S.Container>
      <S.Profile>
        <S.ProfileImage>
          <img 
            src="https://64.media.tumblr.com/44ab51b7b5c73d1a68f728d92becd3b3/029f5263603a04c1-96/s1280x1920/61ad282235a57094aec8b8068662f9225a4f5a14.pnj" 
            alt="Profile Picture" 
          />
        </S.ProfileImage>
        <S.ProfileInfo>
          <h1>Austin's TikTok Links</h1>
          <p>Content Creator</p>
        </S.ProfileInfo>
      </S.Profile>

      <S.MainTile>
        <S.MainTileContent>
          <h2>Link-In-Bio Page Maker</h2>
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
            onClick={() => handleExternalClick(item.href)}
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
