import React, { useState } from 'react';
import { Compass, Calendar, ArrowRight, ShieldCheck, Award, Heart } from 'lucide-react';
import { translations } from '../data/translations';
import { menuItems } from '../data/menuData';
import FoodCard from '../components/FoodCard';

export default function Home({ currentLang, setCurrentView, onSelectFoodItem }) {
  const t = translations[currentLang];
  const [selectedBranch, setSelectedBranch] = useState('branch-isb');

  // Grab Chef's specials (e.g. A5 Wagyu and Scallops)
  const featured = menuItems.filter(item => item.id === 'main-01' || item.id === 'app-01');

  const testimonials = [
    {
      name: currentLang === 'ur' ? 'عمران ملک' : currentLang === 'ar' ? 'عمران مالك' : 'Imran Malik',
      role: currentLang === 'ur' ? 'کھانے کے شوقین، اسلام آباد' : currentLang === 'ar' ? 'ناقد طعام، إسلام آباد' : 'Food Connoisseur, Islamabad',
      text: currentLang === 'ur' 
        ? 'اے5 واگیو اسٹیک لاجواب تھا۔ میں نے پاکستان میں اس سے بہتر کھانا نہیں کھایا۔ ماحول بالکل شاہانہ تھا۔'
        : currentLang === 'ar'
        ? 'كانت شريحة لحم واغيو A5 استثنائية. لم أتذوق أفضل منها في باكستان. الأجواء ملكية حقاً.'
        : 'The A5 Wagyu steak was out of this world. Best dining experience I’ve had in Pakistan. Absolute luxury.'
    },
    {
      name: currentLang === 'ur' ? 'فاطمہ زہرہ' : currentLang === 'ar' ? 'فاطمة الزهراء' : 'Fatima Zahra',
      role: currentLang === 'ur' ? 'بزنس کونسلٹنٹ، واہ کینٹ' : currentLang === 'ar' ? 'مستشارة أعمال، واه كانت' : 'Business Consultant, Wah Cantt',
      text: currentLang === 'ur'
        ? 'قوالی نائٹ کے دوران ریزرویشن کا تجربہ بہترین رہا۔ پرائیویٹ روم کافی پرسکون اور شاندار تھا۔'
        : currentLang === 'ar'
        ? 'كانت تجربة الحجز ممتازة خلال ليلة قوالي الصوفية. الغرفة الخاصة توفر خصوصية وفخامة متناهية.'
        : 'The reservation process during Sufi Qawwali night was seamless. The VIP room is highly recommended.'
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="home-view animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section glass-panel">
        <div className="hero-content">
          <span className="hero-badge animate-pulse">
            {currentLang === 'ur' ? 'پاکستان کا بہترین پرتعیش ریسٹورنٹ' : currentLang === 'ar' ? 'المطعم الفاخر الأول في باكستان' : 'Pakistan\'s Premier Fine Dining Estate'}
          </span>
          <h1 className="hero-title text-gold animate-fade-up">{t.heroTitle}</h1>
          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>{t.heroSubtitle}</p>
          
          {/* Quick Branch selector CTA */}
          <div className="hero-actions-panel animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="hero-branch-dropdown">
              <Compass className="dropdown-icon" />
              <select 
                value={selectedBranch} 
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="form-select hero-select"
              >
                <option value="branch-isb">{t.islamabad}</option>
                <option value="branch-wah">{t.wahCantt}</option>
              </select>
            </div>
            <div className="hero-buttons">
              <button className="btn-gold" onClick={() => setCurrentView('menu')}>
                {t.orderNow} <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
              <button className="btn-outline" onClick={() => setCurrentView('reservations')}>
                <Calendar style={{ width: '16px', height: '16px' }} /> {t.bookTable}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values / Trust pillars */}
      <section className="pillars-section">
        <div className="pillar-card glass-panel">
          <Award className="pillar-icon" />
          <h3>{currentLang === 'ur' ? 'اعلیٰ معیار' : currentLang === 'ar' ? 'مكونات فاخرة' : 'Culinary Mastercraft'}</h3>
          <p>{currentLang === 'ur' ? 'صرف تازہ اور درآمد شدہ مصالحہ جات اور اجزاء کا استعمال۔' : currentLang === 'ar' ? 'نستخدم المكونات الطازجة والمستوردة فقط.' : 'We procure only fresh organic spices and authentic Japanese/Caspian imports.'}</p>
        </div>
        <div className="pillar-card glass-panel">
          <ShieldCheck className="pillar-icon" />
          <h3>{currentLang === 'ur' ? 'شاہی پروٹوکول' : currentLang === 'ar' ? 'خدمة متميزة' : 'Patron Concierge'}</h3>
          <p>{currentLang === 'ur' ? 'آپ کی سہولت کے لیے ہر لمحہ تیار اور شاندار خدمت۔' : currentLang === 'ar' ? 'خدمة مخصصة وضيافة راقية تليق بكم.' : 'Enjoy dedicated butler services, private estates, and personal chef customizations.'}</p>
        </div>
        <div className="pillar-card glass-panel">
          <Heart className="pillar-icon" />
          <h3>{currentLang === 'ur' ? 'خالص اطمینان' : currentLang === 'ar' ? 'شغف الطهي' : 'Gastronomic Passion'}</h3>
          <p>{currentLang === 'ur' ? 'ہر کھانا ایک شاہکار، جو آپ کی خوشی کا ضامن ہے۔' : currentLang === 'ar' ? 'كل طبق هو تحفة فنية مُعدّة بشغف لإسعاد حواسك.' : 'Every menu item represents a rigorous trial of balancing flavor, presentation, and nutrition.'}</p>
        </div>
      </section>

      {/* Chef's Signature Section */}
      <section className="featured-section">
        <div className="section-title-wrapper">
          <h2 className="text-gold">{t.featuredDishes}</h2>
          <p>{t.featuredSubtitle}</p>
        </div>

        <div className="featured-menu-grid">
          {featured.map(item => (
            <FoodCard 
              key={item.id} 
              item={item} 
              currentLang={currentLang} 
              onSelect={onSelectFoodItem} 
            />
          ))}
        </div>
      </section>

      {/* Patron Reviews / Testimonials Slider */}
      <section className="testimonials-section glass-panel">
        <div className="section-title-wrapper">
          <h2 className="text-gold">{t.reviewsTitle}</h2>
          <p>{t.reviewsSubtitle}</p>
        </div>

        <div className="testimonial-slider-container">
          <div className="testimonial-slide animate-fade-in" key={activeTestimonial}>
            <p className="testimonial-text">"{testimonials[activeTestimonial].text}"</p>
            <h4 className="testimonial-author">{testimonials[activeTestimonial].name}</h4>
            <span className="testimonial-role">{testimonials[activeTestimonial].role}</span>
          </div>

          <div className="slider-nav-dots">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                className={`slider-dot ${activeTestimonial === i ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .home-view {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }
        .hero-section {
          position: relative;
          padding: 100px 40px;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.65)), url('/src/assets/main_course.png');
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          overflow: hidden;
        }
        .hero-content {
          max-width: 800px;
        }
        .hero-badge {
          display: inline-block;
          background: rgba(197, 168, 92, 0.15);
          color: var(--primary-gold);
          border: 1px solid var(--border-gold);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 25px;
        }
        .hero-title {
          font-size: 3.5rem;
          line-height: 1.2;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: #ffffff;
          margin-bottom: 40px;
          font-weight: 300;
        }
        .hero-actions-panel {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          background: rgba(10, 10, 13, 0.8);
          backdrop-filter: var(--glass-backdrop);
          border: 1px solid var(--border-gold);
          padding: 15px 25px;
          border-radius: 8px;
          flex-wrap: wrap;
        }
        .hero-branch-dropdown {
          position: relative;
          display: flex;
          align-items: center;
        }
        .dropdown-icon {
          position: absolute;
          left: 12px;
          color: var(--primary-gold);
          width: 18px;
          height: 18px;
          pointer-events: none;
        }
        .hero-select {
          padding-left: 40px;
          width: 250px;
          margin: 0;
        }
        .hero-buttons {
          display: flex;
          gap: 15px;
        }
        .pillars-section {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 25px;
        }
        .pillar-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 25px;
          border-radius: 8px;
        }
        .pillar-icon {
          width: 44px;
          height: 44px;
          color: var(--primary-gold);
          margin-bottom: 20px;
        }
        .pillar-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .pillar-card p {
          font-size: 0.85rem;
          line-height: 1.6;
        }
        .section-title-wrapper {
          text-align: center;
          margin-bottom: 40px;
        }
        .section-title-wrapper h2 {
          font-size: 2.2rem;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .section-title-wrapper p {
          font-size: 1rem;
          color: var(--text-muted);
        }
        .featured-menu-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        /* Testimonial slider */
        .testimonials-section {
          padding: 60px 40px;
          text-align: center;
          border-radius: 12px;
        }
        .testimonial-slider-container {
          max-width: 700px;
          margin: 0 auto;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .testimonial-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.35rem;
          color: #ffffff;
          line-height: 1.6;
          margin-bottom: 25px;
        }
        .testimonial-author {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary-gold);
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .testimonial-role {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .slider-nav-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
        }
        .slider-dot {
          background: rgba(255, 255, 255, 0.15);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .slider-dot:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .slider-dot.active {
          background: var(--primary-gold);
          transform: scale(1.2);
          box-shadow: 0 0 8px var(--primary-gold-glow);
        }

        [dir="rtl"] .dropdown-icon {
          left: auto;
          right: 12px;
        }
        [dir="rtl"] .hero-select {
          padding-left: 12px;
          padding-right: 40px;
        }

        @media (max-width: 1024px) {
          .pillars-section {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .featured-menu-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
          }
          .hero-title {
            font-size: 2.6rem;
          }
          .hero-section {
            padding: 60px 20px;
          }
        }
      `}</style>
    </div>
  );
}
