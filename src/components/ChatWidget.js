import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleWhatsApp = () => {
    const text = encodeURIComponent(message || "Hi, I'm interested in a premium device.");
    window.open(`https://wa.me/1234567890?text=${text}`, '_blank');
  };

  return (
    <>
      <motion.div 
        className="chat-button-premium"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-comment"></i>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-widget-premium"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="chat-header-premium">
              <div className="chat-title">
                <span className="status-dot"></span>
                <span>PASY Concierge</span>
              </div>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="chat-messages-premium">
              <div className="message-bot">
                <div className="message-content">
                  👋 Welcome to PASY. How may we assist you today?
                </div>
                <span className="message-time">Just now</span>
              </div>
            </div>

            <div className="chat-input-premium">
              <input 
                type="text" 
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                className="whatsapp-btn-premium"
                onClick={handleWhatsApp}
              >
                <i className="fab fa-whatsapp"></i>
                Continue on WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;