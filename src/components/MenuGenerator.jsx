import React, { useState } from 'react';
import { Sparkles, Loader, Plus, X } from 'lucide-react';
import {
  generateMenuItemWithAI,
  generateTemplateItems,
  menuTemplates,
} from '../utils/menuGenerator';
import '../styles/MenuGenerator.css';

export default function MenuGenerator({ onItemsGenerated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedItems, setGeneratedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('manual');

  // Manual generation form
  const [formData, setFormData] = useState({
    name: '',
    cuisine: 'Pakistani',
    category: 'mains',
    price: 1500,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value) : value,
    }));
  };

  const handleGenerateItem = async () => {
    if (!formData.name.trim()) {
      alert('Please enter a dish name');
      return;
    }

    setIsLoading(true);
    try {
      const item = await generateMenuItemWithAI(
        formData.name,
        formData.cuisine,
        formData.category,
        formData.price
      );

      if (item) {
        setGeneratedItems((prev) => [...prev, item]);
        setFormData({ name: '', cuisine: 'Pakistani', category: 'mains', price: 1500 });
      }
    } catch (error) {
      console.error('Error generating item:', error);
      alert('Failed to generate item. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTemplate = async (templateKey) => {
    setIsLoading(true);
    try {
      const items = await generateTemplateItems(templateKey);
      if (items.length > 0) {
        setGeneratedItems((prev) => [...prev, ...items]);
      }
    } catch (error) {
      console.error('Error generating template:', error);
      alert('Failed to generate template items. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItems = () => {
    if (generatedItems.length === 0) {
      alert('No items to add');
      return;
    }

    onItemsGenerated(generatedItems);
    setGeneratedItems([]);
    setIsOpen(false);
    alert(`Added ${generatedItems.length} new menu items!`);
  };

  const handleRemoveItem = (index) => {
    setGeneratedItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="menu-generator-fab"
        onClick={() => setIsOpen(true)}
        title="Generate menu items with AI"
      >
        <Sparkles size={24} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="menu-generator-modal">
          <div className="menu-generator-container">
            {/* Header */}
            <div className="generator-header">
              <div className="generator-title">
                <Sparkles />
                <h2>Menu Item Generator</h2>
              </div>
              <button
                className="close-btn"
                onClick={() => {
                  setIsOpen(false);
                  setGeneratedItems([]);
                }}
              >
                <X />
              </button>
            </div>

            {/* Tabs */}
            <div className="generator-tabs">
              <button
                className={`tab ${activeTab === 'manual' ? 'active' : ''}`}
                onClick={() => setActiveTab('manual')}
              >
                Create Manual
              </button>
              <button
                className={`tab ${activeTab === 'templates' ? 'active' : ''}`}
                onClick={() => setActiveTab('templates')}
              >
                Quick Templates
              </button>
            </div>

            {/* Content */}
            <div className="generator-content">
              {activeTab === 'manual' ? (
                // Manual Form
                <div className="manual-form">
                  <div className="form-group">
                    <label>Dish Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Butter Chicken Biryani"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Cuisine Type</label>
                    <select
                      name="cuisine"
                      value={formData.cuisine}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    >
                      <option>Pakistani</option>
                      <option>Continental</option>
                      <option>Asian</option>
                      <option>Mediterranean</option>
                      <option>Indian</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      >
                        <option value="mains">Main Course</option>
                        <option value="appetizers">Appetizer</option>
                        <option value="desserts">Dessert</option>
                        <option value="beverages">Beverage</option>
                        <option value="soups">Soup</option>
                        <option value="salads">Salad</option>
                        <option value="seafood">Seafood</option>
                        <option value="pasta">Pasta</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Price (PKR)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="100"
                        max="10000"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button
                    className="btn-generate"
                    onClick={handleGenerateItem}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader size={18} className="spinner" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Generate Item
                      </>
                    )}
                  </button>
                </div>
              ) : (
                // Templates
                <div className="templates-grid">
                  {Object.entries(menuTemplates).map(([key, items]) => (
                    <button
                      key={key}
                      className="template-card"
                      onClick={() => handleGenerateTemplate(key)}
                      disabled={isLoading}
                    >
                      <div className="template-title">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                      <div className="template-count">{items.length} items</div>
                      {isLoading && <Loader size={20} className="spinner" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Generated Items Preview */}
            {generatedItems.length > 0 && (
              <div className="generated-preview">
                <h3>Generated Items ({generatedItems.length})</h3>
                <div className="items-list">
                  {generatedItems.map((item, index) => (
                    <div key={index} className="preview-item">
                      <div className="item-info">
                        <h4>{item.name.en}</h4>
                        <p>{item.description.en.substring(0, 100)}...</p>
                        <div className="item-meta">
                          <span className="category">{item.category}</span>
                          <span className="price">Rs. {item.price}</span>
                        </div>
                      </div>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="generator-footer">
              {generatedItems.length > 0 && (
                <button className="btn-add-items" onClick={handleAddItems}>
                  <Plus size={18} />
                  Add {generatedItems.length} Items to Menu
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
