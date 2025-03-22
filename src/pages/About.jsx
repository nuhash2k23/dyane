import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import styles from '../styles/AboutPage.module.css';
import { useLanguage } from '../Component/context/LanguageContext';
import Header from '../Component/Header';
import Footer from '@/Component/Footer';

// Register ScrollTrigger plugin if we're in the browser
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutPage = () => {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const lenisRef = useRef(null);
  const headerRef = useRef(null);
  const [showHeader, setShowHeader] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to RAF (request animation frame)
    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis scroll position to GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update);

    // Tell GSAP to use Lenis's scroll position
    gsap.ticker.add((time) => {
      lenisRef.current.raf(time * 1000);
    });

    // Handle header visibility based on scroll position
    let lastScrollY = 0;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Only show header when at the top (with a small threshold)
      if (scrollY < 50) {
        if (!showHeader) {
          setShowHeader(true);
          // Animate header in from top
          if (headerRef.current) {
            gsap.fromTo(
              headerRef.current,
              { y: -100, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            );
          }
        }
      } else {
        if (showHeader) {
          setShowHeader(false);
          // Animate header out to top
          if (headerRef.current) {
            gsap.to(
              headerRef.current,
              { y: -100, opacity: 0, duration: 0.3, ease: "power2.in" }
            );
          }
        }
      }
      
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    // Delay animation setup to allow DOM to fully initialize
    const initTimer = setTimeout(() => {
      // Animate sections
      setupAnimations();
      setIsInitialized(true);
    }, 100);

    return () => {
      // Clean up all ScrollTriggers when component unmounts
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      
      // Clean up Lenis
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      
      // Remove GSAP ticker
      gsap.ticker.remove(lenisRef.current);
      
      // Remove scroll event listener
      window.removeEventListener('scroll', handleScroll);
      
      // Clear timeout
      clearTimeout(initTimer);
    };
  }, [showHeader]);

  // Setup all animations in a separate function
  const setupAnimations = () => {
    // Set initial state for all sections (invisible)
    const sections = sectionsRef.current;
    gsap.set(sections, { opacity: 0, y: 100 });
    
    // Create a separate ScrollTrigger for each section
    sections.forEach((section, index) => {
      // Skip if section reference is missing
      if (!section) return;
      
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%", // Start animation when top of section is 80% into viewport
            toggleActions: "play none none none", // Only play once
            markers: false // Set to true for debugging
          }
        }
      );
    });

    // Create parallax effect for each image
    imagesRef.current.forEach((img, index) => {
      if (!img) return;
      
      gsap.to(img, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentNode,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // Animate highlights with color fade
    const highlights = document.querySelectorAll(`.${styles.highlight}`);
    highlights.forEach((highlight) => {
      gsap.fromTo(
        highlight,
        { color: "#ffffff" },
        { 
          color: "#d4af37", 
          duration: 0.8,
          scrollTrigger: {
            trigger: highlight,
            start: "top 85%",
            toggleActions: "play none none none" // Only play once when entering viewport
          }
        }
      );
    });

    // Animate section titles
    const sectionTitles = document.querySelectorAll(`.${styles.sectionTitle}`);
    sectionTitles.forEach((title) => {
      gsap.fromTo(
        title,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none" // Only play once
          }
        }
      );
    });

    // Animate paragraphs
    const paragraphs = document.querySelectorAll(`.${styles.paragraph}`);
    paragraphs.forEach((paragraph) => {
      gsap.fromTo(
        paragraph,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 85%",
            toggleActions: "play none none none" // Only play once
          }
        }
      );
    });

    // Animate signatures with a special effect
    const signatures = document.querySelectorAll(`.${styles.signature}`);
    signatures.forEach((signature) => {
      gsap.fromTo(
        signature,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: signature,
            start: "top 85%",
            toggleActions: "play none none none" // Only play once
          }
        }
      );
    });
  };

  // Content with alternating layouts
  const content = {
    fr: {
      title: 'À Propos De Dyane',
      sections: [
        {
          id: 'vision',
          imagePosition: 'right',
          image: '/image.png',
          alt: 'Image de création Dyane',
          content: (
            <>
              <h2 className={styles.sectionTitle}>Notre Vision</h2>
              <p className={styles.paragraph}>
                <span className={styles.highlight}>Dyane</span> révolutionne l'univers du{' '}
                <span className={styles.highlight}>cocktail</span> avec des{' '}
                <span className={styles.highlight}>créations artistiques</span> en bouteille, alliant{' '}
                <span className={styles.highlight}>luxe</span>, goût et design.
              </p>
              <p className={styles.paragraph}>
                Inspirée par la <span className={styles.highlight}>mythologie grecque</span>, 
                la marque sublime chaque détail, du contenu au contenant.
              </p>
              <p className={styles.signature}>Chaque bouteille est faite à la main.</p>
            </>
          )
        },
        {
          id: 'process',
          imagePosition: 'left',
          image: '/image2.png',
          alt: 'Image de création Dyane 2',
          content: (
            <>
              <h2 className={styles.sectionTitle}>Notre Processus</h2>
              <p className={styles.paragraph}>
                Chaque recette naît d'une incubation de trois mois, revisitant les classiques{' '}
                <span className={styles.highlight}>Pornstar Martini</span> et{' '}
                <span className={styles.highlight}>Moscow Mule</span> avec des ingrédients premium et des liqueurs uniques.
              </p>
              <p className={styles.paragraph}>
                Le design du packaging, conçu en plus de dix mois de travail avec des graphistes compétents, 
                transforme chaque bouteille en{' '}
                <span className={styles.highlight}>œuvre d'art unique</span>.
              </p>
            </>
          )
        },
        {
          id: 'product',
          imagePosition: 'right',
          image: '/three.jpg',
          alt: 'Image de création Dyane 3',
          content: (
            <>
              <h2 className={styles.sectionTitle}>Notre Produit</h2>
              <p className={styles.paragraph}>
                Avec un degré d'alcool entre 27 et 30 %, nos bouteilles imposent par leur élégance et leur format : 
                de 75 cl à 12 L, avec robinet intégré pour les grandes contenances.
              </p>
              <p className={styles.signature}>
                Plus qu'un cocktail, une émotion. Plus qu'un produit, une signature.
              </p>
            </>
          )
        }
      ]
    },
    en: {
      title: 'About Dyane',
      sections: [
        {
          id: 'vision',
          imagePosition: 'right',
          image: '/image.png',
          alt: 'Dyane creation image',
          content: (
            <>
              <h2 className={styles.sectionTitle}>Our Vision</h2>
              <p className={styles.paragraph}>
                <span className={styles.highlight}>Dyane</span> revolutionizes the cocktail world with artistic bottle creations, combining{' '}
                <span className={styles.highlight}>luxury</span>, taste, and design.
              </p>
              <p className={styles.paragraph}>
                Inspired by <span className={styles.highlight}>Greek mythology</span>, 
                the brand enhances every detail, from content to container.
              </p>
              <p className={styles.signature}>Each bottle is handmade.</p>
            </>
          )
        },
        {
          id: 'process',
          imagePosition: 'left',
          image: '/image2.png',
          alt: 'Dyane creation image 2',
          content: (
            <>
              <h2 className={styles.sectionTitle}>Our Process</h2>
              <p className={styles.paragraph}>
                Every recipe is born from a three-month incubation, reinterpreting classics like{' '}
                <span className={styles.highlight}>Pornstar Martini</span> and{' '}
                <span className={styles.highlight}>Moscow Mule</span> with premium ingredients and unique liqueurs.
              </p>
              <p className={styles.paragraph}>
                The packaging design, developed through more than ten months of work with skilled designers,
                transforms each bottle into a <span className={styles.highlight}>unique work of art</span>.
              </p>
            </>
          )
        },
        {
          id: 'product',
          imagePosition: 'right',
          image: '/three.jpg',
          alt: 'Dyane creation image 3',
          content: (
            <>
              <h2 className={styles.sectionTitle}>Our Product</h2>
              <p className={styles.paragraph}>
                With an alcohol content between 27 and 30%, our bottles impress with their elegance and format: 
                from 75 cl to 12 L, featuring an integrated tap for larger sizes.
              </p>
              <p className={styles.signature}>
                More than just a cocktail, an emotion. More than just a product, a signature.
              </p>
            </>
          )
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div className={styles.pageWrapper}>
      <div ref={headerRef} className={styles.headerWrapper}>
        <Header />
      </div>
      
      <div className={styles.container} ref={containerRef}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{currentContent.title}</h1>
          <div className={styles.titleLine}></div>
        </div>
        
        {currentContent.sections.map((section, index) => (
          <section 
            key={section.id} 
            id={section.id}
            className={`${styles.section} ${isInitialized ? '' : styles.initialHidden}`}
            ref={el => sectionsRef.current[index] = el}
            data-index={index}
          >
            <div className={styles.sectionInner}>
              <div className={`${styles.imageContainer} ${styles[section.imagePosition]}`}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={section.image}
                    alt={section.alt}
                   
                    fill={true} 
                    className={styles.sectionImage}
                    ref={el => imagesRef.current[index] = el}
                    priority={index === 0}
                  />
                </div>
              </div>
              
              <div className={`${styles.contentContainer} ${styles[section.imagePosition === 'left' ? 'right' : 'left']}`}>
                <div className={styles.contentBox}>
                  {section.content}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      
      <Footer/>

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

      {/* Global styles for content elements */}
      <style jsx global>{`

      .${styles.sectionTitle}{
      font-family: "MrsEavesOT", sans-serif;
      }
        .${styles.pageWrapper} {
          font-family: "CasusPro", sans-serif;
        }
        
        .${styles.title} {
          font-family: "MrsEavesOT", serif;
          font-weight: 400;
          letter-spacing: 0.05em;
        }
        
        .${styles.sectionTitle} {
          font-family: "MrsEavesOT", serif;
          font-weight: 400;
          letter-spacing: 0.03em;
        }
        
        .${styles.paragraph} {
          font-family: "CasusPro", sans-serif;
          font-weight: 300;
          letter-spacing: 0.02em;
        }
        
        .${styles.highlight} {
          font-family: "CasusPro", sans-serif;
        }
        
        .${styles.signature} {
          font-family: "CasusPro", sans-serif;
          font-style: italic;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;