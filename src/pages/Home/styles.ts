import styled, { createGlobalStyle } from 'styled-components';

// Global style
const GlobalStyle = createGlobalStyle`
  :root {
    --blue0:rgb(13, 14, 16);
    --blue1: #0F1113;
    --blue2: #151719;
    --blue3: #1F2123;
    --blue4: #292B2D;
    --blue5: #353739;
    --blue6: #46484A;
    --gray1: #212326;
    --gray2: #282a2d;
    --gray3: #333336;
    --blue9: #EAECEE;
    --blue11: #B1B4B8;
    
    --project1: #FF006E;
    --project2: #FB5607;
    --project3: #FFBE0B;
    --project4:rgb(114, 75, 170);
    --project5: #8338EC;
    --project6: #06D6A0;
  }
  
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--blue1);
    color: var(--blue9);
    line-height: 1.5;
    overflow-x: hidden;
  }
`;

// Container for the entire page
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin: 1.5rem auto;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    margin: 1rem auto;
  }
`;

// Hero Section
const HeroSection = styled.section`
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0;
  }
`;

// Hero Card - Darker version of the regular cards
const HeroCard = styled.div`
  background-color: var(--blue0);
  border-radius: 16px;
  border: 1px solid var(--blue3);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue4);
  }
`;

const HeroCardContent = styled.div`
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  
  @media (max-width: 768px) {
    padding: 2rem;
    min-height: auto;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 16px;
  object-fit: cover;
  border: 1px solid var(--blue3);
  transition: transform 0.3s ease, border-color 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue6);
  }
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
  
  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

const HeroTextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const HeroHeadline = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: var(--blue9);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HeroTagline = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 1rem;
  color: var(--gray3);
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  color: var(--blue11);
  margin: 0 0 2rem;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 auto 2rem;
    text-align: center;
  }
`;

const HeroStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  i {
    font-size: 1.25rem;
    color: var(--gray3);
  }
  
  span {
    font-weight: 600;
    color: var(--blue9);
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

// Buttons
const Button = styled.button`
  background-color: var(--gray1);
  color: var(--blue9);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  
  i {
    font-size: 1.1rem;
  }
  
  &:hover {
    background-color: var(--gray2);
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: var(--blue3);
  
  &:hover {
    background-color: var(--gray2);
    opacity: 0.9;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid var(--gray2);
  
  &:hover {
    background-color: var(--blue2);
    border-color: var(--gray3);
  }
`;

// Sections
const Section = styled.section`
  margin-bottom: 4rem;
  margin-top: 1.2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 3.5rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0;
    color: var(--blue9);
  }
  
  @media (max-width: 480px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const ViewAllButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--blue11);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  
  i {
    font-size: 1.1rem;
  }
  
  &:hover {
    color: var(--blue9);
  }
`;

// Video Grid
const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled.div`
  background-color: var(--blue2);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--blue3);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue6);
    
    > div:first-child > div {
      opacity: 1;
    }
  }
`;

const VideoThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 17, 19, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  i {
    font-size: 3rem;
    color: white;
  }
`;

const VideoInfo = styled.div`
  padding: 1rem;
`;

const VideoTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--blue9);
`;

const VideoViews = styled.span`
  font-size: 0.85rem;
  color: var(--blue11);
`;

// Projects Grid
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: var(--blue2);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--blue3);
  border-top-width: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue6);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
`;

const ProjectInfo = styled.div`
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--blue9);
`;

const ProjectDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--blue11);
`;

// NEW: Redesigned Clients Section as a Card
const ClientsCard = styled.div`
  background-color: var(--blue2);
  border-radius: 16px;
  border: 1px solid var(--blue3);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue6);
  }
`;

const ClientsCardContent = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ClientsHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: var(--blue9);
  }
  
  p {
    color: var(--blue11);
    font-size: 1rem;
    margin: 0;
    line-height: 1.5;
  }
  
  @media (max-width: 480px) {
    h2 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ClientItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  background-color: var(--blue3);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: var(--blue4);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: row;
    text-align: left;
    gap: 1rem;
  }
`;

