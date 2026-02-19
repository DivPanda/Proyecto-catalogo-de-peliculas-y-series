import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback, hasMore) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore) {
          callback();
        }
      },
      { threshold: 0.5, rootMargin: '100px' } // Carga 100px antes de llegar al final
    );

    const currentElement = observerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [callback, hasMore]);

  return observerRef;
};