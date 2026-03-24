import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '../data/products';

const ProductDetailModal = ({ product, onClose, onReserve }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const thumbnails = [
    product.thumbnail1,
    product.thumbnail2,
    product.thumbnail3,
    product.thumbnail4
  ];

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="modal-grid">
            {/* Gallery Section */}
            <div className="modal-gallery">
              <div className="modal-main-image">
                <img src={thumbnails[selectedImage]} alt={product.name} />
              </div>
              <div className="modal-thumbnails">
                {thumbnails.map((thumb, index) => (
                  <div 
                    key={index}
                    className={`modal-thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={thumb} alt={`${product.name} view ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="modal-info">
              <div className="modal-badges">
                {product.exclusive && (
                  <span className="modal-badge exclusive">
                    Online Exclusive Price
                  </span>
                )}
                <span className="modal-badge stock">
                  <span className="stock-dot"></span>
                  {product.stock > 5 ? 'In Stock' : `Only ${product.stock} left`}
                </span>
              </div>

              <h2 className="modal-title">{product.name}</h2>

              <div className="modal-price-row">
                <span className="modal-price">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="modal-price-old">{formatPrice(product.oldPrice)}</span>
                )}
              </div>

              <p className="modal-description">{product.longDescription || product.description}</p>

              {/* Color Options */}
              <div className="modal-options">
                <div>
                  <div className="option-label">Finish</div>
                  <div className="color-options">
                    {product.colors?.map((color, index) => (
                      <button
                        key={index}
                        className={`color-option ${selectedColor === index ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(index)}
                        title={product.colorNames?.[index]}
                      />
                    ))}
                  </div>
                </div>

                {/* Storage Options */}
                <div>
                  <div className="option-label">Storage</div>
                  <div className="storage-options">
                    {product.storage?.map((storage, index) => (
                      <button
                        key={index}
                        className={`storage-option ${selectedStorage === index ? 'active' : ''}`}
                        onClick={() => setSelectedStorage(index)}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button className="modal-reserve-btn" onClick={onReserve}>
                  Add to Cart
                </button>
                <button className="modal-icon-btn">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
                <button className="modal-icon-btn">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>

              {/* Features */}
              <div className="modal-features">
                <div className="modal-feature">
                  <span className="material-symbols-outlined feature-icon">local_shipping</span>
                  <div className="feature-text">
                    <span className="feature-title">Free Shipping</span>
                    <span className="feature-subtitle">Arrives tomorrow</span>
                  </div>
                </div>
                <div className="modal-feature">
                  <span className="material-symbols-outlined feature-icon">verified_user</span>
                  <div className="feature-text">
                    <span className="feature-title">1 Year Warranty</span>
                    <span className="feature-subtitle">PASY Protect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;