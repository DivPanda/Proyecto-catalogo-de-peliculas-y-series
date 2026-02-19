import React from 'react';
import './Filter.css';

const Filter = ({ genres, activeGenre, onGenreChange }) => {
  // Aseguramos que "Todos" sea siempre la primera opción
  const allGenres = ['Todos', ...genres];

  return (
    <section className="filter-section" aria-label="Filtros por género">
      <div className="filter-container">
        {allGenres.map((genre) => (
          <button
            key={genre}
            className={`filter-pill ${activeGenre === genre ? 'active' : ''}`}
            onClick={() => onGenreChange(genre)}
            aria-pressed={activeGenre === genre}
            type="button"
          >
            {genre}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Filter;