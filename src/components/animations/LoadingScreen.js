import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = "PASY PHONES".split("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="loading-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.4,
          filter: 'grayscale(100%) brightness(0.5)'
        }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-smartphone-screen-40783-large.mp4" type="video/mp4" />
      </video>

      <div className="loading-content" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: 'flex',
            gap: '0.2em',
            marginBottom: '2rem',
            justifyContent: 'center'
          }}
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={item}
              style={{
                fontSize: 'clamp(2rem, 8vw, 6rem)',
                fontWeight: '400',
                fontFamily: "'Permanent Marker', cursive",
                color: '#fff',
                textShadow: '0 0 20px rgba(255,255,255,0.3)'
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
        
        <div style={{ width: '300px', height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '0 auto', position: 'relative' }}>
          <motion.div 
            style={{
              height: '100%',
              backgroundColor: '#fff',
              width: `${progress}%`,
              boxShadow: '0 0 15px rgba(255,255,255,0.8)'
            }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: '1rem',
            fontSize: '0.9rem',
            letterSpacing: '0.3em',
            color: '#888',
            textTransform: 'uppercase'
          }}
        >
          Loading Perfection {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;