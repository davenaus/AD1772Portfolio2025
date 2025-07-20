// src/pages/TiktokLinks/TiktokLinks.tsx - Glass/Neumorphism Version with Theme Colors
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { LinkItem } from './types';
import { S } from './styles';

const linkItems: LinkItem[] = [
  {
    href: "https://www.youtool.io/link-in-bio-page-maker",
    icon: "bx-link",
    title: "My Linktree Alternative",
    description: "Create your professional link-in-bio page",
    featured: true
  },
  {
    href: "https://youtool.io",
    icon: "bx-search-alt",
    title: "YouTool.io",
    description: "Free tools to optimize your content"
  },
  {
    href: "https://shop.austindavenport.com/collections/all",
    icon: "bx-shopping-bag",
    title: "Templates & Resources",
    description: "Professional editing templates"
  },
    {
    href: "https://discord.com/invite/vuKtEXJ",
    icon: "bxl-discord-alt",
    title: "Join Discord",
    description: "Connect with our community of creators"
  },
  {
    href: "#",
    icon: "bx-envelope",
    title: "Get in Touch",
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
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleLinkClick = (url: string, isCopyable = false, isInternalLink = false) => {
    if (isCopyable) {
      navigator.clipboard.writeText('austin@austindavenport.com')
        .then(() => {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 3000);
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
      <S.BackgroundShapes>
        <S.Shape className="shape-1" />
        <S.Shape className="shape-2" />
        <S.Shape className="shape-3" />
      </S.BackgroundShapes>

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
            <S.Bio>
              Teaching you how to edit like a Pro. Worked with Jordan Peterson, Brett Cooper, and The Money Guy Show.
            </S.Bio>
          </S.ProfileInfo>

          <S.SocialGrid>
            <S.SocialButton href="https://www.youtube.com/@AustinDavenport" target="_blank">
              <i className="bx bxl-youtube"></i>
              <span>YouTube</span>
            </S.SocialButton>
            <S.SocialButton href="https://x.com/A__Davenport" target="_blank">
              <i className="bx bxl-twitter"></i>
              <span>Twitter</span>
            </S.SocialButton>
            <S.SocialButton href="https://www.tiktok.com/@austindavenport_" target="_blank">
              <i className="bx bxl-tiktok"></i>
              <span>TikTok</span>
            </S.SocialButton>
          </S.SocialGrid>
        </S.ProfileCard>

        <S.LinksGrid>
          {linkItems.map((item, index) => (
            <S.LinkCard
              key={index}
              onClick={() => handleLinkClick(item.href, item.isCopyable, item.isInternalLink)}
              className={`${item.featured ? 'featured' : ''} ${item.isCopyable && copiedEmail ? 'copied' : ''} ${item.isInternalLink ? 'more-tile' : ''}`}
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
                  {item.isCopyable ? (
                    <i className={copiedEmail ? "bx bx-check" : "bx bx-copy"} />
                  ) : item.isInternalLink ? (
                    <i className="bx bx-chevron-right" />
                  ) : (
                    <i className="bx bx-link-external" />
                  )}
                </S.ActionIcon>
              </S.CardContent>
              
              {copiedEmail && item.isCopyable && (
                <S.CopiedOverlay>
                  <i className="bx bx-check-circle" />
                  <span>Copied!</span>
                </S.CopiedOverlay>
              )}
            </S.LinkCard>
          ))}
        </S.LinksGrid>
      </S.ContentWrapper>
    </S.Container>
  );
};