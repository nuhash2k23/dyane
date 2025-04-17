import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/ContactForm.module.css';
import { useLanguage } from '../Component/context/LanguageContext';
import Header from '../Component/Header';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Footer from '@/Component/Footer';
import Head from 'next/head';

// Register ScrollTrigger plugin if we're in the browser
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactForm = () => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [showHeader, setShowHeader] = useState(true); // Start with header visible
  const headerRef = useRef(null);
  const lenisRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false
  });
  
  // Initialize Lenis and header scroll behavior
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
    };

    window.addEventListener('scroll', handleScroll);

    // Ensure header is visible on initial load
    if (headerRef.current) {
      gsap.set(headerRef.current, { y: 0, opacity: 1 });
    }

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
    };
  }, [showHeader]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Animation on component mount
  useEffect(() => {
    gsap.fromTo(
      `.${styles.formContainer}`,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    // Staggered animation for form fields
    gsap.fromTo(
      `.${styles.field}`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.3 }
    );
  }, []);
  
  // Reset form if resubmitting
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        gsap.to(`.${styles.confirmation}`, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setSubmitted(false);
            gsap.set(`.${styles.form}`, { opacity: 1, y: 0 });
          }
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const content = {
    fr: {
      title: "Restons en contact",
      intro: "Besoin d'information ? Dyane vous écoute.",
      name: "Nom",
      email: "Email",
      message: "Message",
      consent: "En soumettant ce formulaire, j'accepte que mes données soient utilisées uniquement pour répondre à ma demande.",
      submit: "Envoyer",
      privacy: "Voir notre Politique de Confidentialité pour en savoir plus sur la gestion de vos données.",
      confirmation: "Merci pour votre message !"
    },
    en: {
      title: "Let's Get in Touch",
      intro: "Need information? Dyane is listening.",
      name: "Name",
      email: "Email",
      message: "Message",
      consent: "By submitting this form, I agree that my data will be used only to respond to my request.",
      submit: "Send",
      privacy: "See our Privacy Policy to learn more about managing your data.",
      confirmation: "Thank you for your message!"
    }
  };

  // Handle form submission with Formspree
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the form element
    const form = e.target;
    
    // Create form data from our state
    const formData = new FormData(form);
    
    // Submit the form to Formspree
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Form successfully submitted
          setSubmitted(true);
          // Reset form fields
          setFormData({
            name: '',
            email: '',
            message: '',
            consent: false
          });
        } else {
          // Handle error
          response.json().then(data => {
            console.error('Form submission error:', data);
          });
        }
      })
      .catch(error => {
        console.error('Form submission error:', error);
      });
  };

  return (
    <><Head>
    <title>Contact Dyane Paris | Cocktails de Luxe et Bouteilles Artistiques</title>
    <meta name="description" content="Contactez Dyane Paris pour en savoir plus sur nos cocktails prêts à boire de luxe, en bouteilles artistiques de céramique. B2B uniquement, répondons à vos besoins en clubs, hôtels et restaurants haut de gamme." />
    <meta name="keywords" content="Dyane contact, Dyane Paris, Dyane cocktails, bouteille de céramique, cocktail artistique, Pornstar Martini Dyane, cocktail de luxe, contact cocktail haut de gamme" />
    <link rel="canonical" href="https://dyaneparis.com/contact" />
  
    {/* Open Graph tags */}
    <meta property="og:title" content="Contact Dyane Paris | Cocktails de Luxe Artistiques" />
    <meta property="og:description" content="Des questions sur nos cocktails en bouteilles de céramique ? Contactez Dyane Paris dès maintenant pour collaborer avec notre marque B2B de luxe." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://dyaneparis.com/contact" />
    <meta property="og:image" content="https://dyaneparis.com/preview.jpg" />
    <meta name="google-site-verification" content="D2tCPMxF1aHMQF4lLMJeaWjuiKpSB4fvUbrg-tYfz-o" />
  
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Contact Dyane Paris | Cocktails de Luxe Artistiques" />
    <meta name="twitter:description" content="Vous êtes un hôtel ou un restaurant haut de gamme ? Contactez-nous pour découvrir nos cocktails prêts à boire dans des bouteilles en céramique exclusives." />
    <meta name="twitter:image" content="https://dyaneparis.com/preview.jpg" />
  </Head>

    <div className={styles.pageWrapper}>
      <div ref={headerRef} className={styles.headerWrapper} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, opacity: 1 }}>
        <Header />
      </div>
      
      <div className={styles.pageContainer} style={{ paddingTop: '80px' }}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>{content[language].title}</h1>
          <p className={styles.intro}>{content[language].intro}</p>
          
          {!submitted ? (
            <form 
              action="https://formspree.io/f/xyzeejkn" // Replace with your actual Formspree form ID
              method="POST"
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.field}>
                <label htmlFor="name">{content[language].name}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className={styles.input} 
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">{content[language].email}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className={styles.input} 
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">{content[language].message}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  className={styles.textarea} 
                />
              </div>
              <div className={styles.fieldConsent}>
                <input 
                  type="checkbox" 
                  id="consent" 
                  name="consent" 
                  checked={formData.consent}
                  onChange={handleChange}
                  required 
                  className={styles.checkbox}
                />
                <label htmlFor="consent" className={styles.consentLabel}>
                  {content[language].consent}
                </label>
              </div>
              
              {/* Prevent spam with honeypot field */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} />
              
              {/* Add the current language as a hidden field */}
              <input type="hidden" name="language" value={language} />
              
              <button type="submit" className={styles.submitButton}>
                {content[language].submit}
              </button>
            </form>
          ) : (
            <div className={styles.confirmation}>
              <div className={styles.confirmationIcon}>✓</div>
              <p>{content[language].confirmation}</p>
            </div>
          )}
        <h3 className={styles.email}>
  Ou vous pouvez contacter directement <br/> 
  <a className={styles.emaildyane} href="mailto:contact@dyaneparis.com">
    contact@dyaneparis.com
  </a>
</h3>

          <p className={styles.privacy}>
            <a href="/privacy-policy">{content[language].privacy}</a>
          </p>
        </div>
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

      {/* Global styles for form elements */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      
        .${styles.pageWrapper} {
          font-family: "CasusPro", sans-serif;
          position: relative;
        }
        
        .${styles.title} {
          font-family: "MrsEavesOT", serif;
          font-weight: 400;
          letter-spacing: 0.03em;
        }
        
        .${styles.intro} {
          font-family: "CasusPro", sans-serif;
          font-weight: 300;
          letter-spacing: 0.02em;
        }
        
        .${styles.field} label {
          font-family: "CasusPro", sans-serif;
          font-weight: 300;
          letter-spacing: 0.02em;
        }
        
        .${styles.input}, .${styles.textarea} {
          font-family: "CasusPro", sans-serif;
          font-weight: 300;
        }
        
        .${styles.consentLabel} {
          font-family: "CasusPro", sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
        }
        
        .${styles.submitButton} {
          font-family: "MrsEavesOT", serif;
          letter-spacing: 0.05em;
        }
        
        .${styles.confirmation} p {
          font-family: "MrsEavesOT", serif;
          letter-spacing: 0.02em;
        }
        
        .${styles.privacy} {
          font-family: "CasusPro", sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
    </>
  );
};

export default ContactForm;