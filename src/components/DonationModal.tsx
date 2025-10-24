import React from 'react';
import './DonationModal.css';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="donation-modal-overlay" onClick={onClose}>
      <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>💝 Support DeepRabbit.net</h2>
          <p>Help us continue developing DeepRabbit.net and add new features. Your support makes a real difference!</p>
        </div>

        <div className="donation-options">
          <div className="donation-card">
            <div className="donation-icon">💚</div>
            <h3>Cash App</h3>
            <p>Quick and easy one-time donation</p>
            <div className="donation-handle">$justpayit3</div>
            <a 
              href="https://cash.app/$justpayit3" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="donation-btn cash-app"
            >
              💵 Donate via Cash App
            </a>
          </div>

          <div className="donation-card">
            <div className="donation-icon">💙</div>
            <h3>PayPal</h3>
            <p>Secure donation via PayPal</p>
            <div className="donation-handle">@globlyfe2</div>
            <a 
              href="https://www.paypal.com/paypalme/globlyfe2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="donation-btn paypal"
            >
              💳 Donate via PayPal
            </a>
          </div>

          <div className="donation-card">
            <div className="donation-icon">🛍️</div>
            <h3>Merch Store</h3>
            <p>Support us by buying merchandise</p>
            <div className="donation-handle">Powered by Printify</div>
            <a 
              href="https://deeprabbit.printify.me/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="donation-btn merch"
            >
              👕 Shop Merchandise
            </a>
          </div>
        </div>

        <div className="modal-footer">
          <div className="thank-you-message">
            <h4>🙏 Thank You!</h4>
            <p>
              Every donation, no matter the size, helps us keep DeepRabbit.net free for everyone 
              and allows us to add new features faster. Your generosity directly impacts thousands 
              of musicians worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



