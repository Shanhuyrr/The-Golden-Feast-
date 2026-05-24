import React, { useState, useEffect } from 'react';
import { Search, MapPin, Compass, ShieldAlert, Bike, Check, ChefHat } from 'lucide-react';
import { translations } from '../data/translations';

export default function Tracker({ currentLang, currentOrderId, setCurrentOrderId, currentUser }) {
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const t = translations[currentLang];

  // Map order statuses to step indices
  const statusSteps = [
    { label: t.statusConfirmed, icon: Check },
    { label: t.statusPreparing, icon: ChefHat },
    { label: t.statusDispatched, icon: Bike },
    { label: t.statusDelivered, icon: MapPin }
  ];

  // Prefill search ID or load active order if currentOrderId changes
  useEffect(() => {
    if (currentOrderId) {
      setSearchId(currentOrderId);
      handleSearch(currentOrderId);
    }
  }, [currentOrderId]);

  // Simulating live order state progression
  useEffect(() => {
    if (!activeOrder) return;

    const interval = setInterval(() => {
      setActiveOrder(prevOrder => {
        if (!prevOrder) return null;
        
        let nextStatus = prevOrder.status;
        if (prevOrder.status === 'confirmed') {
          nextStatus = 'preparing';
        } else if (prevOrder.status === 'preparing') {
          nextStatus = 'dispatched';
        } else if (prevOrder.status === 'dispatched') {
          nextStatus = 'delivered';
        } else {
          clearInterval(interval);
          return prevOrder;
        }

        // Save progress back to account order history if possible
        if (currentUser) {
          const matchedOrder = currentUser.orders.find(o => o.id === prevOrder.id);
          if (matchedOrder) {
            matchedOrder.status = nextStatus;
          }
        }

        return { ...prevOrder, status: nextStatus };
      });
    }, 15000); // Progress to next status every 15 seconds

    return () => clearInterval(interval);
  }, [activeOrder, currentUser]);

  // Track rider position along the route map
  useEffect(() => {
    if (!activeOrder) {
      setProgressPercent(0);
      return;
    }

    if (activeOrder.status === 'confirmed') {
      setProgressPercent(5);
    } else if (activeOrder.status === 'preparing') {
      setProgressPercent(25);
    } else if (activeOrder.status === 'dispatched') {
      // Simulate slow movement during dispatch
      setProgressPercent(50);
      const moveInterval = setInterval(() => {
        setProgressPercent(p => {
          if (p >= 85) {
            clearInterval(moveInterval);
            return p;
          }
          return p + 2;
        });
      }, 1000);
      return () => clearInterval(moveInterval);
    } else if (activeOrder.status === 'delivered') {
      setProgressPercent(100);
    }
  }, [activeOrder?.status]);

  const handleSearch = (orderIdToSearch) => {
    const id = orderIdToSearch || searchId;
    if (!id.trim()) return;

    // Check in current user's history
    let foundOrder = null;
    if (currentUser) {
      foundOrder = currentUser.orders.find(o => o.id === id);
    }

    // Check in guest/temporary orders if not logged in
    if (!foundOrder) {
      const guestHistory = JSON.parse(localStorage.getItem('guest_orders') || '[]');
      foundOrder = guestHistory.find(o => o.id === id);
    }

    // If still not found, create a mock order on the spot for demonstration!
    if (!foundOrder && id.startsWith('ORD-')) {
      foundOrder = {
        id: id,
        date: new Date().toLocaleDateString(),
        items: "Chef's Signature Selections",
        total: 4500,
        branch: 'branch-isb',
        status: 'preparing'
      };
      
      // Save it temporarily so it can be tracked
      const guestHistory = JSON.parse(localStorage.getItem('guest_orders') || '[]');
      guestHistory.push(foundOrder);
      localStorage.setItem('guest_orders', JSON.stringify(guestHistory));
    }

    if (foundOrder) {
      setActiveOrder(foundOrder);
    } else {
      setActiveOrder(null);
    }
  };

  const getStatusIndex = (status) => {
    if (status === 'confirmed') return 0;
    if (status === 'preparing') return 1;
    if (status === 'dispatched') return 2;
    if (status === 'delivered') return 3;
    return 0;
  };

  const statusIdx = activeOrder ? getStatusIndex(activeOrder.status) : 0;

  return (
    <div className="tracker-view-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="text-gold">{t.trackTitle}</h1>
        <p>{t.trackSubtitle}</p>
      </div>

      {/* Tracker search block */}
      <div className="tracker-search-box glass-panel">
        <div className="form-group" style={{ margin: 0, flex: 1 }}>
          <div className="input-with-icon">
            <Search className="field-icon" />
            <input
              type="text"
              placeholder={t.trackPlaceholder}
              className="form-input"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-gold" onClick={() => handleSearch()}>
          {t.trackBtn}
        </button>
      </div>

      {activeOrder ? (
        /* Order found screen */
        <div className="tracker-results-panel">
          <div className="tracker-results-grid">
            {/* Status steps progression bar */}
            <div className="status-progress-column glass-panel">
              <div className="order-general-details">
                <h3>{currentLang === 'ur' ? 'آرڈر کی تفصیلات' : currentLang === 'ar' ? 'تفاصيل الطلب' : 'Imperial Order Details'}</h3>
                <div className="detail-meta">
                  <p><strong>Order ID:</strong> {activeOrder.id}</p>
                  <p><strong>Date:</strong> {activeOrder.date}</p>
                  <p><strong>Items:</strong> {activeOrder.items}</p>
                  <p><strong>Total Paid:</strong> Rs. {activeOrder.total.toLocaleString()}</p>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="status-timeline">
                {statusSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx <= statusIdx;
                  const isActive = idx === statusIdx;
                  return (
                    <div key={idx} className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                      <div className="step-badge">
                        {isCompleted && !isActive ? <Check style={{ width: '14px', height: '14px' }} /> : <Icon style={{ width: '16px', height: '16px' }} />}
                      </div>
                      <div className="step-info">
                        <h5>{step.label}</h5>
                        {isActive && (
                          <span className="live-status-bubble animate-pulse">
                            {currentLang === 'ur' ? 'جاری ہے' : currentLang === 'ar' ? 'مباشر' : 'Live'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live GPS Animation Map */}
            <div className="gps-rider-map-panel glass-panel">
              <h4>{t.riderPosition}</h4>
              
              <div className="gps-visualizer-container">
                {/* SVG Route Map */}
                <svg className="route-svg-canvas" viewBox="0 0 400 300">
                  {/* Background grid */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect width="20" height="20" fill="none" />
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(197, 168, 92, 0.05)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Branch point */}
                  <circle cx="50" cy="220" r="10" fill="var(--primary-gold)" opacity="0.3" />
                  <circle cx="50" cy="220" r="5" fill="var(--primary-gold)" />
                  <text x="45" y="245" fill="var(--text-muted)" fontSize="9" fontWeight="700">
                    {activeOrder.branch === 'branch-wah' ? 'WAH CANTT' : 'ISLAMABAD'}
                  </text>

                  {/* Home point */}
                  <circle cx="340" cy="80" r="12" fill="#30d158" opacity="0.2" />
                  <circle cx="340" cy="80" r="6" fill="#30d158" />
                  <text x="315" y="60" fill="var(--text-muted)" fontSize="9" fontWeight="700">PATRON HOME</text>

                  {/* Road Path */}
                  <path
                    id="deliveryPath"
                    d="M 50 220 Q 150 250 200 160 T 340 80"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50 220 Q 150 250 200 160 T 340 80"
                    fill="none"
                    stroke="var(--primary-gold)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    opacity="0.8"
                  />

                  {/* Rider icon path follower */}
                  {progressPercent > 0 && progressPercent < 100 && (
                    <g className="rider-svg-icon" style={{ 
                      transform: 'translate(-12px, -12px)',
                      offsetPath: "path('M 50 220 Q 150 250 200 160 T 340 80')",
                      offsetDistance: `${progressPercent}%`
                    }}>
                      <circle cx="12" cy="12" r="12" fill="var(--primary-gold)" />
                      <Bike x="4" y="4" width="16" height="16" color="#000" />
                    </g>
                  )}
                </svg>

                {/* Tracking stats Overlay banner */}
                <div className="tracker-overlay-stats">
                  <span>{t.etaLabel}</span>
                  <strong>
                    {activeOrder.status === 'delivered' 
                      ? (currentLang === 'ur' ? 'پہنچ گیا' : currentLang === 'ar' ? 'تم التوصيل' : 'Delivered') 
                      : activeOrder.status === 'dispatched' 
                      ? '12 - 18 mins' 
                      : '30 - 35 mins'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Order not searched yet or not found */
        <div className="no-tracker-active-view glass-panel">
          <ShieldAlert className="no-order-icon" />
          <h3>{currentLang === 'ur' ? 'کوئی آرڈر ٹریک نہیں ہو رہا' : currentLang === 'ar' ? 'لا يوجد طلب قيد التتبع' : 'No Active Imperial Order'}</h3>
          <p>
            {currentLang === 'ur'
              ? 'اپنے آرڈر کی لائیو صورتحال معلوم کرنے کے لیے اوپر اپنی آرڈر آئی ڈی درج کریں۔'
              : currentLang === 'ar'
              ? 'الرجاء إدخال رقم الطلب الخاص بك أعلاه لبدء التتبع.'
              : 'Please enter your unique Order ID from your receipt or check your Patron Account order history.'}
          </p>
        </div>
      )}

      <style>{`
        .tracker-view-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .tracker-search-box {
          display: flex;
          gap: 20px;
          padding: 20px 30px;
          align-items: center;
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
        .tracker-search-box .form-input {
          padding-left: 45px;
        }
        .no-tracker-active-view {
          text-align: center;
          padding: 60px 40px;
          color: var(--text-muted);
        }
        .no-order-icon {
          width: 54px;
          height: 54px;
          color: var(--primary-gold);
          margin-bottom: 20px;
        }
        .no-tracker-active-view h3 {
          font-size: 1.4rem;
          color: #ffffff;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        /* Results Panel */
        .tracker-results-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 30px;
        }
        .status-progress-column {
          text-align: left;
        }
        .order-general-details {
          border-bottom: 1px solid rgba(197, 168, 92, 0.15);
          padding-bottom: 20px;
          margin-bottom: 25px;
        }
        .order-general-details h3 {
          font-size: 1.2rem;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .detail-meta p {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-light);
        }
        .detail-meta strong {
          color: var(--primary-gold);
        }

        /* Timeline steps */
        .status-timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          padding-left: 20px;
        }
        .status-timeline::before {
          content: '';
          position: absolute;
          top: 10px;
          bottom: 10px;
          left: 31px;
          width: 2px;
          background: rgba(255, 255, 255, 0.05);
        }
        .timeline-step {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 2;
        }
        .step-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #0f0f11;
          border: 2px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }
        .step-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .step-info h5 {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-muted);
        }
        
        /* Completed steps */
        .timeline-step.completed .step-badge {
          background: rgba(197, 168, 92, 0.2);
          border-color: var(--primary-gold);
          color: var(--primary-gold-hover);
        }
        .timeline-step.completed .step-info h5 {
          color: #ffffff;
          font-weight: 600;
        }

        /* Active live step */
        .timeline-step.active .step-badge {
          background: var(--primary-gold);
          border-color: var(--primary-gold);
          color: #000;
          box-shadow: 0 0 10px var(--primary-gold-glow);
          animation: goldPulse 2s infinite;
        }
        .live-status-bubble {
          font-size: 0.65rem;
          background: #30d158;
          color: #000;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 10px;
          text-transform: uppercase;
        }

        /* GPS rider visualizer */
        .gps-rider-map-panel {
          text-align: left;
        }
        .gps-rider-map-panel h4 {
          font-size: 1.15rem;
          text-transform: uppercase;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(197, 168, 92, 0.15);
          padding-bottom: 12px;
        }
        .gps-visualizer-container {
          position: relative;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-gold);
          border-radius: 8px;
          overflow: hidden;
        }
        .route-svg-canvas {
          width: 100%;
          display: block;
        }
        .rider-svg-icon {
          animation: floatRider 2s ease-in-out infinite;
        }
        
        .tracker-overlay-stats {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(10, 10, 13, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border-gold);
          border-radius: 6px;
          padding: 10px 15px;
          text-align: center;
        }
        .tracker-overlay-stats span {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .tracker-overlay-stats strong {
          color: var(--primary-gold-hover);
          font-size: 1.2rem;
        }

        /* RTL overrides */
        [dir="rtl"] .field-icon {
          left: auto;
          right: 14px;
        }
        [dir="rtl"] .tracker-search-box .form-input {
          padding-left: 16px;
          padding-right: 45px;
        }
        [dir="rtl"] .status-progress-column {
          text-align: right;
        }
        [dir="rtl"] .status-timeline {
          padding-left: 0;
          padding-right: 20px;
        }
        [dir="rtl"] .status-timeline::before {
          left: auto;
          right: 31px;
        }
        [dir="rtl"] .gps-rider-map-panel {
          text-align: right;
        }
        [dir="rtl"] .tracker-overlay-stats {
          right: auto;
          left: 15px;
        }

        @media (max-width: 1024px) {
          .tracker-results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
