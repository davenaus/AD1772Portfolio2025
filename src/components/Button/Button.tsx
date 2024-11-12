// src/components/Button/Button.tsx
import React from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  icon, 
  children, 
  as,
  ...props 
}) => {
  return (
    <StyledButton as={as} variant={variant} {...props}>
      {icon && <i className={icon}></i>}
      {children}
    </StyledButton>
  );
};