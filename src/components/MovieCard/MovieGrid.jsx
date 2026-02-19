import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import './MovieGrid.css';

const MovieGrid = ({ movies, onMovieClick, loading }) => {
  if (loading) {
    return (
      <section className="movie-grid">
        {Array(10).fill(0).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="no-results">
        <p>No se encontraron películas para esta selección.</p>
      </div>
    );
  }

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
      ))}
    </section>
  );
};

export default MovieGrid;