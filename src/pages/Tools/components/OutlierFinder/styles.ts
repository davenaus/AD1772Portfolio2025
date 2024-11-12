// src/pages/Tools/components/OutlierFinder/styles.ts
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

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
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

export const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
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

  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.9rem;
  }

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

  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue3};
  }

  i {
    font-size: 1.5rem;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

export const Toggle = styled.div`
  background: ${({ theme }) => theme.colors.blue3};
  border-radius: 30px;
  padding: 0.25rem;
  display: inline-flex;
  position: relative;
  cursor: pointer;
  width: 200px;

  @media (max-width: 768px) {
    width: 180px;
  }
`;

export const ToggleOption = styled.div<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 25px;
  text-align: center;
  flex: 1;
  color: ${({ active, theme }) => active ? theme.colors.blue9 : theme.colors.blue11};
  background: ${({ active, theme }) => active ? theme.colors.blue4 : 'transparent'};
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.875rem;
  
  @media (max-width: 768px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.blue9};
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 2rem;
  display: none;

  &.visible {
    display: block;
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

export const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ResultCard = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  transition: all 0.2s ease;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const Thumbnail = styled.img`
  width: 160px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }
`;

export const VideoInfo = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

export const VideoTitle = styled.h3`
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1.1rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding-right: 60px;
  }
`;

export const VideoStats = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }
`;

export const RatioPill = styled.div<{ ratio: number }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  background-color: ${({ ratio }) => {
    if (ratio >= 100) return '#FF4136';
    if (ratio >= 50) return '#7B1FA2';
    if (ratio >= 10) return '#2196F3';
    return '#9E9E9E';
  }};
  color: white;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
  }
`;

export const VideoLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primaryLight};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.blue3};
  border-radius: 6px;
  margin-top: 1rem;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    display: block;
    text-align: center;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue4};
  }
`;