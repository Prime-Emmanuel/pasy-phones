import React from 'react';
import './Header.css';

const Header = () => (
  <header className="site-header">
    <div className="header-inner container">
      <div className="logo">LUMINE<span>.</span></div>
      <nav className="nav-links">
        <a href="#">iPhone</a>
        <a href="#">Mac</a>
        <a href="#">Deals</a>
        <a href="#">Support</a>
      </nav>
    </div>
  </header>
);

export default Header;