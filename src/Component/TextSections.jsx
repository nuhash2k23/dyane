// components/TextSections.jsx
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/TextSections.module.css';

const Section = ({ children, threshold = 0.5 }) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: false,
  });
  
  return (
    <div 
      ref={ref} 
      className={`${styles.section} ${inView ? styles.visible : ''}`}
    >
      {children}
    </div>
  );
};

const TextSections = () => {
  return (
    <div className={styles.textContainer}>
      <div className={styles.spacer} style={{ height: '100vh' }}></div>
      
      <Section>
        <div className={styles.rightAligned}>
          <h2>Elegance Defined</h2>
          <p>Discover the timeless beauty of Dyane, where sophistication meets innovation in every curve.</p>
        </div>
      </Section>
      
      <div className={styles.spacer} style={{ height: '50vh' }}></div>
      
      <Section>
        <div className={styles.leftAligned}>
          <h2>Crafted Perfection</h2>
          <p>Each bottle is meticulously designed to bring elegance to your everyday moments.</p>
        </div>
      </Section>
      
      <div className={styles.spacer} style={{ height: '50vh' }}></div>
      
      <Section>
        <div className={styles.rightAligned}>
          <h2>Details Matter</h2>
          <p>From the signature cap to the elegant contours, every element reflects our commitment to quality.</p>
        </div>
      </Section>
      
      <div className={styles.spacer} style={{ height: '50vh' }}></div>
      
      <Section>
        <div className={styles.leftAligned}>
          <h2>Bold Expression</h2>
          <p>The vibrant accents showcase your personality with every use.</p>
        </div>
      </Section>
      
      <div className={styles.spacer} style={{ height: '50vh' }}></div>
      
      <Section>
        <div className={styles.rightAligned}>
          <h2>Experience Dyane</h2>
          <p>More than a bottle - a statement piece designed for the modern lifestyle.</p>
        </div>
      </Section>
      
      <div className={styles.spacer} style={{ height: '100vh' }}></div>
    </div>
  );
};

export default TextSections;