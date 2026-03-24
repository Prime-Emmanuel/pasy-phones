import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../../data/products';

const CheckoutPage = ({ cartItems, onCheckout, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    address: '',
    paymentMethod: 'mtn' // 'mtn' or 'orange'
  });

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckout(formData);
  };

  return (
    <motion.div 
      className="checkout-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="checkout-card">
        <div className="checkout-header">
          <h2>Secure Checkout</h2>
          <button onClick={onClose} className="close-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Delivery Information</h3>
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="6xx xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>WhatsApp (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="6xx xxx xxx"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Delivery Address</label>
                <textarea 
                  required 
                  placeholder="Street, Neighborhood, City (e.g., Bonaberi, Douala)"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Method (Mobile Money)</h3>
              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'mtn' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="mtn" 
                    checked={formData.paymentMethod === 'mtn'}
                    onChange={() => setFormData({...formData, paymentMethod: 'mtn'})}
                  />
                  <div className="option-content">
                    <div className="mtn-logo">MTN</div>
                    <span>MTN MoMo</span>
                  </div>
                </label>
                <label className={`payment-option ${formData.paymentMethod === 'orange' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="orange" 
                    checked={formData.paymentMethod === 'orange'}
                    onChange={() => setFormData({...formData, paymentMethod: 'orange'})}
                  />
                  <div className="option-content">
                    <div className="orange-logo">Orange</div>
                    <span>Orange Money</span>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Pay {formatPrice(total)}
            </button>
          </form>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map((item, idx) => (
                <div key={idx} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <span className="name">{item.name}</span>
                    <span className="price">{formatPrice(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span className="total-amount">{formatPrice(total)}</span>
            </div>
            <div className="security-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Secure Direct Payment</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          padding: 1rem;
        }
        .checkout-card {
          background: #000;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
          max-width: 1000px;
          border-radius: 32px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
        }
        .checkout-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .checkout-header h2 { font-size: 1.5rem; color: #fff; margin: 0; }
        .close-btn { background: none; border: none; color: #fff; cursor: pointer; }
        
        .checkout-content {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          overflow-y: auto;
        }
        
        .checkout-form { padding: 2rem; border-right: 1px solid rgba(255, 255, 255, 0.1); }
        .form-section { margin-bottom: 2.5rem; }
        .form-section h3 { font-size: 1.1rem; margin-bottom: 1.5rem; color: #fff; opacity: 0.9; }
        
        .input-group { margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        
        label { font-size: 0.85rem; color: rgba(255, 255, 255, 0.5); }
        input, textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.8rem 1rem;
          color: #fff;
          font-family: inherit;
        }
        input:focus, textarea:focus { outline: none; border-color: #00d2ff; background: rgba(0, 210, 255, 0.05); }
        
        .payment-options { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .payment-option {
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1rem;
          transition: all 0.3s ease;
        }
        .payment-option input { display: none; }
        .payment-option.active { border-color: #00d2ff; background: rgba(0, 210, 255, 0.05); }
        
        .option-content { display: flex; align-items: center; gap: 1rem; color: #fff; font-weight: 500; }
        .mtn-logo, .orange-logo {
          width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; text-transform: uppercase;
        }
        .mtn-logo { background: #ffcc00; color: #000; }
        .orange-logo { background: #ff6600; color: #fff; }
        
        .place-order-btn {
          width: 100%; padding: 1.25rem; background: #fff; color: #000; border: none; border-radius: 16px; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease;
        }
        .place-order-btn:hover { background: #00d2ff; color: #fff; transform: translateY(-2px); }
        
        .order-summary { padding: 2rem; background: rgba(255, 255, 255, 0.02); }
        .order-summary h3 { font-size: 1.1rem; margin-bottom: 1.5rem; color: #fff; }
        
        .summary-items { max-height: 300px; overflow-y: auto; margin-bottom: 2rem; }
        .summary-item { display: flex; gap: 1rem; margin-bottom: 1.25rem; align-items: center; }
        .summary-item img { width: 50px; height: 50px; border-radius: 8px; background: #fff; object-fit: contain; }
        .item-details { display: flex; flex-direction: column; }
        .item-details .name { font-size: 0.9rem; color: #fff; font-weight: 500; }
        .item-details .price { font-size: 0.85rem; color: rgba(255, 255, 255, 0.5); }
        
        .summary-total { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
        .summary-total span { color: rgba(255, 255, 255, 0.6); }
        .summary-total .total-amount { font-size: 1.5rem; font-weight: 700; color: #fff; }
        
        .security-note { margin-top: 2rem; display: flex; align-items: center; gap: 0.5rem; color: rgba(0, 255, 128, 0.6); font-size: 0.8rem; }
        
        @media (max-width: 768px) {
          .checkout-content { grid-template-columns: 1fr; }
          .checkout-form { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
          .input-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </motion.div>
  );
};

export default CheckoutPage;
