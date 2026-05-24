/**
 * Gemini API Service for Image Generation
 * Uses Google's Gemini API to generate high-quality food images
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Generate a detailed food description using Gemini
 * @param {string} dishName - Name of the dish
 * @param {string} cuisine - Type of cuisine
 * @returns {Promise<string>} - Generated description
 */
export async function generateFoodDescription(dishName, cuisine) {
  try {
    const prompt = `Generate a short, elegant, high-end restaurant menu description (max 100 words) for this dish: "${dishName}" from ${cuisine} cuisine. Focus on ingredients, preparation style, and dining experience. Make it luxurious and appealing.`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const description =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'Premium dining experience';

    return description;
  } catch (error) {
    console.error('Error generating description:', error);
    return 'A delightful culinary creation prepared with premium ingredients.';
  }
}

/**
 * Generate image URL using Gemini Vision or external image service
 * For now, uses a fallback approach with Unsplash API
 * @param {string} dishName - Name of the dish
 * @param {string} cuisine - Type of cuisine
 * @returns {Promise<string>} - Image URL
 */
export async function generateFoodImage(dishName, cuisine) {
  try {
    // Fallback: Using Unsplash API for high-quality food images
    const searchQuery = encodeURIComponent(`${dishName} ${cuisine} food`);
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}&orientation=portrait&w=400&h=500`;

    const response = await fetch(unsplashUrl);
    if (!response.ok) throw new Error('Unsplash API failed');

    const data = await response.json();
    if (data.results?.length > 0) {
      return data.results[0].urls.regular;
    }

    // Final fallback: placeholder image
    return `https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=500&fit=crop`;
  } catch (error) {
    console.error('Error generating image:', error);
    // Return a nice placeholder if all else fails
    return `https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=500&fit=crop`;
  }
}

/**
 * Generate multiple food items using Gemini
 * @param {Array} dishNames - Array of dish names
 * @param {string} cuisine - Type of cuisine
 * @returns {Promise<Array>} - Array of generated items
 */
export async function generateMenuItems(dishNames, cuisine) {
  const items = await Promise.all(
    dishNames.map(async (name, index) => ({
      description: await generateFoodDescription(name, cuisine),
      image: await generateFoodImage(name, cuisine),
      id: `gen-${cuisine}-${index}`,
      name: name,
    }))
  );

  return items;
}
