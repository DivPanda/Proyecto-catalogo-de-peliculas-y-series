import React from 'react';
import './Footer.css';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Catálogo de Películas. Creado con ❤️ por DivPanda.</p>
      <a 
        href="https://github.com/DivPanda/" // <-- Recuerda cambiar esta URL
        target="_blank" 
        rel="noopener noreferrer"
        className="github-link"
        aria-label="Ver el código fuente en GitHub"
      >
        <Github size={20} />
      </a>
    </footer>
  );
};

export default Footer;