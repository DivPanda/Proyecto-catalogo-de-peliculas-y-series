import { useState, useEffect, useCallback } from 'react'
import './App.css'
import HeroSection from './components/HeroSection/HeroSection.jsx';
import Filters from './components/Filter/Filter.jsx'
import { useMovies } from './hooks/useMovies.js';
import MovieGrid from './components/MovieCard/MovieGrid.jsx';
import MovieModal from './components/MovieModal/MovieModal.jsx';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import { useInfiniteScroll } from './hooks/useInfiniteScroll.js';

function App() {
  const { movies, genres, loading, error } = useMovies();
  const [activeGenre, setActiveGenre] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Estado para paginación infinita
  const ITEMS_PER_PAGE = 16;
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Lógica de filtrado combinada (Género + Búsqueda)
  const filteredMovies = movies.filter(movie => {
    // Convertimos el string de géneros de la película en un array limpio para comparar
    const movieGenres = movie.genre ? movie.genre.split(',').map(g => g.trim()) : [];
    const matchesGenre = activeGenre === 'Todos' || movieGenres.includes(activeGenre);

    // Búsqueda flexible: Normaliza texto (quita acentos/mayúsculas) y busca por palabras
    const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedTitle = normalize(movie.title || '');
    const searchTokens = normalize(searchQuery).split(/\s+/).filter(Boolean);
    const matchesSearch = searchTokens.every(token => normalizedTitle.includes(token));

    return matchesGenre && matchesSearch;
  });

  // Películas visibles actualmente (Paginación)
  const visibleMovies = filteredMovies.slice(0, displayCount);
  const hasMore = displayCount < filteredMovies.length;

  // Resetear paginación al cambiar filtros
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [activeGenre, searchQuery]);

  // Función para cargar más
  const loadMore = useCallback(() => {
    setDisplayCount(prev => prev + ITEMS_PER_PAGE);
  }, []);

  // Hook de Intersection Observer
  const loaderRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <>
    <HeroSection onSearch={setSearchQuery} />
    <Filters 
      genres={genres}
      activeGenre={activeGenre}
      onGenreChange={setActiveGenre}
    />
    
    <main>
      {error && <p style={{textAlign: 'center', padding: '2rem', color: '#ff4444'}}>{error}</p>}
      
      {!error && (
        <>
          <MovieGrid movies={visibleMovies} onMovieClick={setSelectedMovie} loading={loading} />
          {/* Elemento centinela invisible para detectar el scroll */}
          {!loading && hasMore && <div ref={loaderRef} style={{ height: '20px', margin: '1rem' }} />}
        </>
      )}
    </main>

    <AnimatePresence>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </AnimatePresence>
    
    <ScrollToTop />
    <Footer />
    </> 
  )
}

export default App
