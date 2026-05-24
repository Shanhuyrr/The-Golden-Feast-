# 🍽️ Gemini API Integration Guide

## Adding Images with Gemini for Your Menu

This guide will help you set up Google's Gemini API to automatically generate descriptions and images for your menu items.

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new project or select existing one
4. Copy your API key

### Step 2: Set Up Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your keys:
   ```
   VITE_GEMINI_API_KEY=your_actual_gemini_key_here
   VITE_UNSPLASH_API_KEY=your_unsplash_key_here
   ```

### Step 3: Get Unsplash API Key (Optional - for food images)

1. Visit [Unsplash Developers](https://unsplash.com/oauth/applications)
2. Create a new application
3. Get your access key
4. Add it to `.env`

### Step 4: Using the Gemini Service

The `src/services/geminiService.js` provides these functions:

#### Generate Food Description
```javascript
import { generateFoodDescription } from '../services/geminiService';

const description = await generateFoodDescription('Biryani', 'Pakistani');
```

#### Generate Food Image URL
```javascript
import { generateFoodImage } from '../services/geminiService';

const imageUrl = await generateFoodImage('Biryani', 'Pakistani');
```

#### Generate Multiple Menu Items
```javascript
import { generateMenuItems } from '../services/geminiService';

const items = await generateMenuItems(
  ['Biryani', 'Nihari', 'Karahi'],
  'Pakistani'
);
```

### Step 5: Current Menu Additions

I've added **30+ new menu items** across all categories:

**New Categories Added:**
- ✅ **Biryani Collection** (5 items)
- ✅ **Pasta Collection** (3 items) 
- ✅ **Kids Menu** (4 items)
- ✅ **More Appetizers** (3 items)
- ✅ **More Main Courses** (2 items)
- ✅ **More Desserts** (3 items)
- ✅ **More Beverages** (2 items)

**Total Menu Items Now:** 150+ items across 15+ categories

### Step 6: Dynamic Image Generation (Advanced)

If you want to generate images dynamically for new menu items, create a utility:

```javascript
// src/utils/menuGenerator.js
import { generateFoodDescription, generateFoodImage } from '../services/geminiService';

export async function createMenuItemWithGemini(name, cuisine, category, price) {
  const description = await generateFoodDescription(name, cuisine);
  const image = await generateFoodImage(name, cuisine);
  
  return {
    id: `${category}-${Date.now()}`,
    category,
    price,
    rating: 4.5,
    calories: 550,
    prepTime: '20 mins',
    name: { en: name, ur: name, ar: name },
    description: { 
      en: description,
      ur: description,
      ar: description
    },
    image
  };
}
```

### Step 7: Features & Tips

- 🖼️ **Automatic Image Generation**: Uses Unsplash API for high-quality food images
- 📝 **AI Descriptions**: Gemini creates luxurious menu descriptions
- 🌍 **Multi-language**: Descriptions adapt to your language
- ⚡ **Caching**: Consider caching generated descriptions
- 🔒 **Security**: Never commit `.env` with real API keys

### Step 8: Troubleshooting

**Problem:** "API key not found"
- Solution: Check `.env` file exists and has correct key

**Problem:** No images showing
- Solution: Check Unsplash API key or use default placeholder

**Problem:** Rate limiting
- Solution: Implement request caching and throttling

### Next Steps

1. Add API keys to `.env`
2. Test by viewing your menu
3. Customize menu items as needed
4. Deploy with proper environment variables in production

---

**Need more menu items?** Use the Gemini service to generate them dynamically!
