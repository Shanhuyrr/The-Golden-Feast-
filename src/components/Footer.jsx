import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { translations } from '../data/translations';

export default function Footer({ currentLang, setCurrentView }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = translations[currentLang];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Brand Description */}
        <div className="footer-col brand-col">
          <h3 className="footer-logo">THE GOLDEN FEAST</h3>
          <p className="footer-desc">
            {currentLang === 'ur' 
              ? 'پنجاب، پاکستان میں پرتعیش کھانوں کا حتمی مرکز۔ جہاں شاہی ذائقہ اور بہترین سروس آپ کی منتظر ہے۔'
              : currentLang === 'ar'
              ? 'الوجهة النهائية لتناول الطعام الفاخر في البنجاب، باكستان. حيث تلتقي الفخامة الإمبراطورية بالطعم الأصيل.'
              : 'The ultimate destination for luxury fine dining in Punjab, Pakistan. Experience imperial tastes and mastercraft service.'}
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col links-col">
          <h4>{currentLang === 'ur' ? 'فوری روابط' : currentLang === 'ar' ? 'روابط سريعة' : 'Quick Navigation'}</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => setCurrentView('home')}>{t.navHome}</button></li>
            <li><button onClick={() => setCurrentView('menu')}>{t.navMenu}</button></li>
            <li><button onClick={() => setCurrentView('reservations')}>{t.navReservations}</button></li>
            <li><button onClick={() => setCurrentView('branches')}>{t.navBranches}</button></li>
            <li><button onClick={() => setCurrentView('events')}>{t.navEvents}</button></li>
            <li><button onClick={() => setCurrentView('tracker')}>{t.navTracking}</button></li>
            <li><button onClick={() => setCurrentView('contact')}>{t.navContact}</button></li>
          </ul>
        </div>

        {/* Operating Hours & Branches */}
        <div className="footer-col hours-col">
          <h4>{t.hoursLabel}</h4>
          <div className="hours-block">
            <p className="branch-name">{t.islamabad}</p>
            <p className="branch-time">12:00 PM - 12:00 AM</p>
            <p className="branch-phone">+92 51 543 2100</p>
          </div>
          <div className="hours-block" style={{ marginTop: '15px' }}>
            <p className="branch-name">{t.wahCantt}</p>
            <p className="branch-time">12:00 PM - 11:00 PM</p>
            <p className="branch-phone">+92 51 490 1234</p>
          </div>
          <div className="hours-block" style={{ marginTop: '15px', borderTop: '1px solid var(--border-gold)', paddingTop: '15px' }}>
            <p className="branch-name" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {currentLang === 'ur' ? 'بنیادی ہاتھ' : currentLang === 'ar' ? 'الخط الساخن' : 'Main Hotline'}
            </p>
            <p className="branch-phone" style={{ fontSize: '1.1rem', color: 'var(--primary-gold)' }}>03220591711</p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-col newsletter-col">
          <h4>{t.newsletterTitle}</h4>
          <p className="newsletter-subtitle-text">{t.newsletterSubtitle}</p>
          <form className="newsletter-form-elem" onSubmit={handleSubscribe}>
            <div className="input-group">
              <Mail className="mail-input-icon" />
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit-btn">
                <ArrowRight />
              </button>
            </div>
            {subscribed && (
              <span className="newsletter-success-toast animate-fade-in">
                {t.newsSuccess}
              </span>
            )}
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} The Golden Feast. All Rights Reserved. Crafted for Absolute Luxury.</p>
      </div>

      <style>{`
        .footer-section {
          background: #050507;
          border-top: 1px solid var(--border-gold);
          padding: 80px 20px 30px;
          margin-top: 60px;
          position: relative;
          z-index: 10;
        }
        .footer-container {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 2fr;
          gap: 40px;
          margin-bottom: 50px;
        }
        .footer-col h4 {
          color: var(--primary-gold);
          font-size: 1.1rem;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: var(--font-serif);
        }
        .brand-col .footer-logo {
          font-size: 1.5rem;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #f3cf5a 0%, #c5a85c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .footer-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 25px;
        }
        .social-links {
          display: flex;
          gap: 12px;
        }
        .social-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-gold);
          transition: var(--transition-smooth);
        }
        .social-icon-btn:hover {
          background: var(--primary-gold);
          color: #000;
          transform: translateY(-3px);
          box-shadow: 0 5px 10px var(--primary-gold-glow);
        }
        .social-icon-btn svg {
          width: 16px;
          height: 16px;
        }
        .links-col button {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition-smooth);
          padding: 6px 0;
          display: block;
          text-align: left;
        }
        .links-col button:hover {
          color: var(--primary-gold-hover);
          padding-left: 5px;
        }
        .footer-links-list {
          list-style: none;
        }
        .hours-block .branch-name {
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 5px;
        }
        .hours-block .branch-time {
          color: var(--primary-gold);
          font-size: 0.85rem;
          margin-bottom: 2px;
        }
        .hours-block .branch-phone {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .newsletter-subtitle-text {
          font-size: 0.9rem;
          margin-bottom: 20px;
        }
        .newsletter-form-elem {
          position: relative;
        }
        .input-group {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-gold);
          border-radius: 4px;
          padding: 2px;
        }
        .mail-input-icon {
          position: absolute;
          left: 12px;
          color: var(--primary-gold);
          width: 18px;
          height: 18px;
        }
        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 12px 12px 12px 40px;
          color: #ffffff;
          font-size: 0.85rem;
          outline: none;
        }
        .newsletter-submit-btn {
          background: var(--primary-gold);
          color: #000000;
          border: none;
          width: 38px;
          height: 38px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .newsletter-submit-btn:hover {
          background: var(--primary-gold-hover);
        }
        .newsletter-submit-btn svg {
          width: 16px;
          height: 16px;
        }
        .newsletter-success-toast {
          display: block;
          margin-top: 10px;
          font-size: 0.8rem;
          color: #34c759;
          font-weight: 500;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 30px;
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        [dir="rtl"] .links-col button {
          text-align: right;
        }
        [dir="rtl"] .links-col button:hover {
          padding-left: 0;
          padding-right: 5px;
        }
        [dir="rtl"] .newsletter-input {
          padding: 12px 40px 12px 12px;
        }
        [dir="rtl"] .mail-input-icon {
          left: auto;
          right: 12px;
        }
        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }
        @media (max-width: 600px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-section {
            padding: 50px 15px 30px;
          }
        }
      `}</style>
    </footer>
  );
}
