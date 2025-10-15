'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  // Prevent scrolling during page load
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: 0.1
        }
      }}
      exit={{ 
        opacity: 0, 
        y: -20,
        transition: { 
          duration: 0.3,
          ease: 'easeInOut' 
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
