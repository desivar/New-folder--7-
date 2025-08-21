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
          .slice(0, 4);
        setFeaturedProducts(featured);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);

    router.push(`/products?${params.toString()}`);
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })),
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <video
          className="hero-video"
          src="https://res.cloudinary.com/dhcfxb9dn/video/upload/v1724036128/health_and_wellness_v1_bgj06d.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>

        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Your Partner in Health and Wellness</h1>
          <p className="hero-subtitle">
            Providing reliable and high-quality medical supplies for professionals and individuals alike.
          </p>
          <div className="hero-cta">
            <Link href="/products">
              <button className="cta-button primary">Shop All Supplies</button>
            </Link>
            <Link href="/contact">
              <button className="cta-button secondary">For Professionals</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for diagnostic tools, first aid, and more..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearchSubmit()}
              className="search-input"
            />
            <button className="search-button" onClick={handleSearchSubmit}>
              🔍
            </button>
          </div>
          <div className="filter-container">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="category-filter"
              aria-label="Filter by category"
              disabled={categories.length === 0}
            >
              {categories.length === 0 ? (
                <option>Loading categories...</option>
              ) : (
                categoryOptions.map(category => (
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
            A curated selection of the most popular and reliable supplies
          </p>
        </div>

        {loading ? (
          <div className="products-grid">
            <CardsSkeleton />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>No featured products available</h3>
            <p>Check back later for new arrivals</p>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Medical Category</h2>
        <div className="categories-grid">
          <Link href="/products?category=first-aid" className="category-card">
            <img
              src="https://images.unsplash.com/photo-1599307223386-814d48348d44?w=500"
              alt="First Aid Supplies"
            />
            <div className="category-overlay">
              <h3>First Aid</h3>
              <p>Essential kits and supplies for emergencies</p>
            </div>
            <div className="sticker">🩹</div>
          </Link>
          <Link href="/products?category=diagnostic-tools" className="category-card">
            <img
              src="https://images.unsplash.com/photo-1627449557404-325d7b5b5c9b?w=500"
              alt="Diagnostic Tools"
            />
            <div className="category-overlay">
              <h3>Diagnostic Tools</h3>
              <p>Tools for accurate and reliable health readings</p>
            </div>
            <div className="sticker">🩺</div>
          </Link>
          <Link href="/products?category=mobility-aids" className="category-card">
            <img
              src="https://images.unsplash.com/photo-1625906232371-3323a67417e2?w=500"
              alt="Mobility Aids"
            />
            <div className="category-overlay">
              <h3>Mobility Aids</h3>
              <p>Support and freedom with our mobility solutions</p>
            </div>
            <div className="sticker">♿</div>
          </Link>
          <Link href="/products?category=personal-care" className="category-card">
            <img
              src="https://images.unsplash.com/photo-1576099395272-970ae5139c87?w=500"
              alt="Personal Care"
            />
            <div className="category-overlay">
              <h3>Personal Care</h3>
              <p>Hygiene and care products for everyday well-being</p>
            </div>
            <div className="sticker">🧼</div>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="benefits-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">✅</div>
            <h3>Certified Quality</h3>
            <p>
              Every product is sourced from reputable manufacturers and meets
              strict quality standards.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <h3>Reliable Delivery</h3>
            <p>
              Your orders are carefully packaged and shipped with speed and
              precision.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">👩‍⚕️</div>
            <h3>Expert Support</h3>
            <p>
              Our team is ready to provide knowledgeable assistance to help you
              find the right products.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3>Safety & Security</h3>
            <p>
              We prioritize the safety of your information and your medical
              needs with every purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Informed</h2>
          <p>
            Receive updates on new medical products, essential health tips, and exclusive offers.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}