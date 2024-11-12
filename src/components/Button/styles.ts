import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme, variant }) => 
    variant === 'secondary' ? theme.colors.blue3 : theme.colors.blue4};
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 0.775rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
      font-family: 'Poppins', sans-serif;
  
  &:hover {
    background-color: ${({ theme, variant }) => 
      variant === 'secondary' ? theme.colors.blue4 : theme.colors.blue5};
    transform: translateY(-2px);
  }

  i {
    font-size: 1.25rem;
  }
`;