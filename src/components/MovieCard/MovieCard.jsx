import React from 'react';
import { motion } from 'framer-motion';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  return (
    <motion.article 
      className="movie-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Imagen de fondo con efecto de zoom */}
      <div 
        className="movie-card-bg" 
        style={{ backgroundImage: `url(${movie.imageUrl})` }}
        role="img"
        aria-label={`Póster de ${movie.title}`}
      />
      
      {/* Borde gradiente animado */}
      <div className="movie-card-border" />

      {/* Overlay con información */}
      <div className="movie-card-overlay">
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <span className="movie-year">{movie.releaseYear}</span>
          <div className="movie-tags">
            {movie.genre && movie.genre.split(',').map((g, index) => (
              <span key={index} className="movie-genre">{g.trim()}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default MovieCard;