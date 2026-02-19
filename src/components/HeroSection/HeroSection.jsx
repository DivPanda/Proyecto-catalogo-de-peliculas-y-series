import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import './HeroSection.css';

const HeroSection = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <header className="hero-header">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="hero-title">
          Tu catálogo de películas y series
        </h1>
        
        <div className="search-bar-container">
          <Search className="search-icon" aria-hidden="true" />
          <input 
            type="text" 
            className="search-input"
            placeholder="Busca películas o series"
            aria-label="Buscar películas o series"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-button" onClick={handleSearch}>Buscar</button>
        </div>
      </motion.div>
    </header>
  );
};

export default HeroSection;
