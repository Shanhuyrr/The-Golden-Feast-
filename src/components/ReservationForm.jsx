import React, { useState } from 'react';
import { Calendar, Users, Clock, Compass, Gift, MessageSquare, CheckCircle } from 'lucide-react';
import { translations } from '../data/translations';

export default function ReservationForm({ currentLang, currentUser, addReservationToHistory }) {
  const [branch, setBranch] = useState('branch-isb');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState('2');
  const [seating, setSeating] = useState('indoor');
  const [occasion, setOccasion] = useState('none');
  const [specialReq, setSpecialReq] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = translations[currentLang];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database booking time
    setTimeout(() => {
      const vipCode = 'VIP-' + Math.floor(1000 + Math.random() * 9000);
      const reservationData = {
        code: vipCode,
        date: date,
        time: time,
        guests: guests,
        branch: branch === 'branch-isb' ? t.islamabad : t.wahCantt,
        seating: t[`res${seating.charAt(0).toUpperCase() + seating.slice(1)}`],
        occasion: occasion !== 'none' ? t[occasion] : t.none
      };

      if (currentUser) {
        addReservationToHistory(reservationData);
      } else {
        // Save to temporary guest storage
        const guestReservations = JSON.parse(localStorage.getItem('guest_reservations') || '[]');
        guestReservations.push(reservationData);
        localStorage.setItem('guest_reservations', JSON.stringify(guestReservations));
      }

      setBookingCode(vipCode);
      setBookingSuccess(true);
      setIsSubmitting(false);

      // Reset form
      setDate('');
      setSpecialReq('');
    }, 1500);
  };

  // Get tomorrow's date for minimum calendar selection
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="reservation-form-wrapper glass-panel animate-fade-up">
      {bookingSuccess ? (
        <div className="booking-success-view animate-fade-in">
          <CheckCircle className="success-check-icon animate-pulse" />
          <h2 className="text-gold">{t.resSuccess}</h2>
          <p className="success-desc-text">
            {t.resSuccessDesc} <strong className="vip-code-text">{bookingCode}</strong>
          </p>
          <p className="email-notify-note">
            {currentLang === 'ur' 
              ? 'بکنگ کی تفصیلات آپ کے رجسٹرڈ ای میل ایڈریس پر بھیج دی گئی ہیں۔' 
              : currentLang === 'ar'
              ? 'تم إرسال تفاصيل الحجز إلى بريدك الإلكتروني المسجل.'
              : 'Detailed reservation coordinates have been dispatched to your email.'}
          </p>
          <button className="btn-gold" style={{ marginTop: '20px' }} onClick={() => setBookingSuccess(false)}>
            {currentLang === 'ur' ? 'ایک اور ٹیبل بک کریں' : currentLang === 'ar' ? 'حجز طاولة أخرى' : 'Book Another Table'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-grid-columns">
            {/* Branch Selection */}
            <div className="form-group">
              <label className="form-label">{t.selectBranch}</label>
              <div className="input-with-icon">
                <Compass className="field-icon" />
                <select 
                  className="form-select" 
                  value={branch} 
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option value="branch-isb">{t.islamabad}</option>
                  <option value="branch-wah">{t.wahCantt}</option>
                </select>
              </div>
            </div>

            {/* Date Picker */}
            <div className="form-group">
              <label className="form-label">{t.resDate}</label>
              <div className="input-with-icon">
                <Calendar className="field-icon" />
                <input 
                  type="date" 
                  className="form-input date-input" 
                  required 
                  min={getMinDate()}
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {/* Time Slot Selector */}
            <div className="form-group">
              <label className="form-label">{t.resTime}</label>
              <div className="input-with-icon">
                <Clock className="field-icon" />
                <select 
                  className="form-select" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="13:30">01:30 PM (Lunch)</option>
                  <option value="15:00">03:00 PM (Lunch)</option>
                  <option value="18:00">06:00 PM (Sunset Dinner)</option>
                  <option value="19:30">07:30 PM (Prime Dinner)</option>
                  <option value="21:00">09:00 PM (Imperial Session)</option>
                  <option value="22:30">10:30 PM (Late Session)</option>
                </select>
              </div>
            </div>

            {/* Guest Counter */}
            <div className="form-group">
              <label className="form-label">{t.resGuests}</label>
              <div className="input-with-icon">
                <Users className="field-icon" />
                <select 
                  className="form-select" 
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value="1">1 {currentLang === 'ur' ? 'مہمان' : 'Patron'}</option>
                  <option value="2">2 {currentLang === 'ur' ? 'مہمان' : 'Patrons'}</option>
                  <option value="3">3 {currentLang === 'ur' ? 'مہمان' : 'Patrons'}</option>
                  <option value="4">4 {currentLang === 'ur' ? 'مہمان' : 'Patrons'}</option>
                  <option value="5">5 {currentLang === 'ur' ? 'مہمان' : 'Patrons'}</option>
                  <option value="6">6 {currentLang === 'ur' ? 'مہمان' : 'Patrons'}</option>
                  <option value="7">7 {currentLang === 'ur' ? 'مہمان' : 'Patrons'}</option>
                  <option value="8">8 {currentLang === 'ur' ? 'مہمان' : 'Patrons'}</option>
                  <option value="12">9 - 12 (Imperial Boardroom)</option>
                  <option value="20">13 - 20 (Grand Banquet Hall)</option>
                </select>
              </div>
            </div>

            {/* Seating Area selection */}
            <div className="form-group">
              <label className="form-label">{t.resSeating}</label>
              <div className="input-with-icon">
                <Compass className="field-icon" />
                <select 
                  className="form-select" 
                  value={seating} 
                  onChange={(e) => setSeating(e.target.value)}
                >
                  <option value="indoor">{t.resIndoor}</option>
                  <option value="terrace">{t.resTerrace}</option>
                  <option value="private">{t.resPrivate}</option>
                </select>
              </div>
            </div>

            {/* Occasion Option */}
            <div className="form-group">
              <label className="form-label">{t.resOccasion}</label>
              <div className="input-with-icon">
                <Gift className="field-icon" />
                <select 
                  className="form-select" 
                  value={occasion} 
                  onChange={(e) => setOccasion(e.target.value)}
                >
                  <option value="none">{t.none}</option>
                  <option value="birthday">{t.birthday}</option>
                  <option value="anniversary">{t.anniversary}</option>
                  <option value="business">{t.business}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Special Demands Details */}
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">{t.specialReq}</label>
            <div className="input-with-icon text-area-icon-container">
              <MessageSquare className="field-icon text-area-icon" />
              <textarea 
                className="form-input text-area-field" 
                placeholder={t.reqPlaceholder}
                value={specialReq}
                onChange={(e) => setSpecialReq(e.target.value)}
                rows="3"
              />
            </div>
          </div>

          <button type="submit" className="btn-gold form-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? t.loading : t.bookBtn}
          </button>
        </form>
      )}

      <style>{`
        .reservation-form-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(197, 168, 92, 0.08) 0%, rgba(197, 168, 92, 0.12) 100%) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(197, 168, 92, 0.25) !important;
          box-shadow: inset 0 0 20px rgba(197, 168, 92, 0.05);
          padding: 40px;
          border-radius: 12px;
        }
        .form-grid-columns {
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
        .form-input, .form-select {
          padding-left: 45px;
          background-color: rgba(20, 20, 30, 0.6) !important;
          border: 1px solid rgba(197, 168, 92, 0.4) !important;
          color: #ffffff !important;
          transition: all 0.3s ease;
        }
        .form-input:focus, .form-select:focus {
          background-color: rgba(20, 20, 30, 0.8) !important;
          border-color: rgba(197, 168, 92, 0.7) !important;
          box-shadow: 0 0 15px rgba(197, 168, 92, 0.2) !important;
        }
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        .date-input::-webkit-calendar-picker-indicator {
          filter: invert(0.7) sepia(1) saturate(5) hue-rotate(5deg);
          cursor: pointer;
        }
        .text-area-icon-container {
          align-items: flex-start;
        }
        .text-area-icon {
          top: 14px;
        }
        .text-area-field {
          padding-top: 14px;
          min-height: 80px;
          resize: vertical;
        }
        .form-submit-btn {
          width: 100%;
          margin-top: 20px;
        }
        
        /* Success Screen */
        .booking-success-view {
          padding: 40px 20px;
          text-align: center;
        }
        .success-check-icon {
          width: 64px;
          height: 64px;
          color: #30d158;
          margin: 0 auto 20px;
        }
        .booking-success-view h2 {
          font-size: 1.8rem;
          margin-bottom: 15px;
          text-transform: uppercase;
        }
        .success-desc-text {
          font-size: 1.1rem;
          margin-bottom: 10px;
          color: var(--text-light);
        }
        .vip-code-text {
          color: var(--primary-gold);
          font-family: var(--font-serif);
          font-size: 1.4rem;
          letter-spacing: 1px;
          background: rgba(197, 168, 92, 0.1);
          border: 1px solid var(--border-gold);
          padding: 2px 10px;
          border-radius: 4px;
        }
        .email-notify-note {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* RTL overrides */
        [dir="rtl"] .field-icon {
          left: auto;
          right: 14px;
        }
        [dir="rtl"] .form-input, 
        [dir="rtl"] .form-select {
          padding-left: 16px;
          padding-right: 45px;
        }

        @media (max-width: 768px) {
          .form-grid-columns {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
}
