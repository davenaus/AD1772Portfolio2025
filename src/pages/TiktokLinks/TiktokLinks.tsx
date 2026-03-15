// src/pages/TiktokLinks/TiktokLinks.tsx
import React, { useEffect, useState } from 'react';
import { LinkItem } from './types';
import { S } from './styles';
import { useCanonical } from '../../utils/useCanonical';

const linkItems: LinkItem[] = [
  {
    href: "https://youtool.io",
    icon: "bx-search-alt",
    title: "YouTool.io",
    description: "Free tools to optimize your content"
  },
  {
    href: "https://discord.com/invite/vuKtEXJ",
    icon: "bxl-discord-alt",
    title: "Join Discord",
    description: "Connect with our community of creators"
  },
  {
    href: "/contact",
    icon: "bx-envelope",
    title: "Get in Touch",
    description: "Let's work together",
    isInternalLink: true
  },
  {
    href: "/extra-links",
    icon: "bx-chevron-right",
    title: "More",
    description: "Discover additional resources and tools",
    isInternalLink: true
  }
];

const VIDEO_ID = '3a8-PfYVLgo';

export const TiktokLinks: React.FC = () => {
  useCanonical('/links');
  useEffect(() => { document.title = 'Links | Austin Davenport'; }, []);
  const [videoActive, setVideoActive] = useState(false);

  const handleLinkClick = (url: string, isInternalLink = false) => {
    if (isInternalLink) {
      window.location.href = url;
      return;
    }
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.ProfileCard>
          <S.AvatarContainer>
            <S.Avatar>
              <img
                src="https://64.media.tumblr.com/44ab51b7b5c73d1a68f728d92becd3b3/029f5263603a04c1-96/s2048x3072/cd2e6fdd67cb4fe3ad30bf06ef4b75c42291e2f6.pnj"
                alt="Austin Davenport"
              />
            </S.Avatar>
            <S.StatusDot />
          </S.AvatarContainer>

          <S.ProfileInfo>
            <S.Username>Austin Davenport</S.Username>
            <S.JobTitle>Video Editor & Creator</S.JobTitle>
          </S.ProfileInfo>
        </S.ProfileCard>

        <S.VideoFeature>
          {videoActive ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=1`}
              title="Austin Davenport - Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <S.VideoThumbnail onClick={() => setVideoActive(true)}>
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Watch Austin Davenport on YouTube"
              />
              <S.PlayButton />
            </S.VideoThumbnail>
          )}
        </S.VideoFeature>

        <S.LinksGrid>
          {linkItems.map((item, index) => (
            <S.LinkCard
              key={index}
              onClick={() => handleLinkClick(item.href, item.isInternalLink)}
              style={{ '--index': index } as React.CSSProperties}
            >
              <S.CardGlow />
              <S.CardContent>
                <S.IconWrapper>
                  <i className={`bx ${item.icon}`} />
                </S.IconWrapper>
                <S.TextContent>
                  <S.CardTitle>{item.title}</S.CardTitle>
                  <S.CardDescription>{item.description}</S.CardDescription>
                </S.TextContent>
                <S.ActionIcon>
                  <i className={item.isInternalLink ? 'bx bx-chevron-right' : 'bx bx-link-external'} />
                </S.ActionIcon>
              </S.CardContent>
            </S.LinkCard>
          ))}
        </S.LinksGrid>

        <S.BottomSocials>
          <S.SocialIconLink href="https://www.youtube.com/@AustinDavenport" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-youtube" />
          </S.SocialIconLink>
          <S.SocialIconLink href="https://discord.com/invite/vuKtEXJ" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-discord-alt" />
          </S.SocialIconLink>
        </S.BottomSocials>
      </S.ContentWrapper>
    </S.Container>
  );
};
