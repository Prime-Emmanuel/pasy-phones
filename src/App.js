import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/animations/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import StoreSection from './components/sections/StoreSection';
import ProductDetailModal from './components/ProductDetailModal';
import ReservationForm from './components/ReservationForm';
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
  const [showReservation, setShowReservation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Fake notification every 20 seconds
    const interval = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

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
            <Navbar />
            <div id="home">
              <HeroSection />
            </div>
            <div id="trust">
              <TrustSection />
            </div>
            <div id="products">
              <StoreSection onProductClick={setSelectedProduct} />
            </div>
            <div id="about">
              <AboutSection />
            </div>
            <div id="reviews">
              <TestimonialsSection />
            </div>
            <Footer />

            {selectedProduct && (
              <ProductDetailModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onReserve={() => {
                  setShowReservation(true);
                  setSelectedProduct(null);
                }}
              />
            )}

            {showReservation && (
              <ReservationForm
                onSubmit={(data) => {
                  console.log('Reservation:', data);
                  // The success state is now handled within the ReservationForm component itself
                }}
                onClose={() => setShowReservation(false)}
              />
            )}

            <ChatWidget />
            
            {showNotification && <FakeNotification />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;