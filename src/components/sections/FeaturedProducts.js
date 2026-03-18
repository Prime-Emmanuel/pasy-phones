import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard'; // Fixed: correct path to ProductCard

const FeaturedProducts = ({ products, onProductClick }) => {
  return (
    <section className="featured-section container">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Featured Collection</h2>
        <p className="section-subtitle">Curated for the discerning</p>
      </motion.div>

      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={onProductClick}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;