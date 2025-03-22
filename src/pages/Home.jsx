// pages/Home.jsx or pages/index.jsx
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Loader, ScrollControls, Scroll } from '@react-three/drei';
import Headerhome from '../Component/Headerhome';
import styles from '../styles/Home.module.css';
import { useLanguage } from '../Component/context/LanguageContext';
import { Model2 } from '@/Component/Model2';

const Home = () => {
  // Get language directly from context
  const { language } = useLanguage();
  // Force re-render when language changes with a local state
  const [currentLanguage, setCurrentLanguage] = useState(language);

  // Update local state when language context changes
  useEffect(() => {
    if (language !== currentLanguage) {
      console.log('Language changed from', currentLanguage, 'to', language);
      setCurrentLanguage(language);
    }
  }, [language, currentLanguage]);
  
  // Helper function to render text with highlights
  const renderWithHighlights = (text) => {
    if (!text || !text.includes('<span')) return text;
    
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
          title: "Dyane",
          text: "Dyane a pour objectif de révolutionner l'univers du cocktail avec des créations ready-to-drink artistiques en bouteille, alliant luxe, goût et design. Inspirée par la mythologie grecque, Dyane propose de véritables statues en céramique. Pour les boire, on retire la tête et on verse !",
        },
        {
          title: "Exclusivité",
          text: "Chaque bouteille Dyane est une pièce unique, façonnée à la main par une équipe de céramistes passionnés. Le design, protégé, en fait un véritable objet d'art que les invités souhaiteront rapporter chez eux."
        },
        {
          title: "Délicieusement innovant",
          text: "Chaque recette naît d'une incubation de trois mois, revisitant les classiques Pornstar Martini et Moscow Mule avec des ingrédients premium et des liqueurs uniques. Le design du packaging, conçu en plus de dix mois de travail avec les graphistes les plus talentueux, transforme chaque bouteille en œuvre d'art unique. Nos bouteilles imposent par leur élégance et leur format : de 75 cl à 12 L, avec robinet intégré pour les grandes contenances. En collaborant avec un cabinet et en réalisant chaque pièce à la main, nous bénéficions d'une flexibilité qui nous permet de proposer des statues aux contenances variées, afin de répondre aux attentes de vos clients les plus ambitieux."
        },
        {
          title: "Pour tous les goûts",
          text: "Dyane s'engage à n'oublier aucun amateur de cocktails. Nous vous proposons une gamme exclusive de produits avec alcool, soigneusement élaborés avec un degré d'alcool compris entre 27 % et 30 % vol. Pour répondre à toutes les préférences, nous offrons également une sélection raffinée de produits sans alcool, conçus pour ceux qui recherchent une expérience tout aussi délicieuse et sophistiquée. Nous proposons les recettes revisitées du Pornstar Martini et du Moscow Mule pour le lancement. Découvrez un goût inégalé pour une expérience de plaisir absolu !"
        },
        {
          title: "Distribution haut de gamme",
          text: "Actuellement, il n'existe pas d'offre premium artistique de cocktails prêts à boire en France. Notre ambition est de rendre ce format désirable en nous concentrant exclusivement sur une distribution B2B auprès de lieux soigneusement sélectionnés : des établissements d'exception, au positionnement haut de gamme et alignés avec notre vision. Clubs, restaurants festifs, restaurants gastronomiques, bars, casinos et hôtels palaces, vous pourrez retrouver Dyane dans vos établissements préférés. Nous collaborons uniquement avec des partenaires partageant nos valeurs et notre exigence, et nous voyons refuser toute distribution en dehors de ce cadre.",
          signature: "Plus qu'un cocktail, une émotion. Plus qu'un produit, une signature."
        }
      ],
      footer: {
        links: {
          home: "Accueil",
          about: "À propos",
          contact: "Contact",
          terms: "Politique de confidentialité et CGVU",
          legal: "Mentions légales"
        },
        copyright: "© 2025 Dyane. Tous droits réservés."
      }
    },
    en: {
      sections: [
        {
          title: "Dyane",
          text: "Dyane aims to revolutionize the cocktail universe with artistic ready-to-drink bottle creations, combining luxury, taste, and design. Inspired by Greek mythology, Dyane offers genuine ceramic statues. To drink them, simply remove the head and pour!",
        },
        {
          title: "Exclusivity",
          text: "Each Dyane bottle is a unique piece, handcrafted by a team of passionate ceramists. The protected design makes it a true art object that guests will want to take home with them."
        },
        {
          title: "Deliciously Innovative",
          text: "Each recipe is born from a three-month incubation, revisiting classics like Pornstar Martini and Moscow Mule with premium ingredients and unique liqueurs. The packaging design, developed through more than ten months of work with the most talented designers, transforms each bottle into a unique work of art. Our bottles impress with their elegance and format: from 75cl to 12L, with an integrated tap for larger sizes. By collaborating with a design studio and creating each piece by hand, we benefit from flexibility that allows us to offer statues in various capacities to meet the expectations of your most ambitious clients."
        },
        {
          title: "For All Tastes",
          text: "Dyane is committed to not forgetting any cocktail enthusiast. We offer an exclusive range of products with alcohol, carefully crafted with an alcohol content between 27% and 30% vol. To cater to all preferences, we also offer a refined selection of non-alcoholic products, designed for those seeking an equally delicious and sophisticated experience. We offer revisited recipes of Pornstar Martini and Moscow Mule for the launch. Discover an unmatched taste for an experience of absolute pleasure!"
        },
        {
          title: "High-end Distribution",
          text: "Currently, there is no premium artistic ready-to-drink cocktail offering in France. Our ambition is to make this format desirable by focusing exclusively on B2B distribution to carefully selected venues: exceptional establishments with high-end positioning aligned with our vision. Clubs, festive restaurants, gourmet restaurants, bars, casinos, and palace hotels - you can find Dyane in your favorite establishments. We collaborate only with partners who share our values and standards, and we refuse any distribution outside this framework.",
          signature: "More than a cocktail, an emotion. More than a product, a signature."
        }
      ],
      footer: {
        links: {
          home: "Home",
          about: "About",
          contact: "Contact",
            terms: "Privacy Policy",
          legal: "Legal Notice"
        },
        copyright: "© 2025 Dyane. All rights reserved."
      }
    }
  };
  
  // Select content based on current local language state
  const currentContent = content[currentLanguage];

  // The key for the whole ScrollControls to force re-creation when language changes
  const scrollKey = `scroll-controls-${currentLanguage}`;

  return (
    <>
    <div className={styles.container}>
      <div className={styles.canvasContainer}>
        <Canvas className={styles.canvas} camera={{ position: [0, 0, 4], fov: 40 }}>
          <Suspense fallback={null}>
            {/* Key on ScrollControls forces full re-creation when language changes */}
            <ScrollControls key={scrollKey} pages={5.75} damping={0.3}>
              <Model2/>
              
              <Scroll html>
                <Headerhome/>
                
                <div className={styles.contentContainer}>
                  {/* Map through the sections with keys that include language */}
                  {currentContent.sections.map((section, index) => (
                    <section 
                      key={`section-${index}-${currentLanguage}`}
                      className={`
                        ${styles.section} 
                        ${index >= 2 ? styles.laterSection : ''}
                      `}
                    >
                      <div className={styles.textContent}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        <p className={index >= 2 ? styles.movedUpText : ''}>
                          {renderWithHighlights(section.text)}
                        </p>
                        {section.signature && (
                          <p className={styles.signature}>{section.signature}</p>
                        )}
                      </div>
                    </section>
                  ))}
          
                  <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                      <div className={styles.footerLinks}>
                        <a href="/Home">{currentContent.footer.links.home}</a>
                        <a href="/About">{currentContent.footer.links.about}</a>
                        <a href="/Contact">{currentContent.footer.links.contact}</a>
                      </div>
                      <div className={styles.footerLinks}>
                        <a href="/Terms">{currentContent.footer.links.terms}</a>
                        <a href="/Legal">{currentContent.footer.links.legal}</a>
                     
                      </div>
                      

                      <div className={styles.footerCopyright}>
                        {currentContent.footer.copyright}
                      </div>
                    </div>
                  </footer>
                </div>
              </Scroll>
            </ScrollControls>
            <Environment files="./studio_small_09_1k.hdr"  environmentIntensity={.53}  />
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </div>

    {/* Styles remain unchanged */}
    <style jsx global>{`
      /* FONT-FACE DECLARATIONS */
      @font-face {
        font-family: "CasusPro";
        src: url("/Fonts/CasusPro.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: "MrsEavesOT";
        src: url("/Fonts/Mrs-Eaves-OT-Roman_31443.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }

      /* Typography for homepage elements */
      .${styles.sectionTitle} {
        font-family: "MrsEavesOT", serif !important;
        font-weight: 400;
        letter-spacing: 0.01em;
        height: auto;
        padding-bottom: 1rem;
      }
      
      .${styles.textContent} p {
        font-family: "CasusPro", sans-serif !important;
        font-weight: 300;
        letter-spacing: 0.01em;
      }
      
      .${styles.highlight} {
        font-family: "CasusPro", sans-serif !important;
      }
      
      .${styles.signature} {
        font-family: "CasusPro", sans-serif !important;
        font-style: italic;
      }
      
      .${styles.footerLinks} a {
        font-family: "CasusPro", sans-serif !important;
        font-weight: 300;
        letter-spacing: 0.05em;
      }
      
      .${styles.footerCopyright} {
        font-family: "MrsEavesOT", serif !important;
        font-weight: 400;
        letter-spacing: 0.02em;
      }

      /* Special responsive styles for sections */
      @media (max-width: 768px) {
        .${styles.laterSection} .${styles.textContent} {
          margin-top: -15vh !important; /* Move up on tablets */
        }

        .${styles.movedUpText} {
          padding-top: 0 !important;
        }
      }

      @media (max-width: 576px) {
        .${styles.laterSection} .${styles.textContent} {
          margin-top: -25vh !important; /* Move up even more on mobile */
        }
        
        .${styles.laterSection} .${styles.sectionTitle} {
          height: auto !important;
          min-height: 10vh;
          padding-bottom: 1rem !important;
        }
        
        .${styles.movedUpText} {
          margin-top: -5vh !important;
        }
      }

      /* Additional height adjustments for individual sections if needed */
      @media (max-width: 576px) {
        .${styles.section}:nth-child(1) .${styles.textContent} {
          margin-top: 15vh !important; /* Custom positioning for section 3 */
          scale:1.2;
        }
     
         .${styles.section}:nth-child(2) .${styles.textContent} {
          margin-top: -55vh !important; /* Custom positioning for section 3 */
          scale:1.2;
          

        }
           .${styles.section}:nth-child(3) .${styles.textContent} {
          margin-top: -15vh !important; /* Custom positioning for section 3 */
          scale:1.2;

        }
        .${styles.section}:nth-child(4) .${styles.textContent} {
          margin-top: 58vh !important; /* Custom positioning for section 4 */
          scale:1.2;

        }
        
        .${styles.section}:nth-child(5) .${styles.textContent} {
          margin-top: 150vh !important; /* Custom positioning for section 5 */
          scale:1.2;

        }
      }
    `}</style>
    </>
  );
};

export default Home;