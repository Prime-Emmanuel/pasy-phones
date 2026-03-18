import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../data/products';

const ProductCard = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="product-card"
      onClick={() => onClick(product)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {product.exclusive && (
        <div className="product-badge">Exclusive</div>
      )}
      
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
      </div>

      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-specs">{product.specs}</p>
        <p className="product-color">{product.colorNames?.[0] || product.color}</p>
        
        <div className="product-price-row">
          <span className="product-price">{formatPrice(product.price)}</span>
          <span className="product-price-sub">ou 49k/mois</span>
        </div>

        <div className="product-stock">
          <span className={`stock-indicator ${product.stock < 5 ? 'low' : ''}`}></span>
          <span className="stock-text">
            {product.stock < 5 ? `Plus que ${product.stock} en stock` : 'En stock'}
          </span>
        </div>

        <motion.div 
          className="product-action"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
        >
          <button className="btn-quick-view">
            <span>Aperçu rapide</span>
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_forward</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;