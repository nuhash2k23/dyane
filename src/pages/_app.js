// pages/_app.jsx
import React from 'react';
import { LanguageProvider } from '../Component/context/LanguageContext.jsx';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/next';

const MyApp = ({ Component, pageProps }) => {
  return (
    <LanguageProvider>
      <Analytics />
      <Component {...pageProps} />
    </LanguageProvider>
  );
};

export default MyApp;
