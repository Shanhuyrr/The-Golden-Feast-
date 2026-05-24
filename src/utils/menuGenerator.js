/**
 * Menu Item Generator Utility
 * Dynamically creates menu items using Gemini AI
 */

import {
  generateFoodDescription,
  generateFoodImage,
} from '../services/geminiService';

/**
 * Generate a complete menu item with AI assistance
 * @param {string} dishName - Name of the dish
 * @param {string} cuisine - Type of cuisine
 * @param {string} category - Menu category
 * @param {number} price - Price in PKR
 * @returns {Promise<Object>} - Complete menu item object
 */
export async function generateMenuItemWithAI(
  dishName,
  cuisine,
  category,
  price
) {
  try {
    console.log(`Generating menu item: ${dishName}...`);

    const [description, image] = await Promise.all([
      generateFoodDescription(dishName, cuisine),
      generateFoodImage(dishName, cuisine),
    ]);

    return {
      id: `gen-${category}-${Date.now()}`,
      category,
      name: {
        en: dishName,
        ur: dishName,
        ar: dishName,
      },
      description: {
        en: description,
        ur: description,
        ar: description,
      },
      image,
      price: Math.round(price),
      rating: 4.5,
      calories: 550,
      prepTime: '20 mins',
    };
  } catch (error) {
    console.error('Error generating menu item:', error);
    return null;
  }
}

/**
 * Generate multiple menu items at once
 * @param {Array<Object>} items - Array of {name, cuisine, category, price}
 * @returns {Promise<Array>} - Array of generated menu items
 */
export async function generateMultipleMenuItems(items) {
  const generatedItems = await Promise.all(
    items.map((item) =>
      generateMenuItemWithAI(item.name, item.cuisine, item.category, item.price)
    )
  );

  return generatedItems.filter((item) => item !== null);
}

/**
 * Preset menu generation templates
 */
export const menuTemplates = {
  pakistani: [
    { name: 'Chicken Tikka Masala Supreme', cuisine: 'Pakistani', category: 'mains', price: 1800 },
    { name: 'Kashmiri Wazwan Platter', cuisine: 'Pakistani', category: 'mains', price: 2200 },
    { name: 'Peshawar Chapli Kebab', cuisine: 'Pakistani', category: 'bbq', price: 1400 },
  ],
  continental: [
    { name: 'Pan-Seared Lobster Thermidor', cuisine: 'Continental', category: 'mains', price: 3400 },
    { name: 'Herb-Crusted Lamb Chops', cuisine: 'Continental', category: 'mains', price: 2800 },
    { name: 'Butter Poached Halibut', cuisine: 'Continental', category: 'seafood', price: 2600 },
  ],
  asian: [
    { name: 'Sichuan Beef Noodles', cuisine: 'Asian', category: 'pasta', price: 1600 },
    { name: 'Thai Green Curry Prawns', cuisine: 'Asian', category: 'seafood', price: 2200 },
    { name: 'Vietnamese Pho Supreme', cuisine: 'Asian', category: 'soups', price: 1200 },
  ],
  desserts: [
    { name: 'Chocolate Soufflé with Gold Leaf', cuisine: 'French', category: 'desserts', price: 1200 },
    { name: 'Strawberry Champagne Mousse', cuisine: 'French', category: 'desserts', price: 1100 },
    { name: 'Matcha Green Tea Panna Cotta', cuisine: 'Asian', category: 'desserts', price: 950 },
  ],
};

/**
 * Quick generate popular items from a cuisine
 * @param {string} templateKey - Key from menuTemplates
 * @returns {Promise<Array>} - Generated menu items
 */
export async function generateTemplateItems(templateKey) {
  const template = menuTemplates[templateKey];
  if (!template) {
    console.error(`Template "${templateKey}" not found`);
    return [];
  }

  return generateMultipleMenuItems(template);
}
