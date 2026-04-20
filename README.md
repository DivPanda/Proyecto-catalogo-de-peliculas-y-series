# Catálogo de Películas y Series 🎬

Una aplicación web moderna y responsiva para explorar un catálogo de películas y series. Diseñada con un enfoque **Mobile First** y una estética oscura elegante ("Dark Mode").

## 🚀 Características

*   **Diseño Mobile First:** Experiencia optimizada para dispositivos móviles que escala perfectamente a escritorio.
*   **Exploración Fluida:** Scroll infinito (Infinite Scroll) para navegar por grandes listas de contenido sin interrupciones.
*   **Búsqueda y Filtrado:** Encuentra contenido rápidamente por título o filtra por géneros dinámicos.
*   **Detalles Inmersivos:** Modales animados con información detallada, año, estudio y etiquetas.
*   **Optimización:** Sistema de caché local para minimizar peticiones y carga diferida de imágenes.

## 🛠️ Tecnologías

*   **Frontend:** React.js (Vite)
*   **Estilos:** CSS3 Puro (Variables, Flexbox, Grid, Glassmorphism)
*   **Iconos:** Lucide React
*   **Animaciones:** Framer Motion
*   **Backend:** Google Sheets (expuesto como API JSON)

## 📦 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/catalogo-peliculas.git](https://github.com/DivPanda/Proyecto-catalogo-de-peliculas-y-series.git)
    cd catalogo-de-peliculas-y-series
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
    ```env
    VITE_API_URL=tu_url_de_google_apps_script
    ```

4.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## Link para ver el proyecto en Github Pages
https://cancridev.github.io/Proyecto-catalogo-de-peliculas-y-series/

## 📂 Estructura del Proyecto

*   `/src/components`: Componentes reutilizables (Hero, MovieCard, Modal, etc.).
*   `/src/hooks`: Lógica personalizada (useMovies, useInfiniteScroll).
*   `/src/services`: Comunicación con la API y gestión de caché.
