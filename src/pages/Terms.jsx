import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Conditions Générales de Vente et d'Utilisation (CGVU)</h1>
      
      <section>
        <h2>Politique de confidentialité</h2>
        <p>
          Cette politique de confidentialité a pour objectif de vous expliquer pourquoi nous recueillons vos données et comment nous nous engageons à les protéger. Dyane Paris s'engage en faveur de la protection de vos données personnelles et de votre vie privée.
          À ce titre, et en application du Règlement Général de Protection des Données (ci-après dénommé "RGPD"), nous vous communiquons ci-après les conditions dans lesquelles vos données personnelles sont appelées à être traitées par nos soins.
        </p>
      </section>

      <section>
        <h2>Quelles données personnelles traitons-nous ?</h2>
        <p>Nous sommes susceptibles de recueillir et de conserver vos données à caractère personnel, notamment pour :</p>
        <ul>
          <li>Traiter et répondre à vos messages</li>
          <li>Gérer vos inscriptions à nos newsletters</li>
          <li>Établir et assurer le suivi de la relation commerciale</li>
          <li>Rédigez un avis/commentaire publié sur le site</li>
          <li>Assurer la comptabilité et la gestion</li>
          <li>Améliorer notre suivi et service client</li>
          <li>Gérer le bon fonctionnement et la personnalisation des services</li>
          <li>Vous envoyer des informations commerciales et publicitaires</li>
          <li>Détection d'attaques et recourt contentieux contre la fraude</li>
          <li>Mémoriser vos choix quant à l'utilisation des cookies</li>
          <li>Traiter et répondre à vos demandes d'exercice de droits</li>
          <li>Pour répondre aux exigences réglementaires</li>
        </ul>
      </section>

      <section>
        <h2>Catégories des données utilisées</h2>
        <p>Nous collectons uniquement vos coordonnées (par exemple nom, prénom, numéro de téléphone, email).</p>
      </section>

      <section>
        <h2>Propriété du Site et des Contenus</h2>
        <p>
          Le Site, ainsi que l'ensemble des contenus qui y figurent (textes, images, logos, graphismes, etc.), sont la propriété exclusive d'Elisa Evrard Ordonez et sont protégés par les droits d'auteur et la législation applicable en matière de propriété intellectuelle. Toute reproduction, modification ou utilisation non autorisée des contenus est interdite. Tous les éléments du Site, notamment le design, les contenus textuels et visuels, sont protégés par des droits de propriété intellectuelle. Aucune reproduction, diffusion ou exploitation de ces éléments n'est autorisée sans l'accord préalable écrit de Dyane Paris ou de Mademoiselle Elisa Evrard Ordonez.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          Dyane Paris s'efforce de fournir des informations exactes et à jour sur le Site, mais ne garantit pas l'exactitude, l'exhaustivité ou la mise à jour en temps réel des informations. Dyane Paris ne saurait être tenue responsable des erreurs, omissions ou de l'utilisation des informations contenues sur le Site. Le Site peut contenir des liens vers des sites externes, sur lesquels Dyane Paris n'a aucun contrôle et pour lesquels elle décline toute responsabilité.
        </p>
      </section>

      <section>
        <h2>Qui contacter pour toutes les demandes liées au RGPD ?</h2>
        <p>Pour exercer vos droits, vous pouvez nous contacter :</p>
        <address>
          Dyane Paris<br />
          SASU au capital de 8.000 euros.<br />
          En cours d'immatriculation<br />
          Adresse : 14 rue du Dobropol<br />
          Téléphone : 0768328714<br />
          Responsable : Elisa Evrard Ordonez<br />
          Contact : 0768328714 ou <a href="mailto:contact@dyaneparis.com">contact@dyaneparis.com</a>
        </address>
      </section>
      
      <style jsx>{`
        .terms-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        
        h2 {
          font-size: 20px;
          margin-top: 30px;
          margin-bottom: 15px;
          color: #555;
        }
        
        p {
          margin-bottom: 15px;
          color: #444;
        }
        
        ul {
          margin-left: 20px;
          margin-bottom: 15px;
        }
        
        li {
          margin-bottom: 5px;
        }
        
        section {
          margin-bottom: 30px;
        }
        
        address {
          font-style: normal;
          line-height: 1.8;
          margin-top: 10px;
        }
        
        a {
          color: #0070f3;
          text-decoration: none;
        }
        
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;