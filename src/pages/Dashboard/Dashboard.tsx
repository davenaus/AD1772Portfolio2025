import React from 'react';
import { Link } from 'react-router-dom';
import { useCountdown } from '../../hooks/useCountdown';
import { DashboardTile } from '../../components/DashboardTile/DashboardTile';
import { Button } from '../../components/Button/Button';
import { ToolsCarousel } from '../../components/ToolsCarousel/ToolsCarousel';
import { Styles as S } from './styles';

export const Dashboard: React.FC = () => {
  const timeUntilNextVideo = useCountdown();

  // Static video embed
  const renderVideoContent = () => {
    return (
      <S.VideoEmbed>
        <iframe
          src="https://www.youtube.com/embed/TMvD8sElvRE"
          title="YouTube Video"
          allowFullScreen
        />
      </S.VideoEmbed>
    );
  };

  return (
    <S.DashboardGrid>
      {/* Hero Section */}
      <S.FullWidthTile>
        <S.TileContent>
          <S.HeroTitle>Hey, I'm Austin Davenport</S.HeroTitle>
          <p style={{ color: '#b1b4b8', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
            Professional Video Editor & Developer
          </p>
          <p style={{ color: '#b1b4b8', marginBottom: '1rem' }}>
            I build time-saving tools to help creators grow their online presence.
            Through my experience in development and content creation, I've helped thousands
            of creators streamline their workflow and reach their audience.
          </p>
          <Button icon="bx bx-link-external" as={Link} to="/portfolio">
            Portfolio
          </Button>
        </S.TileContent>
        <S.PreviewBox>
          <img
            src="https://64.media.tumblr.com/2b4fc6ec0ab07be5a7eb95f3a33cdc51/cc21b18983fb870d-4b/s2048x3072/df9836cc3b379a03ad02cc5b0e0224df73c4d059.pnj"
            alt="Austin Davenport"
          />
        </S.PreviewBox>
      </S.FullWidthTile>

      {/* Regular Tiles */}
      <S.RegularTiles>
        {/* YouTube Tile */}
        <DashboardTile
          icon="bx bxl-youtube"
          title="YouTube Channel"
          subtitle="Weekly content about creator tools & growth strategies"
          onClick={() => window.open('https://www.youtube.com/@AustinDavenport', '_blank')}
        >
          <S.CountdownBox>
            <i className='bx bx-video' />
            <span>Next Video:</span>
            <span>{timeUntilNextVideo}</span>
          </S.CountdownBox>

          <p style={{ color: '#b1b4b8', marginBottom: '1rem' }}>
            Join over 10,000 creators learning how to optimize their content and grow their online presence.
            New videos every Saturday at 12 PM CST.
          </p>

          {renderVideoContent()}
        </DashboardTile>

        {/* Tools Tile */}
        <DashboardTile
          icon="bx bx-wrench"
          title="My YouTube Tools"
          subtitle="Free analytics & optimization tools"
          onClick={() => window.location.href = '/tools'}
        >
          <S.ToolBadge>12 Tools</S.ToolBadge>
          <p style={{ color: '#b1b4b8', marginBottom: '1rem' }}>
            Access a comprehensive collection of tools designed to analyze your content performance,
            optimize your reach, and streamline your workflow.
          </p>
          <ToolsCarousel />
        </DashboardTile>
      </S.RegularTiles>

      {/* Store Section */}
      <S.FullWidthTile>
        <S.TileContent>
          <S.StoreHeader>
            <S.IconWrapper>
              <i className='bx bx-store' />
            </S.IconWrapper>
            <div>
              <h3>Digital Assets</h3>
              <p>Premium resources and templates</p>
            </div>
          </S.StoreHeader>
          <p style={{ color: '#b1b4b8', marginBottom: '1rem' }}>
            High-quality digital products to help you streamline your content creation workflow
            and grow your online presence.
          </p>
          <Button
            icon="bx bx-shopping-bag"
            onClick={() => window.open('https://bit.ly/shopaustindavenport', '_blank')}
          >
            View All Assets
          </Button>
        </S.TileContent>
        <S.StoreGrid>
          <S.StoreItem
            href="https://bit.ly/Link-In-Bio-Page-Maker"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://imgproxy.fourthwall.com/GVzJ1JxNmPVEeuaRpJKf1xrGKh6dQiIsweKij4N3gpA/w:900/sm:1/enc/ZWI0NGFkNjMzYjJh/YzdiZo9hrRNXK67i/aIov9MeXeWn0V-s-/0F4_cqFqrKG1phKX/mf4cJZyhTasDRFhh/zEMuFGz5ectkxzGA/WJDdo0p58u84YPaE/yJbmq_-7c5_vIooS/GIaqQ6DKId4h3GPq/-I4iOqxNrG1seOZ0/-zJ6rg48pfYSegfN/yFpNjCWoMrOwi8zo/7AuRKoBlMfsURrx5/RZlvOQ.webp"
              alt="Link in Bio Maker"
            />
            <S.StoreItemOverlay>Link in Bio Page Maker</S.StoreItemOverlay>
          </S.StoreItem>
          <S.StoreItem
            href="https://bit.ly/YouTuberNotionTemplate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://imgproxy.fourthwall.com/EE4Gn9ScYRYwLnJ4SSHPMZs0aSEc7LumbPGIkstzKEw/w:900/sm:1/enc/OTdkMWVkNmRmMjE2/MjM4OGFowOqxjJTz/Ct5a9kfnW9b_68V7/OdbtUTeQVWsijjXm/WZTXnZJe6HFfrR7E/FgdzRvYMmlizc8UN/zFjvq3Zr2xqkC1CN/s0YFE7uRsfI5Zv1c/cLIaw_glZE9qFGsM/Sg7d5r0J71afXPGn/BGOL6tgYVtzK2NRU/mtQZKKaihoP3DQYy/CAW_CNv85RRp98ID/ukYFBQ.webp"
              alt="Notion Template"
            />
            <S.StoreItemOverlay>Creator Notion Template</S.StoreItemOverlay>
          </S.StoreItem>
        </S.StoreGrid>
      </S.FullWidthTile>

      {/* Contact Footer */}
      <S.ContactTile>
        <S.ContactInfo>
          <h3>Interested in working with me?</h3>
          <p>Let's collaborate on your next project</p>
        </S.ContactInfo>
        <Button icon="bx bx-envelope" as={Link} to="/contact">
          Contact Me
        </Button>
      </S.ContactTile>
    </S.DashboardGrid>
  );
};

export default Dashboard;