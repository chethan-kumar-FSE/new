'use client';
import React from 'react';
import { useBackdropContext } from '@/context/backdrop';
import { motion, AnimatePresence } from 'framer-motion';

function Backdrop({ children }) {
  const { isBackdropOpen, toggleBackdropStatus } = useBackdropContext();

  const handleOnOverlayClick = () => {
    toggleBackdropStatus({ boolVal: false });
  };
  return (
    <AnimatePresence>
      {isBackdropOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Initial state before the animation starts
          animate={{ opacity: 1, scale: 1 }} // Animate to this state
          exit={{ opacity: 0, scale: 0.8 }} // Define exit animation
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{
            position: 'fixed', // Position it relative to the viewport
            top: 0,
            left: 0,
            width: '100vw', // Full viewport width
            height: '100vh', // Full viewport height
            backgroundColor: 'rgba(0, 0, 0,0.6)', // Semi-transparent background
            zIndex: 10, // Ensure it appears above other content
          }}
          // className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.6)] z-100"
          onClick={() => handleOnOverlayClick()}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Backdrop;
