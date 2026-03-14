import { useEffect } from 'react';

const BASE_URL = 'https://austindavenport.com';

export const useCanonical = (path: string) => {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', `${BASE_URL}${path}`);
  }, [path]);
};
