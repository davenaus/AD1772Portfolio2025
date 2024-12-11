import { useState, useEffect } from 'react';

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const startDate = new Date('2025-01-04T18:00:00.000Z'); // January 4th, 2025 at 18:00 UTC
      
      // Calculate how many 14-day periods have passed since the start date
      const diffDays = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const periodsElapsed = Math.floor(diffDays / 14);
      
      // Calculate the next video date by adding the appropriate number of periods
      let nextVideoDate = new Date(startDate);
      nextVideoDate.setDate(startDate.getDate() + (periodsElapsed + 1) * 14);
      
      // If we're past the calculated date, add another period
      if (now > nextVideoDate) {
        nextVideoDate.setDate(nextVideoDate.getDate() + 14);
      }
      
      const diff = nextVideoDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${days}d ${hours}h ${minutes}m`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};

// Add this to fix the module error
export {};