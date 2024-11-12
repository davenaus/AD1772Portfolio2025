// src/pages/Tools/components/QRCodeGenerator/styles.ts
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



export const URLInput = styled.input`
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

export const GenerateButton = styled.button`
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

export const ResultContainer = styled.div`
  margin-top: 2rem;
  display: none;
  text-align: center;

  &.visible {
    display: block;
  }
`;



export const LogoContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

export const LogoInput = styled.input`
  display: none;
`;

export const LogoLabel = styled.label`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;

export const RemoveLogoButton = styled.button`
  display: none;
  margin-left: 1rem;
  padding: 0.75rem 1.5rem;
  background: red;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
      font-family: 'Poppins', sans-serif;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &.visible {
    display: inline-block;
  }
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
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    margin: 0 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 1rem;
  }
`;

export const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;

export const QRImage = styled.img`
  width: 250px;
  height: 250px;
  margin: 0 auto 1.5rem;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

// Add responsive styles for remaining components...