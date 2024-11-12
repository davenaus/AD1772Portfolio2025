// src/pages/Tools/components/PlaylistAnalyzer/styles.ts
import styled from 'styled-components';



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
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.13);
  }

  i {
    font-size: 1.7rem;
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 2rem;
  display: none;

  &.visible {
    display: block;
  }
`;



export const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.blue9};
  padding-left: 0.75rem;
  border-left: 3px solid ${({ theme }) => theme.colors.blue9};
  font-weight: 600;
`;



export const ChannelLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const ChannelInfo = styled.div`
  flex: 1;
`;

export const ChannelName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.25rem;
`;

export const SubscriberCount = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.blue11};
`;

export const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 0.9rem;
  }
`;

export const SectionSubtitle = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.blue11};
  margin-bottom: 0.5rem;
`;





export const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;


export const SearchBar = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.16s ease-in-out;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    margin: 0 1rem;
  }
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const GridItem = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ChannelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-height: 300px;
  }
`;

export const ChannelItem = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.blue3};
  border-radius: 8px;
  padding: 1rem;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    padding: 0.75rem;
  }
`;