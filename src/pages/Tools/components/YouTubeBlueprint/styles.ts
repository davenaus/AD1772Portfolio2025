import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.blue1};
  color: ${({ theme }) => theme.colors.blue12};
  position: relative;
  overflow: hidden;
`;

export const BackgroundGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    ${({ theme }) => theme.colors.blue6} 1px,
    transparent 1px
  ),
  linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.blue6} 1px,
    transparent 1px
  );
  background-size: 30px 30px;
  opacity: 0.2;
`;

export const BackgroundGradient = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    ${({ theme }) => `${theme.colors.blue9}15`} 0%,
    transparent 70%
  );
`;

export const Hero = styled.div`
  position: relative;
  text-align: center;
  max-width: 6xl;
  margin: 0 auto 6rem;
  perspective: 1000px;
`;

export const HeroLogo = styled.div`
  width: 8rem;
  height: 8rem;
  margin: 0 auto 2rem;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0) rotateX(0); }
    50% { transform: translateY(-10px) rotateX(5deg); }
  }
`;

export const LogoIcon = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.blue2},
    ${({ theme }) => theme.colors.blue3}
  );
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${({ theme }) => theme.colors.blue9};
`;

export const LogoRings = styled.div`
  position: absolute;
  inset: 0;
`;

export const Ring = styled.div`
  position: absolute;
  inset: -5px;
  border: 2px solid ${({ theme }) => theme.colors.blue9};
  border-radius: 35px;
  opacity: 0;
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  &:nth-child(2) { animation-delay: 1s; }
  &:nth-child(3) { animation-delay: 2s; }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.1); opacity: 0; }
    100% { transform: scale(1.2); opacity: 0; }
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.blue9},
    ${({ theme }) => theme.colors.blue12}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const HeroSubtitle = styled.span`
  display: block;
  font-size: clamp(1.2rem, 3vw, 1.4rem);
  color: ${({ theme }) => theme.colors.blue11};
  margin: 1rem auto;
  max-width: 600px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.blue3},
    ${({ theme }) => theme.colors.blue4}
  );
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.blue5};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.blue9};
  }
`;

export const Section = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.blue2};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
`;

export const JourneyMap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 24px;
    top: 15%;
    bottom: 15%;
    width: 0px;
    background: ${({ theme }) => `${theme.colors.blue9}20`};
  }

  @media (min-width: 768px) {
    &::after {
      left: 50%;
    }
  }
`;

export const JourneyStep = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

export const StepNumber = styled.div`
  width: 3rem;
  height: 3rem;
  background: ${({ theme }) => theme.colors.blue9};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue1};
`;

export const StepContent = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.blue4};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(0.5rem);
    border-color: ${({ theme }) => theme.colors.blue9};
  }
`;

export const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 4xl;
  margin: 0 auto;
`;

export const PricingCard = styled.div<{ featured?: boolean }>`
  position: relative;
  background: ${({ theme, featured }) => featured 
    ? `linear-gradient(135deg, ${theme.colors.blue9}10, ${theme.colors.blue9}05)`
    : theme.colors.blue2};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme, featured }) => featured 
    ? theme.colors.blue9 
    : theme.colors.blue3};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const FeaturedBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.blue9},
    ${({ theme }) => theme.colors.blue10}
  );
  padding: 0.25rem 1rem;
    color: ${({ theme }) => theme.colors.blue2};
  border-radius: 0 16px 0 8px;
  font-weight: 500;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.blue12};
  margin-bottom: 1rem;
`;

export const Price = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue12};
  margin: 1.5rem 0;

  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.blue11};
    font-weight: normal;
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  margin: 2rem 0;
`;

export const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.blue11};

  &::before {
    content: "→";
    color: ${({ theme }) => theme.colors.blue9};
  }
`;

export const BuyButton = styled.button<{ featured?: boolean }>`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  background: ${({ theme, featured }) => featured
    ? `linear-gradient(to right, ${theme.colors.blue2}, ${theme.colors.blue3})`
    : theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue12};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const ProgressBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.blue3};
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.blue9};
  transition: width 0.3s ease-out;
`;

export const StepIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: ${({ theme }) => theme.colors.blue4};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
`;

export const StepTitle = styled.h4`
  color: ${({ theme }) => theme.colors.blue12};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const StepDescription = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.blue3};
  margin: 2rem 0;
`;

export const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

export const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.blue3};
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
`;

export const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue12};
  margin-bottom: 0.5rem;
`;

export const MetricLabel = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.875rem;
`;

export const Note = styled.div`
  background: ${({ theme }) => theme.colors.blue3};
  border-left: 4px solid ${({ theme }) => theme.colors.blue9};
  padding: 1rem;
  border-radius: 0 8px 8px 0;
  margin: 2rem 0;
  color: ${({ theme }) => theme.colors.blue11};

  strong {
    color: ${({ theme }) => theme.colors.blue12};
  }
`;