import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Film } from 'lucide-react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 500 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="Cerrar detalles">
          <X size={24} />
        </button>

        <div className="modal-header-image" style={{ backgroundImage: `url(${movie.imageUrl})` }}>
          <div className="modal-gradient-overlay" />
        </div>

        <div className="modal-body">
          <h2 id="modal-title" className="modal-title">{movie.title}</h2>
          
          <div className="modal-tags">
            {movie.genre && movie.genre.split(',').map((g, index) => (
              <span key={index} className="modal-pill genre">{g.trim()}</span>
            ))}
            <span className="modal-pill studio">{movie.studio}</span>
          </div>

          <div className="modal-meta-row">
            <span className="meta-item"><Calendar size={16} /> {movie.releaseYear}</span>
            {movie.type && (
              <span className="meta-item"><Film size={16} /> {movie.type}</span>
            )}
          </div>

          <p className="modal-description">{movie.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieModal;