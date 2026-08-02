import { Variants } from 'framer-motion';

type Direction = 'left' | 'right' | 'up' | 'down';
type AnimationType = 'tween' | 'spring' | 'inertia' | 'just' | 'keyframes' | string;

// Stagger container with children

export const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerChildren || 0.1,
      delayChildren: delayChildren || 0,
    },
  },
});

// Text animation
export const textVariant = (delay: number = 0): Variants => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay: delay,
    },
  },
});

// Fade in animation
export const fadeIn = (
  direction: string,
  type: string = 'tween',
  delay: number = 0,
  duration: number = 0.5
) => ({
  hidden: {
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type as any, // Gunakan 'tween' atau 'spring'
      delay,
      duration,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

// Slide in animation
export const slideIn = (
  direction: Direction,
  type: AnimationType = 'tween',
  delay: number = 0.1,
  duration: number = 0.5
): Variants => {
  const x = direction === 'left' ? '-100%' : direction === 'right' ? '100%' : '0';
  const y = direction === 'up' ? '100%' : direction === 'down' ? '-100%' : '0';

  return {
    hidden: { x, y, opacity: 0 },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type as 'tween' | 'spring' | 'inertia' | 'keyframes',
        delay,
        duration,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

// Zoom in animation
export const zoomIn = (delay: number = 0.1, duration: number = 0.5): Variants => ({
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
    },
  },
});

// List item animation
export const listItem: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};