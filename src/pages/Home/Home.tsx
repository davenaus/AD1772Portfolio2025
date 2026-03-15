import React, { useState, useEffect } from 'react';
import { Styles as S } from './styles';
import { useCanonical } from '../../utils/useCanonical';
import { useCountUp } from '../../utils/useCountUp';
import { fetchPortfolioStats } from '../../services/statsService';
import { getPortfolioVideos } from '../../services/supabaseService';
import { youtubeService } from '../../services/youtubeService';

interface FeaturedVideo {
  id: string;
  title: string;
  thumbnail: string;
  tag: string;
}

const formatStatNumber = (n: number): string => {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
};

export const Home: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);

  // Stats state
  const [statsLoading, setStatsLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [totalChannels, setTotalChannels] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  // Animated counters
  const animatedViews = useCountUp(totalViews);
  const animatedVideos = useCountUp(totalVideos);
  const animatedChannels = useCountUp(totalChannels);
  const animatedLikes = useCountUp(totalLikes);

  // Featured portfolio work
  const [featuredWork, setFeaturedWork] = useState<FeaturedVideo[]>([]);
  const [workLoading, setWorkLoading] = useState(true);

  // Fetch real stats from YouTube API
  useEffect(() => {
    fetchPortfolioStats()
      .then(stats => {
        setTotalViews(stats.totalViews);
        setTotalVideos(stats.totalVideos);
        setTotalChannels(stats.totalChannels);
        setTotalLikes(stats.totalLikes);
      })
      .catch(() => {
        // Fall back to static estimates on error
        setTotalViews(146_800_000);
        setTotalVideos(424);
        setTotalChannels(14);
        setTotalLikes(6_400_000);
      })
      .finally(() => setStatsLoading(false));
  }, []);

  // Fetch 4 portfolio entries from Supabase + enrich with YouTube titles/thumbnails
  useEffect(() => {
    const loadWork = async () => {
      try {
        const videos = await getPortfolioVideos();
        const top4 = videos.slice(0, 4);
        const enriched = await Promise.all(
          top4.map(async (v) => {
            const details = await youtubeService.getVideoDetails(v.video_id);
            return {
              id: v.video_id,
              title: details?.title || v.description,
              thumbnail: details?.thumbnail || '',
              tag: v.tag,
            };
          })
        );
        setFeaturedWork(enriched.filter(v => v.thumbnail));
      } catch {
        // Silently fail — section just won't show
      } finally {
        setWorkLoading(false);
      }
    };
    loadWork();
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useCanonical('/');
  useEffect(() => {
    document.title = 'Austin Davenport - Professional Video Editor';
  }, []);

  // Editing services data
  const editingServices = [
    {
      icon: 'bx bx-film',
      title: 'YouTube Video Editing',
      description: 'Long-form and short-form content optimized for retention, with custom graphics, transitions, and color grading.'
    },
    {
      icon: 'bx bx-trending-up',
      title: 'Short-Form & Reels',
      description: 'Fast-paced, engaging edits for TikTok, Instagram Reels, and YouTube Shorts that drive views and follows.'
    },
    {
      icon: 'bx bx-palette',
      title: 'Motion Graphics',
      description: 'Custom animations, lower thirds, intros/outros, and visual effects using After Effects and Premiere Pro.'
    },
    {
      icon: 'bx bx-sun',
      title: 'Color Grading',
      description: 'Professional color correction and grading to establish mood and visual consistency across your content.'
    },
    {
      icon: 'bx bx-headphone',
      title: 'Audio Mixing',
      description: 'Clean, balanced audio with noise reduction, music mixing, and sound design that keeps viewers engaged.'
    },
    {
      icon: 'bx bx-trophy',
      title: 'Brand Storytelling',
      description: "Editorial work that communicates your brand's story and converts viewers into long-term fans and customers."
    }
  ];

  // Clients data
  const featuredClients = [
    { name: 'Ben Shapiro', subscribers: '7.16M subscribers', image: 'https://yt3.ggpht.com/IwzYq-xS_iXyxcilUGmrrhP2AMTAi1F2siYICQVvE_35j-BX657pww-fZk1baN8TyyTtn6Zg=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Jordan Peterson', subscribers: '8.8M subscribers', image: 'https://yt3.ggpht.com/EjQNRQGTldnH7kUHaRRWa_yOa6Po-GODJN0xqJEmsji96cAVBdLggAgHlw2DbKSvomyo3xm2CX0=s800-c-k-c0x00ffffff-no-rj' },
    { name: 'Michael Knowles', subscribers: '2.57M subscribers', image: 'https://yt3.ggpht.com/Hv7ouCTt_NaxfS_Y5q-uEqT3AWZH3Js2xvy79MNk17FQCKTjNP0P1FTgBSEzGjgM8Nh32BZRyg=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Matt Walsh', subscribers: '3.34M subscribers', image: 'https://yt3.ggpht.com/DLvOLEc5u6jeSz7XBOD0PUXGFVmK2DYYfh1SAAImRTGrOFDCVXLKNepkxtVpurVTTpYZiVzL=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Andrew Klavan', subscribers: '812K subscribers', image: 'https://yt3.ggpht.com/xGjur8_mrSCyqG0xHAr72BJvOVDQbW69w3n2VvnaMAWjJd-uf0p7DQPvymDzVFzU25XsIwFH=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'The Money Guy Show', subscribers: '627K subscribers', image: 'https://yt3.ggpht.com/lBMDs2uWynRVfdkPeGU4RrZMBpMPiZYvfc3YPt4u5e12BKauK8_2Zu3dncl6ou5KNagDBVjb-w=s800-c-k-c0x00ffffff-no-rj' },
    { name: 'MrSavior', subscribers: '132K subscribers', image: 'https://yt3.ggpht.com/DqsoBIUJ1rGd2Irl6oiEfla5mcn3nE-WSXfFXJVNRYVs077cRMAqCeAClnIdYW8RYOyatXVeIQ=s800-c-k-c0x00ffffff-no-rj' },
    { name: 'Hard Cut Reviews', subscribers: '22K subscribers', image: 'https://yt3.ggpht.com/HmrJaNgU1A9kXCPVNCY8F8dKDBy1KShenc98VvFoqg3sfnHGQsXK29N-cUX-ppGMSibUAPezOQM=s800-c-k-c0x00ffffff-no-rj' }
  ];

  // Tech stack data
  const techStack = [
    { name: 'Premiere Pro', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1200px-Adobe_Premiere_Pro_CC_icon.svg.png' },
    { name: 'After Effects', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/3840px-Adobe_After_Effects_CC_icon.svg.png' },
    { name: 'Photoshop', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/3840px-Adobe_Photoshop_CC_icon.svg.png' },
    { name: 'Lightroom', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg/500px-Adobe_Photoshop_Lightroom_CC_logo.svg.png' },
    { name: 'DaVinci Resolve', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png' },
    { name: 'OBS', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/OBS_Studio_logo.png' }
  ];

  const statTiles = [
    { count: animatedViews, label: 'Views Edited', icon: 'bx bxl-youtube' },
    { count: animatedVideos, label: 'Videos Produced', icon: 'bx bx-video' },
    { count: animatedChannels, label: 'Channels Served', icon: 'bx bx-user-check' },
    { count: animatedLikes, label: 'Total Likes', icon: 'bx bx-like' },
  ];

  return (
    <S.Container>
      <S.GlobalStyle />

      {/* Hero Section */}
      <S.HeroSection>
        <S.HeroCard>
          <S.HeroCardContent>
            <S.HeroContent>
              <S.ProfileImageContainer>
                <S.ProfileImage
                  src="https://64.media.tumblr.com/44ab51b7b5c73d1a68f728d92becd3b3/029f5263603a04c1-96/s1280x1920/61ad282235a57094aec8b8068662f9225a4f5a14.pnj"
                  alt="Austin Davenport"
                  fetchPriority="high"
                />
              </S.ProfileImageContainer>
              <S.HeroTextContent>
                <S.HeroHeadline>Austin Davenport</S.HeroHeadline>
                <S.HeroTagline>Professional Video Editor</S.HeroTagline>
                <S.HeroDescription>
                  Video editor with 10+ years of experience working with top creators — delivering content that has accumulated over 145M views.
                </S.HeroDescription>
                <S.HeroActions>
                  <S.PrimaryButton onClick={() => setSelectedVideo({ id: 'QPRYfLCxA1g', title: 'Austin Davenport Showreel' })}>
                    <i className='bx bx-play-circle'></i>
                    Watch Demo Reel
                  </S.PrimaryButton>
                  <S.SecondaryButton onClick={() => window.location.href = '/portfolio'}>
                    <i className='bx bx-folder'></i>
                    View Portfolio
                  </S.SecondaryButton>
                </S.HeroActions>
              </S.HeroTextContent>
            </S.HeroContent>
          </S.HeroCardContent>
        </S.HeroCard>
      </S.HeroSection>

      {/* Stats Strip — live from YouTube API */}
      <S.StatsStrip>
        {statTiles.map((stat, index) => (
          <S.StatCard key={index}>
            <S.StatIcon><i className={stat.icon}></i></S.StatIcon>
            {statsLoading ? (
              <S.StatSkeleton />
            ) : (
              <S.StatNumber>{formatStatNumber(stat.count)}</S.StatNumber>
            )}
            <S.StatLabel>{stat.label}</S.StatLabel>
          </S.StatCard>
        ))}
      </S.StatsStrip>

      {/* About Section with Tech Stack */}
      <S.Section>
        <S.TwoColumnGrid>
          <S.AboutCard>
            <S.CardContent>
              <S.SectionTitle>About Me</S.SectionTitle>
              <S.AboutText>
                Skilled professional video editor. I blend technical expertise with creative vision to deliver compelling content that resonates with audiences.
                <br /><br />
                With a background in both video production and post production, I understand the unique challenges creators face and deliver results that address real needs.
              </S.AboutText>
              <S.Button onClick={() => window.open('https://youtube.com/@AustinDavenport', '_blank', 'noopener,noreferrer')}>
                Visit My YouTube
                <i className='bx bx-right-arrow-alt'></i>
              </S.Button>
            </S.CardContent>
          </S.AboutCard>

          <S.StackCard>
            <S.CardContent>
              <S.SectionTitle>My Stack</S.SectionTitle>
              <S.TechGrid>
                {techStack.map((tech, index) => (
                  <S.TechItem key={index}>
                    <S.TechLogo src={tech.logo} alt={tech.name} loading="lazy" />
                    <S.TechName>{tech.name}</S.TechName>
                  </S.TechItem>
                ))}
              </S.TechGrid>
            </S.CardContent>
          </S.StackCard>
        </S.TwoColumnGrid>
      </S.Section>

      {/* Featured Work — from Supabase portfolio */}
      <S.Section>
        <S.SectionHeader>
          <h2>Featured Work</h2>
          <S.ViewAllButton href="/portfolio">
            Full Portfolio
            <i className='bx bx-right-arrow-alt'></i>
          </S.ViewAllButton>
        </S.SectionHeader>
        <S.VideoGrid>
          {workLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <S.VideoCardSkeleton key={i}>
                  <S.VideoThumbnailSkeleton />
                  <S.VideoInfoSkeleton>
                    <S.VideoTitleSkeleton />
                    <S.VideoSubSkeleton />
                  </S.VideoInfoSkeleton>
                </S.VideoCardSkeleton>
              ))
            : featuredWork.map((video) => (
                <S.VideoCard key={video.id} onClick={() => setSelectedVideo({ id: video.id, title: video.title })}>
                  <S.VideoThumbnail style={{ backgroundImage: `url(${video.thumbnail})` }}>
                    <S.VideoOverlay>
                      <i className='bx bx-play-circle'></i>
                    </S.VideoOverlay>
                  </S.VideoThumbnail>
                  <S.VideoInfo>
                    <S.VideoTitle>{video.title}</S.VideoTitle>
                    <S.VideoViews>{video.tag}</S.VideoViews>
                  </S.VideoInfo>
                </S.VideoCard>
              ))
          }
        </S.VideoGrid>
      </S.Section>

      {/* Clients Section */}
      <S.Section>
        <S.ClientsCard>
          <S.ClientsCardContent>
            <S.ClientsHeader>
              <h2>I've Worked With</h2>
              <p>Helping top creators deliver quality content that reaches millions of viewers</p>
            </S.ClientsHeader>
            <S.ClientsGrid>
              {featuredClients.map((client, index) => (
                <S.ClientItem key={index}>
                  <S.ClientLogo src={client.image} alt={client.name} loading="lazy" />
                  <S.ClientInfo>
                    <S.ClientName>{client.name}</S.ClientName>
                    <S.ClientSubscribers>{client.subscribers}</S.ClientSubscribers>
                  </S.ClientInfo>
                </S.ClientItem>
              ))}
            </S.ClientsGrid>
            <S.ClientsShowMore>
              <span>+ 12 more creators and counting</span>
            </S.ClientsShowMore>
          </S.ClientsCardContent>
        </S.ClientsCard>
      </S.Section>

      {/* Editing Services Section */}
      <S.Section>
        <S.SectionHeader>
          <h2>What I Do</h2>
          <S.ViewAllButton href="/portfolio">
            See My Work
            <i className='bx bx-right-arrow-alt'></i>
          </S.ViewAllButton>
        </S.SectionHeader>
        <S.ServicesGrid>
          {editingServices.map((service, index) => (
            <S.ServiceCard key={index}>
              <S.ServiceIcon>
                <i className={service.icon}></i>
              </S.ServiceIcon>
              <S.ServiceTitle>{service.title}</S.ServiceTitle>
              <S.ServiceDescription>{service.description}</S.ServiceDescription>
            </S.ServiceCard>
          ))}
        </S.ServicesGrid>
      </S.Section>

      {/* Contact CTA */}
      <S.CtaSection>
        <S.CtaContent>
          <S.CtaTitle>Ready to work together?</S.CtaTitle>
          <S.CtaText>Let's create something amazing</S.CtaText>
          <S.CtaButton onClick={() => window.location.href = '/contact'}>
            <i className='bx bx-envelope'></i>
            Get in Touch
          </S.CtaButton>
        </S.CtaContent>
      </S.CtaSection>

      {/* Footer */}
      <S.Footer>
        <S.FooterText>© 2026 Austin Davenport. All rights reserved.</S.FooterText>
        <S.SocialLinks>
          <S.SocialLink href="https://youtube.com/@AustinDavenport" target="_blank" rel="noopener noreferrer">
            <i className='bx bxl-youtube'></i>
          </S.SocialLink>
        </S.SocialLinks>
      </S.Footer>

      {/* Video Modal */}
      {selectedVideo && (
        <S.VideoModal>
          <S.ModalContent>
            <S.CloseButton onClick={() => setSelectedVideo(null)}>
              <i className='bx bx-x'></i>
            </S.CloseButton>
            <S.VideoIframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </S.ModalContent>
          <S.ModalBackdrop onClick={() => setSelectedVideo(null)} />
        </S.VideoModal>
      )}
    </S.Container>
  );
};

export default Home;
