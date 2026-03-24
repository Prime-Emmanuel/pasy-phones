import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ orderDetails, onConfirm, onCancel }) => {
  const [step, setStep] = useState('loading'); // 'loading', 'instruction', 'success'
  const isMobile = window.innerWidth <= 768;

  const mtnUSSD = `*126*1*1*654447087*${orderDetails.amount}*1#`;
  const orangeUSSD = `#150*1*1*656335789*${orderDetails.amount}#`;

  useEffect(() => {
    // Show loading for 2.5 seconds as requested by user
    const timer = setTimeout(() => {
      setStep('instruction');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handlePayNow = () => {
    const ussd = orderDetails.method === 'mtn' ? mtnUSSD : orangeUSSD;
    // On mobile, try to open the dialer. 
    // Browsers often require manual dialing for security anyway, so we provide the code clearly.
    window.location.href = `tel:${ussd}`;
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
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00ff80" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
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
            <h3>Loading payment in progress...</h3>
            <p>Communicating with {orderDetails.method.toUpperCase()} Mobile Money Gateway</p>
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
              <h3>Complete Your Payment</h3>
            </div>

            <div className="payment-body">
              <p className="description">
                To complete your order for <strong>{orderDetails.amount.toLocaleString()} FCFA</strong>, 
                please execute the following USSD code on your phone:
              </p>

              <div className="ussd-box">
                <code>{orderDetails.method === 'mtn' ? mtnUSSD : orangeUSSD}</code>
              </div>

              {isMobile ? (
                <button onClick={handlePayNow} className="pay-now-btn">
                  Pay Now on My Phone
                </button>
              ) : (
                <div className="desktop-instructions">
                  <p>Step 1: Open the dialer on your phone</p>
                  <p>Step 2: Type the code above and press call</p>
                  <p>Step 3: Enter your secret code to authorize transfer</p>
                </div>
              )}

              <p className="safety-note">
                Once you have authorized the payment on your phone, click the button below.
              </p>
            </div>

            <div className="payment-footer">
              <button onClick={onCancel} className="cancel-btn">Cancel</button>
              <button onClick={() => setStep('success')} className="confirm-btn">I've Authorized the Payment</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .payment-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4000;
        }
        .payment-modal {
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 90%;
          max-width: 450px;
          border-radius: 28px;
          padding: 2.5rem;
          text-align: center;
          color: #fff;
        }
        .loading { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
        .spinner {
          width: 50px; height: 50px;
          border: 3px solid rgba(0, 210, 255, 0.1);
          border-top: 3px solid #00d2ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        .operator-logo {
          width: 60px; height: 60px; border-radius: 12px; margin: 0 auto 1.5rem;
          display: flex; align-items: center; justify-content: center; font-weight: 900;
        }
        .operator-logo.mtn { background: #ffcc00; color: #000; }
        .operator-logo.orange { background: #ff6600; color: #fff; }
        
        .ussd-box {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 16px;
          margin: 1.5rem 0;
          border: 1px dashed rgba(255, 255, 255, 0.2);
        }
        .ussd-box code { font-size: 1.25rem; color: #00d2ff; font-family: monospace; }
        
        .pay-now-btn {
          width: 100%; padding: 1rem; background: #00d2ff; color: #fff; border: none; border-radius: 12px; font-weight: 700; margin-bottom: 1.5rem; cursor: pointer;
        }
        .desktop-instructions {
          text-align: left; background: rgba(255, 255, 255, 0.02); padding: 1rem; border-radius: 12px; font-size: 0.9rem; color: rgba(255, 255, 255, 0.7); margin-bottom: 1.5rem;
        }
        
        .payment-footer { display: grid; grid-template-columns: 1fr 2fr; gap: 1rem; margin-top: 2rem; }
        .cancel-btn { background: transparent; border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; padding: 0.75rem; border-radius: 12px; cursor: pointer; }
        .confirm-btn { background: #00ff80; color: #000; border: none; padding: 0.75rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        
        .finish-btn { background: #fff; color: #000; padding: 1rem 3rem; border: none; border-radius: 12px; font-weight: 700; margin-top: 2rem; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default PaymentModal;
