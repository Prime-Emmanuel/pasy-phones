import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="url(#logo-grad)" />
    <path d="M12 28V12H20C22.2091 12 24 13.7909 24 16C24 18.2091 22.2091 20 20 20H12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="24" r="4" stroke="white" strokeWidth="2.5" />
    <path d="M28 20V12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#000" />
        <stop offset="1" stopColor="#333" />
      </linearGradient>
    </defs>
  </svg>
);

const Navbar = ({ cartCount, cartItems, onRemoveFromCart, onCheckout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
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
          <div className="logo-wrapper" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo />
            <span className="logo-text">PASY</span>
          </div>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">{link.name}</a>
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
              {cartCount > 0 && <span className="notification-dot">{cartCount}</span>}
            </div>
            <div className="user-avatar">
              <img src="https://ui-avatars.com/api/?name=User&background=000&color=fff" alt="User" />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="cart-overlay"
            />
            <motion.div 
              className="cart-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="cart-header">
                <h2>Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="close-cart">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="cart-content">
                {cartItems.length > 0 ? (
                  <>
                    <div className="cart-items-list">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="cart-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <p className="item-spec">{item.selectedStorage || '128GB'}</p>
                            <p className="item-price">{item.price.toLocaleString()} FCFA</p>
                          </div>
                          <button onClick={() => onRemoveFromCart(item.id)} className="remove-btn">
                            <span className="material-symbols-outlined">delete_outline</span>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="cart-footer">
                      <div className="total-row">
                        <span>Total Sum</span>
                        <span>{cartItems.reduce((s, i) => s + i.price, 0).toLocaleString()} FCFA</span>
                      </div>
                      <button 
                        className="checkout-btn"
                        onClick={() => {
                          setIsCartOpen(false);
                          onCheckout();
                        }}
                      >
                        Secure Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="cart-empty-state">
                    <span className="material-symbols-outlined icon">shopping_cart_checkout</span>
                    <p>Your bag is waiting to be filled.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar {
          position: fixed; top: 1.5rem; left: 50%; transform: translateX(-50%);
          width: 95%; max-width: 1400px; height: 72px;
          background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px);
          border-radius: 20px; border: 1px solid rgba(0, 0, 0, 0.08);
          z-index: 1000; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .navbar.scrolled { top: 0.75rem; height: 64px; background: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.08); }

        .nav-container {
          height: 100%; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between;
        }

        .logo-wrapper { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
        .logo-text { font-size: 1.25rem; font-weight: 900; color: #000; letter-spacing: 0.1em; }

        .nav-links { display: flex; gap: 2.5rem; align-items: center; }
        .nav-link {
          color: #000; font-weight: 700; font-size: 0.85rem; text-decoration: none;
          text-transform: uppercase; letter-spacing: 0.05em; transition: 0.3s;
        }
        .nav-link:hover { color: #888; }

        .nav-actions { display: flex; align-items: center; gap: 1rem; }
        .nav-icon {
          background: none; border: none; color: #000; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s;
        }
        .nav-icon span { font-size: 1.5rem; font-weight: 800; }
        .nav-icon:hover { transform: scale(1.1); }

        .nav-icon-wrapper { position: relative; }
        .notification-dot {
          position: absolute; top: -4px; right: -4px; background: #000; color: #fff;
          font-size: 0.65rem; width: 16px; height: 16px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; font-weight: 800;
        }

        .user-avatar { width: 32px; height: 32px; border-radius: 10px; overflow: hidden; border: 1.5px solid #000; }
        .user-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); z-index: 5000; }
        .cart-sidebar {
          position: fixed; top: 0; right: 0; width: min(400px, 100%); height: 100%;
          background: #fff; z-index: 5001; padding: 3rem 2rem; display: flex; flex-direction: column;
        }
        .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .cart-header h2 { font-size: 1.5rem; font-weight: 900; color: #000; }
        .close-cart { background: #f0f0f0; border: none; width: 44px; height: 44px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        .cart-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .cart-items-list { flex: 1; overflow-y: auto; padding-right: 0.5rem; }
        .cart-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: center; border-bottom: 1px solid #f9f9f9; padding-bottom: 1rem; }
        .cart-item img { width: 70px; height: 70px; object-fit: contain; background: #f8f8f8; border-radius: 12px; padding: 0.5rem; }
        .item-info { flex: 1; }
        .item-info h4 { font-size: 1rem; font-weight: 800; margin-bottom: 0.1rem; }
        .item-spec { font-size: 0.75rem; color: #888; font-weight: 700; margin-bottom: 0.25rem; }
        .item-price { font-size: 0.95rem; font-weight: 800; }
        .remove-btn { color: #ff4d4d; background: none; border: none; cursor: pointer; }

        .cart-footer { padding-top: 1.5rem; border-top: 2px solid #000; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-size: 1.25rem; font-weight: 900; }
        .checkout-btn {
          width: 100%; padding: 1.25rem; background: #000; color: #fff; border: none; border-radius: 16px; font-weight: 800; font-size: 1.1rem; cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .navbar { width: 92%; top: 1rem; height: 60px; border-radius: 16px; }
          .nav-container { padding: 0 1rem; }
          .logo-text { font-size: 1.1rem; }
          .cart-sidebar { padding: 2rem 1.25rem; }
          .cart-header h2 { font-size: 1.25rem; }
        }
      `}</style>
    </>
  );
};

export default Navbar;