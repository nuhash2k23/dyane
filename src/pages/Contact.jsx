// components/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/ContactForm.module.css';
import { useLanguage } from '../Component/context/LanguageContext';
import Header from '../Component/Header';
import gsap from 'gsap';
import Footer from '@/Component/Footer';

const ContactForm = () => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false
  });
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here (e.g., API call)
    
    // Animate form submission
    const form = e.target;
    gsap.to(form, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        setSubmitted(true);
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          message: '',
          consent: false
        });
        
        // Animate confirmation message
        gsap.fromTo(
          `.${styles.confirmation}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }
    });
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

  return (
    <>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>{content[language].title}</h1>
          <p className={styles.intro}>{content[language].intro}</p>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className={styles.form}>
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
          
          <p className={styles.privacy}>
            <a href="/privacy-policy">{content[language].privacy}</a>
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactForm;