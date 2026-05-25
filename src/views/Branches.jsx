import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Compass, ArrowRight } from 'lucide-react';
import { translations } from '../data/translations';
import { branchesData } from '../data/menuData';

export default function Branches({ currentLang }) {
  const [selectedBranch, setSelectedBranch] = useState('branch-isb');
  const [userLocation, setUserLocation] = useState('');
  const [routeResult, setRouteResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const t = translations[currentLang];

  const handleCalculateRoute = (e) => {
    e.preventDefault();
    if (!userLocation.trim()) return;

    setIsCalculating(true);
    setRouteResult(null);

    // Simulate route mapping delay
    setTimeout(() => {
      const isIsb = selectedBranch === 'branch-isb';
      const distanceVal = isIsb 
        ? (Math.random() * 15 + 5).toFixed(1) // 5 to 20 km for Islamabad Blue Area
        : (Math.random() * 25 + 10).toFixed(1); // 10 to 35 km for Wah Cantt
      
      const speedKmh = 40; // avg city speed
      const durationVal = Math.round((parseFloat(distanceVal) / speedKmh) * 60);

      const turnByTurn = isIsb ? [
        currentLang === 'ur' ? 'کشمیر ہائی وے پر چڑھیں اور بلیو ایریا کی طرف بڑھیں۔' : 'Merge onto Srinagar Highway heading East towards Blue Area.',
        currentLang === 'ur' ? 'بائیں مڑیں، جناح ایونیو پر 2 کلومیٹر سیدھے چلیں۔' : 'Take exit toward Jinnah Avenue, proceed straight for 2 km.',
        currentLang === 'ur' ? 'گولڈن فیسٹ عمارت بائیں ہاتھ پر بلاک اے میں واقع ہے۔' : 'The Golden Feast will be on your left, Block A.'
      ] : [
        currentLang === 'ur' ? 'جی ٹی روڈ پر شمال کی طرف واہ کینٹ کی سمت چلیں۔' : 'Drive North on Grand Trunk (GT) Road toward Wah Cantt.',
        currentLang === 'ur' ? 'انور چوک پر یُو ٹرن لیں۔' : 'At Anwar Chowk, make a U-Turn.',
        currentLang === 'ur' ? 'ہمارا عالی شان اسٹیٹ 200 میٹر آگے بائیں طرف واقع ہے۔' : 'Our Imperial Estate will be 200 meters ahead on the left.'
      ];

      setRouteResult({
        distance: distanceVal + ' km',
        duration: durationVal + ' mins',
        steps: turnByTurn
      });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="branches-view-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="text-gold">{t.branchesTitle}</h1>
        <p>{t.branchesSubtitle}</p>
      </div>

      {/* Grid of branches */}
      <div className="branches-list-grid">
        {branchesData.map((branch) => (
          <div key={branch.id} className="branch-card glass-panel">
            {/* Location Image */}
            <div className="branch-image-container">
              <img 
                src={branch.locationImage} 
                alt={t[branch.nameKey]}
                className="branch-location-image"
              />
              <div className="branch-image-overlay">
                <h2 className="text-gold branch-image-title">{t[branch.nameKey]}</h2>
              </div>
            </div>

            <div className="branch-info-section">
              <div className="branch-detail-row">
                <MapPin className="branch-detail-icon" />
                <div>
                  <span className="detail-lbl">{t.addressLabel}</span>
                  <p>{branch.address[currentLang]}</p>
                </div>
              </div>

              <div className="branch-detail-row">
                <Phone className="branch-detail-icon" />
                <div>
                  <span className="detail-lbl">{t.phoneLabel}</span>
                  <p>{branch.phone}</p>
                </div>
              </div>

              <div className="branch-detail-row">
                <Clock className="branch-detail-icon" />
                <div>
                  <span className="detail-lbl">{t.hoursLabel}</span>
                  <p>{branch.hours}</p>
                </div>
              </div>
            </div>

            {/* Map Iframe */}
            <div className="branch-map-container">
              <iframe
                title={t[branch.nameKey]}
                src={branch.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Route directions planner */}
      <div className="route-planner-section glass-panel">
        <div className="route-header">
          <Navigation className="gold-icon animate-pulse" />
          <div>
            <h3>{t.routePlanner}</h3>
            <p>{currentLang === 'ur' ? 'ریسٹورنٹ تک پہنچنے کا بہترین راستہ تلاش کریں۔' : 'Generate navigation coordinates to our physical properties.'}</p>
          </div>
        </div>

        <form onSubmit={handleCalculateRoute} className="route-planner-form">
          <div className="route-form-fields">
            <div className="form-group">
              <label className="form-label">{t.selectBranch}</label>
              <select
                className="form-select"
                value={selectedBranch}
                onChange={(e) => { setSelectedBranch(e.target.value); setRouteResult(null); }}
              >
                <option value="branch-isb">{t.islamabad}</option>
                <option value="branch-wah">{t.wahCantt}</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t.yourLocation}</label>
              <div className="input-with-icon">
                <Compass className="field-icon" />
                <input
                  type="text"
                  required
                  placeholder={currentLang === 'ur' ? 'مثال: جی الیون اسلام آباد یا ٹیکسلا کینٹ' : 'e.g. Sector G-11, Islamabad or Taxila Cantt'}
                  className="form-input"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-gold route-submit-btn" disabled={isCalculating}>
            {isCalculating ? t.loading : t.calculateRoute}
          </button>
        </form>

        {/* Route Calculation Result */}
        {routeResult && (
          <div className="route-results-panel animate-fade-in">
            <h4 className="text-gold">{t.routeFound}</h4>
            <div className="route-meta-grid">
              <div className="route-meta-card">
                <span>{t.distance}</span>
                <strong>{routeResult.distance}</strong>
              </div>
              <div className="route-meta-card">
                <span>{t.eta}</span>
                <strong>{routeResult.duration}</strong>
              </div>
            </div>

            {/* Turn by turn directions list */}
            <div className="route-directions-list">
              <h5>{currentLang === 'ur' ? 'راستے کی تفصیلات' : 'Turn-by-Turn Navigation'}</h5>
              <ol>
                {routeResult.steps.map((step, idx) => (
                  <li key={idx}>
                    <ArrowRight className="direction-arrow-icon" />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .branches-view-container {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }
        .branches-list-grid {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .branch-card {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
          padding: 30px;
          align-items: stretch;
          overflow: hidden;
        }
        .branch-image-container {
          position: relative;
          min-height: 300px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid rgba(197, 168, 92, 0.3);
        }
        .branch-location-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .branch-image-container:hover .branch-location-image {
          transform: scale(1.05);
        }
        .branch-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(197, 168, 92, 0.2) 100%);
          display: flex;
          align-items: flex-end;
          padding: 20px;
          border-radius: 8px;
        }
        .branch-image-title {
          font-size: 1.6rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .branch-info-section {
          display: flex;
          flex-direction: column;
          gap: 25px;
          text-align: left;
        }
        .branch-detail-row {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }
        .branch-detail-icon {
          color: var(--primary-gold);
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .detail-lbl {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .branch-detail-row p {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 500;
        }
        .branch-map-container {
          min-height: 280px;
          border-radius: 6px;
          border: 1px solid var(--border-gold);
          overflow: hidden;
        }

        /* Route Planner Styling */
        .route-planner-section {
          text-align: left;
        }
        .route-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
          border-bottom: 1px solid rgba(197, 168, 92, 0.15);
          padding-bottom: 15px;
        }
        .route-header h3 {
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .route-header p {
          font-size: 0.85rem;
        }
        .route-planner-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .route-form-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }
        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .field-icon {
          position: absolute;
          left: 14px;
          color: var(--primary-gold);
          width: 18px;
          height: 18px;
          pointer-events: none;
        }
        .form-input {
          padding-left: 45px;
        }
        .route-submit-btn {
          width: 100%;
        }

        /* Route results */
        .route-results-panel {
          border-top: 1px solid rgba(197, 168, 92, 0.15);
          margin-top: 30px;
          padding-top: 30px;
        }
        .route-results-panel h4 {
          font-size: 1.1rem;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .route-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        .route-meta-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(197, 168, 92, 0.15);
          padding: 15px;
          border-radius: 6px;
          text-align: center;
        }
        .route-meta-card span {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .route-meta-card strong {
          font-size: 1.5rem;
          color: var(--primary-gold-hover);
        }
        .route-directions-list h5 {
          font-size: 1rem;
          text-transform: uppercase;
          margin-bottom: 15px;
          color: #ffffff;
        }
        .route-directions-list ol {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .route-directions-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.01);
          padding: 10px 15px;
          border-radius: 4px;
          border-left: 3px solid var(--primary-gold);
        }
        .direction-arrow-icon {
          width: 14px;
          height: 14px;
          color: var(--primary-gold);
          flex-shrink: 0;
        }

        /* RTL overrides */
        [dir="rtl"] .branch-info-section {
          text-align: right;
        }
        [dir="rtl"] .route-header {
          text-align: right;
        }
        [dir="rtl"] .field-icon {
          left: auto;
          right: 14px;
        }
        [dir="rtl"] .form-input {
          padding-left: 16px;
          padding-right: 45px;
        }
        [dir="rtl"] .route-directions-list h5 {
          text-align: right;
        }
        [dir="rtl"] .route-directions-list li {
          border-left: none;
          border-right: 3px solid var(--primary-gold);
        }
        [dir="rtl"] .direction-arrow-icon {
          transform: rotate(180deg);
        }

        @media (max-width: 1024px) {
          .branch-card {
            grid-template-columns: 1fr;
          }
          .route-form-fields {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
}
