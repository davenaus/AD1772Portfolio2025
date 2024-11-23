import React, { useState, useEffect } from 'react';
import { BookOpen, Camera, Edit, Rocket, TrendingUp, Youtube, Video, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

export const YouTubeBlueprint: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePurchase = (type: 'oneTime' | 'membership') => {
    console.log(`Selected ${type} purchase`);
    // navigate('/tools');
  };

  return (
    <S.Container>
      <S.BackgroundGrid />
      <S.BackgroundGradient />

      <S.Hero>
        <S.HeroLogo>
          <S.LogoIcon>
            <BookOpen size={48} />
          </S.LogoIcon>
          <S.LogoRings>
            <S.Ring />
            <S.Ring />
            <S.Ring />
          </S.LogoRings>
        </S.HeroLogo>

        <S.HeroTitle>
          The YouTube Blueprint
          <S.HeroSubtitle>Master the Art of Content Creation</S.HeroSubtitle>
        </S.HeroTitle>

        <S.BadgeContainer>
          {[
            { icon: <Camera />, text: "Professional Production" },
            { icon: <TrendingUp />, text: "0-10K Growth" },
            { icon: <Users />, text: "Community Building" },
            { icon: <Rocket />, text: "Channel Success" }
          ].map((badge, i) => (
            <S.Badge key={i}>
              {badge.icon}
              <span>{badge.text}</span>
            </S.Badge>
          ))}
        </S.BadgeContainer>
      </S.Hero>

      <S.Section>
        <S.JourneyMap>
          {[
            {
              number: "01",
              title: "Channel Foundation",
              desc: "Master the core principles of channel setup and content strategy",
              icon: <Youtube />
            },
            {
              number: "02",
              title: "Content Production",
              desc: "Learn professional video creation from planning to post-production",
              icon: <Video />
            },
            {
              number: "03",
              title: "Growth & Scale",
              desc: "Implement proven strategies to grow your audience and revenue",
              icon: <TrendingUp />
            }
          ].map((step, i) => (
            <S.JourneyStep key={i}>
              <S.StepNumber>{step.number}</S.StepNumber>
              <S.StepContent>
                {step.icon}
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </S.StepContent>
            </S.JourneyStep>
          ))}
        </S.JourneyMap>
      </S.Section>

      <S.PricingContainer>
        <S.PricingCard
          onMouseEnter={() => setHoveredCard('oneTime')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <S.CardTitle>One-Time Purchase</S.CardTitle>
          <S.Price>$13.99</S.Price>
          <S.FeatureList>
            <S.Feature>Complete Blueprint Access</S.Feature>
            <S.Feature>Growth Strategies</S.Feature>
            <S.Feature>Channel Audit Checklist</S.Feature>
            <S.Feature>Tutorial Overview for Entire YouTube Process</S.Feature>
          </S.FeatureList>
          <S.BuyButton onClick={() => handlePurchase('oneTime')}>
            Get Instant Access
          </S.BuyButton>
        </S.PricingCard>

        <S.PricingCard
          featured
          onMouseEnter={() => setHoveredCard('membership')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <S.FeaturedBadge>RECOMMENDED</S.FeaturedBadge>
          <S.CardTitle>Channel Membership</S.CardTitle>
          <S.Price>
            $4.99
            <span>/month</span>
          </S.Price>
          <S.FeatureList>
          <S.Feature>Free Download Of The YouTube Blueprint</S.Feature>
          <S.Feature>Free Link-In-Bio Page Maker License</S.Feature>
          <S.Feature>45% Off All Store Assets</S.Feature>
            <S.Feature>Community Member Spotlight</S.Feature>
          </S.FeatureList>
          <S.BuyButton featured onClick={() => handlePurchase('membership')}>
            Join the Community
          </S.BuyButton>
        </S.PricingCard>
      </S.PricingContainer>

      <S.ProgressBar>
        <S.ProgressFill style={{ width: `${scrollProgress}%` }} />
      </S.ProgressBar>
    </S.Container>
  );
};

export default YouTubeBlueprint;