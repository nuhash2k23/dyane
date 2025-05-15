// pages/Home.jsx or pages/index.jsx
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Loader, ScrollControls, Scroll } from '@react-three/drei';
import Headerhome from '../Component/Headerhome';
import styles from '../styles/Home.module.css';
import { useLanguage } from '../Component/context/LanguageContext';
import { Model2 } from '@/Component/Model2';
import Head from 'next/head';


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
          title: "Découvrez Dyane Paris",
          text: " Dyane Paris, ce sont de délicieux cocktails prêts-à-boire dans de prestigieuses bouteilles en porcelaine inspirées de la mythologie grecque de 70 cl à 12L. Pour boire Dyane, on retire la tête et on verse. Nos cocktails sont préparés en France avec des ingrédients de qualité supérieure. L’alliance parfaite entre luxe, goût et design.",
        },
        {
          title: "Quand l'Art Rencontre l'Exception",
          text: " Toutes nos créations s’harmonisent avec la direction artistique de votre établissement, sublimant votre décor et captivant vos clients dès le premier regard. Chaque pièce est façonnée à la main par un atelier de céramistes passionnés, qui sculptent et peignent avec soin nos bouteilles uniques. Notre design donne naissance à de véritables objets d’art, que vos invités auront envie d'emporter chez eux, prolongeant ainsi l'expérience Dyane au-delà de votre établissement pour créer de la fidélisation. "
        },
        {
          title: "Des Bouteilles Grandioses pour une Expérience Unique",
          text: " Nos bouteilles se distinguent par leur élégance et leurs formats audacieux, allant de 70 cl à 12 L, avec robinet intégré pour les contenances de 6 L et 12 L. Nos bouteilles 12 litres correspondent à une hauteur de 98 centimètres. Grâce à nos artisans experts et à une fabrication entièrement manuelle, nous bénéficions d'une flexibilité exceptionnelle : contenances sur mesure, designs personnalisés et un soin extrême porté aux moindres détails pour répondre aux attentes des clients les plus exigeants. Chaque pièce est soigneusement façonnée et finie à la main. Fruit de plus de dix mois de création en partenariat avec des graphistes parmi les plus talentueux, le design de nos bouteilles fait de chaque pièce une véritable œuvre d'art. "
        },
        {
          title: "Quand Tradition et Innovation s'Infusent",
          text: " Chaque création Dyane est le fruit d’une incubation minutieuse d’environ trente jours. À la carte, nous vous proposons nos recettes signatures : le Pornstar Martini (28% vol.) et le Moscow Mule (27% vol.). Nous recherchons des saveurs à la fois puissantes et raffinées, tout en préservant un haut degré d’alcool pour une expérience authentique. Pour l’élaboration de notre Moscow Mule, nous travaillons directement avec de l’alcoolvinique à 96% vol., infusé lentement avec des graines de gingembre et du jus de citron frais, afin de capturer toute l’intensité de leurs arômes. Notre Pornstar Martini, quant à lui, mise sur la subtilité de la vanille pour sublimer un fruit de la passion délicatement aromatisé, véritable invitation à l’évasion des sens. Nous vous offrons également la possibilité de cocréer votre propre recette, en étroite collaboration avec notre équipe. Après une analyse précise de vos attentes, nous lançons une phase de R&D dédiée, avec plusieurs échantillons personnalisés jusqu’à validation finale. Notre distillerie, forte de plus de 35 ans d’expertise, saura donner vie à vos ambitions avec rigueur et excellence."
        },
        {
          title: "L'Art du Cocktail Prêt-à-Boire pour les Adresses d'Exception",
          text: " Car notre mission est de vous satisfaire au mieux, nous proposons également des créations sans alcool, offrant une expérience sensorielle tout aussi raffinée et savoureuse. Aujourd'hui, aucune offre premium et artistique de cocktails prêts à boire n’existe en France, spécifiquement pensée pour les lieux prestigieux et culturels. Notre ambition : rendre ce format désirable en nous concentrant exclusivement sur une distribution B2B, auprès d'établissements d'exception soigneusement sélectionnés, dont le positionnement haut de gamme s'aligne parfaitement avec notre vision. Clubs privés, restaurants festifs ou gastronomiques, bars élégants, casinos et palaces : Dyane s’invitera dans vos adresses les plus emblématiques. Fidèles à nos valeurs d’exigence et d’authenticité, nous collaborons uniquement avec des partenaires partageant notre quête d’excellence, et refusons toute distribution hors de ce cadre exclusif. ",
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
    <Head>

  <title>Dyane Paris | Cocktails de Luxe en Bouteilles de Céramique</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <link rel="icon" href="/favicon.ico" />

  {/* Meta Description */}
  <meta
    name="description"
    content="Découvrez Dyane, une marque de cocktails de luxe prêts à boire, présentés dans des bouteilles artistiques en céramique. Des créations uniques, inspirées de la mythologie grecque, conçues pour clubs, hôtels, restaurants haut de gamme."
  />
  <meta name="google-site-verification" content="D2tCPMxF1aHMQF4lLMJeaWjuiKpSB4fvUbrg-tYfz-o" />
  {/* Keywords */}
  <meta
    name="keywords"
    content="Dyane Paris, Dyane cocktails, cocktails de luxe, bouteille de céramique, cocktail artistique, Pornstar Martini Dyane, Moscow Mule Dyane, cocktails 6L, statue céramique cocktail, cocktail prêt à boire, cocktail haut de gamme"
  />

  {/* Canonical URL */}
  <link rel="canonical" href="https://dyaneparis.com/" />

  {/* Open Graph for social media */}
  <meta property="og:title" content="Dyane Paris – Cocktails Artistiques de Luxe" />
  <meta
    property="og:description"
    content="Des cocktails premium en statues de céramique, inspirés de la mythologie grecque. Disponible en 75cl à 12L avec robinet intégré. Dyane révolutionne l’univers du cocktail."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://dyaneparis.com/" />
  <meta property="og:image" content="https://dyaneparis.com/preview.jpg" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Dyane Paris – Cocktails Artistiques de Luxe" />
  <meta
    name="twitter:description"
    content="Cocktails prêts à boire en statues de céramique. Luxe, design, et innovation réunis dans un seul produit."
  />
  <meta name="twitter:image" content="https://dyaneparis.com/preview.jpg" />
</Head>

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
                        <a className={styles.footerLinksterms} href="/Terms">{currentContent.footer.links.terms}</a>
                        <a className={styles.footerLinkslegal} href="/Legal">{currentContent.footer.links.legal}</a>
                     
                      </div>
                      

                      <div className={styles.footerCopyright}>
                        {currentContent.footer.copyright}
                      </div>
                    </div>
                  </footer>
                </div>
              </Scroll>
            </ScrollControls>
            <Environment files="./studio_small_09_1k.hdr"  environmentIntensity={.5}  />
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
          margin-top: -25vh !important;
          
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