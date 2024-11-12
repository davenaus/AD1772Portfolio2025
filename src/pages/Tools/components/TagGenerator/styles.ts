// src/pages/Tools/components/TagGenerator/styles.ts
import styled from 'styled-components';

// Add interfaces for props
interface VisibilityProps {
    visible: boolean;
  }
  



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
  font-size: 1.7rem;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors.blue3};
    transform: scale(1.13);
  }
`;


export const TagItem = styled.li`
  background: ${({ theme }) => theme.colors.blue3};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #f0a1a1;
    text-decoration: line-through #b65f5f;
    transform: translateY(-2px);
  }
`;




















// Add responsive styles to the TagGenerator components
export const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
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

export const TagBox = styled.div<VisibilityProps>`
  margin-top: 15px;
  margin-bottom: 5px;
  min-height: 100px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.06);
  display: ${({ visible }) => visible ? 'block' : 'none'};

  @media (max-width: 768px) {
    padding: 15px;
    margin-top: 10px;
  }
`;

export const TagList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    gap: 0.375rem;
  }
`;

export const ButtonBox = styled.div<VisibilityProps>`
  display: ${({ visible }) => visible ? 'flex' : 'none'};
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const CopyButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.875rem 1.5rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;

export const ClearButton = styled(CopyButton)`
  background: ${({ theme }) => theme.colors.blue3};

  &:hover {
    background: ${({ theme }) => theme.colors.blue4};
  }
`;