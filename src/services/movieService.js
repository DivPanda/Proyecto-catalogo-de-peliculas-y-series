const API_URL = import.meta.env.VITE_API_URL;
const CACHE_KEY = 'movies_cache_v2';
const CACHE_DURATION = 0;

export const getMovies = async (signal) => {
  if (!API_URL) {
    throw new Error("La URL de la API no está configurada en el archivo .env");
  }

  // 1. Verificar si hay datos en caché válidos
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      const isCacheValid = Date.now() - timestamp < CACHE_DURATION;
      
      if (isCacheValid) {
        return data;
      }
    } catch (error) {
      console.warn("Error al leer el caché, se procederá a hacer fetch.", error);
      localStorage.removeItem(CACHE_KEY);
    }
  }

  // Agregamos un timestamp para evitar el caché del navegador/Google
  const response = await fetch(`${API_URL}?t=${Date.now()}`, { signal });

  if (!response.ok) {
    throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Transformación de datos: Mapeo de claves del JSON (español/espacios) a camelCase
  const transformedData = data.map(movie => ({
    id: movie.id,
    title: movie['título'],
    releaseYear: movie['año de publicación'],
    studio: movie['estudio'],
    // Normalización de géneros: Reemplaza '/' por ',' y limpia espacios
    genre: movie['género'] ? movie['género'].split(/[,/]/).map(g => g.trim()).join(', ') : '',
    description: movie['descripción breve'],
    imageUrl: movie['imagen (url)'],
    type: movie['Tipo'] || movie['tipo'] // Soporte para mayúscula/minúscula por si acaso
  }));

  // 2. Guardar en caché con timestamp
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: transformedData,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.warn("No se pudo guardar en caché (posiblemente localStorage lleno).", error);
  }

  return transformedData;
};