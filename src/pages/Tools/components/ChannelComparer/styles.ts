// src/pages/Tools/components/ChannelComparer/styles.ts
import styled from 'styled-components';







export const ChannelName = styled.h3`
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1.2em;
  font-weight: 600;
`;


export const ComparisonIndicator = styled.span<{ type: 'higher' | 'lower' | 'equal' }>`
  color: ${({ type, theme }) => {
    switch (type) {
      case 'higher': return '#22c55e';
      case 'lower': return '#ef4444';
      default: return theme.colors.blue11;
    }
  }};
  font-weight: 500;
  font-size: 0.8rem;
  margin-left: 0.5rem;
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

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const InputGroup = styled.div`
  flex: 1;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.blue2};
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;

  &::placeholder {
    color: ${({ theme }) => theme.colors.blue11};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue4};
  }
`;

export const CompareButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    padding: 0.875rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 2rem;
  display: none;

  &.visible {
    display: block;
  }
`;

export const ComparisonResults = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    gap: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ChannelInfo = styled.div`
  flex: 1;
  min-width: 300px;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  padding: 1.5rem;

  @media (max-width: 768px) {
    min-width: unset;
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

export const ChannelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ChannelLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

export const MetricGroup = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const MetricTitle = styled.h4`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.blue9};
  padding-left: 0.75rem;
  border-left: 3px solid ${({ theme }) => theme.colors.blue9};

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
`;

export const Metric = styled.div`
  color: ${({ theme }) => theme.colors.blue11};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const VisitChannel = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  margin-top: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.875rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;