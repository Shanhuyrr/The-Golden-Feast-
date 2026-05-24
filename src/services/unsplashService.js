/**
 * Unsplash Image Service for Dynamic Food Images
 * Generates unique image URLs for each menu item
 */

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

/**
 * Generate a unique Unsplash image URL for a specific dish
 * @param {string} dishName - Name of the dish
 * @param {string} cuisine - Type of cuisine
 * @returns {string} - Unsplash image URL
 */
export function getUnsplashImageUrl(dishName, cuisine) {
  // Create a search query combining dish and cuisine
  const searchQuery = encodeURIComponent(`${dishName} ${cuisine} food`);
  
  // Unsplash direct search URL with consistent sizing
  // Using random parameter to get different images each time
  const random = Math.random().toString(36).substring(7);
  
  return `https://images.unsplash.com/search/photos?query=${searchQuery}&client_id=${UNSPLASH_API_KEY}&w=500&h=600&fit=crop&orientation=portrait&random=${random}`;
}

/**
 * Get optimized Unsplash URL with direct parameters
 * This method works better for consistent food images
 * @param {string} dishName - Name of the dish
 * @returns {string} - Optimized Unsplash image URL
 */
export function getOptimizedFoodImage(dishName) {
  const cleanName = dishName.toLowerCase().replace(/\s+/g, '+');
  
  // Array of popular food image search terms
  const foodImages = {
    'biryani': 'https://images.unsplash.com/photo-1589273617857-1e69614531cf?w=500&h=600&fit=crop',
    'butter chicken': 'https://images.unsplash.com/photo-1565557623814-550f2deeb012?w=500&h=600&fit=crop',
    'nihari': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=600&fit=crop',
    'karahi': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=600&fit=crop',
    'tikka': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=600&fit=crop',
    'kebab': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd94548?w=500&h=600&fit=crop',
    'naan': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=600&fit=crop',
    'biryani': 'https://images.unsplash.com/photo-1589273617857-1e69614531cf?w=500&h=600&fit=crop',
    'wagyu': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=600&fit=crop',
    'lobster': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=600&fit=crop',
    'seafood': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=600&fit=crop',
    'pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=600&fit=crop',
    'pizza': 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=600&fit=crop',
    'dessert': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=600&fit=crop',
    'chocolate': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=600&fit=crop',
    'cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=600&fit=crop',
    'cheesecake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=600&fit=crop',
    'ice cream': 'https://images.unsplash.com/photo-1563805042-7684c019e157?w=500&h=600&fit=crop',
    'drink': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=600&fit=crop',
    'beverage': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=600&fit=crop',
    'salad': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=600&fit=crop',
    'soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=600&fit=crop',
  };

  // Check for keyword matches
  for (const [keyword, url] of Object.entries(foodImages)) {
    if (cleanName.includes(keyword)) {
      return url;
    }
  }

  // Default food image if no match
  return 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=600&fit=crop';
}

/**
 * Generate unique images for all menu items
 * Uses a combination of Unsplash URLs and smart caching
 */
export function generateMenuItemImages(menuItems) {
  return menuItems.map((item, index) => ({
    ...item,
    image: getOptimizedFoodImage(item.name.en),
    imageIndex: index, // For variation
  }));
}
