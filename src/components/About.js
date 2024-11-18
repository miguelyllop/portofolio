import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import aboutData from './lib/aboutData.json'; // Importa los datos del archivo JSON

function About() {
  const [aboutContent, setAboutContent] = useState('');
  const [contactItems, setContactItems] = useState([]);

  // Cargar la información al inicio
  useEffect(() => {
    setAboutContent(marked(aboutData.about)); // Convierte el markdown a HTML
    setContactItems(aboutData.contact); // Establece los contactos
    const sections = document.querySelectorAll('.about-section, .contact-section');

    sections.forEach((section, index) => {
      setTimeout(() => {
        section.style.opacity = 1;
        section.style.transform = 'translateY(0)';
      }, index * 100); // Ajusta el retraso si es necesario
    });
  }, []);

  return (
    <div>
      {/* About Section */}
      <section
        className="about-section section"
        style={{
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
      </section>

      {/* Contact Section */}
      <section
        className="contact-section section"
        style={{
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
        }}
      >
        <ul className="contact-list">
          {contactItems.map((contactItem, index) => (
            <li key={index} className="contact-item">
              {contactItem.platform} — 
              <a href={contactItem.url} target="_blank" rel="noopener noreferrer">
                {contactItem.handle}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default About;
