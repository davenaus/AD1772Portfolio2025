import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/Layout/Layout';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { AppRoutes } from './AppRoutes';
import { Analytics } from "@vercel/analytics/react";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        <Layout>
          <AppRoutes />
        </Layout>
        <Analytics />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
