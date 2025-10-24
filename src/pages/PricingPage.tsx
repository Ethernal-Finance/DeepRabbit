import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DonationModal } from '../components/DonationModal';
import { FloatingDonateButton } from '../components/FloatingDonateButton';
import './SharedPages.css';

export const PricingPage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="container">
          <h1>💰 DeepRabbit.net Pricing</h1>
          <p>Free forever with premium features coming soon</p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </header>

      <main className="page-content">
        <div className="container">
          <section className="free-banner">
            <h2>🎵 FREE FOREVER</h2>
            <p>DeepRabbit.net is completely free for all users, forever. No subscriptions, no hidden fees, no time limits.</p>
            <Link to="/app" className="cta-button">🚀 Start Creating Music Now</Link>
          </section>

          <section className="section">
            <h2>✨ What You Get Free</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>190+ Music Styles</h3>
                <p>All genres at your fingertips</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>Real-time AI Generation</h3>
                <p>Instant music creation</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>MIDI Controller Support</h3>
                <p>Full hardware integration</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>Live Recording</h3>
                <p>Capture your performances</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>Mobile Support</h3>
                <p>Works on all devices</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>Unlimited Sessions</h3>
                <p>Create as much as you want</p>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>💝 Support Development</h2>
            <p>Help us continue developing DeepRabbit.net and add new features. Your support makes a real difference!</p>
            
            <div className="donate-cta-banner">
              <h3>🎵 Love DeepRabbit.net?</h3>
              <p>Your support helps us keep the app free forever and build amazing new features for the music community!</p>
              <button className="big-donate-btn" onClick={() => setIsDonationModalOpen(true)}>
                💝 Support DeepRabbit.net
              </button>
              <div className="payment-methods">
                <span>💚 Cash App</span>
                <span>•</span>
                <span>💙 PayPal</span>
                <span>•</span>
                <span>🛍️ Merch Store</span>
              </div>
            </div>

            <div className="support-grid">
              <div className="support-card">
                <span className="icon">🤝</span>
                <h4>Community Support</h4>
                <p>Help other users, share your music, and spread the word about DeepRabbit.net.</p>
                <Link to="/support" className="cta-button">Join Community</Link>
              </div>
              <div className="support-card">
                <span className="icon">⭐</span>
                <h4>Share the Love</h4>
                <p>Tell your musician friends about DeepRabbit.net and help grow our community.</p>
                <button className="cta-button" onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'DeepRabbit.net - AI Music Performance',
                      text: 'Check out DeepRabbit.net - create AI music in real-time!',
                      url: window.location.origin
                    });
                  } else {
                    alert('Share DeepRabbit.net with your friends!');
                  }
                }}>
                  📢 Share App
                </button>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>🚀 Premium Features Coming Soon</h2>
            <p>We're working on exciting premium features that will enhance your music creation experience:</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <span className="icon">🎨</span>
                <h3>Custom Style Creation</h3>
                <p>Create your own unique music styles and share them with the community.</p>
              </div>
              <div className="feature-card">
                <span className="icon">🎛️</span>
                <h3>Advanced MIDI Mapping</h3>
                <p>Professional-grade MIDI control with custom mappings and presets.</p>
              </div>
              <div className="feature-card">
                <span className="icon">🎵</span>
                <h3>High-Resolution Audio</h3>
                <p>Export in lossless formats like WAV and FLAC for professional use.</p>
              </div>
              <div className="feature-card">
                <span className="icon">☁️</span>
                <h3>Cloud Sync</h3>
                <p>Sync your scenes and settings across all your devices.</p>
              </div>
              <div className="feature-card">
                <span className="icon">🎤</span>
                <h3>Voice Control</h3>
                <p>Control DeepRabbit.net with voice commands for hands-free performance.</p>
              </div>
              <div className="feature-card">
                <span className="icon">🎬</span>
                <h3>Video Export</h3>
                <p>Export your performances as videos with visualizations.</p>
              </div>
              <div className="feature-card">
                <span className="icon">🎼</span>
                <h3>MIDI Export</h3>
                <p>Export your generated music as MIDI files for further editing.</p>
              </div>
              <div className="feature-card">
                <span className="icon">🎧</span>
                <h3>Advanced Effects</h3>
                <p>Professional audio effects and mastering tools.</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', background: 'rgba(41, 242, 198, 0.05)', borderRadius: '15px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                <strong>Note:</strong> All current features will remain free forever. Premium features will be additional enhancements, not replacements for existing functionality.
              </p>
            </div>
          </section>

          <section className="section">
            <h2>❓ Pricing FAQ</h2>
            
            <div className="faq-list">
              <div className="faq-item">
                <h4>Is DeepRabbit.net really free forever?</h4>
                <p>Yes! DeepRabbit.net is completely free for all users, forever. We believe music creation should be accessible to everyone. All current features will always remain free.</p>
              </div>
              
              <div className="faq-item">
                <h4>What will premium features cost?</h4>
                <p>We haven't finalized pricing yet, but premium features will be reasonably priced and optional. We're committed to keeping the core experience free for everyone.</p>
              </div>
              
              <div className="faq-item">
                <h4>Why should I donate if it's free?</h4>
                <p>Donations help us cover server costs, hire developers, and add new features faster. Every donation, no matter the size, helps us improve DeepRabbit.net for everyone.</p>
              </div>
              
              <div className="faq-item">
                <h4>When will premium features be available?</h4>
                <p>We're working on premium features now! We'll announce pricing and availability as we get closer to release. Follow our updates to be the first to know.</p>
              </div>
              
              <div className="faq-item">
                <h4>Will there be a free trial for premium features?</h4>
                <p>Yes! We plan to offer free trials for premium features so you can try them before purchasing. We want you to be completely satisfied with your investment.</p>
              </div>
              
              <div className="faq-item">
                <h4>How can I stay updated on new features?</h4>
                <p>Follow us on social media, join our Discord community, or sign up for our newsletter. We regularly announce new features and updates.</p>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h2>Questions About Pricing?</h2>
            <p>Have questions about our pricing model or want to learn more about supporting development?</p>
            <div className="contact-links">
              <a href="mailto:support@deeprabbit.net" className="contact-link">📧 Contact Support</a>
              <Link to="/support" className="contact-link">🆘 Support Center</Link>
              <Link to="/" className="contact-link">🏠 Back to Home</Link>
            </div>
          </section>
        </div>
      </main>

      <FloatingDonateButton onClick={() => setIsDonationModalOpen(true)} />
      
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </div>
  );
};

