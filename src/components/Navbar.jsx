import React, { useState } from 'react';
import { Menu as MenuIcon, X, ShoppingBag, User, Globe, Utensils } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ 
  currentLang, 
  setCurrentLang, 
  currentView, 
  setCurrentView, 
  cart, 
  setIsCartOpen, 
  currentUser, 
  setAuthModalOpen 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'menu', label: t.navMenu },
    { id: 'reservations', label: t.navReservations },
    { id: 'branches', label: t.navBranches },
    { id: 'events', label: t.navEvents },
    { id: 'tracker', label: t.navTracking },
    { id: 'contact', label: t.navContact }
  ];

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <Utensils className="logo-icon" />
          <span className="logo-text">THE GOLDEN FEAST</span>
        </div>

        {/* Desktop Nav Items */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${currentView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Quick Call Button */}
          <a 
            href="tel:+923220591711" 
            className="quick-call-btn" 
            title="Call us"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '20px',
              background: 'rgba(197, 168, 92, 0.15)',
              border: '1px solid var(--border-gold)',
              color: 'var(--primary-gold)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(197, 168, 92, 0.25)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(197, 168, 92, 0.15)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ display: 'none' }}>📞</span>03220591711
          </a>

          {/* Language Selector */}
          <div className="lang-switcher">
            <Globe className="action-icon" />
            <select 
              value={currentLang} 
              onChange={(e) => setCurrentLang(e.target.value)}
              className="lang-select"
            >
              <option value="en">EN</option>
              <option value="ur">اردو</option>
              <option value="ar">عربي</option>
            </select>
          </div>

          {/* User Profile */}
          <button 
            className="user-profile-btn" 
            onClick={() => {
              if (currentUser) {
                setCurrentView('account');
              } else {
                setAuthModalOpen(true);
              }
            }}
            title={currentUser ? currentUser.name : t.navAccount}
          >
            <User className="action-icon" />
            <span className="user-name-desktop">
              {currentUser ? currentUser.name.split(' ')[0] : ''}
            </span>
          </button>

          {/* Cart Icon */}
          <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className="action-icon" />
            {totalCartItems > 0 && (
              <span className="cart-badge animate-pulse">{totalCartItems}</span>
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-link ${currentView === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          background: rgba(10, 10, 13, 0.85);
          backdrop-filter: var(--glass-backdrop);
          -webkit-backdrop-filter: var(--glass-backdrop);
          border-bottom: 1px solid var(--border-gold);
          z-index: 1000;
          transition: var(--transition-smooth);
        }
        .navbar-container {
          max-width: 1300px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        .logo-icon {
          color: var(--primary-gold);
          width: 28px;
          height: 28px;
        }
        .logo-text {
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 1.35rem;
          letter-spacing: 2px;
          background: linear-gradient(135deg, #f3cf5a 0%, #c5a85c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .desktop-nav {
          display: flex;
          gap: 20px;
        }
        .nav-link {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          padding: 8px 12px;
          position: relative;
          transition: var(--transition-smooth);
        }
        .nav-link:hover {
          color: #ffffff;
        }
        .nav-link.active {
          color: var(--primary-gold);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--primary-gold);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .action-icon {
          color: var(--primary-gold);
          width: 20px;
          height: 20px;
          transition: var(--transition-smooth);
        }
        .action-icon:hover {
          color: var(--primary-gold-hover);
          transform: scale(1.1);
        }
        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-gold);
          padding: 4px 8px;
          border-radius: 4px;
        }
        .lang-select {
          background: transparent;
          border: none;
          color: var(--text-light);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
        }
        .lang-select option {
          background: var(--bg-dark);
          color: #ffffff;
        }
        .user-profile-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-gold);
          padding: 6px 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #ffffff;
          transition: var(--transition-smooth);
        }
        .user-profile-btn:hover {
          border-color: var(--primary-gold);
          background: rgba(197, 168, 92, 0.1);
        }
        .user-name-desktop {
          font-size: 0.85rem;
          font-weight: 600;
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cart-trigger {
          position: relative;
          background: rgba(197, 168, 92, 0.15);
          border: 1px solid var(--border-gold);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .cart-trigger:hover {
          background: rgba(197, 168, 92, 0.25);
          border-color: var(--primary-gold);
        }
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ff3b30;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--primary-gold);
          cursor: pointer;
        }
        .mobile-drawer {
          position: fixed;
          top: var(--header-height);
          left: 0;
          right: 0;
          background: rgba(10, 10, 13, 0.96);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-gold);
          padding: 20px;
          z-index: 999;
        }
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .mobile-nav-link {
          background: transparent;
          border: none;
          color: var(--text-muted);
          text-align: left;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mobile-nav-link.active {
          color: var(--primary-gold);
          border-bottom-color: var(--primary-gold);
        }

        /* RTL support flags */
        [dir="rtl"] .logo-text,
        [dir="rtl"] .nav-link,
        [dir="rtl"] .mobile-nav-link {
          letter-spacing: 0;
        }

        @media (max-width: 1024px) {
          .desktop-nav, .user-name-desktop {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
