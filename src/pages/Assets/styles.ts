import styled from 'styled-components';

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.blue9};
`;

const LoadingText = styled.h2`
  font-size: 1.5rem;
`;

const LoadingSpinner = styled.div`
  i {
    font-size: 2rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const Styles = {
  LoadingContainer,
  LoadingText,
  LoadingSpinner
};