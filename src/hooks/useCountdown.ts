// src/hooks/useCountdown.ts
import { useState, useEffect } from 'react';

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let nextSaturday = new Date();
      
      nextSaturday.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7));
      nextSaturday.setUTCHours(18, 0, 0, 0);
      
      if (now > nextSaturday) {
        nextSaturday.setDate(nextSaturday.getDate() + 7);
      }
      
      const diff = nextSaturday.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${days}d ${hours}h ${minutes}m`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};

// Add this to fix the module error
export {};