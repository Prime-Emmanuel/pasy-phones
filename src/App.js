import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/animations/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import StoreSection from './components/sections/StoreSection';
import ProductDetailModal from './components/ProductDetailModal';
import CheckoutPage from './components/ui/CheckoutPage';
import PaymentModal from './components/ui/PaymentModal';
import ChatWidget from './components/ChatWidget';
import FakeNotification from './components/FakeNotification';
import TrustSection from './components/sections/TrustSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import AboutSection from './components/sections/AboutSection';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import './styles/globals.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activePayment, setActivePayment] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Admin state
  const [isAdmin, setIsAdmin] = useState(() => !!sessionStorage.getItem('admin_token'));
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    const interval = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, id: Date.now() }]);
    setSelectedProduct(null);
  };

  const handleCheckout = (formData) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setActivePayment({
      amount: total,
      method: formData.paymentMethod,
      details: formData
    });
  };

  // If admin is logged in, show admin panel
  if (isAdmin) {
    return (
      <div>
        <button 
          onClick={() => {
            sessionStorage.removeItem('admin_token');
            setIsAdmin(false);
          }}
          style={{ margin: '10px', padding: '8px 16px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Logout Admin
        </button>
        <AdminPanel />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar 
              cartCount={cart.length} 
              cartItems={cart}
              onRemoveFromCart={(id) => setCart(cart.filter(i => i.id !== id))}
              onCheckout={() => setShowCheckout(true)}
            />
            
            <div id="home">
              <HeroSection />
            </div>
            
            <div id="trust">
              <TrustSection />
            </div>
            
            <div id="products">
              <StoreSection 
                onProductClick={(product) => {
                  setCart([...cart, { ...product, id: Date.now() }]);
                }} 
              />
            </div>
            
            <div id="about">
              <AboutSection />
            </div>
            
            <div id="reviews">
              <TestimonialsSection />
            </div>
            
            <Footer />

            <AnimatePresence>
              {selectedProduct && (
                <ProductDetailModal
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                  onReserve={() => handleAddToCart(selectedProduct)}
                />
              )}

              {showCheckout && (
                <CheckoutPage 
                  cartItems={cart}
                  onClose={() => setShowCheckout(false)}
                  onCheckout={handleCheckout}
                />
              )}

              {activePayment && (
                <PaymentModal 
                  orderDetails={activePayment}
                  onConfirm={() => {
                    setActivePayment(null);
                    setShowCheckout(false);
                    setCart([]);
                  }}
                  onCancel={() => setActivePayment(null)}
                />
              )}
            </AnimatePresence>

            <ChatWidget />
            {showNotification && <FakeNotification />}

            {/* Admin access button */}
            <button
              onClick={() => setShowAdminLogin(!showAdminLogin)}
              style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                padding: '10px 15px',
                background: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: 999
              }}
            >
              Admin
            </button>

            {/* Admin login form */}
            {showAdminLogin && (
              <div style={{
                position: 'fixed',
                bottom: '80px',
                left: '20px',
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000
              }}>
                <AdminLogin onLogin={() => {
                  setIsAdmin(true);
                  setShowAdminLogin(false);
                }} />
                <button 
                  onClick={() => setShowAdminLogin(false)}
                  style={{ marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
