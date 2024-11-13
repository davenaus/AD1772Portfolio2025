// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  /* Remove the @import and use <link> in index.html instead */
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.blue1};
    color: ${({ theme }) => theme.colors.blue12};
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;