// Component/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>

      </div>
      
      <nav className={styles.footerNav}>
        <Link href="/Home">{language === 'fr' ? 'Accueil' : 'Home'}</Link>
        <Link href="/About">{language === 'fr' ? 'À propos' : 'About'}</Link>
        <Link href="/Contact">{language === 'fr' ? 'Contact' : 'Contact'}</Link>
      </nav>
      
      <div className={styles.copyright}>
        © {new Date().getFullYear()} DYANE. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
      </div>
    </footer>
  );
};

export default Footer;