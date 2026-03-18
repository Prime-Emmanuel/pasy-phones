import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'iPhone', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Trust', href: '#trust' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#footer' }
  ];

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="logo-text">Pasy Phones</span>
          </div>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}>{link.name}</a>
            ))}
          </div>

          <div className="nav-actions">
            <button className="nav-icon" title="Search">
              <span className="material-symbols-outlined">search</span>
            </button>
            <div className="nav-icon-wrapper" onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer' }}>
              <button className="nav-icon">
                <span className="material-symbols-outlined">shopping_bag</span>
              </button>
              <span className="notification-dot"></span>
            </div>
            {/* User Avatar */}
            <div className="user-avatar">
              <img src="https://ui-avatars.com/api/?name=User&background=000&color=fff" alt="User" />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Cart Sidebar/Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(5px)',
                zIndex: 2000
              }}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: 'min(400px, 100%)',
                height: '100%',
                background: '#fff',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                zIndex: 2001,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '4rem', marginBottom: '1rem' }}>shopping_basket</span>
                <p>Your cart is currently empty.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  style={{ 
                    marginTop: '2rem', 
                    padding: '1rem 2rem', 
                    background: '#000', 
                    color: '#fff', 
                    borderRadius: '2rem',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Start Shopping
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;