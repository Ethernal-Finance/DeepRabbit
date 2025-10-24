import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DonationModal } from '../components/DonationModal';
import { FloatingDonateButton } from '../components/FloatingDonateButton';
import './FAQPage.css';

interface FAQItem {
  question: string;
  answer: string | JSX.Element;
}

const faqSections: { title: string; icon: string; items: FAQItem[] }[] = [
  {
    title: 'Getting Started',
    icon: '🚀',
    items: [
      {
        question: 'What is DeepRabbit.net?',
        answer: 'DeepRabbit.net is an AI-powered music creation tool that lets you generate professional-quality music in real-time. Think of it as having a virtual band that responds to your creative input instantly.'
      },
      {
        question: 'How do I get started?',
        answer: (
          <>
            <p>Getting started is easy:</p>
            <ul>
              <li><strong>Visit the app</strong> - No downloads required, works in your browser</li>
              <li><strong>Connect a MIDI controller</strong> (optional but recommended)</li>
              <li><strong>Choose your styles</strong> - Browse 190+ genres and pick your favorites</li>
              <li><strong>Start creating</strong> - Hit play and watch the magic happen!</li>
            </ul>
          </>
        )
      },
      {
        question: 'Do I need any special equipment?',
        answer: (
          <>
            <p>You only need basic equipment:</p>
            <ul>
              <li><strong>Computer/Phone/Tablet</strong> - Works on any device with a modern browser</li>
              <li><strong>MIDI Controller</strong> (optional) - For hands-on control, but not required</li>
              <li><strong>Speakers/Headphones</strong> - To hear your music</li>
              <li><strong>Internet Connection</strong> - For AI processing</li>
            </ul>
          </>
        )
      }
    ]
  },
  {
    title: 'Using DeepRabbit.net',
    icon: '🎛️',
    items: [
      {
        question: 'How do I choose music styles?',
        answer: (
          <>
            <p>Choosing styles is simple:</p>
            <ul>
              <li><strong>Browse the Styles panel</strong> - Click through different genres</li>
              <li><strong>Search for specific styles</strong> - Use the search bar to find what you want</li>
              <li><strong>Drag styles to slots</strong> - Add up to 8 styles to your performance grid</li>
              <li><strong>Adjust weights</strong> - Use sliders to control how much each style influences the music</li>
            </ul>
          </>
        )
      },
      {
        question: 'What are "weight sliders"?',
        answer: (
          <>
            <p>Weight sliders control how much influence each style has:</p>
            <ul>
              <li><strong>0.0</strong> = Style is muted (no influence)</li>
              <li><strong>1.0</strong> = Normal influence</li>
              <li><strong>2.0</strong> = Double influence (style dominates)</li>
            </ul>
          </>
        )
      },
      {
        question: 'How do I control the music live?',
        answer: (
          <>
            <p>You can control the music in several ways:</p>
            <ul>
              <li><strong>Adjust sliders</strong> - Change style weights in real-time</li>
              <li><strong>Toggle styles on/off</strong> - Enable or disable styles during performance</li>
              <li><strong>Use MIDI controllers</strong> - Map knobs and faders to control styles</li>
              <li><strong>Record your performance</strong> - Capture your live sessions</li>
            </ul>
          </>
        )
      },
      {
        question: 'What is the EVOLVE feature?',
        answer: (
          <>
            <p>EVOLVE automatically changes your music over time:</p>
            <ul>
              <li><strong>ON/OFF toggle</strong> - Enable or disable auto-evolution</li>
              <li><strong>Rate control</strong> - How often changes happen (8s, 16s, 32s, 64s)</li>
              <li><strong>Depth control</strong> - How dramatic the changes are (Subtle to Bold)</li>
            </ul>
          </>
        )
      }
    ]
  },
  {
    title: 'Mobile & Devices',
    icon: '📱',
    items: [
      {
        question: 'Does it work on my phone?',
        answer: (
          <>
            <p>Yes! DeepRabbit.net is fully optimized for mobile devices:</p>
            <ul>
              <li><strong>Touch controls</strong> - Swipe up from bottom for menus</li>
              <li><strong>Responsive design</strong> - Works on phones and tablets</li>
              <li><strong>Same features</strong> - Full functionality on mobile</li>
            </ul>
          </>
        )
      },
      {
        question: 'What browsers work best?',
        answer: (
          <>
            <p>DeepRabbit.net works on all modern browsers:</p>
            <ul>
              <li><strong>Chrome</strong> (recommended) - Best performance and MIDI support</li>
              <li><strong>Safari</strong> - Great on Mac and iOS</li>
              <li><strong>Firefox</strong> - Good performance</li>
              <li><strong>Edge</strong> - Works well on Windows</li>
            </ul>
          </>
        )
      },
      {
        question: 'Can I use my MIDI controller?',
        answer: (
          <>
            <p>Yes! Connect any MIDI controller:</p>
            <ul>
              <li><strong>USB connection</strong> - Plug directly into your computer</li>
              <li><strong>Web MIDI support</strong> - Works with most modern controllers</li>
              <li><strong>Map controls</strong> - Assign knobs and faders to style controls</li>
              <li><strong>Real-time control</strong> - Adjust music as you play</li>
            </ul>
          </>
        )
      }
    ]
  },
  {
    title: 'Music & Styles',
    icon: '🎵',
    items: [
      {
        question: 'How many music styles are available?',
        answer: (
          <>
            <p>DeepRabbit.net includes <strong>190+ professional music styles</strong>:</p>
            <ul>
              <li><strong>Electronic</strong>: House, Techno, Trance, Future Bass, Synthwave</li>
              <li><strong>Organic</strong>: Jazz, Blues, Rock, Folk, Classical, Country</li>
              <li><strong>World</strong>: Afrobeat, Latin Pop, Salsa, Reggae</li>
              <li><strong>Experimental</strong>: Ambient, Lo-Fi, Trap, Drill</li>
              <li><strong>And many more!</strong></li>
            </ul>
          </>
        )
      },
      {
        question: 'Can I create my own styles?',
        answer: 'Currently, DeepRabbit.net uses pre-trained AI models with 190+ professional styles. Custom style creation is not available yet, but we\'re working on it!'
      },
      {
        question: 'How long can I create music?',
        answer: (
          <>
            <p>There are no time limits:</p>
            <ul>
              <li><strong>Unlimited length</strong> - Create music as long as you want</li>
              <li><strong>Real-time generation</strong> - Music continues as long as you keep it playing</li>
              <li><strong>No time limits</strong> - Your creativity is the only limit</li>
            </ul>
          </>
        )
      },
      {
        question: 'What quality is the generated music?',
        answer: (
          <>
            <p>DeepRabbit.net generates professional-quality music:</p>
            <ul>
              <li><strong>Professional quality</strong> - Studio-grade audio output</li>
              <li><strong>High resolution</strong> - 48kHz sample rate</li>
              <li><strong>Multiple stems</strong> - Separate tracks for drums, bass, chords, lead, effects</li>
              <li><strong>Loop-friendly</strong> - Seamless transitions and natural phrasing</li>
            </ul>
          </>
        )
      }
    ]
  },
  {
    title: 'Advanced Features',
    icon: '🎛️',
    items: [
      {
        question: 'What is scene management?',
        answer: (
          <>
            <p>Scenes let you save and recall different style combinations:</p>
            <ul>
              <li><strong>Save scenes</strong> - Store your favorite style setups</li>
              <li><strong>Quick switching</strong> - Change between different songs/sections instantly</li>
              <li><strong>Live performance</strong> - Perfect for DJ sets or live shows</li>
            </ul>
          </>
        )
      },
      {
        question: 'How does recording work?',
        answer: (
          <>
            <p>Recording is simple and high-quality:</p>
            <ul>
              <li><strong>High-quality recording</strong> - Professional audio capture</li>
              <li><strong>MP3 export</strong> - Easy sharing and playback</li>
              <li><strong>Real-time capture</strong> - Record your live performances</li>
              <li><strong>No setup required</strong> - Just hit the record button</li>
            </ul>
          </>
        )
      },
      {
        question: 'Can I export my music?',
        answer: (
          <>
            <p>Yes! DeepRabbit.net includes built-in recording:</p>
            <ul>
              <li><strong>MP3 format</strong> - Compatible with all devices</li>
              <li><strong>High quality</strong> - Professional audio standards</li>
              <li><strong>Easy sharing</strong> - Upload to SoundCloud, YouTube, etc.</li>
            </ul>
          </>
        )
      }
    ]
  },
  {
    title: 'Troubleshooting',
    icon: '🔧',
    items: [
      {
        question: "I don't hear any sound",
        answer: (
          <>
            <p>Try these solutions:</p>
            <ul>
              <li><strong>Check your speakers</strong> - Make sure they're connected and turned on</li>
              <li><strong>Browser permissions</strong> - Allow audio in your browser</li>
              <li><strong>Volume levels</strong> - Check both browser and system volume</li>
              <li><strong>Try different browser</strong> - Some browsers have audio issues</li>
            </ul>
          </>
        )
      },
      {
        question: "My MIDI controller isn't working",
        answer: (
          <>
            <p>Check these common issues:</p>
            <ul>
              <li><strong>Check connection</strong> - Make sure USB cable is secure</li>
              <li><strong>Browser permissions</strong> - Allow MIDI access when prompted</li>
              <li><strong>Refresh the page</strong> - Sometimes a refresh helps</li>
              <li><strong>Try different browser</strong> - Chrome has the best MIDI support</li>
            </ul>
          </>
        )
      },
      {
        question: "The app is running slowly",
        answer: (
          <>
            <p>Improve performance with these tips:</p>
            <ul>
              <li><strong>Close other tabs</strong> - Free up browser memory</li>
              <li><strong>Check internet connection</strong> - AI processing requires good connection</li>
              <li><strong>Try different browser</strong> - Some browsers perform better</li>
              <li><strong>Restart browser</strong> - Clear memory and cache</li>
            </ul>
          </>
        )
      },
      {
        question: "I'm getting error messages",
        answer: (
          <>
            <p>Most errors are temporary:</p>
            <ul>
              <li><strong>Refresh the page</strong> - Most errors are temporary</li>
              <li><strong>Check internet connection</strong> - AI requires stable connection</li>
              <li><strong>Try different browser</strong> - Some browsers have compatibility issues</li>
              <li><strong>Contact support</strong> - If problems persist</li>
            </ul>
          </>
        )
      }
    ]
  },
  {
    title: 'Tips & Tricks',
    icon: '💡',
    items: [
      {
        question: 'Getting the best results',
        answer: (
          <>
            <p>Follow these tips for great music:</p>
            <ul>
              <li><strong>Start simple</strong> - Begin with 2-3 styles, then add more</li>
              <li><strong>Use MIDI controllers</strong> - Much more intuitive than mouse/touch</li>
              <li><strong>Experiment with weights</strong> - Small changes make big differences</li>
              <li><strong>Record everything</strong> - You never know when magic happens</li>
            </ul>
          </>
        )
      },
      {
        question: 'Performance tips',
        answer: (
          <>
            <p>Optimize your experience:</p>
            <ul>
              <li><strong>Use Chrome</strong> - Best performance and compatibility</li>
              <li><strong>Close other apps</strong> - Free up system resources</li>
              <li><strong>Stable internet</strong> - AI processing needs good connection</li>
              <li><strong>Good speakers</strong> - Hear the full quality of your music</li>
            </ul>
          </>
        )
      },
      {
        question: 'Creative workflow',
        answer: (
          <>
            <p>Develop your creative process:</p>
            <ul>
              <li><strong>Build gradually</strong> - Start with drums and bass, add melodies</li>
              <li><strong>Use EVOLVE</strong> - Let the AI surprise you with new ideas</li>
              <li><strong>Save scenes</strong> - Don't lose your best combinations</li>
              <li><strong>Record sessions</strong> - Capture spontaneous moments</li>
            </ul>
          </>
        )
      }
    ]
  },
  {
    title: 'Support',
    icon: '🆘',
    items: [
      {
        question: 'Where can I get help?',
        answer: (
          <>
            <p>Multiple ways to get support:</p>
            <ul>
              <li><strong>This FAQ</strong> - Most questions answered here</li>
              <li><strong>In-app help</strong> - Click the help button in the app</li>
              <li><strong>Community</strong> - Join our Discord for tips and sharing</li>
              <li><strong>Email support</strong> - support@deeprabbit.net</li>
            </ul>
          </>
        )
      },
      {
        question: 'How do I report bugs?',
        answer: (
          <>
            <p>Help us fix issues:</p>
            <ul>
              <li><strong>Email us</strong> - support@deeprabbit.net with details</li>
              <li><strong>Include info</strong> - Browser, device, what you were doing</li>
              <li><strong>Screenshots</strong> - Help us understand the issue</li>
              <li><strong>Be specific</strong> - The more details, the better</li>
            </ul>
          </>
        )
      },
      {
        question: 'Can I suggest new features?',
        answer: (
          <>
            <p>Absolutely! We love feedback:</p>
            <ul>
              <li><strong>Email suggestions</strong> - support@deeprabbit.net</li>
              <li><strong>Community input</strong> - Join our Discord</li>
              <li><strong>Feature requests</strong> - Tell us what you need</li>
              <li><strong>User feedback</strong> - Help us improve DeepRabbit.net</li>
            </ul>
          </>
        )
      }
    ]
  }
];

