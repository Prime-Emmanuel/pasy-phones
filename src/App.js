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
import './styles/globals.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activePayment, setActivePayment] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [activeCategory, setActiveCategory] = useState('phones');

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    const interval = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
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
                  // You might still want to open a modal, but here we add directly
                  // as per the "Add to bag" terminology usually implying direct action
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
                    // Success notification handled in Modal, but could add more global state here
                  }}
                  onCancel={() => setActivePayment(null)}
                />
              )}
            </AnimatePresence>

            <ChatWidget />
            {showNotification && <FakeNotification />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;