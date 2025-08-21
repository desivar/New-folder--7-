import React from 'react';
import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/sellers">Proveedores</Link>
            <Link href="/about">About</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025</p>
          <p>Desire Vargas</p>
        </div>
      </div>
    </footer>
  );
}