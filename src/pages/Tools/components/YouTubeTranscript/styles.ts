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

export const TranscriptContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const URLInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;

  &::placeholder {
    color: ${({ theme }) => theme.colors.blue11};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue6};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Poppins', sans-serif;
  min-width: 180px;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.blue8};
    cursor: not-allowed;
  }

  i {
    font-size: 1.2rem;
  }
`;

export const TranscriptText = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  max-height: 500px;
  overflow-y: auto;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.blue9};
  line-height: 1.6;
  font-size: 0.95rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.blue2};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.blue6};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.blue7};
  }
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.blue9};
  
  i {
    font-size: 2rem;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red9};
  background: ${({ theme }) => theme.colors.red2};
  border: 1px solid ${({ theme }) => theme.colors.red3};
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
`;

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.green9};
  background: ${({ theme }) => theme.colors.green2};
  border: 1px solid ${({ theme }) => theme.colors.green3};
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
`;