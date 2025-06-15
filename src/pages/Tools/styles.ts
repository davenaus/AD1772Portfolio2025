// src/pages/Tools/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  transition: filter 0.3s ease;
  
  &.blurred {
    filter: blur(4px);
    pointer-events: none;
  }
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

// Mobile Modal Styles
export const MobileModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: 'Poppins', sans-serif;
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 14, 16, 0.95);
  backdrop-filter: blur(8px);
`;

export const ModalContent = styled.div`
  position: relative;
  background: #151719;
  border: 1px solid #1F2123;
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  
  @media (max-width: 640px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

export const ModalIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #292B2D;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  i {
    font-size: 2.5rem;
    color: #EAECEE;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #EAECEE;
  margin-bottom: 1rem;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

export const ModalText = styled.p`
  color: #B1B4B8;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  
  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
`;

export const ModalFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  text-align: left;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  i {
    color: #22c55e;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  span {
    color: #B1B4B8;
    font-size: 0.9rem;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ModalButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant }) => variant === 'primary' 
    ? `
      background: #1F2123;
      color: #EAECEE;
      border: 1px solid #292B2D;
      
      &:hover {
        background: #292B2D;
        transform: translateY(-2px);
      }
    `
    : `
      background: transparent;
      color: #B1B4B8;
      border: 1px solid #292B2D;
      
      &:hover {
        background: #1F2123;
        color: #EAECEE;
        transform: translateY(-2px);
      }
    `
  }
  
  i {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const ModalNote = styled.p`
  color: #333336;
  font-size: 0.8rem;
  font-style: italic;
  margin: 0;
`;