import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, CreditCard, Shield, Landmark } from 'lucide-react';
import { translations } from '../data/translations';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  setCart, 
  currentLang, 
  currentUser, 
  updateUserPoints, 
  addOrderToHistory, 
  setCurrentView, 
  setCurrentOrderId 
}) {
  const [step, setStep] = useState(1); // 1: Cart View, 2: Checkout Form
  const [deliveryBranch, setDeliveryBranch] = useState('branch-isb');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'paypal', 'cod'
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = translations[currentLang];

  if (!isOpen) return null;

  // Subtotal Calculation
  const subtotal = cart.reduce((sum, item) => {
    let price = item.price;
    if (item.customizations.size === 'medium') price += 500;
    if (item.customizations.size === 'large') price += 1000;
    if (item.customizations.extraCheese) price += 200;
    if (item.customizations.extraSauce) price += 150;
    return sum + (price * item.quantity);
  }, 0);

  const tax = Math.round(subtotal * 0.15);
  const deliveryFee = subtotal > 0 ? 350 : 0;
  
  // Loyalty Discount Calculation
  // 1 loyalty point = Rs. 1 discount. Can redeem up to user's total points or subtotal.
  const maxRedeemablePoints = currentUser ? Math.min(currentUser.points, subtotal) : 0;
  const loyaltyDiscount = redeemPoints ? maxRedeemablePoints : 0;

  const total = Math.max(0, subtotal + tax + deliveryFee - loyaltyDiscount);

  // Cart operations
  const updateQuantity = (index, delta) => {
    const updated = [...cart];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    setCart(updated);
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  // Submit Order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsSubmitting(true);

    // Simulate Payment delay
    setTimeout(() => {
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      
      const orderItemsStr = cart.map(item => {
        let options = [];
        if (item.customizations.size !== 'small') options.push(item.customizations.size);
        if (item.customizations.extraCheese) options.push('cheese');
        if (item.customizations.extraSauce) options.push('glaze');
        options.push(item.customizations.spice);
        return `${item.name[currentLang]} (${options.join(', ')}) x${item.quantity}`;
      }).join(', ');

      const orderData = {
        id: orderId,
        date: new Date().toLocaleDateString(currentLang === 'ur' ? 'ur-PK' : 'en-US'),
        items: orderItemsStr,
        total: total,
        branch: deliveryBranch,
        status: 'confirmed'
      };

      // Add to user history if logged in
      if (currentUser) {
        // Deduct points if redeemed, and add points for current order (10 points per Rs 100)
        const pointsEarned = Math.floor(subtotal / 100) * 10;
        const netPointsChange = pointsEarned - (redeemPoints ? maxRedeemablePoints : 0);
        updateUserPoints(netPointsChange);
        addOrderToHistory(orderData);
      }

      setIsSubmitting(false);
      setCart([]);
      setStep(1);
      onClose();
      setCurrentOrderId(orderId);
      setCurrentView('tracker');
    }, 2000);
  };

  return (
    <div className="cart-overlay animate-fade-in">
      <div className="cart-sidebar glass-panel">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingCart className="gold-icon" />
            <h2>{step === 1 ? t.cartTitle : t.checkout}</h2>
          </div>
          <button className="cart-close-btn" onClick={onClose}><X /></button>
        </div>

        {/* Content Panel */}
        {step === 1 ? (
          /* Step 1: Cart Items Listing */
          <div className="cart-body">
            {cart.length === 0 ? (
              <div className="empty-cart-message">
                <ShoppingCart className="empty-icon" />
                <p>{t.cartEmpty}</p>
                <button className="btn-gold" style={{ marginTop: '20px' }} onClick={onClose}>
                  {t.viewMenu}
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item, index) => {
                    let singleItemPrice = item.price;
                    if (item.customizations.size === 'medium') singleItemPrice += 500;
                    if (item.customizations.size === 'large') singleItemPrice += 1000;
                    if (item.customizations.extraCheese) singleItemPrice += 200;
                    if (item.customizations.extraSauce) singleItemPrice += 150;

                    return (
                      <div key={index} className="cart-item-card">
                        <img src={item.image} alt={item.name[currentLang]} className="cart-item-img" />
                        <div className="cart-item-info">
                          <h5>{item.name[currentLang]}</h5>
                          
                          {/* Customizations tags */}
                          <div className="item-customization-tags">
                            <span className="custom-tag">{t[item.customizations.size]}</span>
                            <span className="custom-tag">{t[item.customizations.spice]}</span>
                            {item.customizations.extraCheese && <span className="custom-tag">{t.extraCheese}</span>}
                            {item.customizations.extraSauce && <span className="custom-tag">{t.extraSauce}</span>}
                          </div>

                          <div className="cart-item-action-row">
                            <div className="quantity-controls">
                              <button onClick={() => updateQuantity(index, -1)}>-</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(index, 1)}>+</button>
                            </div>
                            <span className="cart-item-price-sum">
                              Rs. {(singleItemPrice * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <button className="cart-remove-btn" onClick={() => removeItem(index)}>
                          <Trash2 />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Calculation breakdown */}
                <div className="cart-calculation-summary">
                  <div className="calc-row">
                    <span>{t.subtotal}</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="calc-row">
                    <span>{t.tax}</span>
                    <span>Rs. {tax.toLocaleString()}</span>
                  </div>
                  <div className="calc-row">
                    <span>{t.deliveryFee}</span>
                    <span>Rs. {deliveryFee.toLocaleString()}</span>
                  </div>
                  
                  {currentUser && currentUser.points > 0 && (
                    <div className="loyalty-redeem-row">
                      <label className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={redeemPoints}
                          onChange={(e) => setRedeemPoints(e.target.checked)}
                        />
                        <span className="checkbox-checkmark"></span>
                        <span className="redeem-text">
                          {currentLang === 'ur'
                            ? `ڈسکاؤنٹ کے لیے ${maxRedeemablePoints} پوائنٹس استعمال کریں`
                            : currentLang === 'ar'
                            ? `استبدال ${maxRedeemablePoints} نقطة للحصول على خصم`
                            : `Redeem ${maxRedeemablePoints} points for Rs. ${maxRedeemablePoints}`}
                        </span>
                      </label>
                    </div>
                  )}

                  {redeemPoints && currentUser && (
                    <div className="calc-row discount-row">
                      <span>{t.discount}</span>
                      <span>- Rs. {loyaltyDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="calc-row total-row">
                    <span>{t.total}</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>

                  <button className="btn-gold btn-checkout" onClick={() => setStep(2)}>
                    {t.checkout}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Step 2: Checkout Form details */
          <form className="cart-body checkout-form" onSubmit={handlePlaceOrder}>
            <div className="checkout-fields-container">
              {/* Branch Selection */}
              <div className="form-group">
                <label className="form-label">{t.selectBranch}</label>
                <select 
                  className="form-select"
                  value={deliveryBranch}
                  onChange={(e) => setDeliveryBranch(e.target.value)}
                >
                  <option value="branch-isb">{t.islamabad}</option>
                  <option value="branch-wah">{t.wahCantt}</option>
                </select>
              </div>

              {/* Delivery Address */}
              <div className="form-group">
                <label className="form-label">
                  {currentLang === 'ur' ? 'ڈیلیوری کا پتہ' : currentLang === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}
                </label>
                <textarea
                  className="form-input"
                  style={{ minHeight: '60px', resize: 'vertical' }}
                  required
                  placeholder={
                    currentLang === 'ur' 
                      ? 'اپنے گھر کا مکمل پتہ درج کریں...' 
                      : currentLang === 'ar'
                      ? 'أدخل عنوان التوصيل الكامل...'
                      : 'Enter your complete delivery address...'
                  }
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>

              {/* Payment Option Selection */}
              <div className="form-group">
                <label className="form-label">{t.paymentMethod}</label>
                <div className="payment-options-grid">
                  <button 
                    type="button"
                    className={`payment-option-card ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard />
                    <span>{t.creditCard}</span>
                  </button>
                  <button 
                    type="button"
                    className={`payment-option-card ${paymentMethod === 'paypal' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <Landmark />
                    <span>{t.paypal}</span>
                  </button>
                  <button 
                    type="button"
                    className={`payment-option-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <Shield />
                    <span>{t.cod}</span>
                  </button>
                </div>
              </div>

              {/* Credit Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="credit-card-inputs-panel animate-fade-in">
                  <div className="form-group">
                    <label className="form-label">{t.cardHolder}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="MUHAMMAD USMAN" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t.cardNumber}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      pattern="\d{16}"
                      maxLength="16"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g,''))}
                      placeholder="4000123456789010" 
                    />
                  </div>
                  <div className="form-row-double">
                    <div className="form-group">
                      <label className="form-label">{t.expiryDate}</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        maxLength="5"
                        placeholder="12/28" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t.cvv}</label>
                      <input 
                        type="password" 
                        className="form-input" 
                        required 
                        maxLength="3"
                        pattern="\d{3}"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g,''))}
                        placeholder="***" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Paypal Information Banner */}
              {paymentMethod === 'paypal' && (
                <div className="paypal-mock-banner animate-fade-in">
                  <p>
                    {currentLang === 'ur'
                      ? 'آرڈر کی تصدیق کے بعد پے پال پورٹل پر ری ڈائریکٹ کیا جائے گا۔'
                      : currentLang === 'ar'
                      ? 'سيتم إعادة توجيهك إلى بوابة PayPal الآمنة بعد النقر فوق تأكيد.'
                      : 'You will be redirected to the secure PayPal portal to verify payment.'}
                  </p>
                </div>
              )}

              {/* Cash On Delivery Banner */}
              {paymentMethod === 'cod' && (
                <div className="cod-mock-banner animate-fade-in">
                  <p>
                    {currentLang === 'ur'
                      ? 'رقم کی ادائیگی کھانا وصول کرتے وقت نقد یا کارڈ کے ذریعے کریں۔'
                      : currentLang === 'ar'
                      ? 'يرجى تسديد المبلغ نقداً أو بالبطاقة عند استلام الوجبة.'
                      : 'Please settle the grand total amount upon delivery via cash or card terminal.'}
                  </p>
                </div>
              )}
            </div>

            {/* Total checkout details & placement */}
            <div className="cart-calculation-summary" style={{ borderTop: '1px solid var(--border-gold)', marginTop: 'auto' }}>
              <div className="calc-row total-row">
                <span>{t.total}</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <div className="checkout-action-buttons">
                <button type="button" className="btn-outline" onClick={() => setStep(1)} disabled={isSubmitting}>
                  {currentLang === 'ur' ? 'واپس' : currentLang === 'ar' ? 'رجوع' : 'Back'}
                </button>
                <button type="submit" className="btn-gold" style={{ flex: 1 }} disabled={isSubmitting}>
                  {isSubmitting ? t.loading : t.placeOrder}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
        }
        .cart-sidebar {
          width: 480px;
          max-width: 100%;
          height: 100%;
          border-radius: 0;
          border-left: 1px solid var(--border-gold);
          border-right: none;
          border-top: none;
          border-bottom: none;
          display: flex;
          flex-direction: column;
          padding: 0;
        }
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(197, 168, 92, 0.15);
        }
        .cart-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cart-header-title h2 {
          font-size: 1.4rem;
          text-transform: uppercase;
        }
        .gold-icon {
          color: var(--primary-gold);
          width: 24px;
          height: 24px;
        }
        .cart-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .cart-close-btn:hover {
          color: #ffffff;
        }
        .cart-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 24px;
        }
        .empty-cart-message {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--text-muted);
        }
        .empty-icon {
          width: 60px;
          height: 60px;
          color: var(--border-gold);
          margin-bottom: 20px;
        }
        .cart-items-list {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
          padding-right: 5px;
        }
        .cart-item-card {
          display: flex;
          gap: 15px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(197, 168, 92, 0.1);
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 15px;
          position: relative;
        }
        .cart-item-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 4px;
        }
        .cart-item-info {
          flex: 1;
          text-align: left;
        }
        .cart-item-info h5 {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .item-customization-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 8px;
        }
        .custom-tag {
          background: rgba(255, 255, 255, 0.05);
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--text-muted);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .cart-item-action-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .quantity-controls {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-gold);
          border-radius: 4px;
        }
        .quantity-controls button {
          background: transparent;
          border: none;
          color: var(--primary-gold);
          width: 26px;
          height: 26px;
          cursor: pointer;
          font-weight: 700;
        }
        .quantity-controls span {
          width: 26px;
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .cart-item-price-sum {
          font-weight: 700;
          color: #ffffff;
          font-size: 0.95rem;
        }
        .cart-remove-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          color: #ff3b30;
          cursor: pointer;
          opacity: 0.7;
          transition: var(--transition-smooth);
        }
        .cart-remove-btn:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        .cart-remove-btn svg {
          width: 16px;
          height: 16px;
        }
        .cart-calculation-summary {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-gold);
          border-radius: 6px;
          padding: 20px;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 10px;
          color: var(--text-muted);
        }
        .discount-row {
          color: #30d158;
        }
        .total-row {
          border-top: 1px solid rgba(197, 168, 92, 0.15);
          padding-top: 12px;
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
        }
        .total-row span:last-child {
          color: var(--primary-gold);
        }
        .btn-checkout {
          width: 100%;
        }

        /* Checkbox Loyalty style */
        .loyalty-redeem-row {
          margin: 12px 0;
          text-align: left;
        }
        .checkbox-container {
          display: flex;
          align-items: center;
          position: relative;
          padding-left: 28px;
          cursor: pointer;
          user-select: none;
        }
        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        .checkbox-checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 18px;
          width: 18px;
          background-color: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-gold);
          border-radius: 3px;
        }
        .checkbox-container:hover input ~ .checkbox-checkmark {
          border-color: var(--primary-gold);
        }
        .checkbox-container input:checked ~ .checkbox-checkmark {
          background-color: var(--primary-gold);
          border-color: var(--primary-gold);
        }
        .checkbox-checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        .checkbox-container input:checked ~ .checkbox-checkmark:after {
          display: block;
        }
        .checkbox-container .checkbox-checkmark:after {
          left: 6px;
          top: 2px;
          width: 4px;
          height: 9px;
          border: solid #000;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .redeem-text {
          font-size: 0.85rem;
          color: var(--primary-gold-hover);
          font-weight: 500;
        }

        /* Checkout fields */
        .checkout-form {
          justify-content: flex-start;
        }
        .checkout-fields-container {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
          padding-right: 5px;
        }
        .payment-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }
        .payment-option-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(197, 168, 92, 0.2);
          border-radius: 6px;
          padding: 12px 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }
        .payment-option-card svg {
          width: 20px;
          height: 20px;
        }
        .payment-option-card span {
          font-size: 0.75rem;
          font-weight: 600;
          text-align: center;
        }
        .payment-option-card.active {
          border-color: var(--primary-gold);
          background: rgba(197, 168, 92, 0.1);
          color: var(--primary-gold-hover);
        }
        .form-row-double {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .credit-card-inputs-panel {
          border: 1px solid rgba(197, 168, 92, 0.15);
          background: rgba(0, 0, 0, 0.1);
          padding: 15px;
          border-radius: 6px;
          margin-top: 15px;
        }
        .paypal-mock-banner,
        .cod-mock-banner {
          background: rgba(197, 168, 92, 0.05);
          border: 1px solid var(--border-gold);
          border-radius: 6px;
          padding: 15px;
          margin-top: 15px;
          font-size: 0.85rem;
          color: var(--primary-gold);
          text-align: left;
        }
        .checkout-action-buttons {
          display: flex;
          gap: 15px;
        }

        /* RTL tweaks */
        [dir="rtl"] .cart-sidebar {
          border-right: 1px solid var(--border-gold);
          border-left: none;
        }
        [dir="rtl"] .cart-item-info {
          text-align: right;
        }
        [dir="rtl"] .cart-remove-btn {
          right: auto;
          left: 12px;
        }
        [dir="rtl"] .checkbox-container {
          padding-left: 0;
          padding-right: 28px;
        }
        [dir="rtl"] .checkbox-checkmark {
          left: auto;
          right: 0;
        }
        [dir="rtl"] .checkbox-container .checkbox-checkmark:after {
          right: 6px;
          left: auto;
        }
        [dir="rtl"] .paypal-mock-banner,
        [dir="rtl"] .cod-mock-banner {
          text-align: right;
        }
      `}</style>
    </div>
  );
}
