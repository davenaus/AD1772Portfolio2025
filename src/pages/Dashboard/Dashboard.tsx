import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCountdown } from '../../hooks/useCountdown';
import { DashboardTile } from '../../components/DashboardTile/DashboardTile';
import { Button } from '../../components/Button/Button';
import { ToolsCarousel } from '../../components/ToolsCarousel/ToolsCarousel';
import { youtubeService, YouTubeVideo } from '../../services/youtubeService';
import { Styles as S } from './styles';

export const Dashboard: React.FC = () => {
  const timeUntilNextVideo = useCountdown();
  const [latestVideo, setLatestVideo] = useState<YouTubeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const video = await youtubeService.getLatestVideo();
        setLatestVideo(video);
      } catch (error) {
        console.error('Error fetching latest video:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  const renderVideoContent = () => {
    if (isLoading) {
      return (
        <S.VideoEmbed>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: 'var(--blue-3)'
          }}>
            <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '2rem', color: 'var(--blue-9)' }} />
          </div>
        </S.VideoEmbed>
      );
    }

    if (!latestVideo) {
      return (
        <S.VideoEmbed>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: 'var(--blue-3)',
            color: 'var(--blue-11)'
          }}>
            Unable to load video
          </div>
        </S.VideoEmbed>
      );
    }

    return (
      <S.VideoEmbed>
        <iframe
          src={`https://www.youtube.com/embed/${latestVideo.id}`}
          title={latestVideo.title}
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
            src="https://64.media.tumblr.com/fc99516989bfda082f841096679d3815/6c0f466b487a20d6-7b/s2048x3072/f7127aae5f69f09c63095623bc1373759f3522c3.pnj"
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
            onClick={() => window.open('https://bit.ly/austindavenportstore', '_blank')}
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
              src="https://imgproxy.fourthwall.com/o9dEw4Qd_EB4aWTjDFG_9C4p2VgtK-rsDvoA00XgFVQ/w:900/sm:1/enc/YTNkMGRlMDhhMTdh/NDI0N2mFxBJEoc49/EqsoAbGC32c1IXvG/vQXU07bEWCW5uIKs/r5EZ3rY-V_MVeFVN/dBKPuItyCeNcTZQR/ZhBFdg6jBcRGBY0_/SuAuN5Yxo0BUQZWR/bJ1mmF-w8pyscKoY/zBDZSIq0mmo9iBN3/VKYa93nC8jE3pRGH/LhyxZ75D-J4-l7b_/f32eDMXxPqisHgA-/bDXVzg.webp"
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