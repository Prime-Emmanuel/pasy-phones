import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard'; // Fixed: correct path to ProductCard

const DealsSection = ({ deals, onProductClick }) => {
  return (
    <section className="deals-section container">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Today's Exclusive Deals</h2>
        <p className="section-subtitle">Limited time offers</p>
      </motion.div>

      <div className="deals-grid">
        {deals.map((deal, index) => (
          <ProductCard 
            key={deal.id} 
            product={deal} 
            onClick={onProductClick}
          />
        ))}
      </div>
    </section>
  );
};

export default DealsSection;