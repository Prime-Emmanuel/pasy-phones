import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="hero-title"
            variants={itemVariants}
          >
            Best quality gadgets for the most
            <br />
            <span className="hero-title-gradient">Affordable prices</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            variants={itemVariants}
          >
            Exceptional devices. Uncompromising quality. 
            Discover technology at its absolute pinnacle, curated exclusively for you.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            variants={itemVariants}
          >
            <button className="btn-primary" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>View Collection</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="material-symbols-outlined">local_offer</span>
              <span>Latest Offers</span>
            </button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            variants={itemVariants}
          >
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Premium Support</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2 Years</span>
              <span className="stat-label">Warranty</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img 
            src="/images/pexels-japy-34624327.jpg" 
            alt="iPhone 17 Pro" 
            className="hero-image"
          />
          <div className="hero-badge">
            <div className="badge-icon">
              <span className="material-symbols-outlined">star</span>
            </div>
            <div className="badge-text">
              <span className="badge-title">iPhone 17 Pro</span>
              <span className="badge-subtitle">Top Sale</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
