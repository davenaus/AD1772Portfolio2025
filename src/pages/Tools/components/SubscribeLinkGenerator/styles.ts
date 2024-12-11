// src/pages/Tools/components/SubscribeLinkGenerator/styles.ts

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
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);

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
  font-size: 1.7rem;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.blue3};
    transform: scale(1.13);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Loading = styled.div`
  text-align: center;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const LoadingText = styled.span`
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1.1rem;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.blue3};
  border-top-color: ${({ theme }) => theme.colors.blue9};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  animation: slideUp 0.5s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ChannelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const ChannelThumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.blue3};
`;

export const ChannelInfo = styled.div`
  flex: 1;
`;

export const ChannelTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.5rem;
`;

export const ChannelStats = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.9rem;
`;

export const LinkContainer = styled.div`
  background: ${({ theme }) => theme.colors.blue3};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Link = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.blue9};
  font-family: monospace;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.blue2};
  border-radius: 4px;
  overflow-x: auto;
  white-space: nowrap;
`;

export const CopyButton = styled.button<{ success?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme, success }) => 
    success ? theme.colors.blue5 : theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
  }

  i {
    font-size: 1.2rem;
  }
`;