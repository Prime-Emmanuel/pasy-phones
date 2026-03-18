import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReservationForm = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone && time) {
      // We'll simulate the submission and show the success state
      setIsSubmitted(true);
      // Still call the parent onSubmit if needed for logging/data
      setTimeout(() => {
        onSubmit({ name, phone, time });
      }, 3000);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5000,
        padding: '1rem'
      }}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)'
        }}
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          background: 'rgba(20, 20, 20, 0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '2.5rem',
          padding: '3rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          color: '#fff',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontFamily: "'Permanent Marker', cursive", 
                marginBottom: '0.5rem',
                letterSpacing: '0.05em'
              }}>
                Reserve Yours
              </h2>
              <p style={{ color: '#aaa', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                Secure your masterpiece with our premium concierge service.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '0.5rem' }}>Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required 
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '1.25rem',
                      padding: '1.25rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '0.5rem' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 ..."
                    required 
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '1.25rem',
                      padding: '1.25rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '0.5rem' }}>Preferred Pickup</label>
                  <input 
                    type="datetime-local" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    required 
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '1.25rem',
                      padding: '1.25rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <button 
                  type="submit" 
                  style={{
                    marginTop: '1rem',
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '1.25rem',
                    padding: '1.25rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    transition: 'transform 0.2s ease, background 0.2s ease'
                  }}
                  onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
                  onMouseOut={e => e.target.style.transform = 'scale(1)'}
                >
                  Confirm Reservation
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center',
                padding: '2rem 0'
              }}
            >
              <div style={{
                width: '100px',
                height: '100px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                border: '2px solid #fff'
              }}>
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="material-symbols-outlined" 
                  style={{ fontSize: '4rem', color: '#fff' }}
                >
                  check
                </motion.span>
              </div>
              <h2 style={{ 
                fontSize: '2rem', 
                fontFamily: "'Permanent Marker', cursive", 
                marginBottom: '1rem' 
              }}>
                Reservation Sent!
              </h2>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>
                Thank you, {name.split(' ')[0]}.<br />
                Our luxury concierge team will contact you shortly to finalize your request.
              </p>
              
              <button 
                onClick={onClose}
                style={{
                  marginTop: '2.5rem',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  borderRadius: '1rem',
                  padding: '1rem 2rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Return to Store
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ReservationForm;