import React, { useState } from 'react';
import { Search, SlidersHorizontal, Check, X, ShieldAlert } from 'lucide-react';
import { translations } from '../data/translations';
import { menuCategories, menuItems } from '../data/menuData';
import FoodCard from '../components/FoodCard';

export default function Menu({ currentLang, cart, setCart, activeItemCustom, setActiveItemCustom }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Customization modal local states
  const [portionSize, setPortionSize] = useState('small'); // 'small', 'medium', 'large'
  const [spiceLevel, setSpiceLevel] = useState('mild'); // 'mild', 'mediumSpicy', 'extraSpicy'
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraSauce, setExtraSauce] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const t = translations[currentLang];

  // Filtering Logic
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name[currentLang].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Trigger customization modal
  const handleSelectFood = (item) => {
    setActiveItemCustom(item);
    setPortionSize('small');
    setSpiceLevel('mild');
    setExtraCheese(false);
    setExtraSauce(false);
    setQuantity(1);
  };

  // Add to Cart handler
  const handleAddToCart = () => {
    if (!activeItemCustom) return;

    const cartItem = {
      ...activeItemCustom,
      quantity,
      customizations: {
        size: portionSize,
        spice: spiceLevel,
        extraCheese,
        extraSauce
      }
    };

    // Add or merge duplicate item in cart
    const existingIndex = cart.findIndex(item => 
      item.id === cartItem.id && 
      item.customizations.size === cartItem.customizations.size &&
      item.customizations.spice === cartItem.customizations.spice &&
      item.customizations.extraCheese === cartItem.customizations.extraCheese &&
      item.customizations.extraSauce === cartItem.customizations.extraSauce
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, cartItem]);
    }

    setActiveItemCustom(null);
  };

  return (
    <div className="menu-view-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="text-gold">{t.navMenu}</h1>
        <p>{currentLang === 'ur' 
          ? 'ہمارے شاہی کچن سے تازہ پکے ہوئے لذیذ پکوان ابھی آرڈر کریں۔' 
          : currentLang === 'ar'
          ? 'اطلب الأطباق الشهية الطازجة من مطبخنا الإمبراطوري الآن.'
          : 'Savor gourmet chef-crafted recipes, delivered direct from our stoves to your table.'}
        </p>
      </div>

      {/* Filter & Search Bar Row */}
      <div className="menu-controls-row glass-panel">
        {/* Search */}
        <div className="menu-search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="form-input menu-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category selector */}
        <div className="menu-category-tabs">
          {menuCategories.map((category) => (
            <button
              key={category}
              className={`category-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {t[category]}
            </button>
          ))}
        </div>
      </div>

      {/* Food list grid */}
      {filteredItems.length === 0 ? (
        <div className="no-items-banner glass-panel">
          <ShieldAlert className="no-items-icon" />
          <p>{currentLang === 'ur' ? 'معذرت، کوئی ڈش نہیں ملی۔' : currentLang === 'ar' ? 'عذراً، لم يتم العثور على أطباق.' : 'No gourmet creations match your search parameters.'}</p>
        </div>
      ) : (
        <div className="menu-food-grid">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              currentLang={currentLang}
              onSelect={handleSelectFood}
            />
          ))}
        </div>
      )}

      {/* Customization modal Overlay */}
      {activeItemCustom && (
        <div className="custom-overlay animate-fade-in">
          <div className="custom-modal glass-panel animate-fade-up">
            <div className="custom-modal-header">
              <h3>{t.customization}</h3>
              <button className="close-modal-btn" onClick={() => setActiveItemCustom(null)}>
                <X />
              </button>
            </div>

            <div className="custom-modal-body">
              {/* Food Info */}
              <div className="custom-food-summary">
                <img src={activeItemCustom.image} alt={activeItemCustom.name[currentLang]} />
                <div>
                  <h4>{activeItemCustom.name[currentLang]}</h4>
                  <p>{activeItemCustom.description[currentLang]}</p>
                  <span className="base-price-label">
                    Rs. {activeItemCustom.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Customization fields */}
              <div className="customization-options-wrapper">
                {/* Portion size select */}
                <div className="custom-group">
                  <span className="option-title">{t.portionSize}</span>
                  <div className="portion-sizes-grid">
                    <button 
                      type="button" 
                      className={`portion-card ${portionSize === 'small' ? 'active' : ''}`}
                      onClick={() => setPortionSize('small')}
                    >
                      <Check className="check-icon" />
                      <span>{t.small}</span>
                      <span className="price-tag">Rs. 0</span>
                    </button>
                    <button 
                      type="button" 
                      className={`portion-card ${portionSize === 'medium' ? 'active' : ''}`}
                      onClick={() => setPortionSize('medium')}
                    >
                      <Check className="check-icon" />
                      <span>{t.medium}</span>
                      <span className="price-tag">+ Rs. 500</span>
                    </button>
                    <button 
                      type="button" 
                      className={`portion-card ${portionSize === 'large' ? 'active' : ''}`}
                      onClick={() => setPortionSize('large')}
                    >
                      <Check className="check-icon" />
                      <span>{t.large}</span>
                      <span className="price-tag">+ Rs. 1,000</span>
                    </button>
                  </div>
                </div>

                {/* Spice Level selection */}
                <div className="custom-group">
                  <span className="option-title">{t.spicyLevel}</span>
                  <div className="spice-levels-row">
                    {['mild', 'mediumSpicy', 'extraSpicy'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        className={`spice-pill ${spiceLevel === level ? 'active' : ''}`}
                        onClick={() => setSpiceLevel(level)}
                      >
                        {t[level]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons checkboxes */}
                <div className="custom-group">
                  <span className="option-title">{currentLang === 'ur' ? 'اضافی لوازمات' : currentLang === 'ar' ? 'إضافات فاخرة' : 'Premium Add-ons'}</span>
                  <div className="addons-checkboxes-row">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={extraCheese}
                        onChange={(e) => setExtraCheese(e.target.checked)}
                      />
                      <span className="checkbox-checkmark"></span>
                      <span className="addon-text-label">{t.extraCheese} (+ Rs. 200)</span>
                    </label>
                    <label className="checkbox-container" style={{ marginTop: '10px' }}>
                      <input 
                        type="checkbox" 
                        checked={extraSauce}
                        onChange={(e) => setExtraSauce(e.target.checked)}
                      />
                      <span className="checkbox-checkmark"></span>
                      <span className="addon-text-label">{t.extraSauce} (+ Rs. 150)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal actions */}
            <div className="custom-modal-footer">
              <div className="quantity-adder">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button className="btn-gold addToCart-btn" onClick={handleAddToCart}>
                {t.addToCart}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .menu-view-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .menu-controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          padding: 20px 30px;
        }
        .menu-search-bar {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 250px;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--primary-gold);
          width: 18px;
          height: 18px;
        }
        .menu-search-input {
          padding-left: 45px;
        }
        .menu-category-tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .category-pill {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-gold);
          color: var(--text-light);
          padding: 8px 18px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: var(--transition-smooth);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .category-pill:hover {
          border-color: var(--primary-gold);
          color: #ffffff;
        }
        .category-pill.active {
          background: var(--primary-gold);
          border-color: var(--primary-gold);
          color: #0a0a0d;
          font-weight: 600;
        }
        .no-items-banner {
          text-align: center;
          padding: 50px 20px;
          color: var(--text-muted);
        }
        .no-items-icon {
          width: 48px;
          height: 48px;
          color: var(--primary-gold);
          margin-bottom: 15px;
        }
        .menu-food-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        /* Modal styling */
        .custom-overlay {
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
        .custom-modal {
          width: 600px;
          max-width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
        }
        .custom-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 1px solid rgba(197, 168, 92, 0.15);
        }
        .custom-modal-header h3 {
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .close-modal-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .close-modal-btn:hover {
          color: #ffffff;
        }
        .custom-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 25px;
        }
        .custom-food-summary {
          display: flex;
          gap: 20px;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 20px;
          text-align: left;
        }
        .custom-food-summary img {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid var(--border-gold);
        }
        .custom-food-summary h4 {
          font-size: 1.25rem;
          margin-bottom: 6px;
        }
        .custom-food-summary p {
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .base-price-label {
          color: var(--primary-gold-hover);
          font-weight: 700;
          font-size: 1.15rem;
        }
        .customization-options-wrapper {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .custom-group {
          text-align: left;
        }
        .option-title {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-gold);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }
        .portion-sizes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }
        .portion-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(197, 168, 92, 0.2);
          padding: 15px 10px;
          border-radius: 6px;
          cursor: pointer;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
          transition: var(--transition-smooth);
        }
        .portion-card .check-icon {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 14px;
          height: 14px;
          color: var(--primary-gold);
          display: none;
        }
        .portion-card.active {
          border-color: var(--primary-gold);
          background: rgba(197, 168, 92, 0.08);
          color: #ffffff;
        }
        .portion-card.active .check-icon {
          display: block;
        }
        .portion-card span:nth-child(2) {
          font-size: 0.85rem;
          font-weight: 600;
        }
        .portion-card .price-tag {
          font-size: 0.75rem;
          color: var(--primary-gold);
          font-weight: 500;
        }
        .spice-levels-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .spice-pill {
          flex: 1;
          min-width: 120px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(197, 168, 92, 0.2);
          padding: 10px 15px;
          border-radius: 6px;
          cursor: pointer;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.85rem;
          transition: var(--transition-smooth);
          text-align: center;
        }
        .spice-pill.active {
          border-color: var(--primary-gold);
          background: rgba(197, 168, 92, 0.08);
          color: var(--primary-gold-hover);
        }
        .addons-checkboxes-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .addon-text-label {
          font-size: 0.85rem;
          color: #ffffff;
        }
        
        /* Modal Footer */
        .custom-modal-footer {
          padding: 20px 25px;
          border-top: 1px solid rgba(197, 168, 92, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          background: rgba(0, 0, 0, 0.2);
        }
        .quantity-adder {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-gold);
          border-radius: 4px;
        }
        .quantity-adder button {
          background: transparent;
          border: none;
          color: var(--primary-gold);
          width: 38px;
          height: 38px;
          font-size: 1.2rem;
          cursor: pointer;
          font-weight: 600;
        }
        .quantity-adder span {
          width: 38px;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
        }
        .addToCart-btn {
          flex: 1;
        }

        /* RTL Flags */
        [dir="rtl"] .menu-search-input {
          padding-left: 16px;
          padding-right: 45px;
        }
        [dir="rtl"] .search-icon {
          left: auto;
          right: 14px;
        }
        [dir="rtl"] .custom-food-summary {
          text-align: right;
        }
        [dir="rtl"] .custom-group {
          text-align: right;
        }
        [dir="rtl"] .portion-card .check-icon {
          right: auto;
          left: 6px;
        }
      `}</style>
    </div>
  );
}
