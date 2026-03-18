import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FakeNotification = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const names = ['Alexander', 'Victoria', 'Jonathan', 'Isabella', 'William', 'Sophia'];
  const products = ['iPhone 15 Pro Max', 'MacBook Pro 16"', 'iPhone 15 Pro', 'MacBook Air 15"'];
  
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomProduct = products[Math.floor(Math.random() * products.length)];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="notification-premium"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <div className="notification-icon">
            <i className="fas fa-bell"></i>
          </div>
          <div className="notification-content">
            <span className="notification-name">{randomName}</span>
            <span className="notification-action">just reserved</span>
            <span className="notification-product">{randomProduct}</span>
          </div>
          <div className="notification-time">just now</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FakeNotification;