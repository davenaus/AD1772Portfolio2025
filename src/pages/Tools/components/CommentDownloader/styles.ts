





// src/pages/Tools/components/CommentDownloader/styles.ts
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

export const Card = styled.div`
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
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.16s ease-in-out;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.875rem;
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
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0.875rem;
  }

  &:hover {
    transform: scale(1.13);
  }

  i {
    font-size: 1.7rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Status = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.9rem;

  @media (max-width: 768px) {
    margin-top: 0.75rem;
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 2rem;
  display: none;
  text-align: center;

  &.visible {
    display: block;
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem auto;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    margin: 1rem auto;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }

  i {
    margin-right: 0.5rem;
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem 1.25rem;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;