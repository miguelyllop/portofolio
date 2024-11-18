import React, { useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card"
import { cv } from '../data/cv';
import { marked } from 'marked';

export function About() {
  useEffect(() => {
    const sections = document.querySelectorAll('.about-section, .contact-section');

    sections.forEach((section, index) => {
      setTimeout(() => {
        section.style.opacity = 1;
        section.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent>
          <section
            className="about-section"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: marked(cv.general.about) }} />
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <section
            className="contact-section"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            }}
          >
            <ul className="space-y-2">
              {cv.contact.map((contactItem, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="font-bold">{contactItem.platform}</span>
                  <span>—</span>
                  <a href={contactItem.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {contactItem.handle}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}