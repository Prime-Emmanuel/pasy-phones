import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#0a0a0a', color: '#888', padding: '5rem 2rem 2rem', borderTop: '1px solid #222' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem', marginBottom: '4rem' }}>
        
        <div style={{ flex: '1 1 250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#fff' }}>
            <svg style={{ width: '1.5rem', height: '1.5rem' }} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
            </svg>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em' }}>PASY</span>
          </div>
          <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
            The premier destination for luxury authentic tech devices, providing unmatched warranty and worldwide white-glove service.
          </p>
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontWeight: '600' }}>Products</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
            <li><a href="#home" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color='#888'}>iPhone 17 Pro</a></li>
            <li><a href="#products" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color='#888'}>MacBook Pro M4</a></li>
            <li><a href="#products" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color='#888'}>AirPods Max</a></li>
            <li><a href="#products" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color='#888'}>Watch Ultra</a></li>
          </ul>
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontWeight: '600' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
            <li><a href="#about" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color='#888'}>About Us</a></li>
            <li><a href="#home" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color='#888'}>Careers</a></li>
            <li><a href="#home" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color='#888'}>Privacy Policy</a></li>
            <li><a href="#home" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color='#888'}>Terms of Service</a></li>
          </ul>
        </div>

      </div>
      
      <div className="container" style={{ borderTop: '1px solid #222', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem' }}>
        <p>&copy; {new Date().getFullYear()} PASY Phones. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>Designed with absolute perfection.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
