import React, { useState } from 'react';
import { Calendar, Tag, FileText, ArrowRight, X, Clock, MapPin } from 'lucide-react';
import { translations } from '../data/translations';
import { blogPosts } from '../data/menuData';

export default function Events({ currentLang }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [copiedCode, setCopiedCode] = useState('');

  const t = translations[currentLang];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  const upcomingEventsList = [
    {
      id: 'event-01',
      date: 'May 30, 2026',
      time: '08:00 PM - 11:30 PM',
      branch: 'branch-isb',
      title: {
        en: 'Sufi Qawwali Evening',
        ur: 'صوفیانہ قوالی شام',
        ar: 'أمسية قوالي الصوفية'
      },
      desc: {
        en: 'Immerse in spiritual melodies with live Qawwali under the starry skies. Paired with a royal buffet.',
        ur: 'ستاروں بھرے آسمان کے نیچے براہ راست قوالی کی مسحور کن شام۔ ساتھ میں شاہی بوفے کا لطف اٹھائیں۔',
        ar: 'انغمس في ألحان روحية مع غناء قوالي المباشر تحت النجوم، مصحوباً ببوفيه ملكي فاخر.'
      }
    },
    {
      id: 'event-02',
      date: 'June 05, 2026',
      time: '12:00 PM - 04:00 PM',
      branch: 'branch-wah',
      title: {
        en: 'Imperial Weekend Brunch',
        ur: 'شاہی ویک اینڈ برنچ',
        ar: 'برانش نهاية الأسبوع الإمبراطوري'
      },
      desc: {
        en: 'A luxurious mid-day banquet featuring unlimited fresh lobster thermidor, saffron drinks, and dessert fountains.',
        ur: 'ایک شاندار بوفے جس میں لا محدود لابسٹر تھرمیڈور، زعفرانی مشروبات اور میٹھے فوارے شامل ہیں۔',
        ar: 'مأدبة غداء فاخرة تتميز بلوبستر ثيرميدور غير محدود، مشروبات الزعفران، ونوافير الحلويات.'
      }
    }
  ];

  return (
    <div className="events-view-container animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="text-gold">{t.eventsTitle}</h1>
        <p>{t.eventsSubtitle}</p>
      </div>

      <div className="events-main-grid">
        {/* Left Side: Upcoming Events */}
        <div className="events-column-left">
          <div className="section-subtitle-container">
            <Calendar className="gold-icon" />
            <h2>{t.upcomingEvents}</h2>
          </div>

          <div className="events-list">
            {upcomingEventsList.map((event) => (
              <div key={event.id} className="event-item-card glass-panel">
                <div className="event-date-badge">
                  <Calendar className="event-date-icon" />
                  <span>{event.date}</span>
                </div>

                <div className="event-item-details">
                  <h3>{event.title[currentLang]}</h3>
                  <p className="event-desc-text">{event.desc[currentLang]}</p>

                  <div className="event-meta-row">
                    <span className="event-meta-item">
                      <Clock className="meta-icon" />
                      {event.time}
                    </span>
                    <span className="event-meta-item">
                      <MapPin className="meta-icon" />
                      {event.branch === 'branch-isb' ? t.islamabad : t.wahCantt}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Blog & Promotions */}
        <div className="events-column-right">
          <div className="section-subtitle-container">
            <FileText className="gold-icon" />
            <h2>{t.blogPromotions}</h2>
          </div>

          <div className="blog-posts-list">
            {blogPosts.map((post) => (
              <div key={post.id} className="blog-post-card glass-card">
                <div className="blog-post-info">
                  <div className="blog-post-meta">
                    <span className="post-date">{post.date}</span>
                    {post.code && (
                      <span className="promo-badge-wrap">
                        <Tag className="tag-icon" />
                        <button 
                          className="promo-code-btn"
                          onClick={() => handleCopyCode(post.code)}
                          title="Click to Copy Code"
                        >
                          {post.code}
                        </button>
                        {copiedCode === post.code && (
                          <span className="copied-bubble">Copied!</span>
                        )}
                      </span>
                    )}
                  </div>

                  <h3>{post.name[currentLang]}</h3>
                  <p className="excerpt-txt">{post.excerpt[currentLang]}</p>

                  <button className="btn-outline read-blog-btn" onClick={() => setSelectedPost(post)}>
                    {t.readMore} <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Post Details Modal */}
      {selectedPost && (
        <div className="blog-post-overlay animate-fade-in">
          <div className="blog-post-modal glass-panel animate-fade-up">
            <div className="blog-modal-header">
              <span className="post-date-modal">{selectedPost.date}</span>
              <button className="close-blog-btn" onClick={() => setSelectedPost(null)}>
                <X />
              </button>
            </div>

            <div className="blog-modal-body">
              <h2 className="text-gold">{selectedPost.name[currentLang]}</h2>
              <div className="blog-main-content">
                <p>{selectedPost.content[currentLang]}</p>
              </div>
              
              {selectedPost.code && (
                <div className="blog-promo-invite-card">
                  <Tag className="invite-tag-icon" />
                  <div>
                    <h5>{t.promoCode} {selectedPost.code}</h5>
                    <p>{currentLang === 'ur' ? 'آرڈر چیک آؤٹ کرتے وقت رعایت حاصل کرنے کے لیے اس کوڈ کا استعمال کریں۔' : 'Apply this coupon at checkout to redeem your special reward.'}</p>
                  </div>
                  <button className="btn-gold" onClick={() => handleCopyCode(selectedPost.code)}>
                    {copiedCode === selectedPost.code ? 'Copied' : 'Copy'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .events-view-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .events-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .section-subtitle-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          border-bottom: 1px solid rgba(197, 168, 92, 0.15);
          padding-bottom: 12px;
        }
        .section-subtitle-container h2 {
          font-size: 1.4rem;
          text-transform: uppercase;
        }
        .gold-icon {
          color: var(--primary-gold);
          width: 24px;
          height: 24px;
        }
        
        /* Events cards */
        .events-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .event-item-card {
          display: flex;
          gap: 20px;
          text-align: left;
          padding: 24px;
        }
        .event-date-badge {
          background: rgba(197, 168, 92, 0.15);
          border: 1px solid var(--border-gold);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 15px;
          width: 90px;
          height: 90px;
          flex-shrink: 0;
          color: var(--primary-gold-hover);
          font-weight: 700;
          font-size: 0.85rem;
          text-align: center;
        }
        .event-date-icon {
          width: 20px;
          height: 20px;
          margin-bottom: 6px;
        }
        .event-item-details {
          flex: 1;
        }
        .event-item-details h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
        }
        .event-desc-text {
          font-size: 0.85rem;
          margin-bottom: 15px;
          line-height: 1.5;
        }
        .event-meta-row {
          display: flex;
          gap: 20px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .event-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .meta-icon {
          width: 12px;
          height: 12px;
          color: var(--primary-gold);
        }

        /* Blog list */
        .blog-posts-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .blog-post-card {
          text-align: left;
        }
        .blog-post-info {
          padding: 24px;
        }
        .blog-post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 0.8rem;
        }
        .post-date {
          color: var(--text-muted);
        }
        .promo-badge-wrap {
          position: relative;
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(48, 209, 88, 0.15);
          color: #30d158;
          border: 1px solid rgba(48, 209, 88, 0.3);
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
        }
        .tag-icon {
          width: 12px;
          height: 12px;
        }
        .promo-code-btn {
          background: transparent;
          border: none;
          color: inherit;
          font-weight: inherit;
          cursor: pointer;
          font-size: 0.75rem;
        }
        .copied-bubble {
          position: absolute;
          top: -25px;
          right: 0;
          background: #30d158;
          color: black;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: 600;
        }
        .blog-post-card h3 {
          font-size: 1.15rem;
          margin-bottom: 10px;
          line-height: 1.4;
        }
        .excerpt-txt {
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 15px;
          color: var(--text-muted);
        }
        .read-blog-btn {
          padding: 6px 14px;
          font-size: 0.75rem;
        }

        /* Modal blog post */
        .blog-post-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 2100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .blog-post-modal {
          width: 700px;
          max-width: 100%;
          padding: 0;
          overflow: hidden;
        }
        .blog-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .post-date-modal {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .close-blog-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .close-blog-btn:hover {
          color: #ffffff;
        }
        .blog-modal-body {
          padding: 30px;
          text-align: left;
        }
        .blog-modal-body h2 {
          font-size: 1.8rem;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .blog-main-content p {
          color: #ffffff;
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 30px;
        }
        .blog-promo-invite-card {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(197, 168, 92, 0.08);
          border: 1px solid var(--border-gold);
          padding: 20px;
          border-radius: 6px;
        }
        .invite-tag-icon {
          color: var(--primary-gold);
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .blog-promo-invite-card h5 {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary-gold-hover);
          margin-bottom: 4px;
        }
        .blog-promo-invite-card p {
          font-size: 0.8rem;
          margin: 0;
        }

        /* RTL Flags */
        [dir="rtl"] .event-item-card {
          text-align: right;
        }
        [dir="rtl"] .blog-post-card {
          text-align: right;
        }
        [dir="rtl"] .blog-modal-body {
          text-align: right;
        }

        @media (max-width: 1024px) {
          .events-main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 600px) {
          .event-item-card {
            flex-direction: column;
          }
          .event-date-badge {
            width: 100%;
            height: 60px;
            flex-direction: row;
            gap: 10px;
            padding: 10px;
          }
          .event-date-icon {
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}
