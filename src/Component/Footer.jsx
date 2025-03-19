// Component/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';
import styles from '../styles/Footer.module.css';
import Image from 'next/image';

const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className={styles.footer}>
<Image 
        src="/LogoDYANE_blanc.png" 
        alt="Dyane Logo" 
        width={100} 
        height={80}
        className={styles.footerLogoImage}
        priority
      />
      
      <nav className={styles.footerNav}>
        <Link href="/Home">{language === 'fr' ? 'Accueil' : 'Home'}</Link>
        <Link href="/About">{language === 'fr' ? 'À propos' : 'About'}</Link>
        <Link href="/Contact">{language === 'fr' ? 'Contact' : 'Contact'}</Link>
      </nav>
      
      <div className={styles.copyright}>
        © {new Date().getFullYear()} DYANE. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
      </div>

      {/* Inline styles for fonts */}
      <style jsx>{`
        /* FONT-FACE DECLARATIONS */
        @font-face {
          font-family: "CasusPro";
          src: url("/Fonts/CasusPro.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: "MrsEavesOT";
          src: url("/Fonts/Mrs-Eaves-OT-Roman_31443.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
        }
      `}</style>

      {/* Global styles for footer elements */}
      <style jsx global>{`
        .${styles.footer} {
          font-family: "CasusPro", sans-serif;
        }
        
        .${styles.footerNav} a {
          font-family: "CasusPro", sans-serif;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05rem;
          transition: color 0.3s ease;
        }
        
        .${styles.copyright} {
          font-family: "MrsEavesOT", serif;
          font-size: 0.85rem;
          letter-spacing: 0.03rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;