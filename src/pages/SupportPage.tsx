import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DonationModal } from '../components/DonationModal';
import { FloatingDonateButton } from '../components/FloatingDonateButton';
import './SharedPages.css';

export const SupportPage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="container">
          <h1>🆘 DeepRabbit.net Support</h1>
          <p>Get help with DeepRabbit - we're here to help you</p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </header>

      <main className="page-content">
        <div className="container">
          <section className="section">
            <h2>🚀 Quick Help</h2>
            <div className="support-grid">
              <div className="support-card">
                <span className="icon">❓</span>
                <h4>FAQ</h4>
                <p>Find answers to the most common questions</p>
                <Link to="/faq" className="cta-button">Browse FAQ</Link>
              </div>
              <div className="support-card">
                <span className="icon">📖</span>
                <h4>How It Works</h4>
                <p>Learn how to use DeepRabbit.net</p>
                <Link to="/how-it-works" className="cta-button">Read Guide</Link>
              </div>
              <div className="support-card">
                <span className="icon">📧</span>
                <h4>Email Support</h4>
                <p>Contact our support team</p>
                <a href="mailto:support@deeprabbit.net" className="cta-button">Send Email</a>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>📊 System Status</h2>
            <div className="status-grid">
              <div className="status-card">
                <div className="status-indicator operational"></div>
                <h4>Music Generation</h4>
                <p>All systems operational</p>
              </div>
              <div className="status-card">
                <div className="status-indicator operational"></div>
                <h4>Recording Service</h4>
                <p>All systems operational</p>
              </div>
              <div className="status-card">
                <div className="status-indicator operational"></div>
                <h4>MIDI Support</h4>
                <p>All systems operational</p>
              </div>
              <div className="status-card">
                <div className="status-indicator operational"></div>
                <h4>Mobile App</h4>
                <p>All systems operational</p>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>📧 Contact Support</h2>
            <p>Can't find what you're looking for? Our support team is here to help you succeed.</p>
            
            <div className="response-time">
              <h4>⚡ Quick Response</h4>
              <p>We typically respond to support requests within 24 hours. Most issues are resolved within 48 hours.</p>
            </div>

            <div className="support-grid">
              <div className="support-card">
                <span className="icon">📧</span>
                <h4>Email Support</h4>
                <p>Send us a detailed message about your issue. Include screenshots and steps to reproduce the problem.</p>
                <a href="mailto:support@deeprabbit.net?subject=DeepRabbit.net Support Request" className="cta-button">Send Email</a>
              </div>
              <div className="support-card">
                <span className="icon">💬</span>
                <h4>Live Chat</h4>
                <p>Get instant help with our live chat support. Available Monday-Friday, 9 AM - 6 PM EST.</p>
                <button className="cta-button" onClick={() => alert('Live chat coming soon! Please use email support for now.')}>
                  Start Chat
                </button>
              </div>
              <div className="support-card">
                <span className="icon">📞</span>
                <h4>Phone Support</h4>
                <p>Speak directly with our support team for urgent issues. Available for premium users.</p>
                <button className="cta-button" onClick={() => alert('Phone support available for premium users. Contact us via email for upgrade options.')}>
                  Call Now
                </button>
              </div>
            </div>

            <div className="emergency-contact">
              <h4>🚨 Urgent Issues</h4>
              <p>For critical problems affecting your ability to use DeepRabbit.net, use our emergency contact.</p>
              <a href="mailto:emergency@deeprabbit.net?subject=URGENT: DeepRabbit.net Critical Issue" className="emergency-btn">
                Emergency Contact
              </a>
            </div>
          </section>

          <section className="section">
            <h2>👥 Community Support</h2>
            <p>Connect with other DeepRabbit.net users, share your music, and get help from the community.</p>
            <div className="community-grid">
              <div className="community-card">
                <h4>💬 Discord Community</h4>
                <p>Join our Discord server for real-time chat, music sharing, and community support.</p>
                <div className="community-stats">
                  <div className="stat">
                    <div className="stat-number">2,500+</div>
                    <div className="stat-label">Members</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Active</div>
                  </div>
                </div>
                <button className="cta-button" onClick={() => alert('Discord invite coming soon! Join our email list for updates.')}>
                  Join Discord
                </button>
              </div>
              <div className="community-card">
                <h4>📱 Social Media</h4>
                <p>Follow us on social media for updates, tips, and community highlights.</p>
                <div className="community-stats">
                  <div className="stat">
                    <div className="stat-number">10K+</div>
                    <div className="stat-label">Followers</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">Daily</div>
                    <div className="stat-label">Updates</div>
                  </div>
                </div>
                <button className="cta-button" onClick={() => alert('Social media links coming soon! Follow our updates via email.')}>
                  Follow Us
                </button>
              </div>
              <div className="community-card">
                <h4>🎵 Music Sharing</h4>
                <p>Share your DeepRabbit.net creations and discover music from other users.</p>
                <div className="community-stats">
                  <div className="stat">
                    <div className="stat-number">5K+</div>
                    <div className="stat-label">Tracks</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">50K+</div>
                    <div className="stat-label">Plays</div>
                  </div>
                </div>
                <button className="cta-button" onClick={() => alert('Music sharing platform coming soon! Upload to SoundCloud and tag us.')}>
                  Share Music
                </button>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>📚 Additional Resources</h2>
            <p>Explore these additional resources to get the most out of DeepRabbit.net.</p>
            
            <div className="support-grid">
              <div className="support-card">
                <span className="icon">🎥</span>
                <h4>Video Tutorials</h4>
                <p>Watch step-by-step video guides for all DeepRabbit.net features and techniques.</p>
                <button className="cta-button" onClick={() => alert('Video tutorials coming soon! Check our User Guide for now.')}>
                  Watch Videos
                </button>
              </div>
              <div className="support-card">
                <span className="icon">📰</span>
                <h4>Blog & News</h4>
                <p>Stay updated with the latest DeepRabbit.net features, tips, and community news.</p>
                <button className="cta-button" onClick={() => alert('Blog coming soon! Follow our updates via email.')}>
                  Read Blog
                </button>
              </div>
              <div className="support-card">
                <span className="icon">🎓</span>
                <h4>Learning Center</h4>
                <p>Comprehensive learning resources for music production and AI-assisted creation.</p>
                <button className="cta-button" onClick={() => alert('Learning center coming soon! Check our User Guide for tutorials.')}>
                  Learn More
                </button>
              </div>
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

