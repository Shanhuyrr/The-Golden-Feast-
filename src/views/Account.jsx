import React, { useState } from 'react';
import { User, Award, History, LogOut, Lock, Mail, Star, RefreshCw, KeyRound } from 'lucide-react';
import { translations } from '../data/translations';
import { menuItems } from '../data/menuData';

export default function Account({ 
  currentLang, 
  currentUser, 
  setCurrentUser, 
  cart, 
  setCart, 
  setIsCartOpen 
}) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [authError, setAuthError] = useState('');

  const t = translations[currentLang];

  // Loyalty calculations
  const getTierDetails = (points) => {
    if (points >= 1500) {
      return { tierName: t.gold, color: '#f3cf5a', progress: 100, nextTier: '' };
    } else if (points >= 500) {
      const needed = 1500 - points;
      const progress = ((points - 500) / 1000) * 100;
      return { 
        tierName: t.silver, 
        color: '#c0c0c0', 
        progress: progress, 
        nextTier: currentLang === 'ur' ? `گولڈ کے لیے مزید ${needed} پوائنٹس` : currentLang === 'ar' ? `متبقي ${needed} نقطة للفئة الذهبية` : `${needed} points left to Gold Member` 
      };
    } else {
      const needed = 500 - points;
      const progress = (points / 500) * 100;
      return { 
        tierName: t.bronze, 
        color: '#cd7f32', 
        progress: progress, 
        nextTier: currentLang === 'ur' ? `سلور کے لیے مزید ${needed} پوائنٹس` : currentLang === 'ar' ? `متبقي ${needed} نقطة للفئة الفضية` : `${needed} points left to Silver Member` 
      };
    }
  };

  const loyalty = currentUser ? getTierDetails(currentUser.points) : null;

  // Personalized recommendations (based on rating or tier)
  const getRecommendations = () => {
    if (!currentUser) return [];
    // If gold, suggest most expensive / premium (Wagyu, Lobster)
    // If bronze/silver, suggest popular desserts and beverages
    if (currentUser.points >= 1500) {
      return menuItems.filter(item => item.id === 'main-01' || item.id === 'main-02');
    } else {
      return menuItems.filter(item => item.id === 'des-01' || item.id === 'bev-01');
    }
  };

  const recommendedDishes = getRecommendations();

  // Authentication Submission
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    const usersList = JSON.parse(localStorage.getItem('patrons_list') || '[]');

    if (isLoginTab) {
      // Login
      const matchedUser = usersList.find(u => u.email === emailInput && u.password === passwordInput);
      if (matchedUser) {
        setCurrentUser(matchedUser);
        // Sync reservations
        const guestReservations = JSON.parse(localStorage.getItem('guest_reservations') || '[]');
        if (guestReservations.length > 0) {
          matchedUser.reservations = [...matchedUser.reservations, ...guestReservations];
          localStorage.setItem('guest_reservations', '[]');
        }
        localStorage.setItem('current_logged_patron', JSON.stringify(matchedUser));
      } else {
        setAuthError(currentLang === 'ur' ? 'غلط ای میل یا پاس ورڈ درج کیا گیا ہے۔' : currentLang === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Incorrect email or password.');
      }
    } else {
      // Register
      if (usersList.some(u => u.email === emailInput)) {
        setAuthError(currentLang === 'ur' ? 'یہ ای میل پہلے سے رجسٹرڈ ہے۔' : currentLang === 'ar' ? 'هذا البريد الإلكتروني مسجل بالفعل.' : 'Email is already registered.');
        return;
      }

      const newUser = {
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        points: 100, // Gift 100 points on registration
        orders: [],
        reservations: []
      };

      usersList.push(newUser);
      localStorage.setItem('patrons_list', JSON.stringify(usersList));
      setCurrentUser(newUser);
      localStorage.setItem('current_logged_patron', JSON.stringify(newUser));
    }

    // Reset inputs
    setEmailInput('');
    setPasswordInput('');
    setNameInput('');
  };

  const handleLogout = () => {
    // Save state of current user back to the list before logout
    if (currentUser) {
      const usersList = JSON.parse(localStorage.getItem('patrons_list') || '[]');
      const index = usersList.findIndex(u => u.email === currentUser.email);
      if (index > -1) {
        usersList[index] = currentUser;
        localStorage.setItem('patrons_list', JSON.stringify(usersList));
      }
    }
    setCurrentUser(null);
    localStorage.removeItem('current_logged_patron');
  };

  // Reorder Item Handler
  const handleReorder = (order) => {
    // Re-construct cart list based on history summary text
    // E.g., item summary is "Royal A5 Wagyu Tenderloin (large, mediumSpicy) x1"
    // For simplicity, we can add the main items based on names
    const itemsOrderedNames = order.items.split(', ');
    const newCartAdditions = [];

    itemsOrderedNames.forEach(itemStr => {
      const match = itemStr.match(/(.+) \((.+)\) x(\d+)/) || itemStr.match(/(.+) x(\d+)/);
      if (match) {
        const itemName = match[1].trim();
        const qty = parseInt(match[match.length - 1]);
        
        // Find matching original menu item
        const found = menuItems.find(mi => mi.name[currentLang] === itemName || mi.name.en === itemName);
        if (found) {
          newCartAdditions.push({
            ...found,
            quantity: qty,
            customizations: {
              size: itemStr.includes('medium') ? 'medium' : itemStr.includes('large') ? 'large' : 'small',
              spice: itemStr.includes('mediumSpicy') ? 'mediumSpicy' : itemStr.includes('extraSpicy') ? 'extraSpicy' : 'mild',
              extraCheese: itemStr.includes('cheese'),
              extraSauce: itemStr.includes('glaze')
            }
          });
        }
      }
    });

    if (newCartAdditions.length > 0) {
      setCart([...cart, ...newCartAdditions]);
      setIsCartOpen(true);
    }
  };

  return (
    <div className="account-view-container animate-fade-in">
      {currentUser ? (
        /* Logged In View */
        <div className="logged-in-panel">
          {/* Welcome Header */}
          <div className="welcome-banner glass-panel">
            <div className="welcome-info-layout">
              <div className="user-icon-avatar">
                <User />
              </div>
              <div className="welcome-text-side">
                <h2>{t.welcomeBack}{currentUser.name}</h2>
                <p>{currentUser.email}</p>
              </div>
            </div>
            <button className="btn-outline logout-btn" onClick={handleLogout}>
              <LogOut /> {t.logoutBtn}
            </button>
          </div>

          {/* Grid Layout: Loyalty Program & History */}
          <div className="patron-details-grid">
            <div className="details-col-left">
              {/* Loyalty Card */}
              <div className="loyalty-card-panel glass-panel">
                <div className="loyalty-card-header">
                  <Award style={{ color: loyalty.color, width: '28px', height: '28px' }} />
                  <div>
                    <span className="card-lbl">{t.loyaltyTier}</span>
                    <h3 style={{ color: loyalty.color }}>{loyalty.tierName}</h3>
                  </div>
                </div>

                <div className="points-display">
                  <span className="points-number">{currentUser.points}</span>
                  <span className="points-label">{t.points}</span>
                </div>

                {loyalty.nextTier && (
                  <div className="loyalty-progress-container">
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${loyalty.progress}%`, background: loyalty.color }}></div>
                    </div>
                    <span className="progress-status-txt">{loyalty.nextTier}</span>
                  </div>
                )}
              </div>

              {/* Personalized Recommendations */}
              <div className="recommendations-panel glass-panel">
                <div className="rec-header">
                  <Star className="star-highlight-icon animate-pulse" />
                  <div>
                    <h4>{t.recommendations}</h4>
                    <p>{t.recSubtitle}</p>
                  </div>
                </div>

                <div className="recommended-list">
                  {recommendedDishes.map(item => (
                    <div key={item.id} className="rec-item-card">
                      <img src={item.image} alt={item.name[currentLang]} />
                      <div className="rec-item-info">
                        <h5>{item.name[currentLang]}</h5>
                        <span>Rs. {item.price.toLocaleString()}</span>
                      </div>
                      <button 
                        className="btn-gold rec-order-btn" 
                        onClick={() => handleReorder({ items: `${item.name[currentLang]} x1` })}
                      >
                        {t.orderNow}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="details-col-right glass-panel">
              {/* History Panel */}
              <div className="history-header">
                <History className="gold-icon" />
                <h4>{t.orderHistory}</h4>
              </div>

              {currentUser.orders.length === 0 ? (
                <div className="no-history-view">
                  <p>{t.noHistory}</p>
                </div>
              ) : (
                <div className="history-list">
                  {currentUser.orders.map((order, i) => (
                    <div key={i} className="history-item-card">
                      <div className="history-item-top">
                        <span className="order-id-lbl">{order.id}</span>
                        <span className="order-date-lbl">{order.date}</span>
                      </div>
                      <p className="order-summary-txt">{order.items}</p>
                      <div className="history-item-bottom">
                        <span className="order-total-lbl">Rs. {order.total.toLocaleString()}</span>
                        <button className="btn-outline reorder-btn" onClick={() => handleReorder(order)}>
                          <RefreshCw /> {t.reorderBtn}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Logged Out View (Login / Signup Forms) */
        <div className="auth-forms-wrapper glass-panel">
          <div className="auth-tabs">
            <button 
              className={`auth-tab-btn ${isLoginTab ? 'active' : ''}`}
              onClick={() => { setIsLoginTab(true); setAuthError(''); }}
            >
              {t.loginBtn}
            </button>
            <button 
              className={`auth-tab-btn ${!isLoginTab ? 'active' : ''}`}
              onClick={() => { setIsLoginTab(false); setAuthError(''); }}
            >
              {t.registerBtn}
            </button>
          </div>

          <h2 className="auth-form-title">{isLoginTab ? t.loginTitle : t.signupTitle}</h2>
          <p className="auth-form-subtitle">{isLoginTab ? t.loginSubtitle : t.signupSubtitle}</p>

          {authError && <div className="auth-error-banner">{authError}</div>}

          <form onSubmit={handleAuthSubmit} className="auth-form">
            {!isLoginTab && (
              <div className="form-group">
                <label className="form-label">{t.nameLabel}</label>
                <div className="input-with-icon">
                  <User className="field-icon" />
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="Muhammad Usman"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">{t.emailLabel}</label>
              <div className="input-with-icon">
                <Mail className="field-icon" />
                <input
                  type="email"
                  className="form-input"
                  required
                  placeholder="usman@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t.passwordLabel}</label>
              <div className="input-with-icon">
                <KeyRound className="field-icon" />
                <input
                  type="password"
                  className="form-input"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-gold auth-submit-btn">
              {isLoginTab ? t.loginBtn : t.registerBtn}
            </button>

            <button 
              type="button" 
              className="auth-toggle-link"
              onClick={() => { setIsLoginTab(!isLoginTab); setAuthError(''); }}
            >
              {isLoginTab ? t.noAccount : t.haveAccount}
            </button>
          </form>
        </div>
      )}

      <style>{`
        .account-view-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .auth-forms-wrapper {
          max-width: 480px;
          margin: 40px auto;
          text-align: center;
        }
        .auth-tabs {
          display: flex;
          border-bottom: 1px solid rgba(197, 168, 92, 0.15);
          margin-bottom: 30px;
        }
        .auth-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 15px 0;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }
        .auth-tab-btn.active {
          color: var(--primary-gold);
          border-bottom: 2px solid var(--primary-gold);
        }
        .auth-form-title {
          font-size: 1.6rem;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .auth-form-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 35px;
        }
        .auth-error-banner {
          background: rgba(255, 59, 48, 0.15);
          border: 1px solid #ff3b30;
          color: #ff453a;
          padding: 12px;
          border-radius: 4px;
          font-size: 0.85rem;
          margin-bottom: 25px;
          text-align: left;
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
        .auth-submit-btn {
          width: 100%;
          margin-top: 15px;
          margin-bottom: 20px;
        }
        .auth-toggle-link {
          background: transparent;
          border: none;
          color: var(--primary-gold-hover);
          font-size: 0.85rem;
          cursor: pointer;
          font-weight: 500;
          text-decoration: underline;
        }

        /* Logged in Panel */
        .welcome-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px;
          margin-bottom: 35px;
        }
        .welcome-info-layout {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .user-icon-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(197, 168, 92, 0.15);
          border: 1px solid var(--border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-gold);
        }
        .user-icon-avatar svg {
          width: 28px;
          height: 28px;
        }
        .welcome-text-side {
          text-align: left;
        }
        .welcome-text-side h2 {
          font-size: 1.6rem;
          text-transform: uppercase;
        }
        .welcome-text-side p {
          font-size: 0.9rem;
        }
        
        /* Details Grid */
        .patron-details-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 30px;
        }
        .details-col-left {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .loyalty-card-panel {
          text-align: left;
        }
        .loyalty-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .card-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .loyalty-card-header h3 {
          font-size: 1.25rem;
          text-transform: uppercase;
        }
        .points-display {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 25px;
        }
        .points-number {
          font-size: 3rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
        }
        .points-label {
          color: var(--primary-gold);
          font-weight: 600;
          font-size: 1.1rem;
          text-transform: uppercase;
        }
        .progress-bar-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.8s ease;
        }
        .progress-status-txt {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Recommendations panel */
        .recommendations-panel {
          text-align: left;
        }
        .rec-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .star-highlight-icon {
          color: var(--primary-gold);
          width: 24px;
          height: 24px;
        }
        .rec-header h4 {
          font-size: 1.1rem;
          text-transform: uppercase;
        }
        .rec-header p {
          font-size: 0.75rem;
        }
        .recommended-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .rec-item-card {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(197, 168, 92, 0.1);
          border-radius: 6px;
          padding: 10px;
        }
        .rec-item-card img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 4px;
        }
        .rec-item-info {
          flex: 1;
        }
        .rec-item-info h5 {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .rec-item-info span {
          font-size: 0.8rem;
          color: var(--primary-gold);
          font-weight: 700;
        }
        .rec-order-btn {
          padding: 6px 14px;
          font-size: 0.75rem;
        }

        /* History panel */
        .details-col-right {
          text-align: left;
          display: flex;
          flex-direction: column;
        }
        .history-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          border-bottom: 1px solid rgba(197, 168, 92, 0.15);
          padding-bottom: 15px;
        }
        .history-header h4 {
          font-size: 1.2rem;
          text-transform: uppercase;
        }
        .no-history-view {
          padding: 40px 0;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          overflow-y: auto;
          max-height: 500px;
          padding-right: 5px;
        }
        .history-item-card {
          border: 1px solid rgba(197, 168, 92, 0.1);
          background: rgba(255, 255, 255, 0.01);
          border-radius: 6px;
          padding: 16px;
        }
        .history-item-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .order-id-lbl {
          font-weight: 700;
          color: var(--primary-gold);
          font-size: 0.9rem;
        }
        .order-date-lbl {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .order-summary-txt {
          font-size: 0.85rem;
          color: #ffffff;
          line-height: 1.5;
          margin-bottom: 15px;
        }
        .history-item-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 12px;
        }
        .order-total-lbl {
          font-weight: 700;
          font-size: 1.05rem;
        }
        .reorder-btn {
          padding: 6px 12px;
          font-size: 0.8rem;
        }

        /* RTL overrides */
        [dir="rtl"] .field-icon {
          left: auto;
          right: 14px;
        }
        [dir="rtl"] .form-input {
          padding-left: 16px;
          padding-right: 45px;
        }
        [dir="rtl"] .welcome-text-side,
        [dir="rtl"] .loyalty-card-panel,
        [dir="rtl"] .recommendations-panel,
        [dir="rtl"] .details-col-right {
          text-align: right;
        }
        [dir="rtl"] .auth-error-banner {
          text-align: right;
        }

        @media (max-width: 1024px) {
          .patron-details-grid {
            grid-template-columns: 1fr;
          }
          .welcome-banner {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          .welcome-info-layout {
            flex-direction: column;
          }
          .welcome-text-side {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
