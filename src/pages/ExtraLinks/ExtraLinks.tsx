// src/pages/ExtraLinks/ExtraLinks.tsx
import React, { useEffect, useState } from 'react';
import { LinkItem } from './types';
import { S } from './styles';
import { useCanonical } from '../../utils/useCanonical';

const linkItems: LinkItem[] = [
  {
    href: "https://www.youtool.io/link-in-bio-page-maker",
    icon: "bx-link",
    title: "My Linktree Alternative",
    description: "Tap to copy link — build your free link-in-bio page",
    isCopyable: true
  },
  {
    href: "https://youtool.io",
    icon: "bx-search-alt",
    title: "YouTool.io",
    description: "Free tools to optimize your content"
  },
  {
    href: "https://open.spotify.com/playlist/0YCHie7xPtBwavLn8SbBNb",
    icon: "bx-music",
    title: "DMCA Safe Streaming Music",
    description: "80-hour playlist of copyright-free music for your streams"
  },
  {
    href: "https://shop.austindavenport.com/products/the-youtube-blueprint-ebook",
    icon: "bx-book-open",
    title: "The YouTube Blueprint",
    description: "Complete guide to growing your YouTube channel"
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
    description: "Download our custom Fortnite healthbar template"
  },
  {
    href: "https://www.youtube.com/watch?v=IpPc1be2PWY",
    icon: "bx-target-lock",
    title: "FREE Apex Legends Custom Banner",
    description: "Professionally designed Apex Legends banner templates"
  },
  {
    href: "https://www.youtube.com/watch?v=IliDU2wBgOs",
    icon: "bx-target-lock",
    title: "FREE Warzone 2.0 Custom Banner",
    description: "Custom Warzone banner template for your streams"
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
  useCanonical('/extra-links');
  useEffect(() => { document.title = 'Extra Links | Austin Davenport'; }, []);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleClick = (url: string, isCopyable = false, isInternalLink = false) => {
    if (isCopyable) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
      });
      return;
    }
    if (isInternalLink) {
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
            alt="Austin Davenport"
          />
        </S.ProfileImage>
        <S.ProfileInfo>
          <h1>Austin's Extra Resources</h1>
          <p>Additional tools and resources for content creators</p>
        </S.ProfileInfo>
      </S.Profile>

      <S.VideoFeature>
        <iframe
          src="https://www.youtube.com/embed/3a8-PfYVLgo"
          title="Austin Davenport - Featured Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </S.VideoFeature>

      <S.LinksGrid>
        {linkItems.map((item, index) => (
          <S.LinkTile
            key={index}
            onClick={() => handleClick(item.href, item.isCopyable, item.isInternalLink)}
            className={[
              item.isInternalLink ? 'back-tile' : '',
              item.isCopyable && copiedLink ? 'copied' : ''
            ].join(' ').trim()}
          >
            <S.TileIcon>
              <i className={`bx ${item.isCopyable ? (copiedLink ? 'bx-check' : 'bx-copy') : item.icon}`} />
            </S.TileIcon>
            <S.TileContent>
              <h3>{item.title}</h3>
              <p>{item.isCopyable && copiedLink ? 'Copied to clipboard!' : item.description}</p>
            </S.TileContent>
          </S.LinkTile>
        ))}
      </S.LinksGrid>
    </S.Container>
  );
};
