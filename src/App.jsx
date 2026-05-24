import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ReservationForm from './components/ReservationForm';
import MenuGenerator from './components/MenuGenerator';
import './styles/MenuGenerator.css';

// Views
import Home from './views/Home';
import Menu from './views/Menu';
import Account from './views/Account';
import Branches from './views/Branches';
import Events from './views/Events';
import Tracker from './views/Tracker';
import Contact from './views/Contact';

import { translations } from './data/translations';
import { KeyRound, Mail, User, X } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Customization modal trigger for menu
  const [activeItemCustom, setActiveItemCustom] = useState(null);
  
  // Tracked order ID state
  const [currentOrderId, setCurrentOrderId] = useState('');

  // Authentication states for quick popup
  const [isPopupLogin, setIsPopupLogin] = useState(true);
  const [pName, setPName] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pPassword, setPPassword] = useState('');
  const [popupError, setPopupError] = useState('');

  // Generated menu items (for dynamic menu expansion)
  const [generatedItems, setGeneratedItems] = useState([]);

  const t = translations[currentLang];

  // Adjust HTML page direction on language shift
  useEffect(() => {
    const root = document.documentElement;
    if (currentLang === 'ur' || currentLang === 'ar') {
      root.setAttribute('dir', 'rtl');
    } else {
      root.setAttribute('dir', 'ltr');
    }
    root.setAttribute('lang', currentLang);
  }, [currentLang]);

  // Load user session on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem('current_logged_patron');
    if (cachedUser) {
      setCurrentUser(JSON.parse(cachedUser));
    }
  }, []);

  // Update points in state and cache
  const updateUserPoints = (pointsDelta) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return null;
      const updated = {
        ...prevUser,
        points: Math.max(0, prevUser.points + pointsDelta)
      };
      
      // Cache details
      localStorage.setItem('current_logged_patron', JSON.stringify(updated));
      const usersList = JSON.parse(localStorage.getItem('patrons_list') || '[]');
      const idx = usersList.findIndex(u => u.email === updated.email);
      if (idx > -1) {
        usersList[idx] = updated;
        localStorage.setItem('patrons_list', JSON.stringify(usersList));
      }
      
      return updated;
    });
  };

  // Add order to history
  const addOrderToHistory = (orderData) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return null;
      const updated = {
        ...prevUser,
        orders: [orderData, ...prevUser.orders]
      };

      // Cache details
      localStorage.setItem('current_logged_patron', JSON.stringify(updated));
      const usersList = JSON.parse(localStorage.getItem('patrons_list') || '[]');
      const idx = usersList.findIndex(u => u.email === updated.email);
      if (idx > -1) {
        usersList[idx] = updated;
        localStorage.setItem('patrons_list', JSON.stringify(usersList));
      }

      return updated;
    });
  };

  // Add reservation to history
  const addReservationToHistory = (resData) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return null;
      const updated = {
        ...prevUser,
        reservations: [resData, ...prevUser.reservations]
      };

      // Cache details
      localStorage.setItem('current_logged_patron', JSON.stringify(updated));
      const usersList = JSON.parse(localStorage.getItem('patrons_list') || '[]');
      const idx = usersList.findIndex(u => u.email === updated.email);
      if (idx > -1) {
        usersList[idx] = updated;
        localStorage.setItem('patrons_list', JSON.stringify(usersList));
      }

      return updated;
    });
  };

  // Select food helper from other panels (e.g. Home)
  const handleSelectFoodItem = (item) => {
    setCurrentView('menu');
    setActiveItemCustom(item);
  };

  // Handle generated menu items from AI
  const handleGeneratedItems = (items) => {
    setGeneratedItems((prev) => [...prev, ...items]);
    // Items are also saved locally for persistence
    localStorage.setItem('generated_menu_items', JSON.stringify([...generatedItems, ...items]));
  };

  // Popup Authentication Handler
  const handlePopupAuth = (e) => {
    e.preventDefault();
    setPopupError('');
    const usersList = JSON.parse(localStorage.getItem('patrons_list') || '[]');

    if (isPopupLogin) {
      const match = usersList.find(u => u.email === pEmail && u.password === pPassword);
      if (match) {
        setCurrentUser(match);
        localStorage.setItem('current_logged_patron', JSON.stringify(match));
        setAuthModalOpen(false);
      } else {
        setPopupError(currentLang === 'ur' ? 'غلط ای میل یا پاس ورڈ درج کیا گیا ہے۔' : currentLang === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Incorrect email or password.');
      }
    } else {
      if (usersList.some(u => u.email === pEmail)) {
        setPopupError(currentLang === 'ur' ? 'یہ ای میل پہلے سے رجسٹرڈ ہے۔' : currentLang === 'ar' ? 'هذا البريد الإلكتروني مسجل بالفعل.' : 'Email is already registered.');
        return;
      }

      const newUser = {
        name: pName,
        email: pEmail,
        password: pPassword,
        points: 100, // Sign up gift
        orders: [],
        reservations: []
      };

      usersList.push(newUser);
      localStorage.setItem('patrons_list', JSON.stringify(usersList));
      setCurrentUser(newUser);
      localStorage.setItem('current_logged_patron', JSON.stringify(newUser));
      setAuthModalOpen(false);
    }

    setPName('');
    setPEmail('');
    setPPassword('');
  };

  // Render View Router
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home currentLang={currentLang} setCurrentView={setCurrentView} onSelectFoodItem={handleSelectFoodItem} />;
      case 'menu':
        return <Menu currentLang={currentLang} cart={cart} setCart={setCart} activeItemCustom={activeItemCustom} setActiveItemCustom={setActiveItemCustom} />;
      case 'reservations':
        return <ReservationsView currentLang={currentLang} currentUser={currentUser} addReservationToHistory={addReservationToHistory} />;
      case 'branches':
        return <Branches currentLang={currentLang} />;
      case 'events':
        return <Events currentLang={currentLang} />;
      case 'tracker':
        return <Tracker currentLang={currentLang} currentOrderId={currentOrderId} setCurrentOrderId={setCurrentOrderId} currentUser={currentUser} />;
      case 'contact':
        return <Contact currentLang={currentLang} />;
      case 'account':
        return <Account currentLang={currentLang} currentUser={currentUser} setCurrentUser={setCurrentUser} cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />;
      default:
        return <Home currentLang={currentLang} setCurrentView={setCurrentView} onSelectFoodItem={handleSelectFoodItem} />;
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar 
        currentLang={currentLang} 
        setCurrentLang={setCurrentLang}
        currentView={currentView}
        setCurrentView={setCurrentView}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        currentUser={currentUser}
        setAuthModalOpen={setAuthModalOpen}
      />

      {/* Main Body View */}
      <main className="content-wrapper">
        {renderView()}
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} setCurrentView={setCurrentView} />

      {/* Side Cart Drawer & Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        currentLang={currentLang}
        currentUser={currentUser}
        updateUserPoints={updateUserPoints}
        addOrderToHistory={addOrderToHistory}
        setCurrentView={setCurrentView}
        setCurrentOrderId={setCurrentOrderId}
      />

      {/* Menu Item Generator (AI) */}
      <MenuGenerator onItemsGenerated={handleGeneratedItems} />

      {/* Quick Login Popup Modal */}
      {authModalOpen && (
        <div className="popup-auth-overlay animate-fade-in">
          <div className="popup-auth-modal glass-panel animate-fade-up">
            <div className="popup-auth-header">
              <h3>{isPopupLogin ? t.loginBtn : t.registerBtn}</h3>
              <button className="close-popup-btn" onClick={() => setAuthModalOpen(false)}>
                <X />
              </button>
            </div>
            
            {popupError && <div className="auth-error-banner">{popupError}</div>}

            <form onSubmit={handlePopupAuth} className="popup-auth-form">
              {!isPopupLogin && (
                <div className="form-group">
                  <label className="form-label">{t.nameLabel}</label>
                  <div className="input-with-icon">
                    <User className="field-icon" />
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="Muhammad Usman"
                      value={pName}
                      onChange={(e) => setPName(e.target.value)}
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
                    value={pEmail}
                    onChange={(e) => setPEmail(e.target.value)}
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
                    value={pPassword}
                    onChange={(e) => setPPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-gold popup-submit-btn">
                {isPopupLogin ? t.loginBtn : t.registerBtn}
              </button>

              <button 
                type="button" 
                className="popup-toggle-link"
                onClick={() => { setIsPopupLogin(!isPopupLogin); setPopupError(''); }}
              >
                {isPopupLogin ? t.noAccount : t.haveAccount}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        /* Quick Login Modal styles */
        .popup-auth-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .popup-auth-modal {
          width: 440px;
          max-width: 100%;
          padding: 0;
        }
        .popup-auth-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(197, 168, 92, 0.15);
        }
        .popup-auth-header h3 {
          font-size: 1.25rem;
          text-transform: uppercase;
        }
        .close-popup-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .close-popup-btn:hover {
          color: #ffffff;
        }
        .popup-auth-form {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .popup-submit-btn {
          width: 100%;
          margin-top: 10px;
        }
        .popup-toggle-link {
          background: transparent;
          border: none;
          color: var(--primary-gold-hover);
          font-size: 0.85rem;
          cursor: pointer;
          font-weight: 500;
          text-decoration: underline;
          text-align: center;
        }
        .auth-error-banner {
          background: rgba(255, 59, 48, 0.15);
          border: 1px solid #ff3b30;
          color: #ff453a;
          padding: 12px;
          border-radius: 4px;
          font-size: 0.85rem;
          margin: 20px 24px 0;
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
        .popup-auth-form .form-input {
          padding-left: 45px;
        }
        
        [dir="rtl"] .popup-auth-form .form-input {
          padding-left: 16px;
          padding-right: 45px;
        }
        [dir="rtl"] .field-icon {
          left: auto;
          right: 14px;
        }
        [dir="rtl"] .auth-error-banner {
          text-align: right;
        }
      `}</style>
    </div>
  );
}

// Inline wrapper view for Reservations to avoid separate files
function ReservationsView({ currentLang, currentUser, addReservationToHistory }) {
  const t = translations[currentLang];
  return (
    <div className="reservations-view-container animate-fade-in">
      <div className="page-header">
        <h1 className="text-gold">{t.resTitle}</h1>
        <p>{t.resSubtitle}</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="reservations-intro-banner glass-panel" style={{ marginBottom: '35px', textAlign: 'center' }}>
          <h4>
            {currentLang === 'ur'
              ? 'مفت وی آئی پی ٹیبل فوائد اور 100 لائلٹی پوائنٹس حاصل کرنے کے لیے پہلے سائن اپ کریں۔'
              : currentLang === 'ar'
              ? 'احصل على طاولة VIP مميزة و 100 نقطة ولاء مجانية عند التسجيل كعضو.'
              : 'Unlock signature table coordinates & complimentary loyalty points when booking as a registered patron.'}
          </h4>
        </div>
        <ReservationForm 
          currentLang={currentLang} 
          currentUser={currentUser} 
          addReservationToHistory={addReservationToHistory} 
        />
      </div>
    </div>
  );
}
