import { useState, useEffect, useMemo } from 'react';
import { getMovies } from '../services/movieService';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Creamos un controlador para poder cancelar la petición si el componente se desmonta
    const controller = new AbortController();
    const { signal } = controller;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovies(signal);
        setMovies(data);
      } catch (err) {
        // Si el error es por cancelación, no actualizamos el estado (evita warnings)
        if (err.name === 'AbortError') {
          console.log('Petición cancelada');
          return;
        }
        console.error("Error obteniendo películas:", err);
        setError("No se pudieron cargar las películas. Intenta más tarde.");
      } finally {
        // Solo quitamos el loading si la petición no fue abortada
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    // Función de limpieza: cancela la petición si el componente se desmonta
    return () => controller.abort();
  }, []);

  // Extraer géneros únicos dinámicamente
  const genres = useMemo(() => {
    const uniqueGenres = new Set();
    movies.forEach(movie => {
      if (!movie.genre) return;
      // Separar por comas y limpiar espacios en blanco (trim)
      movie.genre.split(',').forEach(genre => uniqueGenres.add(genre.trim()));
    });
    return Array.from(uniqueGenres).sort();
  }, [movies]);

  return { movies, genres, loading, error };
};