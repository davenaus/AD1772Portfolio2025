// src/pages/Tools/components/ChannelAnalyzer/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  font-weight: 600;
`;



export const SearchBar = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
      font-family: 'Poppins', sans-serif;

  &:hover {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.125);
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1rem;
      font-family: 'Poppins', sans-serif;

  &::placeholder {
    color: ${({ theme }) => theme.colors.blue11};
  }

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.blue9};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.blue3};
    transform: scale(1.13);
  }

  i {
    font-size: 1.5rem;
  }
`;



export const ChannelLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 1.5rem;
`;



export const ChannelName = styled.h2`
  color: ${({ theme }) => theme.colors.blue9};
  margin: 0;
  font-size: 1.5rem;
`;

export const SubscriberCount = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.9rem;
`;




export const Metric = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  margin-bottom: 0.5rem;
  margin-left: 1rem;
`;


export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


export const Achievement = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Drawback = styled(Achievement)``;

export const OverallScore = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
`;











export const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 2rem;
  display: none;
  padding: 0 1rem;

  &.visible {
    display: block;
  }
`;

export const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }
`;

export const ChannelDetails = styled.div`
  flex-grow: 1;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    order: 2;
  }
`;

export const VisitButton = styled.a`
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    order: 3;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const BrandingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BrandingItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

export const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 8px;

  @media (max-width: 600px) {
    width: 150px;
    height: 150px;
  }
`;

export const GridItem = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  padding-left: 1rem;
  border-left: 3px solid ${({ theme }) => theme.colors.blue9};
  font-size: 1.2rem;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

export const DownloadButton = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  width: fit-content;

  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;