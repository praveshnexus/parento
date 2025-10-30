// src/utils/animations.js

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Fade in animation
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

// Slide up animation
export const slideUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Slide from left
export const slideLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Slide from right
export const slideRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Scale animation (pop effect)
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// Stagger container (for lists)
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Stagger item (for children in lists)
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Hover effects
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

export const hoverLift = {
  whileHover: { y: -5, transition: { duration: 0.2 } },
  whileTap: { y: 0 }
};

export const hoverGlow = {
  whileHover: { 
    boxShadow: "0 10px 40px rgba(236, 72, 153, 0.3)",
    transition: { duration: 0.3 }
  }
};

// Button animations
export const buttonPress = {
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1 }
};

// Card animations
export const cardHover = {
  whileHover: { 
    y: -8,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 }
  }
};

// Rotate animation
export const rotate = {
  animate: {
    rotate: 360,
    transition: { duration: 2, repeat: Infinity, ease: "linear" }
  }
};

// Pulse animation
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  }
};

// Bounce animation
export const bounce = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
  }
};

// Loading spinner
export const spinner = {
  animate: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" }
  }
};

// Entrance animations for hero sections
export const heroAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Number counter animation helper
export const numberCount = (from, to, duration = 2) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
});

// Modal/Dialog animations
export const modalAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 }
};

// Backdrop animation
export const backdropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

// Floating animation (for decorative elements)
export const floatAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Text reveal animation
export const textReveal = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Progressive blur (for backgrounds)
export const blurIn = {
  initial: { filter: "blur(10px)", opacity: 0 },
  animate: { 
    filter: "blur(0px)", 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

// Slide and fade (common pattern)
export const slideAndFade = (direction = "up", duration = 0.5) => {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  };

  return {
    initial: { opacity: 0, ...directions[direction] },
    animate: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration, ease: "easeOut" }
    }
  };
};

// Attention seeker (for notifications/alerts)
export const shake = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 }
  }
};

// Progressive reveal (for images)
export const imageReveal = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }

  
};

export default {
  pageTransition,
  fadeIn,
  slideUp,
  slideLeft,
  slideRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
  hoverGlow,
  buttonPress,
  cardHover,
  rotate,
  pulse,
  bounce,
  spinner,
  heroAnimation,
  modalAnimation,
  backdropAnimation,
  floatAnimation,
  textReveal,
  blurIn,
  slideAndFade,
  shake,
  imageReveal
};