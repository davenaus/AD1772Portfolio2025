// src/pages/Tools/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
`;

export const Header = styled.div`
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 1.1rem;
  max-width: 600px;
`;

export const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const ToolCard = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
      font-family: 'Poppins', sans-serif;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.blue4};
    background: ${({ theme }) => theme.colors.blue3};
  }
`;

export const ToolIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.blue4};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  i {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.blue9};
  }
`;

export const ToolName = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const ToolDescription = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

export const CategorySection = styled.section`
  margin-bottom: 3rem;
`;

export const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue3};
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
      font-family: 'Poppins', sans-serif;
`;