export const FAQPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const toggleFAQ = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setActiveIndex(activeIndex === key ? null : key);
  };

  const filteredSections = faqSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      const questionMatch = item.question.toLowerCase().includes(searchLower);
      const answerText = typeof item.answer === 'string' ? item.answer : '';
      const answerMatch = answerText.toLowerCase().includes(searchLower);
      return questionMatch || answerMatch;
    })
  })).filter(section => section.items.length > 0);

  const hasResults = filteredSections.length > 0;

  return (
    <div className="faq-page">
      <header className="header">
        <div className="container">
          <h1>🎵 DeepRabbit.net FAQ</h1>
          <p>Get answers to common questions about DeepRabbit - the AI music creation tool</p>
          <Link to="/" className="back-link">← Back to DeepRabbit.net</Link>
        </div>
      </header>

      <main className="faq-content">
        <div className="container">
          {/* Search */}
          <div className="search-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchTerm && !hasResults && (
              <div className="no-results">
                No results found. Try different keywords.
              </div>
            )}
          </div>

          {/* FAQ Sections */}
          {filteredSections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="faq-section">
              <h2>
                <span>{section.icon}</span> {section.title}
              </h2>

              {section.items.map((item, itemIndex) => {
                const key = `${sectionIndex}-${itemIndex}`;
                const isActive = activeIndex === key;

                return (
                  <div key={itemIndex} className="faq-item">
                    <div
                      className={`faq-question ${isActive ? 'active' : ''}`}
                      onClick={() => toggleFAQ(sectionIndex, itemIndex)}
                    >
                      <span>{item.question}</span>
                      <span className="faq-icon">{isActive ? '−' : '+'}</span>
                    </div>
                    <div className={`faq-answer ${isActive ? 'active' : ''}`}>
                      {typeof item.answer === 'string' ? (
                        <p>{item.answer}</p>
                      ) : (
                        item.answer
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          ))}

          {/* Contact Section */}
          <section className="contact-section">
            <div className="container">
              <h2>Still Need Help?</h2>
              <p>Can't find what you're looking for? We're here to help!</p>
              <div className="contact-links">
                <a href="mailto:support@deeprabbit.net" className="contact-link">📧 Email Support</a>
                <Link to="/" className="contact-link">🏠 Back to DeepRabbit.net</Link>
                <Link to="/support" className="contact-link">🆘 Support Center</Link>
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

