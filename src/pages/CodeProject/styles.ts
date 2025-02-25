// src/pages/CodeProject/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: ${({ theme }) => theme.colors.blue11};
`;

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-height: 400px;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.blue11};
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.blue11};
  cursor: pointer;
  padding: 0.5rem;
  margin: -0.5rem;
  margin-bottom: 2rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.blue9};
  }

  i {
    font-size: 1.25rem;
  }
`;

export const ProjectHeader = styled.header`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Metadata = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.875rem;

  span {
    &:nth-child(even) {
      color: ${({ theme }) => theme.colors.blue8};
    }
  }
`;

export const IframeContainer = styled.div`
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue4};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const IframeWrapper = styled.div`
  position: relative;
  height: 800px; // Increased from 600px to give more vertical space
  width: 100%;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    background-color: white; // Added background color so content is visible
  }

  @media (max-width: 768px) {
    height: 500px;
  }
`;

export const ProjectContent = styled.article`
  color: ${({ theme }) => theme.colors.blue12};
  font-size: 1.125rem;
  line-height: 1.7;

  h2 {
    font-size: 1.875rem;
    color: ${({ theme }) => theme.colors.blue9};
    margin: 2.5rem 0 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.blue9};
    margin: 2rem 0 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.blue6};
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: ${({ theme }) => theme.colors.blue11};
    font-style: italic;
  }

  code {
    background: ${({ theme }) => theme.colors.blue3};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: monospace;
  }

  pre {
    background: ${({ theme }) => theme.colors.blue3};
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;

    code {
      background: none;
      padding: 0;
    }
  }
`;