import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';

const StoreSection = ({ onProductClick }) => {
  const categories = [
    { id: 'phones', label: 'Premium Phones', icon: 'smartphone' },
    { id: 'laptops', label: 'Powerful Laptops', icon: 'laptop_mac' },
    { id: 'headsets', label: 'High-End Audio', icon: 'headphones' },
    { id: 'tablets', label: 'Pro Tablets', icon: 'tablet_mac' }
  ];

  return (
    <section className="store-section" id="products">
      <div className="container">
        {categories.map((cat, index) => {
          const categoryProducts = products[cat.id] || [];
          if (categoryProducts.length === 0) return null;

          return (
            <div key={cat.id} className="category-group">
              <motion.div 
                className="category-divider"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '100%', opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              />
              
              <motion.div 
                className="category-intro"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="category-icon-reveal">
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <h2>{cat.label}</h2>
                <div className="category-count">{categoryProducts.length} Premium Items</div>
              </motion.div>

              <div className="products-grid">
                {categoryProducts.map((product) => (
                  <DetailedModelCard 
                    key={product.id}
                    product={product}
                    onAddToCart={(spec) => onProductClick({ ...product, selectedStorage: spec })}
                  />
                ))}
              </div>
            </div>
          );
        })}

        <div className="store-footer-note">
          <span className="material-symbols-outlined">verified</span>
          <p>All devices are authentic and come with a standard warranty.</p>
        </div>
      </div>

      <style jsx>{`
        .store-section { padding: 12rem 0; background: #fff; position: relative; z-index: 10; }
        .category-group { margin-bottom: 20rem; }
        .category-group:last-child { margin-bottom: 0; }
        
        .category-divider {
          height: 1px;
          background: rgba(0, 0, 0, 0.08);
          margin-bottom: 8rem;
        }

        .category-intro {
          text-align: center;
          margin-bottom: 6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .category-icon-reveal {
          width: 100px;
          height: 100px;
          background: #f8f8f8;
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.5rem;
          color: #000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .category-icon-reveal span { font-size: 3rem; }
        .category-intro h2 {
          font-size: 4.5rem;
          font-weight: 800;
          color: #000;
          margin-bottom: 1rem;
          letter-spacing: -0.04em;
          text-transform: capitalize;
        }
        .category-count {
          font-weight: 800;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.95rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 4rem;
        }

        .store-footer-note {
          margin-top: 15rem;
          padding: 6rem;
          background: #fcfcfc;
          border-radius: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
          color: #000;
          font-weight: 800;
          border: 1px solid #eee;
        }
        .store-footer-note span { font-size: 4rem; color: #000; }
        .store-footer-note p { font-size: 1.25rem; }

        @media (max-width: 768px) {
          .store-section { padding: 8rem 0; }
          .category-intro h2 { font-size: 2.75rem; }
          .category-group { margin-bottom: 12rem; }
          .products-grid { grid-template-columns: 1fr; gap: 3rem; }
          .category-icon-reveal { width: 80px; height: 80px; }
          .category-icon-reveal span { font-size: 2.5rem; }
        }
      `}</style>
    </section>
  );
};

const DetailedModelCard = ({ product, onAddToCart }) => {
  const [selectedSpec, setSelectedSpec] = useState(product.specs?.split('•')[0]?.trim() || '128GB');
  
  return (
    <motion.div 
      className="detailed-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="card-info">
        <div className="card-header">
          <h3>{product.name}</h3>
          <div className="rating">
            <span className="material-symbols-outlined">star</span>
            <span>4.9</span>
          </div>
        </div>
        <div className="card-price">
          {product.price.toLocaleString()} FCFA
        </div>
        
        <div className="spec-selector">
          <p>Storage</p>
          <div className="spec-options">
            {['128GB', '256GB', '512GB'].map(spec => (
              <button 
                key={spec}
                className={`spec-option ${selectedSpec === spec ? 'active' : ''}`}
                onClick={() => setSelectedSpec(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
        
        <button className="add-cart-btn" onClick={() => onAddToCart(selectedSpec)}>
          Add to bag
          <span className="material-symbols-outlined">shopping_bag</span>
        </button>
      </div>

      <style jsx>{`
        .detailed-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 40px;
          overflow: hidden;
          color: #000;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-image {
          height: 380px;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          position: relative;
        }
        .card-image::after {
          content: '';
          position: absolute;
          width: 80%;
          height: 20%;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%);
          bottom: 10%;
          z-index: 1;
        }
        .card-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .detailed-card:hover .card-image img {
          transform: scale(1.1) translateY(-10px);
        }

        .card-info {
          padding: 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        .card-header h3 {
          font-size: 1.75rem;
          font-weight: 800;
          margin: 0;
          line-height: 1.1;
          color: #000;
          letter-spacing: -0.01em;
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: #000;
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 800;
        }
        .rating span.material-symbols-outlined {
          font-size: 1.2rem;
          color: #fff;
          font-variation-settings: 'FILL' 1;
        }
        .card-price {
          font-size: 2.25rem;
          font-weight: 900;
          margin-bottom: 3rem;
          color: #000;
          letter-spacing: -0.02em;
        }
        .spec-selector p {
          font-size: 0.9rem;
          font-weight: 800;
          color: #999;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          letter-spacing: 0.1em;
        }
        .spec-options {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 3.5rem;
        }
        .spec-option {
          padding: 0.9rem 1.6rem;
          border: 2px solid #f0f0f0;
          background: none;
          border-radius: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
          color: #000;
        }
        .spec-option:hover { border-color: #000; }
        .spec-option.active {
          border-color: #000;
          background: #000;
          color: #fff;
        }
        .add-cart-btn {
          margin-top: auto;
          width: 100%;
          padding: 1.5rem;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 24px;
          font-weight: 800;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-cart-btn:hover {
          background: #222;
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        @media (max-width: 768px) {
          .card-image { height: 280px; padding: 2rem; }
          .card-info { padding: 1.5rem; }
          .card-header h3 { font-size: 1.25rem; }
          .rating { padding: 0.35rem 0.75rem; font-size: 0.8rem; }
          .card-price { font-size: 1.5rem; margin-bottom: 2rem; }
          .spec-selector p { font-size: 0.75rem; margin-bottom: 0.75rem; }
          .spec-options { gap: 0.5rem; margin-bottom: 2rem; }
          .spec-option { padding: 0.6rem 1rem; border-radius: 12px; font-size: 0.85rem; }
          .add-cart-btn { padding: 1rem; border-radius: 16px; font-size: 1rem; }
        }

        @media (max-width: 480px) {
          .card-image { height: 220px; padding: 1.5rem; }
          .card-info { padding: 1.25rem; }
          .card-header h3 { font-size: 1.1rem; }
          .card-price { font-size: 1.35rem; }
        }
      `}</style>
    </motion.div>
  );
};

export default StoreSection;