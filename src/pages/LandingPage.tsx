import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DonationModal } from '../components/DonationModal';
import { FloatingDonateButton } from '../components/FloatingDonateButton';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        if (id) {
          const element = document.getElementById(id);
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Add scroll effect to header
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 100) {
          (header as HTMLElement).style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
          (header as HTMLElement).style.background = 'rgba(26, 26, 46, 0.95)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="DeepRabbit.net" style={{ height: '192px' }} />
          </Link>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-buttons">
            <button className="donate-button" onClick={() => setIsDonationModalOpen(true)}>
              💝 Donate
            </button>
            <a href="#try-now" className="cta-button">Try Now</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-text" id="user-count">🔥 Join thousands of creators</span>
            </div>
            <h1>
              Stop Struggling with Writer's Block.<br />
              <span className="highlight">Create Hit Songs in Minutes.</span>
            </h1>
            <p className="subtitle">
              The ONLY AI music tool that lets you perform live like a real instrument. No more staring at blank DAWs - just pure musical flow.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">2 min</div>
                <div className="stat-label">Average time to first track</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">190+</div>
                <div className="stat-label">Professional styles</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0ms</div>
                <div className="stat-label">Latency - feels like magic</div>
              </div>
            </div>

            <div className="hero-buttons">
              <Link to="/app" className="btn-primary">
                🚀 Start Creating FREE (No Credit Card)
              </Link>
              <Link to="/faq" className="btn-secondary">
                ❓ View FAQ
              </Link>
            </div>

            <div className="hero-guarantee">
              <span className="guarantee-icon">✅</span>
              <span className="guarantee-text">30-second setup • Works on any device • Cancel anytime</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="app-mockup">
              {/* App Header */}
              <div className="mockup-header">
                <div className="mockup-toolbar">
                  <div className="mockup-brand">
                    <img src="/logo.png" alt="DeepRabbit.net" style={{ height: '24px', marginRight: '8px' }} />
                    DeepRabbit.net
                  </div>
                  <div className="mockup-controls">
                    <button className="mockup-btn">⏺</button>
                    <button className="mockup-btn">♻</button>
                    <button className="mockup-btn">🎲</button>
                    <button className="mockup-btn">⚙</button>
                    <button className="mockup-btn">EVOLVE</button>
                  </div>
                </div>
              </div>

              {/* Main App Content */}
              <div className="mockup-content">
                {/* Left Panel */}
                <div className="mockup-sidebar">
                  <div className="mockup-panel-header">
                    <div className="mockup-tabs">
                      <button className="mockup-tab active">Styles</button>
                      <button className="mockup-tab">Instruments</button>
                    </div>
                    <div className="mockup-search">
                      <input type="text" placeholder="Search styles..." className="mockup-search-input" />
                    </div>
                  </div>
                  <div className="mockup-style-list">
                    <div className="mockup-style-item active">House</div>
                    <div className="mockup-style-item">Jazz</div>
                    <div className="mockup-style-item">Ambient</div>
                    <div className="mockup-style-item">Techno</div>
                    <div className="mockup-style-item">Blues</div>
                    <div className="mockup-style-item">Rock</div>
                  </div>
                </div>

                {/* Main Workspace */}
                <div className="mockup-workspace">
                  <div className="mockup-timeline-header">
                    <h3>deeprabbit — Fresh tracks. Forged by AI.</h3>
                  </div>
                  <div className="mockup-grid">
                    <div className="mockup-slot active">
                      <div className="slot-header">
                        <span className="slot-number">1</span>
                        <span className="slot-style">House</span>
                      </div>
                      <div className="slot-controls">
                        <div className="slot-slider">
                          <div className="slider-track"></div>
                          <div className="slider-thumb"></div>
                        </div>
                        <div className="slot-value">1.2</div>
                      </div>
                    </div>
                    <div className="mockup-slot">
                      <div className="slot-header">
                        <span className="slot-number">2</span>
                        <span className="slot-style">Jazz</span>
                      </div>
                      <div className="slot-controls">
                        <div className="slot-slider">
                          <div className="slider-track"></div>
                          <div className="slider-thumb"></div>
                        </div>
                        <div className="slot-value">0.8</div>
                      </div>
                    </div>
                    <div className="mockup-slot">
                      <div className="slot-header">
                        <span className="slot-number">3</span>
                        <span className="slot-style">Ambient</span>
                      </div>
                      <div className="slot-controls">
                        <div className="slot-slider">
                          <div className="slider-track"></div>
                          <div className="slider-thumb"></div>
                        </div>
                        <div className="slot-value">0.0</div>
                      </div>
                    </div>
                    <div className="mockup-slot">
                      <div className="slot-header">
                        <span className="slot-number">4</span>
                        <span className="slot-style">Techno</span>
                      </div>
                      <div className="slot-controls">
                        <div className="slot-slider">
                          <div className="slider-track"></div>
                          <div className="slider-thumb"></div>
                        </div>
                        <div className="slot-value">0.5</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Mobile Nav */}
              <div className="mockup-bottom-nav">
                <div className="mockup-nav-item">
                  <div className="mockup-nav-icon">🔄</div>
                  <div className="mockup-nav-label">Evolve</div>
                </div>
                <div className="mockup-nav-item">
                  <div className="mockup-nav-icon">☰</div>
                  <div className="mockup-nav-label">Menu</div>
                </div>
                <div className="mockup-nav-item mockup-nav-center">
                  <div className="mockup-play-btn">
                    <div className="mockup-play-icon">▶</div>
                  </div>
                </div>
                <div className="mockup-nav-item">
                  <div className="mockup-nav-icon">⚙</div>
                  <div className="mockup-nav-label">Settings</div>
                </div>
                <div className="mockup-nav-item">
                  <div className="mockup-nav-icon">⏺</div>
                  <div className="mockup-nav-label">Record</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Musicians Are Creating Hit Songs Daily</h2>
            <p className="section-subtitle">Join thousands of artists who've discovered the future of music creation</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"I've been stuck in a creative rut for months. DeepRabbit.net got me creating again in literally 2 minutes. This is insane!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">🎸</div>
                <div className="author-info">
                  <div className="author-name">Sarah Chen</div>
                  <div className="author-title">Electronic Producer</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"Finally, an AI tool that actually understands music. The live performance aspect is game-changing for my sets."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">🎹</div>
                <div className="author-info">
                  <div className="author-name">Marcus Rodriguez</div>
                  <div className="author-title">Live Performer</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"I've tried every AI music tool out there. DeepRabbit.net is the only one that feels like playing a real instrument."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">🎵</div>
                <div className="author-info">
                  <div className="author-name">Alex Thompson</div>
                  <div className="author-title">Music Producer</div>
                </div>
              </div>
            </div>
          </div>

          <div className="social-proof-stats">
            <div className="proof-stat">
              <div className="proof-number">10,000+</div>
              <div className="proof-label">Active Musicians</div>
            </div>
            <div className="proof-stat">
              <div className="proof-number">50,000+</div>
              <div className="proof-label">Songs Created</div>
            </div>
            <div className="proof-stat">
              <div className="proof-number">4.9/5</div>
              <div className="proof-label">User Rating</div>
            </div>
            <div className="proof-stat">
              <div className="proof-number">98%</div>
              <div className="proof-label">Would Recommend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose DeepRabbit.net?</h2>
            <p className="section-subtitle">Experience the future of live music performance with AI-powered creativity and intuitive controls.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎹</div>
              <h3 className="feature-title">MIDI First</h3>
              <p className="feature-description">Connect your hardware to shape dynamics, effects, and transitions. Map any knob or fader to control styles in real-time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h3 className="feature-title">190+ Styles</h3>
              <p className="feature-description">From electronic to organic, covering all musical tastes. House, Jazz, Ambient, Techno, and many more genres at your fingertips.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Mobile Friendly</h3>
              <p className="feature-description">Touch-optimized controls with bottom sheet menus. Works seamlessly on phones and tablets for on-the-go performances.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Zero Latency</h3>
              <p className="feature-description">Real-time AI performance with instant response to your controls. No delays, no dropouts, just pure musical flow.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎛️</div>
              <h3 className="feature-title">Live Recording</h3>
              <p className="feature-description">Capture your performances with high-quality audio. Uses modern AudioWorklet technology for professional-grade recording.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Scene Management</h3>
              <p className="feature-description">Save and recall different style combinations. Perfect for switching between songs or sections during a live set.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="urgency-section">
        <div className="container">
          <div className="urgency-content">
            <div className="urgency-badge">
              <span className="urgency-text">🔥 LIMITED TIME</span>
            </div>
            <h2>Join the Early Access Program</h2>
            <p>Be among the first 1,000 musicians to experience the future of AI music creation</p>

            <div className="urgency-stats">
              <div className="urgency-stat">
                <div className="urgency-number">847</div>
                <div className="urgency-label">Spots Left</div>
              </div>
              <div className="urgency-stat">
                <div className="urgency-number">24h</div>
                <div className="urgency-label">Left to Claim</div>
              </div>
            </div>

            <div className="urgency-benefits">
              <div className="benefit">
                <span className="benefit-icon">✅</span>
                <span>Free lifetime access</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">✅</span>
                <span>Priority support</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">✅</span>
                <span>Exclusive features</span>
              </div>
            </div>

            <Link to="/app?auth=true" className="btn-primary urgency-btn">
              🎵 Claim Your Free Access Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">190+</div>
              <div className="stat-label">Genre Styles</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0ms</div>
              <div className="stat-label">Latency</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Active Slots</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Possibilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="try-now">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create?</h2>
            <p>Start your AI music journey today. No subscription required.</p>
            <Link to="/app?auth=true" className="btn-primary" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>
              🚀 Launch DeepRabbit.net
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>DeepRabbit.net</h3>
              <p>Fresh tracks. Forged by AI.</p>
              <p>Real-time music performance with artificial intelligence.</p>
            </div>
            <div className="footer-section">
              <h3>Features</h3>
              <p><a href="#features">MIDI Control</a></p>
              <p><a href="#features">Live Recording</a></p>
              <p><a href="#features">Mobile Support</a></p>
              <p><a href="#features">Scene Management</a></p>
            </div>
            <div className="footer-section">
              <h3>Pricing</h3>
              <p><Link to="/pricing">Free Forever</Link></p>
              <p><Link to="/pricing">Premium Features</Link></p>
              <p><Link to="/pricing">Support Development</Link></p>
            </div>
            <div className="footer-section">
              <h3>Resources</h3>
              <p><Link to="/faq">FAQ</Link></p>
              <p><Link to="/how-it-works">How It Works</Link></p>
              <p><Link to="/support">Support</Link></p>
            </div>
            <div className="footer-section">
              <h3>Connect</h3>
              <p><a href="mailto:support@deeprabbit.net">support@deeprabbit.net</a></p>
              <p><a href="https://github.com/deeprabbit">GitHub</a></p>
              <p><a href="https://twitter.com/deeprabbit">Twitter</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 DeepRabbit.net. All rights reserved. Built with ❤️ for musicians.</p>
          </div>
        </div>
      </footer>

      <FloatingDonateButton onClick={() => setIsDonationModalOpen(true)} />
      
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </div>
  );
};

