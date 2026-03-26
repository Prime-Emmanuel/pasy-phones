import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ orderDetails, onConfirm, onCancel }) => {
  const [step, setStep] = useState('loading'); // 'loading', 'instruction', 'success'

  const mtnUSSD = `*126*1*1*654447087*${orderDetails.amount}*1#`;
  const orangeUSSD = `#150*1*1*656335789*${orderDetails.amount}#`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('instruction');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handlePayNow = () => {
    const ussd = orderDetails.method === 'mtn' ? mtnUSSD : orangeUSSD;
    // Encoding # as %23 is critical for tel: links to work with USSD
    const dialerCode = ussd.replace(/#/g, '%23');
    window.location.href = `tel:${dialerCode}`;
  };

  if (step === 'success') {
    return (
      <div className="payment-modal-overlay">
        <motion.div 
          className="payment-modal success"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00ff80" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h2>Order Confirmed!</h2>
          <p>Your payment instruction has been sent. Our team will contact you shortly for delivery.</p>
          <button onClick={onConfirm} className="finish-btn">Done</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="payment-modal-overlay">
      <AnimatePresence mode="wait">
        {step === 'loading' ? (
          <motion.div 
            key="loading"
            className="payment-modal loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="spinner"></div>
            <h3>Securing Connection...</h3>
            <p>Initializing {orderDetails.method.toUpperCase()} Mobile Money Gateway</p>
          </motion.div>
        ) : (
          <motion.div 
            key="instruction"
            className="payment-modal"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="payment-header">
              <div className={`operator-logo ${orderDetails.method}`}>
                {orderDetails.method === 'mtn' ? 'MTN' : 'Orange'}
              </div>
              <h3>Payment Instruction</h3>
            </div>

            <div className="payment-body">
              <p className="description">
                Amount: <strong>{orderDetails.amount.toLocaleString()} FCFA</strong>
              </p>

              <div className="ussd-box">
                <code>{orderDetails.method === 'mtn' ? mtnUSSD : orangeUSSD}</code>
              </div>

              <div className="mobile-only-action">
                <button onClick={handlePayNow} className="pay-now-btn">
                  Dial Now
                  <span className="material-symbols-outlined">call</span>
                </button>
                <p className="hint-text">This will open your phone dialer with the code ready.</p>
              </div>

              <div className="desktop-instructions">
                <p>1. Dial the code above on your phone</p>
                <p>2. Authorize the transfer</p>
              </div>

              <p className="safety-note">
                Once authorized, click the button below to confirm.
              </p>
            </div>

            <div className="payment-footer">
              <button onClick={onCancel} className="cancel-btn">Cancel</button>
              <button onClick={() => setStep('success')} className="confirm-btn">I've Paid</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .payment-modal-overlay {
          position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 5000;
          padding: 1rem;
        }
        .payment-modal {
          background: #fff; border-radius: 32px; padding: 2.5rem; width: 100%; max-width: 440px;
          text-align: center; color: #000; box-shadow: 0 40px 100px rgba(0,0,0,0.3);
        }
        .loading { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
        .spinner {
          width: 40px; height: 40px; border: 3px solid #f0f0f0; border-top: 3px solid #000;
          border-radius: 50%; animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        .operator-logo {
          width: 50px; height: 50px; border-radius: 14px; margin: 0 auto 1.5rem;
          display: flex; align-items: center; justify-content: center; font-weight: 900;
        }
        .operator-logo.mtn { background: #ffcc00; color: #000; }
        .operator-logo.orange { background: #ff6600; color: #fff; }
        
        .payment-modal h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; }
        .description { font-size: 1.1rem; margin-bottom: 1.5rem; }
        
        .ussd-box {
          background: #f8f8f8; padding: 1.5rem; border-radius: 20px;
          margin-bottom: 2rem; border: 1.5px solid #eee;
        }
        .ussd-box code { font-size: 1.2rem; font-weight: 900; letter-spacing: 0.05em; color: #000; }
        
        .pay-now-btn {
          width: 100%; padding: 1.25rem; background: #000; color: #fff; border: none;
          border-radius: 18px; font-weight: 800; font-size: 1.1rem; display: flex;
          align-items: center; justify-content: center; gap: 0.75rem; cursor: pointer;
        }
        .hint-text { font-size: 0.8rem; color: #888; margin-top: 0.75rem; }
        
        .desktop-instructions { text-align: left; padding: 1rem; border-radius: 12px; font-size: 0.9rem; color: #666; display: none; }
        
        .payment-footer { display: grid; grid-template-columns: 1fr 2fr; gap: 1rem; margin-top: 2rem; }
        .cancel-btn { background: #f0f0f0; border: none; color: #000; padding: 1rem; border-radius: 16px; font-weight: 700; cursor: pointer; }
        .confirm-btn { background: #000; color: #fff; border: none; padding: 1rem; border-radius: 16px; font-weight: 800; cursor: pointer; }
        
        .finish-btn { background: #000; color: #fff; padding: 1.25rem 3rem; border: none; border-radius: 20px; font-weight: 800; margin-top: 2rem; cursor: pointer; }

        @media (min-width: 769px) {
          .mobile-only-action { display: none; }
          .desktop-instructions { display: block; }
        }

        @media (max-width: 480px) {
          .payment-modal { padding: 2rem 1.5rem; border-radius: 24px; }
          .payment-modal h3 { font-size: 1.25rem; }
          .ussd-box { padding: 1rem; }
          .ussd-box code { font-size: 0.95rem; }
          .pay-now-btn { font-size: 1rem; padding: 1rem; }
          .confirm-btn, .cancel-btn { padding: 0.85rem; font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;