const ClientLogo = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--blue4);
  transition: border-color 0.3s ease;
  
  ${ClientItem}:hover & {
    border-color: var(--blue6);
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
  
  @media (max-width: 480px) {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
  }
`;

const ClientInfo = styled.div`
  text-align: center;
  
  @media (max-width: 480px) {
    text-align: left;
    flex-grow: 1;
  }
`;

const ClientName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--blue9);
  margin-bottom: 0.25rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ClientSubscribers = styled.div`
  font-size: 0.75rem;
  color: var(--blue11);
  line-height: 1.2;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ClientsShowMore = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--blue4);
  
  span {
    color: var(--blue11);
    font-size: 0.9rem;
    font-style: italic;
  }
`;

// About Section & Tech Stack
const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1.75fr 2.25fr;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: var(--blue2);
  border-radius: 16px;
  border: 1px solid var(--blue3);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue6);
  }
`;

const AboutCard = styled(Card)``;

const StackCard = styled(Card)``;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem;
  color: var(--blue9);
`;

const AboutText = styled.p`
  color: var(--blue11);
  margin: 0 0 1.5rem;
  line-height: 1.6;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: var(--blue3);
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--blue4);
  }
`;

const TechLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const TechName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--blue9);
  text-align: center;
`;

// CTA Section
const CtaSection = styled.section`
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const CtaContent = styled.div`
  background-color: var(--blue2);
  border-radius: 16px;
  border: 1px solid var(--blue3);
  padding: 3rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue6);
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const CtaTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--blue9);
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const CtaText = styled.p`
  font-size: 1.1rem;
  color: var(--blue11);
  margin: 0 0 2rem;
`;

const CtaButton = styled(PrimaryButton)`
  margin: 0 auto;
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

// Footer
const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid var(--blue3);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterText = styled.p`
  color: var(--blue11);
  font-size: 0.9rem;
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--blue2);
  border: 1px solid var(--blue3);
  border-radius: 50%;
  color: var(--blue9);
  font-size: 1.25rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--blue3);
    transform: translateY(-3px);
    color: var(--gray4);
  }
`;

// Video Modal
const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  cursor: pointer;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16/9;
  position: relative;
  z-index: 1001;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -3rem;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1002;
  
  @media (max-width: 768px) {
    top: -2.5rem;
    right: 0;
  }
`;

const VideoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
`;

export const Styles = {
  GlobalStyle,
  Container,
  HeroSection,
  HeroCard,
  HeroCardContent,
  HeroContent,
  ProfileImageContainer,
  ProfileImage,
  HeroTextContent,
  HeroHeadline,
  HeroTagline,
  HeroDescription,
  HeroStats,
  StatItem,
  HeroActions,
  Button,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeader,
  ViewAllButton,
  VideoGrid,
  VideoCard,
  VideoThumbnail,
  VideoOverlay,
  VideoInfo,
  VideoTitle,
  VideoViews,
  ProjectsGrid,
  ProjectCard,
  ProjectImage,
  ProjectInfo,
  ProjectTitle,
  ProjectDescription,
  ClientsCard,
  ClientsCardContent,
  ClientsHeader,
  ClientsGrid,
  ClientItem,
  ClientLogo,
  ClientInfo,
  ClientName,
  ClientSubscribers,
  ClientsShowMore,
  TwoColumnGrid,
  Card,
  AboutCard,
  StackCard,
  CardContent,
  SectionTitle,
  AboutText,
  TechGrid,
  TechItem,
  TechLogo,
  TechName,
  CtaSection,
  CtaContent,
  CtaTitle,
  CtaText,
  CtaButton,
  Footer,
  FooterText,
  SocialLinks,
  SocialLink,
  VideoModal,
  ModalBackdrop,
  ModalContent,
  CloseButton,
  VideoIframe
};