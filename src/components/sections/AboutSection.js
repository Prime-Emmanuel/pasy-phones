import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="about-section" style={{ padding: '8rem 2rem', background: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '2rem', lineHeight: '1.1' }}>
              About <br />
              <span style={{ fontFamily: "'Permanent Marker', cursive", color: '#000' }}>Pasy Phones</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.8', marginBottom: '2rem' }}>
              Founded with a passion for excellence, Pasy Phones has become the premier destination for authentic luxury technology in Cameroon. We don't just sell devices; we provide a gateway to the future.
            </p>
            
            <div style={{ background: '#f8f8f8', padding: '2rem', borderRadius: '1.5rem', borderLeft: '4px solid #000' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined">location_on</span>
                Visit Our Store
              </h3>
              <p style={{ color: '#444', fontStyle: 'italic', lineHeight: '1.6' }}>
                Located in the heart of Douala, precisely in Douala Ancienne Route Bonaberi, above LOSA BEAUTY COMPLEX.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            <div style={{ borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img 
                src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1000" 
                alt="Store Interior" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            
            <div style={{ 
              position: 'absolute', 
              bottom: '-2rem', 
              right: '2rem', 
              background: '#000', 
              color: '#fff', 
              padding: '2rem', 
              borderRadius: '1.5rem',
              maxWidth: '250px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>"Providing the best technology experience in Bonaberi since day one."</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
