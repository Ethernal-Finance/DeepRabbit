import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DonationModal } from '../components/DonationModal';
import { FloatingDonateButton } from '../components/FloatingDonateButton';
import './SharedPages.css';

export const HowItWorksPage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="container">
          <h1>🔧 How DeepRabbit.net Works</h1>
          <p>Discover the magic behind AI music creation</p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </header>

      <main className="page-content">
        <div className="container">
          <section className="section">
            <h2>🎵 Overview</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <span className="icon">🎨</span>
                <h4>Choose Your Styles</h4>
                <p>Select from 190+ music genres and drag them to the performance grid</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <span className="icon">🎛️</span>
                <h4>Control the Mix</h4>
                <p>Adjust weight sliders to blend styles together</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <span className="icon">▶️</span>
                <h4>Generate Music</h4>
                <p>AI creates music that evolves in real-time</p>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <span className="icon">🎤</span>
                <h4>Record & Share</h4>
                <p>Record your performance as MP3 files</p>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>🔄 The Music Generation Process</h2>
            <div className="process-flow">
              <div className="process-step">
                <span className="icon">🎯</span>
                <h4>Input Analysis</h4>
                <p>AI analyzes your selected styles and weight settings</p>
              </div>
              <div className="process-step">
                <span className="icon">🧠</span>
                <h4>AI Processing</h4>
                <p>Neural networks generate musical patterns and melodies</p>
              </div>
              <div className="process-step">
                <span className="icon">🎵</span>
                <h4>Audio Synthesis</h4>
                <p>Musical data becomes high-quality audio</p>
              </div>
              <div className="process-step">
                <span className="icon">🔊</span>
                <h4>Real-time Output</h4>
                <p>Music streams with zero latency</p>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>🔬 Technology</h2>
            <div className="features-grid">
              <div className="feature-card">
                <span className="icon">🧠</span>
                <h4>Neural Networks</h4>
                <p>Advanced deep learning trained on thousands of hours of professional music</p>
              </div>
              <div className="feature-card">
                <span className="icon">🎼</span>
                <h4>Music Theory</h4>
                <p>AI understands harmony, rhythm, and musical structure</p>
              </div>
              <div className="feature-card">
                <span className="icon">⚡</span>
                <h4>Real-time Processing</h4>
                <p>Zero-latency music generation for live performance</p>
              </div>
              <div className="feature-card">
                <span className="icon">🎧</span>
                <h4>Audio Quality</h4>
                <p>Professional-grade 48kHz sample rate</p>
              </div>
            </div>
          </section>

          <div className="cta-section">
            <h2>Ready to Try It Yourself?</h2>
            <p>Experience the magic of AI music creation</p>
            <Link to="/app" className="cta-button">🎵 Start Creating</Link>
          </div>
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

