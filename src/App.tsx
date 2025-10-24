import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { FAQPage } from './pages/FAQPage';
import { PricingPage } from './pages/PricingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SupportPage } from './pages/SupportPage';
import { AppPage } from './pages/AppPage';
import './styles/global.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
};



