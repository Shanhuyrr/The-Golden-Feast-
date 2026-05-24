import React, { useMemo } from 'react';
import { Star, Clock, Flame, Plus } from 'lucide-react';
import { translations } from '../data/translations';
import { getOptimizedFoodImage } from '../services/unsplashService';

export default function FoodCard({ item, currentLang, onSelect }) {
  const t = translations[currentLang];
  
  // Generate unique image for this dish
  const dishImage = useMemo(() => {
    // Use item's image if provided, otherwise generate from dish name
    if (item.image && !item.image.includes('assets')) {
      return item.image;
    }
    return getOptimizedFoodImage(item.name.en);
  }, [item]);

  return (
    <div className="glass-card food-card animate-fade-up">
      {/* Image & Badges */}
      <div className="food-image-wrapper">
        <img src={dishImage} alt={item.name[currentLang]} className="food-image" />
        <div className="food-rating-badge">
          <Star className="star-icon" />
          <span>{item.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="food-info">
        <div className="food-meta">
          <span className="food-meta-item">
            <Clock className="meta-icon" />
            {item.prepTime}
          </span>
          <span className="food-meta-item">
            <Flame className="meta-icon" />
            {item.calories} kcal
          </span>
        </div>

        <h3 className="food-title">{item.name[currentLang]}</h3>
        <p className="food-description">{item.description[currentLang]}</p>

        {/* Footer Area */}
        <div className="food-footer">
          <div className="food-price">
            <span className="currency">{currentLang === 'ur' ? 'روپے' : currentLang === 'ar' ? 'ر.س' : 'Rs.'}</span>
            <span className="amount">{item.price.toLocaleString()}</span>
          </div>
          <button 
            className="btn-add-cart" 
            onClick={() => onSelect(item)}
            title={t.addToCart}
          >
            <Plus />
          </button>
        </div>
      </div>

      <style>{`
        .food-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .food-image-wrapper {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }
        .food-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .food-card:hover .food-image {
          transform: scale(1.08);
        }
        .food-rating-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(10, 10, 13, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border-gold);
          color: var(--primary-gold);
          padding: 4px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          font-size: 0.8rem;
        }
        .star-icon {
          width: 12px;
          height: 12px;
          fill: var(--primary-gold);
        }
        .food-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .food-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 12px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .food-meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .meta-icon {
          width: 12px;
          height: 12px;
          color: var(--primary-gold);
        }
        .food-title {
          font-size: 1.25rem;
          margin-bottom: 10px;
          text-align: left;
          transition: var(--transition-smooth);
        }
        .food-card:hover .food-title {
          color: var(--primary-gold-hover);
        }
        .food-description {
          font-size: 0.85rem;
          line-height: 1.5;
          text-align: left;
          margin-bottom: 20px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .food-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 15px;
          border-top: 1px solid rgba(197, 168, 92, 0.1);
        }
        .food-price {
          color: #ffffff;
          font-weight: 700;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .food-price .currency {
          font-size: 0.8rem;
          color: var(--primary-gold);
          font-weight: 500;
        }
        .food-price .amount {
          font-size: 1.3rem;
        }
        .btn-add-cart {
          background: var(--primary-gold);
          color: #0a0a0d;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .btn-add-cart:hover {
          background: var(--primary-gold-hover);
          transform: scale(1.1);
          box-shadow: 0 0 10px var(--primary-gold-glow);
        }
        .btn-add-cart svg {
          width: 18px;
          height: 18px;
        }
        [dir="rtl"] .food-title,
        [dir="rtl"] .food-description {
          text-align: right;
        }
        [dir="rtl"] .food-rating-badge {
          right: auto;
          left: 15px;
        }
      `}</style>
    </div>
  );
}
