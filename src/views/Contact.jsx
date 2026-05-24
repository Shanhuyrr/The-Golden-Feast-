import React, { useState } from 'react';
import { Mail, Send, CheckCircle, HelpCircle, MessageSquare } from 'lucide-react';
import { translations } from '../data/translations';
import { faqsData } from '../data/menuData';
import FAQAccordion from '../components/FAQAccordion';

export default function Contact({ currentLang }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const t = translations[currentLang];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message to support desk
    setTimeout(() => {
      setContactSuccess(true);
      setIsSubmitting(false);
      
      // Reset fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      setTimeout(() => setContactSuccess(false), 6000);
    }, 1500);
  };

  return (
    <div className="contact-view-container animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="text-gold">{t.contactTitle}</h1>
        <p>{currentLang === 'ur' ? 'ریسٹورنٹ سروس، کیٹرنگ یا تقریبات کے متعلق کوئی بھی سوال پوچھیں۔' : 'Reach out to our customer concierge or browse standard questions.'}</p>
      </div>

      <div className="contact-main-grid">
        {/* Contact Form card */}
        <div className="contact-form-panel glass-panel">
          <div className="contact-card-header">
            <MessageSquare className="gold-icon animate-pulse" />
            <h3>{t.contactSubtitle}</h3>
          </div>

          {contactSuccess ? (
            <div className="contact-success-banner animate-fade-in">
              <CheckCircle className="check-success-icon" />
              <p>{t.contactSuccess}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-inquiry-form">
              <div className="form-group">
                <label className="form-label">{t.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder="Muhammad Usman"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  placeholder="usman@example.com"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.subjectLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={currentLang === 'ur' ? 'مثال: کیٹرنگ سروس یا بوفے بکنگ' : 'e.g. Catering Request / Event Inquiry'}
                  className="form-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.messageLabel}</label>
                <textarea
                  required
                  rows="4"
                  placeholder={currentLang === 'ur' ? 'اپنے سوال کی تفصیلات یہاں درج کریں...' : 'Enter the details of your inquiry...'}
                  className="form-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn-gold contact-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? t.loading : (
                  <>
                    {t.sendMessage} <Send style={{ width: '16px', height: '16px' }} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* FAQs list */}
        <div className="contact-faqs-panel">
          <div className="contact-card-header" style={{ marginBottom: '25px', borderBottom: '1px solid rgba(197, 168, 92, 0.15)', paddingBottom: '15px' }}>
            <HelpCircle className="gold-icon" />
            <h2>{t.faqsTitle}</h2>
          </div>

          <FAQAccordion faqs={faqsData} currentLang={currentLang} />
        </div>

        {/* Contact Info Card */}
        <div className="contact-info-card glass-panel">
          <div className="contact-card-header" style={{ marginBottom: '25px' }}>
            <Mail className="gold-icon" />
            <h3>{currentLang === 'ur' ? 'براہ راست رابطہ' : currentLang === 'ar' ? 'تواصل مباشر' : 'Direct Contact'}</h3>
          </div>
          
          <div className="contact-info-block">
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
              {currentLang === 'ur' ? 'بنیادی ہاتھ' : currentLang === 'ar' ? 'الخط الساخن' : 'Main Hotline'}
            </p>
            <p style={{ fontSize: '1.3rem', color: 'var(--primary-gold)', fontWeight: '600', letterSpacing: '0.5px' }}>
              <a href="tel:+923220591711" style={{ color: 'var(--primary-gold)', textDecoration: 'none' }}>
                03220591711
              </a>
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
              {currentLang === 'ur' ? '24/7 دستیاب' : currentLang === 'ar' ? 'متاح 24/7' : 'Available 24/7'}
            </p>
          </div>

          <div className="contact-info-block" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(197, 168, 92, 0.15)' }}>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
              {t.islamabad}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>+92 51 543 2100</p>
          </div>

          <div className="contact-info-block" style={{ marginTop: '12px' }}>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
              {t.wahCantt}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>+92 51 490 1234</p>
          </div>
        </div>
      </div>

      <style>{`
        .contact-view-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .contact-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
          text-align: left;
        }
        .contact-card-header h3,
        .contact-card-header h2 {
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .gold-icon {
          color: var(--primary-gold);
          width: 24px;
          height: 24px;
        }
        
        .contact-inquiry-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .contact-submit-btn {
          width: 100%;
          margin-top: 10px;
        }
        
        /* success block */
        .contact-success-banner {
          background: rgba(48, 209, 88, 0.1);
          border: 1px solid #30d158;
          padding: 30px 20px;
          border-radius: 6px;
          text-align: center;
        }
        .check-success-icon {
          width: 48px;
          height: 48px;
          color: #30d158;
          margin: 0 auto 15px;
        }
        .contact-success-banner p {
          color: #ffffff;
          font-weight: 500;
          line-height: 1.6;
        }

        /* Contact info card */
        .contact-info-card {
          padding: 30px !important;
          background: rgba(197, 168, 92, 0.03) !important;
          border: 1px solid rgba(197, 168, 92, 0.2) !important;
        }
        .contact-info-block {
          padding: 0;
        }

        /* FAQs layout */
        .contact-faqs-panel {
          text-align: left;
          grid-column: 1 / -1;
        }

        /* RTL Flags */
        [dir="rtl"] .contact-card-header {
          text-align: right;
        }
        [dir="rtl"] .contact-success-banner {
          text-align: right;
        }

        @media (max-width: 1024px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
}
