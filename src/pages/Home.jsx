// pages/Home.jsx or pages/index.jsx
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Loader, ScrollControls, Scroll } from '@react-three/drei';
import Header from '../Component/Header';
import { Model } from '../Component/Model';
import styles from '../styles/Home.module.css';
import { useLanguage } from '../Component/context/LanguageContext';
import Footer from '@/Component/Footer';

const Home = () => {
  const { language } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  // Update content when language changes
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);
  
  // Helper function to render text with highlights
  const renderWithHighlights = (text) => {
    if (!text.includes('<span')) return text;
    
    // Split by the highlight tags
    const parts = text.split(/<span class='highlight'>|<\/span>/);
    return parts.map((part, i) => {
      // Every even index is regular text, odd indices are highlighted
      if (i % 2 === 0) {
        return part;
      } else {
        return <span key={i} className={styles.highlight}>{part}</span>;
      }
    });
  };
  
  // Content for both languages
  const content = {
    fr: {
      sections: [
        {
          title: "Élégance Divine",
          text: "Découvrez l'essence intemporelle de <span class='highlight'>Dyane</span>, où chaque bouteille incarne la perfection artisanale et l'élégance.",
        },
        {
          title: "Artisanat Raffiné",
          text: "Chaque création est méticuleusement élaborée, fusionnant <span class='highlight'>savoir-faire traditionnel</span> et <span class='highlight'>innovation moderne</span> pour une expérience sensorielle unique.",
        },
        {
          title: "Saveurs Exquises",
          text: "Des cocktails d'exception sublimés par des ingrédients de première qualité, révélant des notes complexes et des arômes envoûtants.",
        },
        {
          title: "Design Iconique",
          text: "Des bouteilles qui transcendent leur fonction pour devenir de véritables <span class='highlight'>œuvres d'art</span>, célébrant la fusion parfaite entre contenant et contenu.",
        },
        {
          title: "Héritage & Avenir",
          text: "Une marque ancrée dans la tradition mais résolument tournée vers l'innovation, redéfinissant l'excellence pour les connaisseurs d'aujourd'hui et de demain.",
          signature: "Plus qu'un cocktail, une émotion."
        }
      ],
      footer: {
        links: {
          home: "Accueil",
          about: "À propos",
          contact: "Contact"
        },
        copyright: "© 2023 Dyane. Tous droits réservés."
      }
    },
    en: {
      sections: [
        {
          title: "Divine Elegance",
          text: "Discover the timeless essence of <span class='highlight'>Dyane</span>, where each bottle embodies craftsmanship perfection and elegance.",
        },
        {
          title: "Refined Artistry",
          text: "Each creation is meticulously crafted, blending <span class='highlight'>traditional expertise</span> with <span class='highlight'>modern innovation</span> for a unique sensory experience.",
        },
        {
          title: "Exquisite Flavors",
          text: "Exceptional cocktails enhanced by premium ingredients, revealing complex notes and captivating aromas.",
        },
        {
          title: "Iconic Design",
          text: "Bottles that transcend their function to become true <span class='highlight'>works of art</span>, celebrating the perfect fusion of container and content.",
        },
        {
          title: "Heritage & Future",
          text: "A brand rooted in tradition yet resolutely turned toward innovation, redefining excellence for today's and tomorrow's connoisseurs.",
          signature: "More than a cocktail, an emotion."
        }
      ],
      footer: {
        links: {
          home: "Home",
          about: "About",
          contact: "Contact"
        },
        copyright: "© 2025 Dyane. All rights reserved."
      }
    }
  };
  
  const currentContent = content[currentLanguage];

  return (
    <>
    <div className={styles.container}>
      {/* Header outside the canvas for proper control */}
      {/* <Header className={styles.headerFixed} /> */}
      <div className={styles.canvasContainer}>
        <Canvas className={styles.canvas} camera={{ position: [0, 0, 4], fov: 40 }}>
          <Suspense fallback={null}>
            <ScrollControls pages={5.75} damping={0.25}>
              {/* 3D Model */}
              <Model />
              
              {/* HTML Content */}
              <Scroll html>
              <Header/>
                <div className={styles.contentContainer}>


                  {/* Map through the sections */}
                  {currentContent.sections.map((section, index) => (
                    <section key={index} className={styles.section}>
                      <div className={styles.textContent}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        <p>{renderWithHighlights(section.text)}</p>
                        {section.signature && (
                          <p className={styles.signature}>{section.signature}</p>
                        )}
                      </div>
                    </section>
                  ))}
                  
                  {/* Footer */}
                  <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                      <div className={styles.footerLogo}></div>
                      <div className={styles.footerLinks}>
                        <a href="/Home">{currentContent.footer.links.home}</a>
                        <a href="/About">{currentContent.footer.links.about}</a>
                        <a href="/Contact">{currentContent.footer.links.contact}</a>
                      </div>
                      <div className={styles.footerCopyright}>
                        {currentContent.footer.copyright}
                      </div>
                    </div>

                  </footer>
                        {/* <Footer/> */}
                </div>
              </Scroll>
            </ScrollControls>
            <Environment files="./studio_small_09_1k.hdr" environmentIntensity={.53}/>
          </Suspense>
    
        </Canvas>
        <Loader />
      </div>


    </div>
        
          </>
  );
};

export default Home;