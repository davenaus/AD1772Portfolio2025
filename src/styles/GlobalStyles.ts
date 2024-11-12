// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.colors.blue1};
    color: ${({ theme }) => theme.colors.blue12};
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;