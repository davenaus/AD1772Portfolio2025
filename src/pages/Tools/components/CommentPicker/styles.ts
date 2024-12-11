// src/pages/Tools/components/CommentPicker/styles.ts
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

export const SelectingAnimation = styled.div`
  text-align: center;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  margin: 2rem 0;
  color: ${({ theme }) => theme.colors.blue9};
  animation: flipIn 0.3s ease forwards;
  
  @keyframes flipIn {
    0% {
      transform: rotateX(-90deg);
      opacity: 0;
    }
    100% {
      transform: rotateX(0);
      opacity: 1;
    }
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



export const Winner = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: translateX(-100%);
    animation: shine 2s infinite;
  }

  @keyframes shine {
    100% {
      transform: translateX(100%);
    }
  }
`;

export const WinnerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

export const WinnerAvatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.blue9};
  box-shadow: 0 0 20px rgba(255,255,255,0.1);
`;

export const WinnerInfo = styled.div`
  flex: 1;
`;

export const WinnerLabel = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const WinnerName = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.25rem;
`;

export const WinnerTimestamp = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.875rem;
`;

export const WinnerComment = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  line-height: 1.6;
  font-size: 1.1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.blue3};
  border-radius: 8px;
  margin-top: 1rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }

  i {
    font-size: 1.2rem;
  }
`;




export const Loading = styled.div`
  text-align: center;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Results = styled.div`
  margin-top: 2rem;
  opacity: 1;
  transform: translateY(0);
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

export const Stats = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
  animation: fadeIn 0.3s ease;
`;