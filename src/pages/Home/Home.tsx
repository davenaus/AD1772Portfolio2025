import React, { useState, useEffect } from 'react';
import { Styles as S } from './styles';

export const Home: React.FC = () => {
  // For video modal
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);
  
  // For client carousel
  const [currentClientIndex, setCurrentClientIndex] = useState(0);
  
  // Add window width state to track screen size
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 992);

  // Client navigation handlers
  const nextClient = () => {
    setCurrentClientIndex((prev) => 
      prev === clients.length - 1 ? 0 : prev + 1
    );
  };

  const prevClient = () => {
    setCurrentClientIndex((prev) => 
      prev === 0 ? clients.length - 1 : prev - 1
    );
  };

  const goToClient = (index: number) => {
    setCurrentClientIndex(index);
  };

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedVideo(null);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Add window resize listener to update window width state
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Featured videos data
  const featuredVideos = [
    {
      id: 'TMvD8sElvRE',
      thumbnail: 'https://64.media.tumblr.com/c100639c89a1290e59ffbd3b6bc006cb/33a93a42223d1da0-ad/s2048x3072/69d049a19dd0121d677cd97edb6ae5b382166df2.jpg',
      title: 'YouTube SEO Masterclass',
      subtext: 'Growth Tactics'
    },
    {
      id: 'q5UdGiwYUOE',
      thumbnail: 'https://64.media.tumblr.com/dda6d6f2208b9d7bdce146f0d9d93f20/33a93a42223d1da0-c4/s2048x3072/4f82b8914ff1a70e403b18c0b662a5c33510c264.jpg',
      title: 'Premiere Pro Masterclass',
      subtext: 'Video Editing'
    },
    {
      id: 'Y57I63U4TcY',
      thumbnail: 'https://64.media.tumblr.com/be3088e4ac1bb9819de9216261d1d5a6/33a93a42223d1da0-6a/s2048x3072/81b2124240524b5d10b30c5f96cf178bf37973cd.jpg',
      title: 'OBS Masterclass',
      subtext: 'Streaming Skills'
    },
    {
      id: 'ZXxaK7LupHo',
      thumbnail: 'https://64.media.tumblr.com/7fe5e7aa0c3c42aea766681fe948d88b/33a93a42223d1da0-a6/s2048x3072/8720e8e843b92ecdaace8c569d05c4bf2834bd1c.jpg',
      title: 'Creator Tech Tips',
      subtext: 'Productivity Hacks'
    }
  ];
  
  // Featured projects data
  const featuredProjects = [
    {
      title: 'Clipboard It',
      description: 'Premiere Pro plugin for easy copy-paste',
      background: 'https://imgproxy.fourthwall.com/NSD2usD9hYTysLDRn1nsl2le1Wj4LLGV3f-bqk1H1X0/w:720/sm:1/enc/OTk0NmI0NjQ1Yzli/YTczNN7v8sTooFr_/69APhnk512swjQmE/LU9wZ_gIvt3bh8II/9lan9TDd1fgslTKJ/_rVZKHQCjnTmPrYM/UTZavpQa9yN10avg/fBm3bDJjQOw1jAVI/S4jsp4uU7ius6dKQ/D20X9SLihVh0HP6e/8hBCkYiyyD_uUslv/E8aUFXGNSvdoX8no/KeRqwkLy-Jf2qmDF/OG5FrQ.webp',
      color: 'var(--project5)',
    },
    {
      title: 'Link-In-Bio Page Maker',
      description: 'A better alternative to LinkTree',
      background: 'https://imgproxy.fourthwall.com/-sRNLeEHYub1Mu4_xFNuPc95aDsiehM3lx357-MSABA/w:720/sm:1/enc/MzNhNjY2ZDQxNTgw/MTFjOOWDEr73rTRg/jwnx6r_nJ5Q8_Q4i/ON0Gp-3RzRCwFgkV/1sJ8rfpnzD8j-hv_/owsCCRovJvvByk81/45hia7fp97fjLYLh/OqcUnH2RioER1EPb/DqyBl2UODmnwBUiM/nXAeCzvDqreP605T/ag5EijuzGACLixFm/CnRSPj53pkbblXYN/Qrgts9LR--shPaga/z8WyYg.webp',
      color: 'var(--project6)',
    },
    {
      title: 'YouTool.io',
      description: 'Free YouTube Tools for Creators',
      background: 'https://64.media.tumblr.com/fadeab19b44d32057e805c4b4e055c77/94a675443d61b680-f2/s2048x3072/b5f397197173495ea4c016911869761e46deec86.pnj',
      color: 'var(--project4)',
    }
  ];
  
  // Filter projects based on screen width for mobile
  // Only show first 2 projects when screen width is below 768px (typical mobile breakpoint)
  const displayedProjects = windowWidth <= 768 ? featuredProjects.slice(0, 2) : featuredProjects;
  
  // Clients data - complete list
  const clients = [
    { name: 'Ben Shapiro', subscribers: '7.23M subscribers', image: 'https://yt3.ggpht.com/IwzYq-xS_iXyxcilUGmrrhP2AMTAi1F2siYICQVvE_35j-BX657pww-fZk1baN8TyyTtn6Zg=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Jordan Peterson', subscribers: '8.69M subscribers', image: 'https://yt3.ggpht.com/EjQNRQGTldnH7kUHaRRWa_yOa6Po-GODJN0xqJEmsji96cAVBdLggAgHlw2DbKSvomyo3xm2CX0=s800-c-k-c0x00ffffff-no-rj' },
    { name: 'The Daily Wire', subscribers: '146K subscribers', image: 'https://yt3.ggpht.com/DtCfJHbG0-AHij7NPr6b4ka84LoJlkHnLJVIxE_7Pmrv9KsAwIzFyiHITrbZK8zngUxaWCesiFw=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Michael Knowles', subscribers: '2.34M subscribers', image: 'https://yt3.ggpht.com/Hv7ouCTt_NaxfS_Y5q-uEqT3AWZH3Js2xvy79MNk17FQCKTjNP0P1FTgBSEzGjgM8Nh32BZRyg=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Matt Walsh', subscribers: '3.21M subscribers', image: 'https://yt3.ggpht.com/DLvOLEc5u6jeSz7XBOD0PUXGFVmK2DYYfh1SAAImRTGrOFDCVXLKNepkxtVpurVTTpYZiVzL=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Andrew Klavan', subscribers: '808K subscribers', image: 'https://yt3.ggpht.com/xGjur8_mrSCyqG0xHAr72BJvOVDQbW69w3n2VvnaMAWjJd-uf0p7DQPvymDzVFzU25XsIwFH=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'The Comments Section', subscribers: '3.83M subscribers', image: 'https://yt3.ggpht.com/10_rFOtSfO_sn_rREl6gZR5QBdhaKX1YDzT5OdgtIeKW_beU9wtLnu1OCjDjn2COCe8VI7fd=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'DailyWire+', subscribers: '3.32M subscribers', image: 'https://yt3.ggpht.com/AW8dnBtJph6NI0a_hPk09hcv37bfpI4IIZKswvJOwh9epCuJvuR5QtWYZ0mx3U2-_DmqTNxx_g=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Hard Cut', subscribers: '12.3K subscribers', image: 'https://yt3.ggpht.com/HmrJaNgU1A9kXCPVNCY8F8dKDBy1KShenc98VvFoqg3sfnHGQsXK29N-cUX-ppGMSibUAPezOQM=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Cyndi Thomson', subscribers: '6.58K subscribers', image: 'https://yt3.ggpht.com/DNEAWCN549yeUhFojkXsoQneer4we8uZ59XGZpwivvnxx2GmCFU3TUhUrIlWm4qWNR3CcPBDvA=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Star Street', subscribers: '404 subscribers', image: 'https://yt3.ggpht.com/gN2fDxYL8h98Sh_bBmyg8_cqDfC5rZ2gaAiGeSfUhkYo9Kn5L8Xk9jBXkHsg-c8yO9NIlLnW=s88-c-k-c0x00ffffff-no-rj' },
    { name: 'Bloom Digital Weddings', subscribers: '69 subscribers', image: 'https://yt3.ggpht.com/0ZS9_Xu3mYETBmIu8LrB-C_0yazM5hJ1JmLBiB4MXGjQbIB4aDowXe2rnDVwMUy9QrMBb6UlY_o=s88-c-k-c0x00ffffff-no-rj' },
  ];
  
  // Tech stack data - expanded
  const techStack = [
    {
      name: 'Premiere Pro',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1200px-Adobe_Premiere_Pro_CC_icon.svg.png'
    },
    {
      name: 'After Effects',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/2101px-Adobe_After_Effects_CC_icon.svg.png'
    },
    {
      name: 'Photoshop',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png'
    },
    {
      name: 'Lightroom',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg/2101px-Adobe_Photoshop_Lightroom_CC_logo.svg.png'
    },
    {
      name: 'DaVinci Resolve',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png'
    },
    {
      name: 'OBS',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/OBS_Studio_logo.png'
    }
  ];

  return (
    <S.Container>
      <S.GlobalStyle />
      
      {/* Hero Section */}
      <S.HeroSection>
        <S.HeroContent>
          <S.ProfileImage src="https://64.media.tumblr.com/6301cf4c94d066c9579b2793781d7f2f/20c99a0f9ebff902-e0/s2048x3072/39d455383d100643b051d73059a46beac9b086a4.pnj" alt="Austin Davenport" />
          <div>
            <S.HeroHeadline>Austin Davenport</S.HeroHeadline>
            <S.HeroTagline>Professional Video Editor</S.HeroTagline>
            <S.HeroDescription>
              I'm a video editor first. With over 10 years of experience working with top creators, I've edited content with over 130M+ views. I also build tools that help creators move faster and look better.
            </S.HeroDescription>
            <S.HeroStats>
              <S.StatItem>
                <i className='bx bxl-youtube'></i>
                <span>130M+ views</span>
              </S.StatItem>
              <S.StatItem>
                <i className='bx bx-video'></i>
                <span>300+ videos</span>
              </S.StatItem>
              <S.StatItem>
                <i className='bx bx-user'></i>
                <span>20+ creators</span>
              </S.StatItem>
            </S.HeroStats>
            <S.HeroActions>
              <S.PrimaryButton onClick={() => setSelectedVideo({id: 'TMvD8sElvRE', title: 'Austin Davenport Showreel'})}>
                <i className='bx bx-play-circle'></i>
                Watch Showreel
              </S.PrimaryButton>
              <S.SecondaryButton onClick={() => window.location.href='/portfolio'}>
                <i className='bx bx-folder'></i>
                View Portfolio
              </S.SecondaryButton>
            </S.HeroActions>
          </div>
        </S.HeroContent>
      </S.HeroSection>
      
      {/* Featured Videos Section */}
      <S.Section>
        <S.SectionHeader>
          <h2>Featured Work</h2>
          <S.ViewAllButton href="/portfolio">
            View All
            <i className='bx bx-right-arrow-alt'></i>
          </S.ViewAllButton>
        </S.SectionHeader>
        <S.VideoGrid>
          {featuredVideos.map(video => (
            <S.VideoCard key={video.id} onClick={() => setSelectedVideo(video)}>
              <S.VideoThumbnail style={{ backgroundImage: `url(${video.thumbnail})` }}>
                <S.VideoOverlay>
                  <i className='bx bx-play-circle'></i>
                </S.VideoOverlay>
              </S.VideoThumbnail>
              <S.VideoInfo>
                <S.VideoTitle>{video.title}</S.VideoTitle>
                <S.VideoViews>{video.subtext}</S.VideoViews>
              </S.VideoInfo>
            </S.VideoCard>
          ))}
        </S.VideoGrid>
      </S.Section>
      
      {/* Clients Section */}
      <S.Section>
        <S.ClientsSection>
          <S.ClientsTextContainer>
            <h2>I've Worked With</h2>
            <p>Helping top creators deliver quality content that reaches millions of viewers</p>
          </S.ClientsTextContainer>
          
          <S.ClientsDisplayContainer>
            <S.ClientNavArrow onClick={prevClient} position="left">
              <i className='bx bx-chevron-left'></i>
            </S.ClientNavArrow>
            
            <S.ClientCardContainer>
              <S.ClientCard>
                <S.ClientLogo src={clients[currentClientIndex].image} alt={clients[currentClientIndex].name} />
                <S.ClientInfo>
                  <S.ClientName>{clients[currentClientIndex].name}</S.ClientName>
                  <S.ClientSubscribers>{clients[currentClientIndex].subscribers}</S.ClientSubscribers>
                </S.ClientInfo>
              </S.ClientCard>
            </S.ClientCardContainer>
            
            <S.ClientNavArrow onClick={nextClient} position="right">
              <i className='bx bx-chevron-right'></i>
            </S.ClientNavArrow>
          </S.ClientsDisplayContainer>
        </S.ClientsSection>
      </S.Section>
      
      {/* Projects Section - UPDATED to use filtered projects */}
      <S.Section>
        <S.SectionHeader>
          <h2>Projects & Tools</h2>
          <S.ViewAllButton href="/projects">
            View All
            <i className='bx bx-right-arrow-alt'></i>
          </S.ViewAllButton>
        </S.SectionHeader>
        <S.ProjectsGrid>
          {displayedProjects.map((project, index) => (
            <S.ProjectCard key={index} style={{ borderTopColor: project.color }}>
              <S.ProjectImage style={{ backgroundImage: `url(${project.background})` }} />
              <S.ProjectInfo>
                <S.ProjectTitle>{project.title}</S.ProjectTitle>
                <S.ProjectDescription>{project.description}</S.ProjectDescription>
              </S.ProjectInfo>
            </S.ProjectCard>
          ))}
        </S.ProjectsGrid>
      </S.Section>
      
      {/* About Section with Tech Stack */}
      <S.Section>
        <S.TwoColumnGrid>
          <S.AboutCard>
            <S.CardContent>
              <S.SectionTitle>About Me</S.SectionTitle>
              <S.AboutText>
                I'm a video editor and developer building tools to make content creation faster, better, and more fun. I blend technical expertise with creative vision to deliver compelling content that resonates with audiences.
                <br /><br />
                With a background in both video production and software development, I understand the unique challenges creators face and build solutions that address real needs.
              </S.AboutText>
              <S.Button onClick={() => window.open('https://youtube.com/@AustinDavenport', '_blank')}>
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
                    <S.TechLogo src={tech.logo} alt={tech.name} />
                    <S.TechName>{tech.name}</S.TechName>
                  </S.TechItem>
                ))}
              </S.TechGrid>
            </S.CardContent>
          </S.StackCard>
        </S.TwoColumnGrid>
      </S.Section>
      
      {/* Contact CTA Section */}
      <S.CtaSection>
        <S.CtaContent>
          <S.CtaTitle>Ready to work together?</S.CtaTitle>
          <S.CtaText>Let's create something amazing</S.CtaText>
          <S.CtaButton onClick={() => window.location.href='/contact'}>
            <i className='bx bx-envelope'></i>
            Get in Touch
          </S.CtaButton>
        </S.CtaContent>
      </S.CtaSection>
      
      {/* Footer */}
      <S.Footer>
        <S.FooterText>© 2025 Austin Davenport. All rights reserved.</S.FooterText>
        <S.SocialLinks>
          <S.SocialLink href="https://youtube.com/@AustinDavenport" target="_blank">
            <i className='bx bxl-youtube'></i>
          </S.SocialLink>
          <S.SocialLink href="https://x.com/A__Davenport" target="_blank">
            <i className='bx bxl-twitter'></i>
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