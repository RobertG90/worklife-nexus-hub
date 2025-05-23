import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/vibe.css';

interface VibeContextType {
  isVibeMode: boolean;
  toggleVibeMode: () => void;
  currentEmoji: string;
}

const VibeContext = createContext<VibeContextType | undefined>(undefined);

const EMOJIS = ['✨', '🌈', '🎉', '🚀', '💫', '🌟', '🎨', '🎸', '🎧', '🎪'];
const CELEBRATION_GIFS = [
  'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif', // Confetti
  'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif', // Party
  'https://media.giphy.com/media/26gsv0tbVbQqCZwAg/giphy.gif', // Dance
  'https://media.giphy.com/media/26gsasKHkeH0VP8d2/giphy.gif'  // Celebration
];

export function VibeProvider({ children }: { children: React.ReactNode }) {
  const [isVibeMode, setIsVibeMode] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(EMOJIS[0]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', updateWindowSize);
    updateWindowSize();

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    if (isVibeMode) {
      // Rotate through emojis every 2 seconds when vibe mode is on
      const interval = setInterval(() => {
        setCurrentEmoji(prev => {
          const currentIndex = EMOJIS.indexOf(prev);
          return EMOJIS[(currentIndex + 1) % EMOJIS.length];
        });
      }, 2000);

      // Add the vibe class to the body for global styles
      document.body.classList.add('vibe-mode');

      // Show confetti for 5 seconds when vibe mode is turned on
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      return () => {
        clearInterval(interval);
        document.body.classList.remove('vibe-mode');
        setShowConfetti(false);
      };
    }
  }, [isVibeMode]);

  const toggleVibeMode = () => {
    setIsVibeMode(prev => !prev);
  };

  return (
    <VibeContext.Provider value={{ isVibeMode, toggleVibeMode, currentEmoji }}>
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <AnimatePresence>
        {isVibeMode && (
          <>
            {CELEBRATION_GIFS.map((gif, index) => (
              <motion.div
                key={gif}
                className={`gif-container ${
                  index === 0 ? 'top-left' :
                  index === 1 ? 'top-right' :
                  index === 2 ? 'bottom-left' : 'bottom-right'
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={gif}
                  alt="Celebration"
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
      {children}
    </VibeContext.Provider>
  );
}

export function useVibe() {
  const context = useContext(VibeContext);
  if (context === undefined) {
    throw new Error('useVibe must be used within a VibeProvider');
  }
  return context;
} 