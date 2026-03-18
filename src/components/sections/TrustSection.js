import React from 'react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  const features = [
    {
      icon: "verified_user",
      title: "100% Authentic Originals",
      desc: "Every device is rigorously authenticated and guaranteed original. No compromises on quality."
    },
    {
      icon: "local_shipping",
      title: "Priority Secure Shipping",
      desc: "Express delivery directly to your hands in record time, fully insured."
    },
    {
      icon: "security",
      title: "Premium Warranty",
      desc: "Extended in-house protection plans for complete peace of mind, worldwide."
    },
    {
      icon: "support_agent",
      title: "White-Glove Service",
      desc: "A dedicated concierge team available 24/7 to assist with your technical needs."
    }
  ];

  return (
    <section className="store-section" style={{ background: 'var(--bg-dark)', color: '#fff', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" style={{ color: '#fff' }}>The PASY Standard</h2>
          <p className="section-subtitle" style={{ color: '#aaa' }}>
            Why discerning clients choose us for their luxury technology needs
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', padding: '2rem', background: '#111', borderRadius: '1.5rem', border: '1px solid #333' }}
            >
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#fff' }}>{item.icon}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>{item.title}</h3>
              <p style={{ color: '#888', lineHeight: '1.6', fontSize: '0.9rem' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;