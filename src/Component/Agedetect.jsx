import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const AgeDetect = () => {
  const router = useRouter();
  const inputRefs = useRef([]);

  const translations = {
    fr: {
      heading: "Êtes-vous majeur&nbsp;?",
      subheading:
        "Pour accéder au site Dyane, vous devez avoir l'âge légal de consommer et/ou d'acheter de l'alcool dans votre zone géographique. Si votre zone géographique ne prévoit pas d'âge légal, vous devez avoir 18 ans ou plus.",
      buttonText: "ACCÉDER AU SITE",
      legal: `
       L'abus d'alcool est dangereux pour la santé. À consommer avec modération. Veuillez ne pas partager ce site avec des mineurs.
En accédant à ce site, vous déclarez accepter nos conditions générales d'utilisation et avoir pris connaissance de notre charte de données personnelles et cookies.
      `,
    },
    en: {
      heading: "Are you of legal drinking age?",
      subheading:
        "To visit the Dyane site, you must be of legal drinking age in your location of residence. If there is no legal age for consuming alcohol in your location, you must be over 18.",
      buttonText: "ENTER SITE",
      legal: `
        Alcohol abuse is dangerous for your health. Drink responsibly. Please do not share this site with minors.<br/>
        Through the Moët Hennessy group to which it belongs, the House of Hennessy is a member of SpiritsEU, the European Forum for Responsible Drinking 
        (<a href="https://www.responsibledrinking.eu" target="_blank">www.responsibledrinking.eu</a>), 
        DISCUS (<a href="https://www.discus.org" target="_blank">www.discus.org</a>), and CEEV 
        (<a href="https://www.winemoderation.com" target="_blank">www.winemoderation.com</a>).<br/>
        By accessing this site, you declare that you accept our general terms of use and that you have read our personal data and cookies policy.
      `,
    },
  };

  const CURRENT_YEAR = 2025; // or new Date().getFullYear()
  const LEGAL_AGE = 18;

  // Track the selected language
  const [lang, setLang] = useState("fr");

  // Array for the four digits (empty string means no digit yet)
  const [yearDigits, setYearDigits] = useState(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle input change when user types
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numeric input
    if (/^\d*$/.test(value)) {
      const digit = value.slice(-1); // Get only the last character
      
      if (digit) {
        // Update the current digit
        const newDigits = [...yearDigits];
        newDigits[index] = digit;
        setYearDigits(newDigits);
        
        // Move to next input if available
        if (index < 3) {
          setCurrentIndex(index + 1);
          inputRefs.current[index + 1].focus();
        }
      }
    }
  };

  // Handle backspace and delete keys
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (yearDigits[index] !== "") {
        // If the current input has a value, clear it
        const newDigits = [...yearDigits];
        newDigits[index] = "";
        setYearDigits(newDigits);
      } else if (index > 0) {
        // If current input is empty and not the first, go to previous input
        setCurrentIndex(index - 1);
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move to previous input on left arrow
      setCurrentIndex(index - 1);
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      // Move to next input on right arrow
      setCurrentIndex(index + 1);
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle input focus
  const handleFocus = (index) => {
    setCurrentIndex(index);
  };

  // Automatically focus on the first empty input when component mounts
  useEffect(() => {
    const firstEmptyIndex = yearDigits.findIndex(digit => digit === "");
    if (firstEmptyIndex !== -1) {
      inputRefs.current[firstEmptyIndex].focus();
    }
  }, []);

  // Effect to focus on current input whenever currentIndex changes
  useEffect(() => {
    if (inputRefs.current[currentIndex]) {
      inputRefs.current[currentIndex].focus();
    }
  }, [currentIndex]);

  // Verify the user's age when the button is clicked
  const verifyAge = () => {
    const yearString = yearDigits.join("");
    if (yearString.length === 4) {
      const birthYear = parseInt(yearString, 10);
      const userAge = CURRENT_YEAR - birthYear;
      if (userAge >= LEGAL_AGE) {
        // Navigate to the Home component
        router.push("./Home");
      } else {
        // Redirect to Google if underage
        window.location.href = "https://www.google.fr";
      }
    } else {
      alert(
        lang === "fr"
          ? "Veuillez saisir votre année de naissance complète."
          : "Please enter your complete birth year."
      );
    }
  };

  return (
    <div className="age-gate-container">
      {/* Logo */}
      <img src="/Media/LogoDYANE_blanc.png" alt="Dyane Logo" className="logo" />

      <div className="para">
        <p dangerouslySetInnerHTML={{ __html: translations[lang].subheading }} />
      </div>

      {/* Input fields for the year digits */}
      <div className="inputs-container">
        {yearDigits.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric" // Shows numeric keyboard on mobile
            className="year-input"
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => handleFocus(index)}
            maxLength={1}
            placeholder="Y"
          />
        ))}
      </div>

      {/* Language selector and button */}
      <div className="language-and-button">
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
        <button onClick={verifyAge}>{translations[lang].buttonText}</button>
      </div>

      <p
        className="legal-mentions"
        dangerouslySetInnerHTML={{ __html: translations[lang].legal }}
      />

      {/* Component-specific styles */}
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
        /* Reset & container styling */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .age-gate-container {
          width: 100%;
          background: rgba(255, 255, 255, 0);
          padding: 0rem;
          border-radius: 8px;
          text-align: center;
          margin: auto;
          margin-top: 2vh;
        }
        .para {
          color: white;
          padding-right: 30vw;
          padding-left: 30vw;
        }
        .logo {
          display: block;
          margin: 0 auto 1.5rem auto;
          max-width: 130px;
        }
        h1,
        .title-text {
          font-family: "MrsEavesOT", serif;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 0.71rem;
          line-height: 1.15rem;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .inputs-container {
          display: flex;
          gap: 0rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .year-input {
          width: 6.9rem;
          height: 9.9rem;
          font-size: 4.5rem;
          text-align: center;
          background: #111;
          color: #fff;
          font-family: "MrsEavesOT", serif;
          border: 0.31px solid #444;
          border-radius: 4px;
          caret-color: #d4af37; /* Gold cursor color */
        }
        .year-input:focus {
          outline: none;
          border: 2px solid rgb(255, 255, 255);
        }
        /* Style the placeholder with opacity 0.3 */
        .year-input::placeholder {
          opacity: 0.18;
          font-size: 4.32rem;
          transition: opacity 0.3s ease;
        }
        /* When the input has a value, hide the placeholder */
        .year-input:not(:placeholder-shown)::placeholder {
          opacity: 0;
        }
        .language-and-button {
          margin-bottom: 1.5rem;
          display: flex;
          gap: 20px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        select {
          background: rgba(17, 17, 17, 0);
          color: #fff;
          text-align: center;
          border: 1px solid #444;
          padding: 0.5rem;
          margin-right: 0.5rem;
          width: 20vw;
          height: 8vh;
          font-family: CasusPro;
        }
        button {
          background: #444;
          color: #fff;
          width: 20vw;
          height: 8vh;
          font-family: CasusPro;
          border: none;
          padding: 1rem;
          cursor: pointer;
          font-size: 1rem;
          border-radius: 4px;
        }
        button:hover {
          background: #d4af37;
        }
        .legal-mentions {
          color: #ccc;
          font-size: .83rem;
          margin-top: 1rem;
          line-height: 1.04;
          opacity: 0.45;
          padding-left: 30px;
          padding-right: 30px;
          text-transform: lowercase;
        }
        .legal-mentions a {
          color: #aaa;
          text-decoration: none;
        }
        .legal-mentions a:hover {
          text-decoration: underline;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .para {
            padding-right: 10vw;
            padding-left: 10vw;
          }
          
          .year-input {
            width: 4rem;
            height: 6rem;
            font-size: 3rem;
          }
          
          .year-input::placeholder {
            font-size: 2.8rem;
          }
          
          select, button {
            width: 80vw;
          }
        }
      `}</style>

      {/* Global styles for body */}
      <style jsx global>{`
        body {
          font-family: "CasusPro", sans-serif;
          background: #000;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          border:.9px solid white;
        }
      `}</style>
    </div>
  );
};

export default AgeDetect;