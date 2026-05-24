/**
 * Menu Item Image Mapper
 * Assigns unique images to each menu item based on dish name
 */

import { getOptimizedFoodImage } from '../services/unsplashService';

/**
 * Apply unique images to all menu items
 * @param {Array} menuItems - Array of menu items
 * @returns {Array} - Menu items with unique images
 */
export function applyUniqueImages(menuItems) {
  return menuItems.map(item => ({
    ...item,
    image: getOptimizedFoodImage(item.name.en),
  }));
}

/**
 * Create image URL for a specific dish
 * @param {string} dishName - Name of the dish
 * @param {string} category - Category of the dish
 * @returns {string} - Image URL
 */
export function createDishImage(dishName, category) {
  return getOptimizedFoodImage(dishName);
}
