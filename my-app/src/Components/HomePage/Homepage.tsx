'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getProducts, getCategories } from '@/data/server-data';
import type { Product, Category } from '@/types/definitions';
import './Homepage.css';
import { useRouter } from 'next/navigation';
import { CardsSkeleton } from '@/components/skeletonLoader/skeleton';
import Link from 'next/link';

export default function Homepage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { products } = await getProducts({ itemsPerPage: 100 });
        const featured = products
          .filter((product) => product.featured)
          .slice(0, 8); // Increased to show more products
        setFeaturedProducts(featured);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (selectedCategory !== 'all') params.set('category', selectedCategory);

    router.push(`/products?${params.toString()}`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setNewsletterStatus('Please enter a valid email address');
      return;
    }
    
    // Simulate newsletter subscription
    setNewsletterStatus('Thank you for subscribing!');
    setEmail('');
    setTimeout(() => setNewsletterStatus(''), 3000);
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })),
  ];

  const categoryCards = [
    {
      href: '/products?category=first-aid',
      image: 'https://images.unsplash.com/photo-1599307223386-814d48348d44?w=600&h=400&fit=crop',
      title: 'First Aid',
      description: 'Essential kits and supplies for emergencies',
      icon: '🩹'
    },
    {
      href: '/products?category=diagnostic-tools',
      image: 'https://images.unsplash.com/photo-1627449557404-325d7b5b5c9b?w=600&h=400&fit=crop',
      title: 'Diagnostic Tools',
      description: 'Tools for accurate and reliable health readings',
      icon: '🩺'
    },
    {
      href: '/products?category=mobility-aids',
      image: 'https://images.unsplash.com/photo-1625906232371-3323a67417e2?w=600&h=400&fit=crop',
      title: 'Mobility Aids',
      description: 'Support and freedom with our mobility solutions',
      icon: '♿'
    },
    {
      href: '/products?category=personal-care',
      image: 'https://images.unsplash.com/photo-1576099395272-970ae5139c87?w=600&h=400&fit=crop',
      title: 'Personal Care',
      description: 'Hygiene and care products for everyday well-being',
      icon: '🧼'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section with Image */}
      <section className="hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Your Partner in Health and Wellness</h1>
              <p className="hero-subtitle">
                Providing reliable and high-quality medical supplies for professionals and individuals alike. 
                Trusted by healthcare providers nationwide.
              </p>
              <div className="hero-cta">
                <Link href="/products" className="cta-button primary">
                  Shop All Supplies
                </Link>
                <Link href="/contact" className="cta-button secondary">
                  For Professionals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for diagnostic tools, first aid, and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search products"
              />
              <button type="submit" className="search-button" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
          <div className="filter-container">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
              aria-label="Filter by category"
              disabled={categories.length === 0}
            >
              {categories.length === 0 ? (
                <option>Loading categories...</option>
              ) : (
                categoryOptions.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Our Most Trusted Products</h2>
          <p className="section-subtitle">
            A curated selection of the most popular and reliable supplies trusted by healthcare professionals
          </p>
        </div>

        {loading ? (
          <div className="products-grid">
            <CardsSkeleton />
          </div>
        ) : featuredProducts.length > 0 ? (
          <>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="view-all-container">
              <Link href="/products" className="view-all-button">
                View All Products
              </Link>
            </div>
          </>
        ) : (
          <div className="no-products">
            <div className="no-products-icon">📦</div>
            <h3>No featured products available</h3>
            <p>Check back later for new arrivals</p>
            <Link href="/products" className="browse-all-button">
              Browse All Products
            </Link>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Shop by Medical Category</h2>
          <p className="section-subtitle">
            Find exactly what you need with our organized product categories
          </p>
        </div>
        <div className="categories-grid">
          {categoryCards.map((category, index) => (
            <Link key={index} href={category.href} className="category-card">
              <div className="category-image">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">
            We're committed to providing the best service and products for your health and wellness needs
          </p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">✅</div>
            <h3>Certified Quality</h3>
            <p>
              Every product is sourced from reputable manufacturers and meets
              strict quality standards for professional use.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <h3>Fast & Reliable Delivery</h3>
            <p>
              Your orders are carefully packaged and shipped with speed and
              precision. Same-day shipping available.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">👩‍⚕️</div>
            <h3>Expert Support</h3>
            <p>
              Our team of healthcare professionals is ready to provide
              knowledgeable assistance 24/7.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3>Safety & Security</h3>
            <p>
              We prioritize the safety of your information and your medical
              needs with every secure transaction.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>Stay Informed About Health & Wellness</h2>
            <p>
              Receive updates on new medical products, essential health tips, exclusive offers, and industry news.
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                aria-label="Email address for newsletter"
                required
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </div>
            {newsletterStatus && (
              <div className={`newsletter-status ${newsletterStatus.includes('Thank') ? 'success' : 'error'}`}>
                {newsletterStatus}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}