import React from 'react';
import './AboutPage.css';
export default function AboutPage() {
  return (<div className="about-page">
        <div className="about-hero">
          <div className="about-content">
            <h1>About Us</h1>
            <p className="about-subtitle">
              Your trusted partner in health and wellness, providing quality medical supplies with care and innovation.
            </p>
          </div>
        </div>

        <section className="about-mission">
          <div className="container">
            <h2>Our Mission</h2>
            <p>
              Our mission is to ensure healthcare is accessible and reliable for everyone. We are committed to supplying high-quality medical products to professionals and individuals, making it easier to provide and receive essential care. We aim to be a dependable source for all your health-related needs, combining cutting-edge technology with compassionate service.
            </p>
          </div>
        </section>

        <section className="about-values">
          <div className="container">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">⚕️</div>
                <h3>Precision & Quality</h3>
                <p>
                  We meticulously select every item in our catalog to meet the highest standards of safety and effectiveness, ensuring you receive only the best medical supplies available.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🌐</div>
                <h3>Reliability & Accessibility</h3>
                <p>
                  We believe health supplies should be easy to get when you need them. We work to maintain consistent stock and provide a seamless shopping experience for all.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Support & Partnership</h3>
                <p>
                  We see ourselves as partners in your well-being. Our dedicated team is here to support you with expert advice and exceptional customer service every step of the way.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🛡️</div>
                <h3>Integrity & Trust</h3>
                <p>
                  Your trust is our foundation. We operate with complete transparency and an unwavering commitment to ethical practices in everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-story">
          <div className="container">
            <div className="story-content">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>
                  Our company was founded by a team of healthcare professionals and technologists who experienced firsthand the challenges of securing critical medical supplies. We recognized the urgent need to modernize the medical supply chain and bridge the gap between suppliers and healthcare providers.
                </p>
                <p>
                  Starting with a vision of efficiency and trust, we built a comprehensive platform designed to serve hospitals, clinics, and families alike. Our goal was to create a reliable source where medical professionals could find everything from basic first aid supplies to specialized diagnostic equipment.
                </p>
                <p>
                  Today, we're proud to serve thousands of healthcare providers and individuals, providing the essential tools and resources that help save lives and improve health outcomes in communities worldwide.
                </p>
              </div>
              <div className="story-image">
                <img 
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=500" 
                  alt="Medical supplies and healthcare equipment organized on a modern table" 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="about-team">
          <div className="container">
            <h2>Meet Our Leadership Team</h2>
            <p className="team-intro">
              Our diverse team combines decades of healthcare expertise with innovative technology solutions, all united in our mission to serve you better.
            </p>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">👨‍⚕️</div>
                <h3>Dr. Anya Sharma</h3>
                <p>Chief Medical Officer</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">📦</div>
                <h3>David Miller</h3>
                <p>Head of Logistics</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">💬</div>
                <h3>Sofia Perez</h3>
                <p>Customer Experience Lead</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>
                Explore our extensive catalog of medical supplies and experience the quality, reliability, and service that healthcare professionals trust. We're here to support your mission of providing excellent care.
              </p>
              <div className="cta-buttons">
                <button className="btn btn-primary">Browse Our Catalog</button>
                <button className="btn btn-secondary">Contact Our Team</button>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}