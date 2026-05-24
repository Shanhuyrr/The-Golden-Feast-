import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQAccordion({ faqs, currentLang }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion-container">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div key={index} className={`faq-item glass-card ${isOpen ? 'active' : ''}`}>
            <button className="faq-question-btn" onClick={() => toggleAccordion(index)}>
              <span>{faq.question[currentLang]}</span>
              {isOpen ? <ChevronUp className="faq-icon" /> : <ChevronDown className="faq-icon" />}
            </button>
            <div className={`faq-answer-panel ${isOpen ? 'open' : ''}`}>
              <div className="faq-answer-content">
                <p>{faq.answer[currentLang]}</p>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        .faq-accordion-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-item {
          border-color: rgba(197, 168, 92, 0.15);
          transition: var(--transition-smooth);
        }
        .faq-item.active {
          border-color: var(--primary-gold);
          box-shadow: 0 4px 15px var(--primary-gold-glow);
        }
        .faq-question-btn {
          width: 100%;
          background: transparent;
          border: none;
          padding: 20px 24px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          transition: var(--transition-smooth);
        }
        .faq-question-btn:hover {
          color: var(--primary-gold-hover);
        }
        .faq-icon {
          color: var(--primary-gold);
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
        .faq-answer-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .faq-answer-panel.open {
          max-height: 200px; /* arbitrary height to slide down */
        }
        .faq-answer-content {
          padding: 0 24px 20px;
          border-top: 1px solid rgba(197, 168, 92, 0.05);
          text-align: left;
        }
        .faq-answer-content p {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        [dir="rtl"] .faq-question-btn {
          text-align: right;
        }
        [dir="rtl"] .faq-answer-content {
          text-align: right;
        }
      `}</style>
    </div>
  );
}
