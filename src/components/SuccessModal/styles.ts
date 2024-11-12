// src/components/SuccessModal/styles.ts
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translate(-50%, 100%); }
  to { transform: translate(-50%, -50%); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.blue2};
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.blue4};
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: ${slideUp} 0.3s ease;
`;

export const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blue4};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  i {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.blue11};
  }
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
`;

export const CloseButton = styled.button`
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.colors.blue4};
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
  }
`;