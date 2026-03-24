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
      whileHover={{ y: -10 }}
    >
      <div className="product-image-wrapper">
        <div className="product-image-bg"></div>
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.brand && <span className="brand-tag">{product.brand}</span>}
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="series-tag">{product.series || 'Premium'}</span>
          {product.stock < 5 && product.stock > 0 && (
            <span className="stock-warning">Limited Stock</span>
          )}
        </div>
        
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.specs}</p>
        
        <div className="product-footer">
          <div className="price-container">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="old-price">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          
          <button className="buy-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .product-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(0, 210, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .product-image-wrapper {
          position: relative;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 250px;
        }
        .product-image-bg {
          position: absolute;
          width: 70%;
          height: 70%;
          background: radial-gradient(circle, rgba(0, 210, 255, 0.1) 0%, transparent 70%);
          filter: blur(20px);
          z-index: 0;
        }
        .product-image {
          max-width: 100%;
          max-height: 200px;
          object-fit: contain;
          z-index: 1;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.1) rotate(2deg);
        }
        .brand-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          backdrop-filter: blur(5px);
        }
        .product-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .series-tag {
          font-size: 0.75rem;
          color: var(--accent-color, #00d2ff);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .stock-warning {
          font-size: 0.7rem;
          color: #ff4d4d;
          background: rgba(255, 77, 77, 0.1);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        .product-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .product-description {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }
        .product-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .price-container {
          display: flex;
          flex-direction: column;
        }
        .current-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
        }
        .old-price {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.3);
          text-decoration: line-through;
        }
        .buy-button {
          background: #fff;
          color: #000;
          border: none;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .buy-button:hover {
          background: var(--accent-color, #00d2ff);
          color: #fff;
          transform: scale(1.1);
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;