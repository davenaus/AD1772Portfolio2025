








// src/pages/Tools/components/ChannelConsultant/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
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

  @media (max-width: 768px) {
    font-size: 2rem;
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
    max-width: 100%;
  }

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
  font-size: 1.7rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.13);
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 2rem;
  display: none;

  &.visible {
    display: block;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const ResultCard = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

export const ChannelDetails = styled.div`
  text-align: center;
  width: 100%;
`;

export const ChannelName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.blue9};
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const SubscriberCount = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.9rem;
  text-align: center;
`;

export const ModesContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

export const ModesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 20% 2rem 20%;

  @media (max-width: 768px) {
    margin: 1rem 5% 2rem 5%;
  }

  li {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.blue11};
    text-align: left;

    strong {
      color: ${({ theme }) => theme.colors.blue9};
    }
  }
`;

export const CopyButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  width: auto;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const AILinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const AIButton = styled.button<{ color: string }>`
  background: ${({ color }) => color};
  color: black;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem 1.25rem;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;