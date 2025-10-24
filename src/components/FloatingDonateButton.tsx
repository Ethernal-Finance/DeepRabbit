import React, { useEffect, useState } from 'react';
import './FloatingDonateButton.css';

interface FloatingDonateButtonProps {
  onClick: () => void;
}

export const FloatingDonateButton: React.FC<FloatingDonateButtonProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px down
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`floating-donate-btn ${isVisible ? 'visible' : ''}`}
      onClick={onClick}
      aria-label="Support DeepRabbit.net"
    >
      <span className="donate-icon">💝</span>
      <span className="donate-text">Support Us</span>
    </button>
  );
};



