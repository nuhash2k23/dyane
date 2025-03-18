// components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import styles from '../styles/Header.module.css';
import { useLanguage } from '../Component/context/LanguageContext';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  // Handle scroll events for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY <= 0) {
        // At the top of the page
        setHeaderVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setHeaderVisible(true);
      } else {
        // Scrolling down
        setHeaderVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileNav = () => {
    setMobileNavOpen(prev => !prev);
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      className={`${styles.header} ${headerVisible ? styles.visible : styles.hidden}`}
      ref={headerRef}
    >
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <Link href="/Home">
            {/* Replace '/logo.png' with the path to your logo image */}
            <Image 
              src="/LogoDYANE_blanc.png" 
              alt="Logo" 
              width={145} 
              height={120} 
              className={styles.logoImage} 
            />
          </Link>
        </div>
      </div>
      
      <div className={styles.navContainer}>
        <nav className={styles.desktopNav}>
          <Link href="/Home" className={styles.navLink}>
            {language === 'fr' ? 'Accueil' : 'Home'}
          </Link>
          <Link href="/About" className={styles.navLink}>
            {language === 'fr' ? 'À propos' : 'About'}
          </Link>
          <Link href="/Contact" className={styles.navLink}>
            {language === 'fr' ? 'Contact' : 'Contact'}
          </Link>
          
          <div className={styles.languageSelector} ref={dropdownRef}>
            <button 
              className={styles.languageButton} 
              onClick={toggleDropdown}
            >
              {language === 'fr' ? 'FR' : 'EN'}
              <span className={styles.dropdownArrow}>▼</span>
            </button>
            
            {dropdownOpen && (
              <div className={styles.languageDropdown}>
                <button 
                  className={`${styles.languageOption} ${language === 'en' ? styles.active : ''}`} 
                  onClick={() => {
                    if (language !== 'en') toggleLanguage();
                    setDropdownOpen(false);
                  }}
                >
                  English
                </button>
                <button 
                  className={`${styles.languageOption} ${language === 'fr' ? styles.active : ''}`} 
                  onClick={() => {
                    if (language !== 'fr') toggleLanguage();
                    setDropdownOpen(false);
                  }}
                >
                  Français
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      
      <div className={styles.mobileNavIcon} onClick={toggleMobileNav}>
        <div className={`${styles.bar} ${mobileNavOpen ? styles.active : ''}`}></div>
        <div className={`${styles.bar} ${mobileNavOpen ? styles.active : ''}`}></div>
        <div className={`${styles.bar} ${mobileNavOpen ? styles.active : ''}`}></div>
      </div>
      
      {mobileNavOpen && (
        <nav className={styles.mobileNav}>
          <Link href="/Home" onClick={closeMobileNav}>
            {language === 'fr' ? 'Accueil' : 'Home'}
          </Link>
          <Link href="/About" onClick={closeMobileNav}>
            {language === 'fr' ? 'À propos' : 'About'}
          </Link>
          <Link href="/Contact" onClick={closeMobileNav}>
            {language === 'fr' ? 'Contact' : 'Contact'}
          </Link>
          
          <div className={styles.mobileLangToggle}>
            <button 
              className={`${styles.mobileLangOption} ${language === 'en' ? styles.active : ''}`}
              onClick={() => {
                if (language !== 'en') toggleLanguage();
                closeMobileNav();
              }}
            >
              English
            </button>
            <button 
              className={`${styles.mobileLangOption} ${language === 'fr' ? styles.active : ''}`}
              onClick={() => {
                if (language !== 'fr') toggleLanguage();
                closeMobileNav();
              }}
            >
              Français
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
