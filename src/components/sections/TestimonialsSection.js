import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alexander M.",
      location: "Dubai",
      text: "The service is unparalleled. My iPhone 17 Pro Max arrived in pristine condition within 24 hours. The white-glove delivery experience was fantastic.",
      stars: 5
    },
    {
      name: "Sarah L.",
      location: "London",
      text: "I was hesitant about ordering online, but PASY Phones' verification process and immediate customer support put me at ease. Highly recommended.",
      stars: 5
    },
    {
      name: "James D.",
      location: "New York",
      text: "As a professional creator, I need reliable gear fast. PASY delivered my MacBook Pro M4 configured perfectly, exactly when I needed it.",
      stars: 5
    }
  ];

  return (
    <section className="store-section" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Client Experiences</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Hear from our global clientele.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginTop: '3rem' }}>
          {testimonials.map((test, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}
            >
              <div style={{ display: 'flex', color: '#000', marginBottom: '1rem' }}>
                {[...Array(test.stars)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>star</span>
                ))}
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem', fontStyle: 'italic' }}>
                "{test.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{test.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{test.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
