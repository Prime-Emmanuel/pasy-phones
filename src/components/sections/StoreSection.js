import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../ProductCard';
import { products } from '../../data/products';

const StoreSection = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('iphones');

  const currentProducts = activeCategory === 'iphones' ? products.iphones : products.macbooks;

  return (
    <section className="store-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Premium Collection</h2>
          <p className="section-subtitle">
            Discover our curated selection of exceptional devices
          </p>
        </motion.div>

        <div className="category-tabs">
          <button 
            className={`category-tab ${activeCategory === 'iphones' ? 'active' : ''}`}
            onClick={() => setActiveCategory('iphones')}
          >
            iPhone ({products.iphones.length})
          </button>
          <button 
            className={`category-tab ${activeCategory === 'macbooks' ? 'active' : ''}`}
            onClick={() => setActiveCategory('macbooks')}
          >
            MacBook ({products.macbooks.length})
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="products-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={onProductClick}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StoreSection;