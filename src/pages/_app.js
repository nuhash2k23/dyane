// pages/_app.jsx
import React from 'react';
import { LanguageProvider } from '../Component/context/LanguageContext.jsx';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
};

export default MyApp;
