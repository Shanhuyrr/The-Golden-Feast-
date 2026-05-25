import { getOptimizedFoodImage } from '../services/unsplashService';

export const menuCategories = [
  "all", "appetizers", "mains", "desserts", "beverages",
  "pakistani", "bbq", "biryani", "soups", "salads",
  "breads", "seafood", "pasta", "kids", "specials"
];

export const menuItems = [
  // ─── APPETIZERS ───────────────────────────────────────────────────────────
  {
    id: "app-01", category: "appetizers", price: 1850, rating: 4.9, calories: 280, prepTime: "15 mins",
    name: { en: "Truffle Glazed Gold Scallops", ur: "ٹرفل گلیزڈ گولڈ سکالپس", ar: "محار الذهب بالكمأ" },
    description: { en: "Pan-seared Atlantic scallops glazed with white truffle honey, finished with premium microgreens and 24k gold leaf.", ur: "سفید ٹرفل شہد سے تیار کردہ اٹلانٹک سکالپس، باریک سبزیوں اور 24 قیراط سونے کے ورق سے سجے ہوئے۔", ar: "محار الأطلسي المحمر بعسل الكمأ، مع الخضروات الصغيرة وورق الذهب." }
  },
  {
    id: "app-02", category: "appetizers", price: 1450, rating: 4.8, calories: 320, prepTime: "12 mins",

    name: { en: "Imperial Caviar Blinis", ur: "شاہی کیویار بلینیز", ar: "بليني الكافيار الإمبراطوري" },
    description: { en: "Fluffy buckwheat pancakes topped with fresh sour cream, chives, and premium Caspian beluga caviar.", ur: "نرم پینکیکس پر تازہ کریم، ہرا پیاز اور بیلوگا کیویار۔", ar: "فطائر الحنطة السوداء مع القشدة الحامضة وكافيار البيلوغا." }
  },
  {
    id: "app-03", category: "appetizers", price: 1100, rating: 4.7, calories: 210, prepTime: "10 mins",

    name: { en: "Saffron Prawn Tempura", ur: "زعفران جھینگا ٹمپورا", ar: "ربيان تمبورا بالزعفران" },
    description: { en: "Crispy golden tempura prawns infused with saffron batter, served with sriracha aioli.", ur: "زعفران بیٹر میں کرسپی جھینگا، سریراچا آئیولی کے ساتھ۔", ar: "ربيان مقرمش بعجينة الزعفران مع صلصة سريراشا." }
  },
  {
    id: "app-04", category: "appetizers", price: 950, rating: 4.6, calories: 180, prepTime: "8 mins",

    name: { en: "Foie Gras Medallion", ur: "فوا گرا میڈالیون", ar: "ميداليون فوا غرا" },
    description: { en: "Pan-seared foie gras on brioche toast with fig compote and balsamic reduction.", ur: "بریوش ٹوسٹ پر فوا گرا، انجیر کمپوٹ اور بالسامک کے ساتھ۔", ar: "فوا غرا محمر على خبز البريوش مع مربى التين وتخفيف البلسميك." }
  },
  {
    id: "app-05", category: "appetizers", price: 880, rating: 4.5, calories: 260, prepTime: "12 mins",

    name: { en: "Wild Mushroom Bruschetta", ur: "وائلڈ مشروم برشیٹا", ar: "برشيتا الفطر البري" },
    description: { en: "Toasted artisan bread topped with sautéed wild mushrooms, parmesan shavings, and truffle oil.", ur: "آرٹیسان بریڈ پر جنگلی مشروم، پارمیسان اور ٹرفل آئل۔", ar: "خبز محمص مع الفطر البري المقلي وتقطيع البارميزان وزيت الكمأ." }
  },
  {
    id: "app-06", category: "appetizers", price: 1200, rating: 4.8, calories: 300, prepTime: "15 mins",

    name: { en: "Lobster Bisque Shooter", ur: "لابسٹر بسک شوٹر", ar: "شوت حساء اللوبستر" },
    description: { en: "Velvety lobster bisque served warm in shot glasses with a cream swirl and paprika dust.", ur: "شاٹ گلاسز میں گرم لابسٹر بسک، کریم اور پاپریکا کے ساتھ۔", ar: "حساء لوبستر مخملي دافئ في أكواب صغيرة مع دوامة الكريمة والفلفل الحلو." }
  },
  {
    id: "app-07", category: "appetizers", price: 750, rating: 4.4, calories: 190, prepTime: "8 mins",

    name: { en: "Burrata & Heirloom Tomato", ur: "بوراٹا اور ٹماٹر سلاد", ar: "بوراتا وطماطم تراثية" },
    description: { en: "Creamy burrata with heirloom tomatoes, fresh basil oil, and Himalayan pink salt.", ur: "تازہ بوراٹا، رنگین ٹماٹر، تلسی آئل اور گلابی نمک۔", ar: "بوراتا كريمية مع طماطم ملونة وزيت الريحان وملح الهيمالايا الوردي." }
  },
  {
    id: "app-08", category: "appetizers", price: 1350, rating: 4.7, calories: 340, prepTime: "18 mins",

    name: { en: "Duck Confit Spring Rolls", ur: "ڈک کنفٹ اسپرنگ رولز", ar: "ربيان تمبورا بالزعفران" },
    description: { en: "Crispy spring rolls filled with slow-cooked duck confit, hoisin sauce, and pickled cucumber.", ur: "آہستہ پکے ڈک سے بھرے کرسپی اسپرنگ رولز، ہوسین ساس کے ساتھ۔", ar: "لفائف مقرمشة محشوة ببط الكونفيت مع صلصة الهويسن والخيار المخلل." }
  },

  // ─── MAIN COURSE ────────────────────────────────────────────────────────────
  {
    id: "main-01", category: "mains", price: 6800, rating: 5.0, calories: 780, prepTime: "25 mins",

    name: { en: "Royal A5 Wagyu Tenderloin", ur: "شاہی اے5 واگیو ٹینڈرلائن", ar: "شريحة لحم واغيو A5 الملكية" },
    description: { en: "Indulgent A5 Japanese Wagyu steak grilled to perfection, with wild mushroom demi-glace and gold flake butter.", ur: "بہترین جاپانی واگیو اسٹیک، مشروم گلیز اور سونے کے ورق والے مکھن کے ساتھ۔", ar: "شريحة لحم واغيو يابانية A5 مشوية بامتياز مع صلصة الفطر البري وزبدة رقائق الذهب." }
  },
  {
    id: "main-02", category: "mains", price: 3400, rating: 4.9, calories: 610, prepTime: "20 mins",

    name: { en: "Saffron Infused Lobster Thermidor", ur: "زعفران لابسٹر تھرمیڈور", ar: "لوبستر ثيرميدور بالزعفران" },
    description: { en: "Fresh lobster baked in creamy brandy sauce with Iranian saffron and melted Gruyere.", ur: "برانڈی ساس میں تازہ لابسٹر، ایرانی زعفران اور گریویر پنیر کے ساتھ۔", ar: "جراد البحر الطازج بصلصة البراندي والزعفران الإيراني وجبن الغرويير." }
  },
  {
    id: "main-03", category: "mains", price: 2800, rating: 4.8, calories: 690, prepTime: "22 mins",

    name: { en: "Rack of New Zealand Lamb", ur: "نیوزی لینڈ لیم ریک", ar: "رف لحم ضأن نيوزيلندي" },
    description: { en: "Herb-crusted rack of lamb with rosemary jus, dauphinoise potatoes, and charred asparagus.", ur: "جڑی بوٹیوں میں لپٹی لیم ریک، روزمیری جس اور داوفینوز آلو کے ساتھ۔", ar: "رف لحم الضأن المغطى بالأعشاب مع مرق الروزماري وبطاطا دوفينوز والهليون المحروق." }
  },
  {
    id: "main-04", category: "mains", price: 2200, rating: 4.7, calories: 580, prepTime: "18 mins",

    name: { en: "Pan Seared Chilean Sea Bass", ur: "چلی سی باس فش", ar: "سمكة باس تشيلي مقلية" },
    description: { en: "Buttery Chilean sea bass with lemon caper beurre blanc, wilted spinach, and crispy capers.", ur: "مکھن سے تیار چلی سی باس، لیموں کیپر ساس اور پالک کے ساتھ۔", ar: "باس البحر التشيلي الزبداني مع صلصة الليمون والكبر وسبانخ ذابل." }
  },
  {
    id: "main-05", category: "mains", price: 1950, rating: 4.6, calories: 520, prepTime: "15 mins",

    name: { en: "Roasted Duck Breast", ur: "روسٹڈ ڈک بریسٹ", ar: "صدر بطة مشوية" },
    description: { en: "Crispy-skinned duck breast with cherry port reduction, celeriac puree, and glazed baby carrots.", ur: "کرسپی ڈک بریسٹ، چیری پورٹ ریڈکشن اور سیلریاک پیوری کے ساتھ۔", ar: "صدر البطة المقرمش مع تخفيف البورت بالكرز وبيوريه الكرفس." }
  },
  {
    id: "main-06", category: "mains", price: 1650, rating: 4.5, calories: 480, prepTime: "14 mins",

    name: { en: "Beef Wellington Individual", ur: "بیف ویلنگٹن", ar: "بيف ويلينغتون فردي" },
    description: { en: "Individual beef Wellington with mushroom duxelles, prosciutto, and flaky puff pastry.", ur: "مشروم ڈکسیل اور پروشیوٹو کے ساتھ بیف ویلنگٹن۔", ar: "بيف ويلينغتون فردي مع دوكسيل الفطر والبروشوتو وعجين الباف المقرمش." }
  },

  // ─── DESSERTS ────────────────────────────────────────────────────────────────
  {
    id: "des-01", category: "desserts", price: 1650, rating: 4.9, calories: 450, prepTime: "10 mins",

    name: { en: "The Golden Lava Fondant", ur: "گولڈن لاوا فونڈنٹ", ar: "فوندان الحمم الذهبية" },
    description: { en: "Warm Belgian dark chocolate cake with a molten gold-dusted center, served with vanilla bean gelato.", ur: "گرم بیلجیئن چاکلیٹ کیک، سنہری مرکز اور ونیلا جیلاٹو کے ساتھ۔", ar: "كعكة الشوكولاتة البلجيكية الدافئة بقلب ذائب مع جيلاتو الفانيليا." }
  },
  {
    id: "des-02", category: "desserts", price: 1350, rating: 4.7, calories: 380, prepTime: "8 mins",

    name: { en: "Saffron Pistachio Kulfi Cheesecake", ur: "زعفرانی پستہ قلفی چیزکیک", ar: "تشيز كيك الكولفي بالفستق" },
    description: { en: "Fusion of rich New York cheesecake with aromatic saffron, cardamom, and roasted pistachios.", ur: "چیزکیک اور زعفران، الائچی اور پستے کا لاجواب امتزاج۔", ar: "مزيج تشيز كيك نيويورك مع الزعفران والهيل والفستق المحمص." }
  },
  {
    id: "des-03", category: "desserts", price: 1150, rating: 4.8, calories: 420, prepTime: "5 mins",

    name: { en: "Crème Brûlée Royale", ur: "کریم برولے رویال", ar: "كريم بروليه ملكي" },
    description: { en: "Classic vanilla crème brûlée with a perfectly caramelized sugar crust and fresh seasonal berries.", ur: "کلاسک ونیلا کریم برولے، کیریملائزڈ شوگر کرسٹ اور تازہ بیریز کے ساتھ۔", ar: "كريم بروليه الفانيليا الكلاسيكي بقشرة السكر المكرمل وفاكهة الغابة." }
  },
  {
    id: "des-04", category: "desserts", price: 980, rating: 4.6, calories: 360, prepTime: "8 mins",

    name: { en: "Mango Cardamom Panna Cotta", ur: "مینگو الائچی پنا کوٹا", ar: "بانا كوتا المانجو والهيل" },
    description: { en: "Silky Italian panna cotta infused with green cardamom, topped with Alphonso mango coulis.", ur: "ہری الائچی پنا کوٹا، الفونسو مینگو کولی کے ساتھ۔", ar: "بانا كوتا إيطالي حريري مع الهيل الأخضر وصلصة مانجو ألفونسو." }
  },
  {
    id: "des-05", category: "desserts", price: 1200, rating: 4.7, calories: 510, prepTime: "12 mins",

    name: { en: "Gulab Jamun Cheesecake", ur: "گلاب جامن چیزکیک", ar: "تشيز كيك الجلاب جامون" },
    description: { en: "Fusion dessert merging classic gulab jamun with New York cheesecake, rose water glaze on top.", ur: "گلاب جامن اور چیزکیک کا شاندار فیوژن، گلاب کے شربت کے ساتھ۔", ar: "حلوى مبتكرة تجمع الجلاب جامون مع تشيز كيك نيويورك وماء الورد." }
  },
  {
    id: "des-06", category: "desserts", price: 850, rating: 4.5, calories: 290, prepTime: "5 mins",

    name: { en: "Tiramisu al Limoncello", ur: "لیموں چیلو تیرامیسو", ar: "تيراميسو بالليمونشيلو" },
    description: { en: "Airy ladyfinger layers soaked in espresso and limoncello, dusted with Belgian cocoa powder.", ur: "ایسپریسو اور لیمنچیلو میں بھگوئے ہوئے لیڈی فنگر، بیلجیئن کوکو کے ساتھ۔", ar: "طبقات بسكويت ليدي فينغر مغموسة في الإسبريسو والليمونشيلو مع الكاكاو البلجيكي." }
  },
  {
    id: "des-07", category: "desserts", price: 1050, rating: 4.8, calories: 380, prepTime: "6 mins",

    name: { en: "Kheer Brulee", ur: "خیر برولے", ar: "خير بروليه" },
    description: { en: "Traditional Pakistani kheer elevated with a caramelized brûlée top, cardamom, and silver leaf.", ur: "روایتی خیر کو کریم برولے انداز میں پیش کیا گیا، الائچی اور چاندی کے ورق کے ساتھ۔", ar: "الخير الباكستاني التقليدي بقشرة كرملية وورق الفضة." }
  },
  {
    id: "des-08", category: "desserts", price: 780, rating: 4.4, calories: 310, prepTime: "5 mins",

    name: { en: "Baklava Tower", ur: "بقلاوہ ٹاور", ar: "برج البقلاوة" },
    description: { en: "Layers of crispy filo pastry with pistachios and walnuts, drenched in orange blossom honey.", ur: "پستے اور اخروٹ کے ساتھ کرسپی فیلو پیسٹری، شہد کے ساتھ۔", ar: "طبقات فيلو مقرمشة بالفستق والجوز مغموسة في عسل زهر البرتقال." }
  },

  // ─── BEVERAGES ────────────────────────────────────────────────────────────────
  {
    id: "bev-01", category: "beverages", price: 850, rating: 4.8, calories: 120, prepTime: "5 mins",

    name: { en: "Royal Mint Berry Elixir", ur: "شاہی منٹ بیری الیکسیر", ar: "إكسير النعناع والتوت الملكي" },
    description: { en: "Sparkling gold-dusted fresh forest berries, muddled organic mint, lime, and mineral water.", ur: "تازہ بیریز، پودینہ، لیموں اور منرل واٹر کا شاندار امتزاج۔", ar: "مزيج فوار بغبار الذهب من توت الغابة والنعناع العضوي." }
  },
  {
    id: "bev-02", category: "beverages", price: 950, rating: 4.9, calories: 180, prepTime: "7 mins",

    name: { en: "Golden Saffron Cardamom Latte", ur: "زعفرانی الائچی لیٹے", ar: "لاتيه الزعفران والهيل الذهبي" },
    description: { en: "Freshly pulled espresso with organic milk, crushed cardamom, pure saffron, and honey glaze.", ur: "تازہ ایسپریسو، الائچی، زعفران اور شہد کے ساتھ۔", ar: "إسبريسو طازج مع الهيل المطحون والزعفران النقي وعسل النحل." }
  },
  {
    id: "bev-03", category: "beverages", price: 650, rating: 4.6, calories: 90, prepTime: "5 mins",

    name: { en: "Rose Petal Lemonade", ur: "گلاب لیمونیڈ", ar: "ليموناضة بتلات الورد" },
    description: { en: "Fresh-squeezed lemonade infused with rose petals, strawberry, and sparkling water.", ur: "گلاب کی پتیوں، اسٹرابیری اور اسپارکلنگ واٹر کے ساتھ تازہ لیمونیڈ۔", ar: "ليموناضة طازجة منقوعة ببتلات الورد والفراولة والماء الفوار." }
  },
  {
    id: "bev-04", category: "beverages", price: 720, rating: 4.5, calories: 140, prepTime: "6 mins",

    name: { en: "Mango Lassi Royale", ur: "شاہی مینگو لسی", ar: "لاسي المانجو الملكي" },
    description: { en: "Thick mango lassi with Chaunsa mangoes, Greek yogurt, cardamom, and a saffron swirl.", ur: "چونسہ مینگو، گریک یوگرٹ، الائچی اور زعفران کے ساتھ گاڑھی لسی۔", ar: "لاسي مانجو كثيف بمانجو الشونصة واليوغرت اليوناني والهيل والزعفران." }
  },
  {
    id: "bev-05", category: "beverages", price: 580, rating: 4.4, calories: 80, prepTime: "4 mins",

    name: { en: "Iced Hibiscus Mint Tea", ur: "ہیبسکس منٹ آئسڈ ٹی", ar: "شاي الكركديه والنعناع المثلج" },
    description: { en: "Chilled hibiscus tea with fresh spearmint, lemon zest, and a touch of wildflower honey.", ur: "ٹھنڈی ہیبسکس چائے، پودینہ، لیموں کے چھلکے اور شہد کے ساتھ۔", ar: "شاي الكركديه البارد مع نعناع سبيرمينت وقشر الليمون وعسل زهور الحقل." }
  },
  {
    id: "bev-06", category: "beverages", price: 680, rating: 4.7, calories: 160, prepTime: "6 mins",

    name: { en: "Virgin Passion Mojito", ur: "پیشن موجیٹو", ar: "موهيتو الفاكهة العذراء" },
    description: { en: "Passion fruit, muddled mint, lime, brown sugar, and soda over crushed ice.", ur: "پیشن فروٹ، پودینہ، لیموں، براؤن شوگر اور سوڈا۔", ar: "فاكهة الباشن وعصير الليمون والسكر البني والصودا فوق ثلج مكسر." }
  },
  {
    id: "bev-07", category: "beverages", price: 1100, rating: 4.8, calories: 220, prepTime: "8 mins",

    name: { en: "Imperial Hot Chocolate", ur: "شاہی ہاٹ چاکلیٹ", ar: "الشوكولاتة الساخنة الإمبراطورية" },
    description: { en: "72% single-origin dark chocolate melted with steamed oat milk, topped with edible gold dust.", ur: "72% ڈارک چاکلیٹ، اوٹ ملک اور کھانے کے قابل سونے کے ذرات کے ساتھ۔", ar: "شوكولاتة داكنة 72% مع حليب الشوفان المبخر وغبار الذهب الصالح للأكل." }
  },
  {
    id: "bev-08", category: "beverages", price: 490, rating: 4.3, calories: 60, prepTime: "3 mins",

    name: { en: "Premium Kahwa Green Tea", ur: "پریمیم قہوہ", ar: "قهوة كهوا الخضراء الممتازة" },
    description: { en: "Authentic Kashmiri green tea with cardamom, cinnamon, almonds, and saffron.", ur: "کشمیری سبز چائے، الائچی، دارچینی، بادام اور زعفران کے ساتھ۔", ar: "شاي كشميري أخضر أصيل مع الهيل والقرفة واللوز والزعفران." }
  },

  // ─── PAKISTANI CLASSICS ──────────────────────────────────────────────────────
  {
    id: "pk-01", category: "pakistani", price: 2200, rating: 5.0, calories: 850, prepTime: "35 mins",

    name: { en: "Karahi Gosht (Mutton)", ur: "کڑاہی گوشت (مٹن)", ar: "كراهي لحم الغنم" },
    description: { en: "Tender mutton slow-cooked in a spiced tomato and ghee gravy in a traditional iron karahi.", ur: "لوہے کی کڑاہی میں مٹن، مصالحہ دار ٹماٹر اور گھی کی چٹنی میں آہستہ پکا ہوا۔", ar: "لحم الغنم الطري مطبوخ ببطء في صلصة الطماطم المتبلة والسمن في مقلاة حديدية." }
  },
  {
    id: "pk-02", category: "pakistani", price: 1950, rating: 4.9, calories: 780, prepTime: "30 mins",

    name: { en: "Nihari (Slow-Cooked Beef Shank)", ur: "نہاری (گائے کا شنک)", ar: "نيهاري - كاري عظام البقر البطيء" },
    description: { en: "Lahori-style nihari with melt-in-mouth beef shank, topped with ginger julienne, lemon, and green chili.", ur: "لاہوری نہاری، گائے کی شنک، ادرک، لیموں اور ہری مرچ کے ساتھ۔", ar: "نيهاري على الطريقة اللاهورية مع كاري عظام البقر الذائب والزنجبيل والليمون والفلفل الأخضر." }
  },
  {
    id: "pk-03", category: "pakistani", price: 1600, rating: 4.8, calories: 720, prepTime: "25 mins",

    name: { en: "Butter Chicken Masala", ur: "بٹر چکن مسالہ", ar: "مسالا دجاج بالزبدة" },
    description: { en: "Succulent chicken pieces in a rich, silky butter tomato sauce with fenugreek and cream.", ur: "رسیلے چکن کے ٹکڑے مکھن ٹماٹر ساس، میتھی اور کریم کے ساتھ۔", ar: "قطع دجاج طرية في صلصة الزبدة والطماطم الحريرية مع الحلبة والكريمة." }
  },
  {
    id: "pk-04", category: "pakistani", price: 1400, rating: 4.7, calories: 680, prepTime: "20 mins",

    name: { en: "Peshwari Chicken Tikka", ur: "پشاوری چکن ٹکہ", ar: "دجاج تكا البشاوري" },
    description: { en: "Peshwari-style marinated chicken chargrilled over live coals, served with raita and mint chutney.", ur: "پشاوری اسٹائل چکن ٹکہ، لائیو کوئلوں پر گرلڈ، رائتہ اور منٹ چٹنی کے ساتھ۔", ar: "دجاج تكا مارينيد على الطريقة البشاورية مشوي على الفحم مع الريتا والمنت تشاتني." }
  },
  {
    id: "pk-05", category: "pakistani", price: 1250, rating: 4.6, calories: 640, prepTime: "18 mins",

    name: { en: "Sindhi Curry Lamb Chops", ur: "سندھی کری لیم چاپس", ar: "لحم ضأن على طريقة السندي" },
    description: { en: "Bone-in lamb chops in aromatic Sindhi curry with dried kokum, coconut, and whole spices.", ur: "ہڈی کے ساتھ لیم چاپس، سندھی کری، کوکم اور ناریل کے ساتھ۔", ar: "قطع ضأن بالعظم في كاري سندهي عطري مع الجوز الهندي والتوابل الكاملة." }
  },
  {
    id: "pk-06", category: "pakistani", price: 1100, rating: 4.5, calories: 590, prepTime: "15 mins",

    name: { en: "Dal Makhani (Black Lentils)", ur: "دال مکھنی (کالی دال)", ar: "دال مخاني بالعدس الأسود" },
    description: { en: "Slow-cooked black lentils with tomato, cream, and generous amounts of golden butter.", ur: "آہستہ پکی کالی دال، ٹماٹر، کریم اور سنہری مکھن کے ساتھ۔", ar: "عدس أسود مطبوخ ببطء مع الطماطم والكريمة وكميات سخية من الزبدة الذهبية." }
  },
  {
    id: "pk-07", category: "pakistani", price: 950, rating: 4.4, calories: 520, prepTime: "12 mins",

    name: { en: "Haleem Royal", ur: "شاہی حلیم", ar: "حليم ملكي" },
    description: { en: "Royal slow-cooked wheat, lentil, and meat stew garnished with fried onion, ginger, and lemon.", ur: "شاہی حلیم، تلے ہوئے پیاز، ادرک اور لیموں کے ساتھ۔", ar: "حساء الحليم الملكي المطبوخ ببطء مع البصل المقلي والزنجبيل والليمون." }
  },
  {
    id: "pk-08", category: "pakistani", price: 880, rating: 4.3, calories: 480, prepTime: "10 mins",

    name: { en: "Palak Paneer", ur: "پالک پنیر", ar: "بالاك بانير" },
    description: { en: "Fresh farm paneer in a velvety spinach and spice sauce, finished with cream and ghee.", ur: "تازہ پنیر، پالک اور مصالحہ جات کی مخملی چٹنی، کریم اور گھی کے ساتھ۔", ar: "جبن البانير الطازج في صلصة السبانخ المخملية مع الكريمة والسمن." }
  },
  {
    id: "pk-09", category: "pakistani", price: 1750, rating: 4.8, calories: 730, prepTime: "28 mins",

    name: { en: "Lamb Rogan Josh", ur: "لیم روگن جوش", ar: "روجان جوش لحم الضأن" },
    description: { en: "Classic Kashmiri rogan josh with tender lamb, Kashmiri chili, and aromatic whole spices.", ur: "کشمیری روگن جوش، نرم گوشت، کشمیری مرچ اور خوشبودار مصالحہ جات۔", ar: "روجان جوش كشميري كلاسيكي بلحم ضأن طري وفلفل كشميري وتوابل كاملة." }
  },
  {
    id: "pk-10", category: "pakistani", price: 1350, rating: 4.7, calories: 660, prepTime: "22 mins",

    name: { en: "Saag Gosht (Meat & Greens)", ur: "ساگ گوشت", ar: "ساغ غوشت - اللحم مع الخضار الورقية" },
    description: { en: "Rustic Punjabi saag with slow-cooked mutton, mustard greens, and a dollop of white butter.", ur: "پنجابی ساگ، آہستہ پکا مٹن، سرسوں کا ساگ اور مکھن کے ساتھ۔", ar: "ساغ بنجابي بلحم غنم مطبوخ ببطء وأوراق الخردل وزبدة بيضاء." }
  },
  {
    id: "pk-11", category: "pakistani", price: 820, rating: 4.4, calories: 440, prepTime: "10 mins",

    name: { en: "Chicken Charga (Crispy Whole)", ur: "چکن چرغہ", ar: "دجاج تشارغا المقرمش" },
    description: { en: "Lahori crispy whole chicken marinated in yogurt and spices, deep fried until golden.", ur: "لاہوری چکن چرغہ، دہی اور مصالحہ میں میرینیٹ کیا اور سنہرا تلا ہوا۔", ar: "دجاج لاهوري مقرمش كامل متبل باللبن والتوابل ومقلي حتى يصبح ذهبياً." }
  },
  {
    id: "pk-12", category: "pakistani", price: 750, rating: 4.5, calories: 390, prepTime: "8 mins",

    name: { en: "Gola Kabab Platter", ur: "گولہ کباب پلیٹر", ar: "طبق كباب الغولا" },
    description: { en: "Succulent gola kababs made from hand-pounded mutton, skewered and char-grilled.", ur: "ہاتھ سے کوٹے ہوئے مٹن کے رسیلے گولہ کباب۔", ar: "كباب الغولا الطري من لحم الغنم المدقوق يدوياً ومشوي على الفحم." }
  },

  // ─── BBQ & GRILLS ────────────────────────────────────────────────────────────
  {
    id: "bbq-01", category: "bbq", price: 2800, rating: 5.0, calories: 900, prepTime: "30 mins",

    name: { en: "Imperial BBQ Mixed Grill Platter", ur: "شاہی مکسڈ گرل پلیٹر", ar: "طبق الشواء المشكل الإمبراطوري" },
    description: { en: "A royal platter of seekh kebabs, chicken tikka, boti, lamb chops, and shami kebabs.", ur: "سیخ کباب، چکن ٹکہ، بوٹی، لیم چاپس اور شامی کباب کا شاہی پلیٹر۔", ar: "طبق ملكي بالسيخ كباب وتكا الدجاج والبوتي وضلوع الضأن وشامي كباب." }
  },
  {
    id: "bbq-02", category: "bbq", price: 1800, rating: 4.9, calories: 720, prepTime: "25 mins",

    name: { en: "Lamb Chops on Coal", ur: "لیم چاپس آن کول", ar: "ضلوع ضأن على الفحم" },
    description: { en: "Fresh lamb rib chops marinated in mint, garlic, and yogurt, slow-grilled on charcoal.", ur: "پودینہ، لہسن اور دہی میں میرینیٹ لیم ریب چاپس، کوئلوں پر آہستہ گرل۔", ar: "ضلوع ضأن طازجة متبلة بالنعناع والثوم واللبن ومشوية ببطء على الفحم." }
  },
  {
    id: "bbq-03", category: "bbq", price: 1500, rating: 4.8, calories: 660, prepTime: "22 mins",

    name: { en: "Chicken Malai Boti", ur: "چکن ملائی بوٹی", ar: "دجاج ملائي بوتي" },
    description: { en: "Tender boneless chicken in cream, white pepper, and cardamom marinade, grilled over live fire.", ur: "کریم، سفید مرچ اور الائچی میں میرینیٹ بون لیس چکن، لائیو فائر پر گرل۔", ar: "دجاج بدون عظم طري في ماريناد الكريمة والفلفل الأبيض والهيل مشوي على نار حية." }
  },
  {
    id: "bbq-04", category: "bbq", price: 1350, rating: 4.7, calories: 590, prepTime: "20 mins",

    name: { en: "Seekh Kebab Gold", ur: "سیخ کباب گولڈ", ar: "سيخ كباب ذهبي" },
    description: { en: "Hand-minced spiced mutton on skewers, chargrilled to perfection with a golden crust.", ur: "ہاتھ سے قیمہ کیا ہوا مسالہ دار مٹن، سنہری پرت کے ساتھ کمال طریقے سے گرل۔", ar: "لحم غنم مفروم يدوياً على أسياخ مشوي بامتياز بقشرة ذهبية." }
  },
  {
    id: "bbq-05", category: "bbq", price: 1150, rating: 4.6, calories: 540, prepTime: "18 mins",

    name: { en: "Shami Kebab Signature", ur: "سگنیچر شامی کباب", ar: "شامي كباب مميز" },
    description: { en: "Silky-smooth shami kebabs made from lentils and tender minced lamb, pan-fried in ghee.", ur: "دال اور مٹن قیمے سے تیار مخملی شامی کباب، گھی میں فرائی کیے گئے۔", ar: "شامي كباب ناعم من العدس ولحم الغنم المفروم الطري مقلي في السمن." }
  },
  {
    id: "bbq-06", category: "bbq", price: 980, rating: 4.5, calories: 500, prepTime: "15 mins",

    name: { en: "Beef Boti Masala", ur: "بیف بوٹی مسالہ", ar: "مسالا لحم البقر بوتي" },
    description: { en: "Cubed beef marinated in green masala, skewered and grilled, served with naan and salad.", ur: "سبز مسالہ میں میرینیٹ بیف کے چھوٹے ٹکڑے، گرل کیے اور نان اور سلاد کے ساتھ پیش کیے گئے۔", ar: "مكعبات لحم بقري في ماريناد المسالا الأخضر على أسياخ وخبز النان." }
  },
  {
    id: "bbq-07", category: "bbq", price: 1600, rating: 4.8, calories: 680, prepTime: "25 mins",

    name: { en: "Smokey Beef Ribs", ur: "اسموکی بیف ریبز", ar: "ضلوع لحم البقر المدخن" },
    description: { en: "Slow-smoked beef ribs with house-made BBQ glaze, pickled jalapeños, and coleslaw.", ur: "آہستہ اسموکڈ بیف ریبز، ہاؤس میڈ BBQ گلیز اور کولسلا کے ساتھ۔", ar: "ضلوع بقري مدخنة ببطء مع صلصة الباربيكيو وكولسلو والخل الحار." }
  },
  {
    id: "bbq-08", category: "bbq", price: 1100, rating: 4.6, calories: 520, prepTime: "18 mins",

    name: { en: "Chicken Reshmi Kebab", ur: "چکن ریشمی کباب", ar: "دجاج ريشمي كباب" },
    description: { en: "Silky tender chicken kebabs bound with egg, cream, and cashew paste, grilled on open flame.", ur: "انڈے، کریم اور کاجو پیسٹ کے ساتھ نرم چکن کباب، کھلی آگ پر گرل۔", ar: "كباب دجاج حريري طري مع البيض والكريمة وعجينة الكاجو مشوي على نار مكشوفة." }
  },

  // ─── BIRYANI & RICE ──────────────────────────────────────────────────────────
  {
    id: "bir-01", category: "biryani", price: 2400, rating: 5.0, calories: 950, prepTime: "45 mins",

    name: { en: "Dum Mutton Biryani Royale", ur: "دم مٹن بریانی رویال", ar: "برياني الغنم الملكي على البخار" },
    description: { en: "Dum-cooked long-grain basmati with tender mutton, saffron milk, caramelized onions, and whole spices.", ur: "باسمتی چاول، نرم مٹن، زعفرانی دودھ، تلے پیاز اور مصالحہ جات کے ساتھ دم بریانی۔", ar: "أرز بسمتي مطهو بالبخار مع لحم الغنم الطري وحليب الزعفران والبصل الكراميلي." }
  },
  {
    id: "bir-02", category: "biryani", price: 1850, rating: 4.9, calories: 880, prepTime: "40 mins",

    name: { en: "Karachi-Style Chicken Biryani", ur: "کراچی چکن بریانی", ar: "برياني الدجاج على طريقة كراتشي" },
    description: { en: "Authentic Karachi masala biryani with bone-in chicken, star anise, plums, and potato.", ur: "مستند کراچی بریانی، چکن، بادیان، آلو بخارہ اور آلو کے ساتھ۔", ar: "برياني كراتشي الأصيل بالدجاج بالعظم والنجمة والبرقوق والبطاطا." }
  },
  {
    id: "bir-03", category: "biryani", price: 2100, rating: 4.8, calories: 920, prepTime: "42 mins",

    name: { en: "Hyderabadi Beef Biryani", ur: "حیدرآبادی بیف بریانی", ar: "برياني لحم البقر الحيدرآبادي" },
    description: { en: "Hyderabadi-style beef biryani cooked with kachche gosht (raw meat) dum method for max tenderness.", ur: "حیدرآبادی اسٹائل بیف بریانی، کچے گوشت ڈم طریقے سے پکی۔", ar: "برياني لحم بقري حيدرآبادي بطريقة الكاتشا غوشت لأقصى نعومة." }
  },
  {
    id: "bir-04", category: "biryani", price: 1450, rating: 4.7, calories: 780, prepTime: "35 mins",

    name: { en: "Prawn Biryani Supreme", ur: "جھینگا بریانی سپریم", ar: "برياني الروبيان الممتاز" },
    description: { en: "Fresh tiger prawns in rich coconut-infused biryani rice with curry leaves and whole pepper.", ur: "تازہ بڑے جھینگے، ناریل بریانی چاول، کری پتہ اور مکمل مرچ کے ساتھ۔", ar: "روبيان طازج في أرز برياني بجوز الهند وأوراق الكاري والفلفل الكامل." }
  },
  {
    id: "bir-05", category: "biryani", price: 1200, rating: 4.6, calories: 720, prepTime: "30 mins",

    name: { en: "Vegetable Nawabi Biryani", ur: "نوابی سبزی بریانی", ar: "برياني الخضار النوابي" },
    description: { en: "Mixed vegetable biryani infused with rose water, kewra essence, and layers of aromatic basmati.", ur: "مکس سبزی بریانی، گلاب جل، کیوڑے اور خوشبودار باسمتی کے ساتھ۔", ar: "برياني خضار مشكل مع ماء الورد وعصارة الكيورة وطبقات الأرز البسمتي." }
  },
  {
    id: "bir-06", category: "biryani", price: 1650, rating: 4.7, calories: 810, prepTime: "38 mins",

    name: { en: "Lamb Pulao Peshawar", ur: "پشاور پلاؤ", ar: "بلو لحم الضأن البشاوري" },
    description: { en: "Classic Peshwari pulao with tender lamb stock rice, raisins, carrots, and crispy fried onions.", ur: "پشاوری پلاؤ، نرم گوشت کے اسٹاک میں چاول، کشمش، گاجر اور تلے پیاز کے ساتھ۔", ar: "بلو بشاوري كلاسيكي بأرز مرق الضأن والزبيب والجزر والبصل المقلي." }
  },
  {
    id: "bir-07", category: "biryani", price: 950, rating: 4.5, calories: 650, prepTime: "25 mins",

    name: { en: "Kabuli Palaw", ur: "کابلی پلاؤ", ar: "كابلي بلاو" },
    description: { en: "Afghan-style slow-cooked rice with lamb shanks, carrots, raisins, and toasted almonds.", ur: "افغانی اسٹائل چاول، لیم شنک، گاجر، کشمش اور بادام کے ساتھ۔", ar: "أرز مطبوخ ببطء على الطريقة الأفغانية مع ساق الضأن والجزر والزبيب واللوز." }
  },
  {
    id: "bir-08", category: "biryani", price: 1300, rating: 4.6, calories: 760, prepTime: "32 mins",

    name: { en: "Sindhi Biryani", ur: "سندھی بریانی", ar: "برياني سندهي" },
    description: { en: "Tangy Sindhi biryani with potatoes, tomatoes, yogurt, and aromatic whole spices.", ur: "ترش سندھی بریانی، آلو، ٹماٹر، دہی اور خوشبودار مصالحہ جات کے ساتھ۔", ar: "برياني سندهي حامض بالبطاطا والطماطم واللبن والتوابل الكاملة." }
  },

  // ─── SOUPS & BROTHS ─────────────────────────────────────────────────────────
  {
    id: "soup-01", category: "soups", price: 950, rating: 4.8, calories: 280, prepTime: "8 mins",

    name: { en: "Saffron Lamb Paya Broth", ur: "زعفران لیم پایا شوربہ", ar: "مرق پاية الضأن بالزعفران" },
    description: { en: "Rich collagen paya broth slow-simmered overnight with saffron, ginger, and whole black pepper.", ur: "رات بھر آہستہ ابالا ہوا پایا، زعفران، ادرک اور کالی مرچ کے ساتھ۔", ar: "مرق الپاية الغني بالكولاجين المغلي طوال الليل مع الزعفران والزنجبيل والفلفل الأسود." }
  },
  {
    id: "soup-02", category: "soups", price: 780, rating: 4.7, calories: 220, prepTime: "7 mins",

    name: { en: "Roasted Tomato Bisque", ur: "روسٹڈ ٹماٹر بسک", ar: "بيسك الطماطم المحمص" },
    description: { en: "Fire-roasted heirloom tomatoes blended with cream, basil oil, and aged Parmigiano Reggiano.", ur: "آگ پر بھنے ٹماٹر، کریم، تلسی آئل اور پارمیجانو ریجانو کے ساتھ۔", ar: "طماطم محمصة على النار ممزوجة بالكريمة وزيت الريحان وجبن بارميجانو." }
  },
  {
    id: "soup-03", category: "soups", price: 850, rating: 4.6, calories: 310, prepTime: "10 mins",

    name: { en: "Chicken Corn Egg Drop Soup", ur: "چکن کارن ایگ ڈراپ سوپ", ar: "حساء الدجاج بالذرة وقطرات البيض" },
    description: { en: "Silky chicken and sweet corn soup with egg ribbons, sesame oil, and spring onion garnish.", ur: "مخملی چکن اور مکئی کا سوپ، انڈے کی ربن، تل کے تیل اور ہرے پیاز کے ساتھ۔", ar: "حساء دجاج وذرة حريري مع شرائط البيض وزيت السمسم والبصل الأخضر." }
  },
  {
    id: "soup-04", category: "soups", price: 1100, rating: 4.8, calories: 340, prepTime: "12 mins",

    name: { en: "French Onion Soup Gratinée", ur: "فرنچ آنین سوپ گریٹینی", ar: "حساء البصل الفرنسي المُشوَّاة" },
    description: { en: "Caramelized onion broth with crusty sourdough crouton and molten Gruyere cheese gratin.", ur: "کیریملائزڈ پیاز شوربہ، ساوردو کروٹن اور پگھلا ہوا گریویر پنیر کے ساتھ۔", ar: "مرق البصل الكراميلي مع خبز محمص وجبن الغرويير المنصهر المشوي." }
  },
  {
    id: "soup-05", category: "soups", price: 720, rating: 4.5, calories: 200, prepTime: "6 mins",

    name: { en: "Mulligatawny Spiced Broth", ur: "ملیگٹاونی مسالہ دار شوربہ", ar: "مرق ملیغاتاوني متبل" },
    description: { en: "Spiced Anglo-Indian lentil soup with coconut milk, apple, and fragrant curry leaf oil.", ur: "اینگلو انڈین مسالہ دار دال کا سوپ، ناریل کے دودھ، سیب اور کری پتے کے تیل کے ساتھ۔", ar: "حساء العدس الهندي البريطاني المتبل بحليب الجوز الهندي والتفاح وزيت أوراق الكاري." }
  },
  {
    id: "soup-06", category: "soups", price: 680, rating: 4.4, calories: 180, prepTime: "5 mins",

    name: { en: "Hot & Sour Noodle Soup", ur: "ہاٹ اینڈ سور نوڈل سوپ", ar: "حساء النودلز الحار والحامض" },
    description: { en: "Spicy and tangy broth with rice noodles, mushrooms, bamboo shoots, and tofu.", ur: "مسالہ دار ترش شوربہ، چاول کے نوڈل، مشروم، بانبو شوٹس اور توفو کے ساتھ۔", ar: "مرق حار وحامض مع شعرية الأرز والفطر وبراعم الخيزران والتوفو." }
  },

  // ─── SALADS ──────────────────────────────────────────────────────────────────
  {
    id: "sal-01", category: "salads", price: 950, rating: 4.7, calories: 260, prepTime: "8 mins",

    name: { en: "Caesar Royale", ur: "سیزر رویال", ar: "سلطة سيزر ملكية" },
    description: { en: "Romaine hearts, house-made anchovy Caesar dressing, Parmigiano shavings, and gold-croutons.", ur: "رومین لیٹس، خانے کا سیزر ڈریسنگ، پارمیجانو اور سنہرے کروٹنز۔", ar: "قلوب الخس الروماني مع تتبيل سيزر المنزلي وجبن بارميجانو وكروتونات ذهبية." }
  },
  {
    id: "sal-02", category: "salads", price: 850, rating: 4.6, calories: 220, prepTime: "7 mins",

    name: { en: "Watermelon Feta Mint Salad", ur: "تربوز فیٹا منٹ سلاد", ar: "سلطة البطيخ والجبن الفيتا والنعناع" },
    description: { en: "Chilled watermelon, crumbled feta, fresh mint, basil, and a lemon-honey vinaigrette.", ur: "ٹھنڈا تربوز، فیٹا، تازہ پودینہ، تلسی اور لیموں شہد ویناگریٹ۔", ar: "بطيخ بارد وفيتا مفتتة ونعناع طازج وريحان وخل الليمون والعسل." }
  },
  {
    id: "sal-03", category: "salads", price: 1100, rating: 4.8, calories: 310, prepTime: "10 mins",

    name: { en: "Quinoa Pomegranate Power Salad", ur: "کوئنوا انار پاور سلاد", ar: "سلطة الكينوا والرمان الغذائية" },
    description: { en: "Protein-rich quinoa with pomegranate, avocado, toasted almonds, and tahini lemon dressing.", ur: "پروٹین سے بھرپور کوئنوا، انار، ایواکاڈو، بادام اور طحینہ لیموں ڈریسنگ۔", ar: "كينوا غنية بالبروتين مع الرمان والأفوكادو واللوز المحمص وتتبيل الطحينة والليمون." }
  },
  {
    id: "sal-04", category: "salads", price: 780, rating: 4.5, calories: 190, prepTime: "6 mins",

    name: { en: "Rocket & Truffle Salad", ur: "راکٹ ٹرفل سلاد", ar: "سلطة الجرجير والكمأ" },
    description: { en: "Peppery rocket leaves, shaved Parmesan, cherry tomatoes, and generous truffle oil drizzle.", ur: "تیز جرجیر، پارمیسان، چیری ٹماٹر اور ٹرفل آئل کا چھڑکاؤ۔", ar: "أوراق جرجير حارة وبارميزان مبشور وطماطم كرزية ورذاذ زيت الكمأ." }
  },
  {
    id: "sal-05", category: "salads", price: 920, rating: 4.6, calories: 280, prepTime: "8 mins",

    name: { en: "Niçoise Salad Grand", ur: "نیکوسی گرینڈ سلاد", ar: "سلطة نيكواز الكبيرة" },
    description: { en: "Tuna, green beans, boiled eggs, olives, tomato, and anchovy dressing on lettuce beds.", ur: "ٹونا، گرین بینز، انڈے، زیتون، ٹماٹر اور اینکوی ڈریسنگ۔", ar: "تونة وفاصوليا خضراء وبيض مسلوق وزيتون وطماطم وتتبيل الأنشوجة." }
  },

  // ─── BREADS ──────────────────────────────────────────────────────────────────
  {
    id: "bread-01", category: "breads", price: 350, rating: 4.9, calories: 210, prepTime: "8 mins",

    name: { en: "Peshwari Naan (Stuffed)", ur: "پشاوری نان (بھرا ہوا)", ar: "نان البشاوري المحشو" },
    description: { en: "Soft naan stuffed with coconut, almonds, sultanas, and honey, baked in a clay tandoor.", ur: "ناریل، بادام، کشمش اور شہد سے بھرا نرم نان، مٹی کے تندور میں پکا ہوا۔", ar: "نان طري محشو بجوز الهند واللوز والسلطانة والعسل مخبوز في تنور طيني." }
  },
  {
    id: "bread-02", category: "breads", price: 280, rating: 4.8, calories: 190, prepTime: "7 mins",

    name: { en: "Butter Garlic Cheese Naan", ur: "بٹر گارلک چیز نان", ar: "نان بالثوم والجبن والزبدة" },
    description: { en: "Fresh naan brushed with herb-garlic butter and melted mozzarella, served hot from the tandoor.", ur: "تازہ نان، لہسن مکھن اور پگھلی موزاریلا کے ساتھ، تندور سے گرم۔", ar: "نان طازج بالزبدة بالثوم والموزاريلا المذابة من التنور." }
  },
  {
    id: "bread-03", category: "breads", price: 220, rating: 4.7, calories: 170, prepTime: "6 mins",

    name: { en: "Sheermal (Sweet Saffron Bread)", ur: "شیرمال", ar: "شيرمال - الخبز الحلو بالزعفران" },
    description: { en: "Traditional Lucknowi sheermal flavored with saffron, milk, and pure desi ghee.", ur: "لکھنوی شیرمال، زعفران، دودھ اور خالص دیسی گھی کے ساتھ۔", ar: "شيرمال لكنوي تقليدي بنكهة الزعفران والحليب والسمن الخالص." }
  },
  {
    id: "bread-04", category: "breads", price: 180, rating: 4.6, calories: 150, prepTime: "5 mins",

    name: { en: "Rogni Naan", ur: "روغنی نان", ar: "روغني نان" },
    description: { en: "Glazed naan brushed with egg wash and sesame seeds, baked till golden in the tandoor.", ur: "انڈے اور تل سے گلیزڈ نان، تندور میں سنہری ہونے تک پکا۔", ar: "نان مطلي ببيض السمسم مخبوز حتى يصبح ذهبياً في التنور." }
  },
  {
    id: "bread-05", category: "breads", price: 150, rating: 4.5, calories: 130, prepTime: "4 mins",

    name: { en: "Tandoori Roti", ur: "تندوری روٹی", ar: "خبز الطندوري" },
    description: { en: "Whole wheat roti baked directly on the clay walls of the tandoor, brushed with ghee.", ur: "گندم کی روٹی تندور کی مٹی کی دیواروں پر براہ راست پکی، گھی کے ساتھ۔", ar: "خبز القمح الكامل مخبوز مباشرة على جدران تنور الطين مع السمن." }
  },
  {
    id: "bread-06", category: "breads", price: 320, rating: 4.7, calories: 240, prepTime: "8 mins",

    name: { en: "Paratha Basket (Layered)", ur: "پراٹھا باسکٹ (پرتدار)", ar: "سلة خبز البراتها المطبق" },
    description: { en: "Flaky multi-layered paratha made with pure ghee, served with white butter and pickle.", ur: "خالص گھی سے بنا پرتدار پراٹھا، سفید مکھن اور اچار کے ساتھ۔", ar: "براتها متعدد الطبقات مصنوع من السمن الخالص مع الزبدة البيضاء والمخلل." }
  },

  // ─── SEAFOOD ────────────────────────────────────────────────────────────────
  {
    id: "sea-01", category: "seafood", price: 3200, rating: 4.9, calories: 580, prepTime: "20 mins",

    name: { en: "Grilled King Prawns", ur: "گرلڈ کنگ جھینگے", ar: "روبيان ملكي مشوي" },
    description: { en: "XL tiger king prawns marinated in garlic herb butter, chargrilled and served with lemon cream.", ur: "XL ٹائیگر جھینگے، لہسن مکھن میں میرینیٹ، کول پر گرل اور لیموں کریم کے ساتھ۔", ar: "روبيان ملكي XL في زبدة الثوم والأعشاب مشوي وتقديم مع الكريمة والليمون." }
  },
  {
    id: "sea-02", category: "seafood", price: 2600, rating: 4.8, calories: 490, prepTime: "18 mins",

    name: { en: "Karahi Fish (Pomfret)", ur: "کڑاہی مچھلی (پومفریٹ)", ar: "كراهي سمك البومفريت" },
    description: { en: "Whole pomfret cooked in a traditional iron karahi with masala, tomatoes, and green chili.", ur: "لوہے کی کڑاہی میں مکمل پومفریٹ، مسالہ، ٹماٹر اور ہری مرچ کے ساتھ۔", ar: "بومفريت كامل مطبوخ في مقلاة حديدية بالمسالا والطماطم والفلفل الأخضر." }
  },
  {
    id: "sea-03", category: "seafood", price: 1800, rating: 4.7, calories: 420, prepTime: "15 mins",

    name: { en: "Tawa Fish Tikka", ur: "توا مچھلی ٹکہ", ar: "سمك تكا على الطاوة" },
    description: { en: "Boneless fish marinated in red masala, pan-grilled on a cast iron tawa until charred.", ur: "بون لیس مچھلی، سرخ مسالہ میں میرینیٹ، کاسٹ آئرن تاوے پر چار تک گرل۔", ar: "سمك بدون عظم متبل بالمسالا الأحمر مشوي على طاوة الحديد الزهر حتى يتفحم." }
  },
  {
    id: "sea-04", category: "seafood", price: 2200, rating: 4.8, calories: 540, prepTime: "18 mins",

    name: { en: "Butter Garlic Crab", ur: "بٹر گارلک کیکڑا", ar: "سرطان البحر بالثوم والزبدة" },
    description: { en: "Fresh whole mud crab stir-fried in aromatic garlic butter sauce with spring onions.", ur: "تازہ کیکڑا لہسن مکھن ساس میں فرائی، ہرے پیاز کے ساتھ۔", ar: "سرطان طين طازج كامل مقلي بصلصة زبدة الثوم العطرية والبصل الأخضر." }
  },
  {
    id: "sea-05", category: "seafood", price: 1600, rating: 4.6, calories: 390, prepTime: "14 mins",

    name: { en: "Masala Grilled Calamari", ur: "مسالہ گرلڈ کالامیری", ar: "حبار مسالا مشوي" },
    description: { en: "Tender calamari tubes marinated in spiced yogurt, grilled and drizzled with green chutney.", ur: "دہی مسالہ میں میرینیٹ کالامیری، گرل کر کے ہری چٹنی کے ساتھ۔", ar: "حبار طري متبل باللبن والتوابل مشوي مع صلصة الكزبرة الخضراء." }
  },
  {
    id: "sea-06", category: "seafood", price: 1400, rating: 4.5, calories: 360, prepTime: "12 mins",

    name: { en: "Prawn Dynamite Bake", ur: "جھینگا ڈائنامائٹ بیک", ar: "ديناميت الروبيان المخبوز" },
    description: { en: "Baked prawns in a spicy mayo dynamite sauce, topped with crispy fried onions and scallions.", ur: "مسالہ دار مایو ساس میں پکے جھینگے، تلے پیاز اور ہرے پیاز کے ساتھ۔", ar: "روبيان مخبوز في صلصة مايونيز ديناميت حار مع البصل المقلي والكراث." }
  },

  // ─── PASTA ──────────────────────────────────────────────────────────────────
  {
    id: "pas-01", category: "pasta", price: 1600, rating: 4.8, calories: 620, prepTime: "18 mins",

    name: { en: "Lobster Tagliatelle", ur: "لابسٹر ٹگلیٹیلی", ar: "تالياتيلي اللوبستر" },
    description: { en: "Fresh egg tagliatelle with lobster bisque cream sauce, cherry tomatoes, and fresh tarragon.", ur: "تازہ انڈے کی ٹگلیٹیلی، لابسٹر بسک کریم ساس، چیری ٹماٹر اور تیراگن کے ساتھ۔", ar: "تالياتيلي بيض طازج مع صلصة بيسك اللوبستر الكريمية وطماطم كرزية وتاراغون طازج." }
  },
  {
    id: "pas-02", category: "pasta", price: 1350, rating: 4.7, calories: 560, prepTime: "15 mins",

    name: { en: "Truffle Parmesan Pappardelle", ur: "ٹرفل پارمیسان پاپرڈیلی", ar: "بابارديلي التروفل والبارميزان" },
    description: { en: "Wide egg ribbon pasta in a rich black truffle cream sauce with aged Parmesan and fresh thyme.", ur: "چوڑی انڈے کی پیسٹا، بلیک ٹرفل کریم ساس اور پرانے پارمیسان کے ساتھ۔", ar: "باستا بيض واسعة في صلصة الكمأ الأسود الكريمية مع بارميزان معتق وزعتر طازج." }
  },
  {
    id: "pas-03", category: "pasta", price: 1200, rating: 4.6, calories: 520, prepTime: "14 mins",

    name: { en: "Spaghetti Bolognese Gold", ur: "اسپاگیٹی بولونیز گولڈ", ar: "إسباغيتي بولونيز ذهبي" },
    description: { en: "Slow-cooked beef and pork ragu, San Marzano tomatoes, and aged Parmigiano Reggiano.", ur: "آہستہ پکا بیف اور پورک راگو، سان مارزانو ٹماٹر اور پارمیجانو ریجانو کے ساتھ۔", ar: "راغو لحم بقري ولحم خنزير مطبوخ ببطء مع طماطم سان مارزانو وبارميجانو." }
  },
  {
    id: "pas-04", category: "pasta", price: 1100, rating: 4.5, calories: 480, prepTime: "12 mins",

    name: { en: "Prawn Aglio e Olio", ur: "جھینگا آگلیو اولیو", ar: "روبيان أليو إي أوليو" },
    description: { en: "Al dente spaghetti sautéed with tiger prawns, garlic, red chili, and extra-virgin olive oil.", ur: "التے اسپاگیٹی، ٹائیگر جھینگے، لہسن، لال مرچ اور زیتون تیل کے ساتھ۔", ar: "إسباغيتي مسلوق مع روبيان وثوم وفلفل أحمر وزيت زيتون بكر ممتاز." }
  },
  {
    id: "pas-05", category: "pasta", price: 950, rating: 4.4, calories: 440, prepTime: "10 mins",

    name: { en: "Vegetable Pesto Fusilli", ur: "ویجیٹیبل پیسٹو فیوسیلی", ar: "فوسيلي الخضار بالبيستو" },
    description: { en: "Spiral fusilli with house-made basil pesto, grilled courgette, blistered cherry tomatoes, and pine nuts.", ur: "ہاؤس میڈ پیسٹو، گرلڈ زچینی اور چیری ٹماٹر کے ساتھ فیوسیلی۔", ar: "فوسيلي حلزوني مع بيستو الريحان المنزلي والكوسا المشوية وطماطم كرزية وصنوبر." }
  },

  // ─── KIDS MENU ──────────────────────────────────────────────────────────────
  {
    id: "kid-01", category: "kids", price: 680, rating: 4.8, calories: 380, prepTime: "10 mins",

    name: { en: "Mini Chicken Sliders", ur: "منی چکن سلائیڈرز", ar: "سلايدر دجاج صغير" },
    description: { en: "Three soft brioche mini buns with crispy fried chicken, mild sauce, and pickled cucumbers.", ur: "تین نرم بریوش بن، کرسپی چکن، ہلکی ساس اور اچار بھری کھیرے کے ساتھ۔", ar: "ثلاثة أرغفة بريوش صغيرة مع دجاج مقلي ومقرمش وصلصة خفيفة وخيار مخلل." }
  },
  {
    id: "kid-02", category: "kids", price: 580, rating: 4.7, calories: 310, prepTime: "8 mins",

    name: { en: "Chocolate Dipping Fondue", ur: "چاکلیٹ ڈپنگ فونڈو", ar: "فوندو الشوكولاتة للتغميس" },
    description: { en: "Warm Belgian milk chocolate fondue pot with marshmallows, strawberries, and pretzel sticks.", ur: "گرم بیلجیئن ملک چاکلیٹ فونڈو، مارشملو، اسٹرابیری اور پریٹزل کے ساتھ۔", ar: "وعاء فوندو شوكولاتة بلجيكية دافئة مع مارشميلو وفراولة وعصي البريتزل." }
  },
  {
    id: "kid-03", category: "kids", price: 520, rating: 4.6, calories: 290, prepTime: "6 mins",

    name: { en: "Mac & Cheese Royale", ur: "میک اینڈ چیز رویال", ar: "ماكرونة بالجبن الملكية" },
    description: { en: "Creamy macaroni in a four-cheese sauce (cheddar, mozzarella, Gruyere, cream cheese) topped with breadcrumbs.", ur: "چار پنیر ساس میں میکرونی، بریڈ کرمبز کے ساتھ۔", ar: "ماكروني كريمي في صلصة أربعة أجبان مع فتات الخبز المقرمش." }
  },
  {
    id: "kid-04", category: "kids", price: 450, rating: 4.5, calories: 260, prepTime: "5 mins",

    name: { en: "Rainbow Fruit Mocktail", ur: "رین بو فروٹ موکٹیل", ar: "موكتيل فاكهة قوس قزح" },
    description: { en: "Layered colorful fruit mocktail with mango, strawberry, kiwi, and coconut water.", ur: "مینگو، اسٹرابیری، کیوی اور ناریل پانی کا رنگ برنگا موکٹیل۔", ar: "موكتيل فاكهة ملون متعدد الطبقات بالمانجو والفراولة والكيوي وماء جوز الهند." }
  },
  {
    id: "kid-05", category: "kids", price: 490, rating: 4.7, calories: 220, prepTime: "4 mins",

    name: { en: "Ice Cream Sundae Supreme", ur: "آئس کریم سنڈے سپریم", ar: "صندي آيس كريم ممتاز" },
    description: { en: "Three scoops of premium ice cream (chocolate, vanilla, strawberry) with hot fudge and sprinkles.", ur: "تین اسکوپ پریمیم آئس کریم، گرم فج اور اسپرنکلز کے ساتھ۔", ar: "ثلاث سكوبات آيس كريم فاخرة مع صوص الشوكولاتة الساخنة والمزخرفات الملونة." }
  },

  // ─── SEASONAL SPECIALS ───────────────────────────────────────────────────────
  {
    id: "sp-01", category: "specials", price: 4500, rating: 5.0, calories: 1100, prepTime: "50 mins",

    name: { en: "The Golden Feast Tasting Menu", ur: "گولڈن فیسٹ ٹیسٹنگ مینیو", ar: "قائمة التذوق من جولدن فيست" },
    description: { en: "An imperial 5-course tasting experience: amuse bouche, cold appetizer, hot starter, signature main, and dessert.", ur: "شاہی 5 کورس: آموز بوش، ٹھنڈا اسٹارٹر، گرم اسٹارٹر، سگنیچر مین اور ڈیزرٹ۔", ar: "تجربة تذوق فاخرة 5 أطباق: أموز بوش ومقبل بارد وساخن وطبق رئيسي وحلوى." }
  },
  {
    id: "sp-02", category: "specials", price: 3200, rating: 4.9, calories: 920, prepTime: "40 mins",

    name: { en: "Whole Roasted Lamb Leg (Dum)", ur: "مکمل دم روسٹڈ لیم لیگ", ar: "فخذة ضأن كاملة مشوية بالبخار" },
    description: { en: "Whole lamb leg marinated in 18 spices, slow-roasted in a sealed clay pot for 8 hours.", ur: "18 مصالحوں میں میرینیٹ، 8 گھنٹے مٹی کے بند برتن میں آہستہ روسٹ کیا گیا لیم لیگ۔", ar: "فخذة ضأن كاملة متبلة بـ 18 توابل ومحمصة ببطء في إناء طيني مغلق لـ 8 ساعات." }
  },
  {
    id: "sp-03", category: "specials", price: 2900, rating: 4.8, calories: 860, prepTime: "35 mins",

    name: { en: "Mandi Camel Hump Platter", ur: "مندی اونٹ ہمپ پلیٹر", ar: "مندي سنام الجمل" },
    description: { en: "Traditional Arabian mandi-style smoked camel hump slow-cooked over wood fire, served with rice.", ur: "روایتی عربی مندی اسٹائل اونٹ کا کوہان، لکڑی کی آگ پر دھوئیں میں پکا، چاول کے ساتھ۔", ar: "سنام الجمل المدخن بالطريقة العربية التقليدية مطبوخ ببطء على نار الخشب مع الأرز." }
  },
  {
    id: "sp-04", category: "specials", price: 1800, rating: 4.7, calories: 780, prepTime: "30 mins",

    name: { en: "Eid Special Mutton Shoulder Roast", ur: "عید اسپیشل مٹن شولڈر روسٹ", ar: "طبق عيد مميز - كتف الغنم المشوي" },
    description: { en: "Bone-in mutton shoulder roasted on live charcoal, with raita, mint salad, and naan.", ur: "ہڈی کے ساتھ مٹن شولڈر، لائیو کوئلوں پر روسٹ، رائتہ، پودینہ سلاد اور نان کے ساتھ۔", ar: "كتف غنم بالعظم محمص على الفحم الحي مع الريتا وسلطة النعناع والنان." }
  },
  {
    id: "sp-05", category: "specials", price: 2400, rating: 4.9, calories: 950, prepTime: "45 mins",

    name: { en: "Ramadan Iftar Grand Box", ur: "رمضان افطار گرینڈ باکس", ar: "صندوق إفطار رمضان الكبير" },
    description: { en: "Complete Ramadan iftar: dates, harira soup, samosas, biryani, haleem, desserts, and rooh afza.", ur: "مکمل رمضان افطار: کھجور، حریرہ، سموسے، بریانی، حلیم، میٹھا اور روح افزاء۔", ar: "إفطار رمضان كامل: تمور وحريرة وسموسة وبرياني وحليم وحلويات وروح افزاء." }
  },
  {
    id: "sp-06", category: "specials", price: 1600, rating: 4.6, calories: 720, prepTime: "25 mins",

    name: { en: "Independence Day BBQ Feast", ur: "آزادی یوم BBQ فیسٹ", ar: "مهرجان الباربيكيو في يوم الاستقلال" },
    description: { en: "Special 14 August platter with tikkas, kebabs, and green-white decorated presentation.", ur: "14 اگست کا خاص پلیٹر، ٹکے، کباب اور سبز سفید سجاوٹ کے ساتھ۔", ar: "طبق 14 أغسطس الخاص بالتكا والكباب مع تقديم بالأخضر والأبيض." }
  },
  {
    id: "sp-07", category: "specials", price: 3800, rating: 5.0, calories: 1050, prepTime: "60 mins",

    name: { en: "Zarb (Bedouin Sand Roast)", ur: "ذرب (صحرائی ریت روسٹ)", ar: "الزرب - الشواء البدوي في الرمل" },
    description: { en: "Authentic Bedouin zarb of whole lamb and chicken, roasted underground in a sand pit with aromatics.", ur: "مستند بیدوین ذرب، مکمل لیم اور چکن، خوشبودار مصالحوں کے ساتھ ریت کے گڑھے میں روسٹ۔", ar: "زرب بدوي أصيل للغنم الكامل والدجاج محمص تحت الأرض في حفرة رملية مع التوابل العطرية." }
  },

  // ─── BIRYANI COLLECTION ──────────────────────────────────────────────────────
  {
    id: "byr-01", category: "biryani", price: 2400, rating: 4.9, calories: 920, prepTime: "35 mins",

    name: { en: "Hyderabadi Royal Biryani", ur: "حیدرآبادی شاہی بریانی", ar: "برياني حيدرآباد الملكي" },
    description: { en: "Authentic Hyderabadi dum biryani with mutton, long-grain basmati, saffron, and mint.", ur: "اصل حیدرآبادی ڈم بریانی، لمبے دانے والے چاول، زعفران اور پودینہ کے ساتھ۔", ar: "برياني حيدرآبادي أصيل مع لحم الغنم والأرز طويل الحبة والزعفران والنعناع." }
  },
  {
    id: "byr-02", category: "biryani", price: 2100, rating: 4.8, calories: 880, prepTime: "32 mins",

    name: { en: "Kolkata Chicken Biryani", ur: "کولکاتا چکن بریانی", ar: "برياني دجاج كالكوتا" },
    description: { en: "Kolkata-style dum pukht biryani with boneless chicken, potatoes, and egg.", ur: "کولکاتا اسٹائل ڈم پخت بریانی، بون لیس چکن، آلو اور انڈے کے ساتھ۔", ar: "برياني كالكوتا مع دجاج بدون عظم وبطاطا وبيضة مطبوخة بالبخار." }
  },
  {
    id: "byr-03", category: "biryani", price: 1850, rating: 4.7, calories: 820, prepTime: "30 mins",

    name: { en: "Lucknowi Biryani", ur: "لکھنوی بریانی", ar: "برياني لكناوي" },
    description: { en: "Delicate Lucknowi dum biryani with tender chicken, yogurt marinade, and aromatic rice.", ur: "نازک لکھنوی بریانی، نرم چکن، دہی میری‌نیڈ اور خوشبودار چاول۔", ar: "برياني لكناوي رقيق مع دجاج طري وماريناد الزبادي والأرز العطري." }
  },
  {
    id: "byr-04", category: "biryani", price: 2700, rating: 4.9, calories: 950, prepTime: "40 mins",

    name: { en: "Karachi Beef Biryani", ur: "کراچی گوشت بریانی", ar: "برياني لحم كراتشي" },
    description: { en: "Karachi-style beef biryani with tender beef, potatoes, crispy layers, and golden ghee.", ur: "کراچی اسٹائل بیف بریانی، نرم گوشت، آلو، کرسپی پرتیں اور سنہری گھی کے ساتھ۔", ar: "برياني لحم البقر على طريقة كراتشي مع لحم طري وبطاطا وطبقات مقرمشة وسمن ذهبي." }
  },
  {
    id: "byr-05", category: "biryani", price: 2900, rating: 4.9, calories: 880, prepTime: "38 mins",

    name: { en: "Royal Seafood Biryani", ur: "شاہی سی فوڈ بریانی", ar: "برياني المأكولات البحرية الملكية" },
    description: { en: "Premium biryani with king prawns, scallops, and mussels in saffron-infused basmati.", ur: "انتہائی نفیس بریانی، جھینگے، اسکالپس اور مسلز، زعفران والے چاول میں۔", ar: "برياني فاخر مع روبيان ملكي وبلح البحر في أرز بسمتي بالزعفران." }
  },

  // ─── PASTA COLLECTION ────────────────────────────────────────────────────────
  {
    id: "pas-01", category: "pasta", price: 1450, rating: 4.7, calories: 680, prepTime: "15 mins",

    name: { en: "Black Truffle Fettuccine", ur: "بلیک ٹرفل فیٹوچینی", ar: "فيتوتشيني الكمأة السوداء" },
    description: { en: "Fresh fettuccine tossed in truffle cream sauce, parmesan, and black truffles.", ur: "تازہ فیٹوچینی، ٹرفل کریم ساس، پارمیسان اور بلیک ٹرفل کے ساتھ۔", ar: "فيتوتشيني طازجة بصلصة الكمأة السوداء والكريمة والبارميزان." }
  },
  {
    id: "pas-02", category: "pasta", price: 1300, rating: 4.6, calories: 620, prepTime: "13 mins",

    name: { en: "Saffron Seafood Linguine", ur: "زعفران سی فوڈ لنگوینی", ar: "لينجويني المأكولات البحرية بالزعفران" },
    description: { en: "Linguine with saffron cream, king prawns, clams, and white wine reduction.", ur: "لنگوینی، زعفران کریم، جھینگے، کلیمز اور وائٹ وائن ریڈکشن کے ساتھ۔", ar: "لينجويني بصلصة الزعفران والكريمة والروبيان والمحار وتخفيف النبيذ الأبيض." }
  },
  {
    id: "pas-03", category: "pasta", price: 1550, rating: 4.8, calories: 720, prepTime: "16 mins",

    name: { en: "Pappardelle Al Cinghiale", ur: "پپردیلی ال چنگھیالی", ar: "بابارديل بلحم الخنزير البري" },
    description: { en: "Wide ribbon pasta with wild boar ragù, tomato, and Italian herbs.", ur: "چوڑے ریبن پاسٹا، وائلڈ بوار ریگو، ٹماٹر اور اطالوی جڑی بوٹیوں کے ساتھ۔", ar: "باستا شريط عريضة برجو لحم الخنزير البري والطماطم والأعشاب الإيطالية." }
  },

  // ─── KIDS MENU ───────────────────────────────────────────────────────────────
  {
    id: "kid-01", category: "kids", price: 450, rating: 4.9, calories: 380, prepTime: "8 mins",

    name: { en: "Crispy Chicken Nuggets", ur: "کرسپی چکن ناگٹس", ar: "قطع الدجاج المقرمشة" },
    description: { en: "Golden crispy chicken nuggets with sweet and sour sauce, fries, and coleslaw.", ur: "سنہرے کرسپی چکن ناگٹس، میٹھے ترش ساس، فریز اور کول سلاو کے ساتھ۔", ar: "قطع دجاج مقرمشة ذهبية مع صلصة حلوة وحامضة والبطاطا والملفوف." }
  },
  {
    id: "kid-02", category: "kids", price: 380, rating: 4.8, calories: 320, prepTime: "6 mins",

    name: { en: "Spaghetti Cheese", ur: "اسپیگیٹی چیز", ar: "اسباغيتي بالجبن" },
    description: { en: "Soft spaghetti in mild tomato sauce with melted mozzarella and parmesan.", ur: "نرم اسپیگیٹی، معتدل ٹماٹر ساس، پگھلی موزاریلا اور پارمیسان کے ساتھ۔", ar: "اسباغيتي طرية بصلصة طماطم خفيفة وموزاريلا مذابة وبارميزان." }
  },
  {
    id: "kid-03", category: "kids", price: 420, rating: 4.7, calories: 350, prepTime: "7 mins",

    name: { en: "Mini Pizza Margherita", ur: "منی پزا مارگریتا", ar: "بيتزا صغيرة مارغريتا" },
    description: { en: "Small margherita pizza with fresh mozzarella, basil, and tomato on thin crust.", ur: "چھوٹا پزا، تازہ موزاریلا، تلسی اور ٹماٹر، پتلے کرسٹ پر۔", ar: "بيتزا صغيرة بموزاريلا طازجة وريحان وطماطم على عجينة رقيقة." }
  },
  {
    id: "kid-04", category: "kids", price: 380, rating: 4.6, calories: 300, prepTime: "5 mins",

    name: { en: "Fish Fingers Delight", ur: "فش فنگرز ڈیلائٹ", ar: "أصابع السمك اللذيذة" },
    description: { en: "Crispy battered fish fingers with tartar sauce, fries, and peas.", ur: "بیٹر شدہ فش فنگرز، ٹارٹر ساس، فریز اور مٹر کے ساتھ۔", ar: "أصابع سمك مقرمشة بصلصة تارتار والبطاطا والبازلاء." }
  },

  // ─── MORE APPETIZERS ─────────────────────────────────────────────────────────
  {
    id: "app-09", category: "appetizers", price: 1500, rating: 4.8, calories: 290, prepTime: "14 mins",

    name: { en: "Pan-Seared Foie Gras Canapés", ur: "پین سیئرڈ فوا گرا کیناپیز", ar: "كنابيه الكبد الفوا غرا" },
    description: { en: "Crispy bread with pan-seared foie gras, fig jam, and truffle shavings.", ur: "کرسپی بریڈ، فوا گرا، انجیر جام اور ٹرفل شیونگز کے ساتھ۔", ar: "خبز مقرمش مع كبد الفوا غرا ومربى التين وتقطيع الكمأة." }
  },
  {
    id: "app-10", category: "appetizers", price: 1400, rating: 4.7, calories: 260, prepTime: "12 mins",

    name: { en: "Crispy Calamari Rings", ur: "کرسپی کیلامری رنگز", ar: "حلقات الكالماري المقرمشة" },
    description: { en: "Golden fried squid rings with lemon aioli, served with fresh parsley.", ur: "سنہرے تلے کالامری رنگز، لیموں ایولی کے ساتھ، تازہ اجمودا سے سجے۔", ar: "حلقات الكالماري المقلية الذهبية مع صلصة الليمون والبقدونس الطازج." }
  },
  {
    id: "app-11", category: "appetizers", price: 1200, rating: 4.6, calories: 240, prepTime: "10 mins",

    name: { en: "Scallop Crudo", ur: "سکالپ کروڈو", ar: "سكوب كروديو" },
    description: { en: "Fresh raw scallops with yuzu citrus, micro greens, and olive oil emulsion.", ur: "تازہ کچے سکالپس، یوزو لیموں، مائیکروگرینز اور آئل ایموشن کے ساتھ۔", ar: "إسكالوب طازج نيء مع يوزو والخضروات الصغيرة وإيمولسيون زيت الزيتون." }
  },

  // ─── MORE MAIN COURSES ────────────────────────────────────────────────────────
  {
    id: "main-07", category: "mains", price: 3200, rating: 4.9, calories: 620, prepTime: "24 mins",

    name: { en: "Saffron Risotto with Wild Mushrooms", ur: "زعفران رزوتو مشروم کے ساتھ", ar: "ريسوتو الزعفران بالفطر البري" },
    description: { en: "Creamy Italian risotto infused with saffron, wild mushrooms, and truffle oil.", ur: "کریمی اطالوی رزوتو، زعفران، جنگلی مشروم اور ٹرفل آئل کے ساتھ۔", ar: "ريسوتو إيطالي كريمي بالزعفران والفطر البري وزيت الكمأة." }
  },
  {
    id: "main-08", category: "mains", price: 2400, rating: 4.8, calories: 540, prepTime: "20 mins",

    name: { en: "Tandoori Spiced Venison", ur: "تندوری مرال گوشت", ar: "لحم الغزال بالتوابل الهندية" },
    description: { en: "Rare venison steak marinated in tandoori spices, grilled, with berry coulis.", ur: "نایاب مرال گوشت، تندوری مصالحہ میں میرینیٹ، بیری کولیس کے ساتھ۔", ar: "شريحة لحم غزال نادرة متبلة بتوابل الهندي مع صلصة التوت." }
  },

  // ─── MORE DESSERTS ───────────────────────────────────────────────────────────
  {
    id: "des-09", category: "desserts", price: 1450, rating: 4.8, calories: 420, prepTime: "12 mins",

    name: { en: "Chocolate Lava Dome", ur: "چاکلیٹ لاوا ڈوم", ar: "قبة الحمم الشوكولاتية" },
    description: { en: "Molten chocolate dome with dark chocolate mousse and vanilla ice cream.", ur: "پگھلتی چاکلیٹ ڈوم، ڈارک چاکلیٹ موس اور ونیلا آئسکریم کے ساتھ۔", ar: "قبة شوكولاتة ذائبة مع موس شوكولاتة داكنة وآيس كريم الفانيليا." }
  },
  {
    id: "des-10", category: "desserts", price: 1100, rating: 4.7, calories: 360, prepTime: "8 mins",

    name: { en: "Mango Cheesecake Sphere", ur: "مینگو چیزکیک سفیئر", ar: "كرة تشيز كيك المانجو" },
    description: { en: "Spherified mango cheesecake with passion fruit coulis and edible flowers.", ur: "مینگو چیزکیک، پیشن فروٹ کولیس اور کھانے کے قابل پھول کے ساتھ۔", ar: "تشيز كيك مانجو مع صلصة فاكهة الباشن والزهور الصالحة للأكل." }
  },
  {
    id: "des-11", category: "desserts", price: 1300, rating: 4.9, calories: 480, prepTime: "15 mins",

    name: { en: "Rose & Pistachio Macarons", ur: "گلاب پستہ میکارونس", ar: "ماكاروني الورد والفستق" },
    description: { en: "French macarons with rose filling and pistachio cream, dusted with gold.", ur: "فرینچ میکاروں، گلاب فلنگ، پستہ کریم اور سونے کے ذرات سے سجے۔", ar: "ماكاروني فرنسي بحشوة الورد وكريمة الفستق وغبار الذهب." }
  },

  // ─── MORE BEVERAGES ──────────────────────────────────────────────────────────
  {
    id: "bev-09", category: "beverages", price: 1200, rating: 4.8, calories: 250, prepTime: "10 mins",

    name: { en: "Matcha White Chocolate Latte", ur: "میچہ وائٹ چاکلیٹ لیٹے", ar: "لاتيه شاي الماتشا بالشوكولاتة البيضاء" },
    description: { en: "Frothed matcha tea with white chocolate, topped with matcha powder and gold leaf.", ur: "میچہ چائے، سفید چاکلیٹ، میچہ پاؤڈر اور سونے کے ورق سے سجی۔", ar: "شاي ماتشا مع الشوكولاتة البيضاء مغطاة بمسحوق الماتشا وورق الذهب." }
  },
  {
    id: "bev-10", category: "beverages", price: 920, rating: 4.7, calories: 140, prepTime: "8 mins",

    name: { en: "Pomegranate Ginger Cooler", ur: "انار ادرک کولر", ar: "مبرد الرمان والزنجبيل" },
    description: { en: "Fresh pomegranate juice with fresh ginger, lemon, and sparkling water.", ur: "تازہ انار کا جوس، ادرک، لیموں اور اسپارکلنگ واٹر کے ساتھ۔", ar: "عصير الرمان الطازج مع الزنجبيل الطازج والليمون والماء الفوار." }
  },
];

export const branchesData = [
  {
    id: "branch-isb",
    nameKey: "islamabad",
    phone: "+92 51 543 2100",
    hours: "12:00 PM - 12:00 AM",
    address: {
      en: "Block A, Blue Area, Islamabad, Pakistan",
      ur: "بلاک اے، بلیو ایریا، اسلام آباد، پاکستان",
      ar: "بلوك A، بلو أريا، إسلام آباد، باكستان"
    },
    lat: 33.7294,
    lng: 73.0697,
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3319.4674751475713!2d73.0697!3d33.7294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf9df1f4df4f%3A0xe541c499879796e9!2sBlue%20Area%2C%20Islamabad!5e0!3m2!1sen!2spk!4v1680000000000!5m2!1sen!2spk",
    locationImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format"
  },
  {
    id: "branch-wah",
    nameKey: "wahCantt",
    phone: "+92 51 490 1234",
    hours: "12:00 PM - 11:00 PM",
    address: {
      en: "GT Road Near Anwar Chowk, Wah Cantt, Punjab, Pakistan",
      ur: "جی ٹی روڈ نزد انور چوک، واہ کینٹ، پنجاب، پاکستان",
      ar: "طريق جي تي، بالقرب من أنور شوك، واه كانت، البنجاب، باكستان"
    },
    lat: 33.7744,
    lng: 72.7175,
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3317.0674751475713!2d72.7175!3d33.7744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa2dfdfdfdfdf%3A0xe541c499879796e9!2sWah%20Cantt%2C%20Rawalpindi%2C%20Punjab!5e0!3m2!1sen!2spk!4v1680000000001!5m2!1sen!2spk",
    locationImage: "https://images.unsplash.com/photo-1604914212300-5f1b5c1eae4b?w=800&q=80&auto=format"
  }
];

export const blogPosts = [
  {
    id: "post-01",
    date: "May 20, 2026",
    code: "IMPERIAL20",
    name: {
      en: "The Secret to Sourcing A5 Japanese Wagyu",
      ur: "اے5 جاپانی واگیو حاصل کرنے کا راز",
      ar: "سر الحصول على لحم الواغيو الياباني A5"
    },
    excerpt: {
      en: "An exclusive look behind the scenes at how our Master Chef sources and inspects every cut from Kagoshima, Japan.",
      ur: "ایک خصوصی نظر کہ کس طرح ہمارے ماسٹر شیف کاگوشیما، جاپان سے بہترین گوشت کا انتخاب کرتے ہیں۔",
      ar: "نظرة حصرية خلف الكواليس حول كيفية اختيار رئيس الطهاة لدينا لكل قطعة لحم من كاغوشيما باليابان."
    },
    content: {
      en: "Our culinary philosophy centers on pure excellence. We travel directly to Kagoshima to procure marbling score 12 beef. Enjoy 20% off our Wagyu selection with promo code IMPERIAL20.",
      ur: "ہمارا فلسفہ بہترین ذائقہ ہے۔ واگیو پر 20% رعایت کے لیے پرومو کوڈ IMPERIAL20 استعمال کریں۔",
      ar: "فلسفتنا التميز الخالص. استمتع بخصم 20% على اختيارنا من لحم الواغيو باستخدام الرمز IMPERIAL20."
    }
  },
  {
    id: "post-02",
    date: "May 15, 2026",
    code: "GOLDMEDAL",
    name: {
      en: "Sufi Qawwali Night: A Feast for the Soul",
      ur: "صوفی قوالی نائٹ: روح کی غذا",
      ar: "ليلة قوالي الصوفية: غذاء الروح"
    },
    excerpt: {
      en: "Join us for an enchanting night of Sufi music paired with a custom 5-course imperial buffet at our Islamabad estate.",
      ur: "ہماری اسلام آباد برانچ میں صوفی موسیقی اور 5 کورسز پر مشتمل شاہی بوفے کا لطف اٹھائیں۔",
      ar: "انضم إلينا في ليلة ساحرة من الموسيقى الصوفية مع بوفيه إمبراطوري من 5 أطباق في فرع إسلام آباد."
    },
    content: {
      en: "The Golden Feast believes dining is an art. Next Saturday, we host renowned Qawwals performing live under the stars. Use promo code GOLDMEDAL for early bird perks.",
      ur: "اگلے ہفتہ صوفی قوالی نائٹ کا اہتمام۔ ارلی برڈ فوائد کے لیے GOLDMEDAL استعمال کریں۔",
      ar: "السبت القادم نستضيف قوالي مشهورين تحت النجوم. استخدم الرمز GOLDMEDAL للمزايا المبكرة."
    }
  }
];

export const faqsData = [
  {
    question: {
      en: "Do you offer home delivery in Islamabad and Wah Cantt?",
      ur: "کیا آپ اسلام آباد اور واہ کینٹ میں ہوم ڈیلیوری پیش کرتے ہیں؟",
      ar: "هل تقدمون خدمة التوصيل للمنازل في إسلام آباد وواه كانت؟"
    },
    answer: {
      en: "Yes, we offer premium valet home delivery within a 15km radius of both branches. Orders are packed in thermal containers and tracked in real-time.",
      ur: "جی ہاں، دونوں برانچوں کے 15 کلومیٹر دائرے میں ڈیلیوری۔ تھرمل کنٹینرز میں پیک کر کے لائیو ٹریک کیا جاتا ہے۔",
      ar: "نعم، نقدم خدمة التوصيل الفاخر في نصف قطر 15 كم من كلا الفرعين بتتبع فوري."
    }
  },
  {
    question: {
      en: "How does the Loyalty Program work?",
      ur: "وفاداری پروگرام کیسے کام کرتا ہے؟",
      ar: "كيف يعمل برنامج الولاء؟"
    },
    answer: {
      en: "Every Rs. 100 spent earns 10 loyalty points. Bronze (0-500), Silver (501-1500), Gold (1501+). Redeem points at checkout for direct discounts.",
      ur: "ہر 100 روپے پر 10 پوائنٹس۔ برانز (0-500)، سلور (501-1500)، گولڈ (1501+)۔",
      ar: "كل 100 روبية تمنحك 10 نقاط. البرونزي (0-500)، الفضي (501-1500)، الذهبي (1501+)."
    }
  },
  {
    question: {
      en: "Can I book a private room for events?",
      ur: "کیا تقریبات کے لیے پرائیویٹ روم بک ہو سکتا ہے؟",
      ar: "هل يمكنني حجز غرفة خاصة للفعاليات؟"
    },
    answer: {
      en: "Absolutely. Both branches feature luxury VIP private rooms for business meetings, birthdays, and anniversaries. Select 'Imperial VIP Room' in reservations.",
      ur: "جی بالکل۔ دونوں برانچوں میں وی آئی پی پرائیویٹ رومز دستیاب ہیں۔",
      ar: "بالتأكيد. يتوفر في كلا الفرعين غرف كبار الشخصيات لاجتماعات الأعمال وأعياد الميلاد والذكرى السنوية."
    }
  },
  {
    question: {
      en: "Do you cater to large events and weddings?",
      ur: "کیا بڑی تقریبات اور شادیوں کے لیے کیٹرنگ ملتی ہے؟",
      ar: "هل تقدمون خدمات تقديم الطعام للفعاليات الكبيرة والأعراس؟"
    },
    answer: {
      en: "Yes! We offer full catering packages for weddings, corporate events, and family gatherings. Contact us for customized menus and pricing.",
      ur: "جی ہاں۔ شادیوں، کارپوریٹ ایونٹس اور خاندانی تقریبات کے لیے مکمل کیٹرنگ پیکج دستیاب ہیں۔",
      ar: "نعم! نقدم باقات كاملة للأعراس والفعاليات المؤسسية والتجمعات العائلية. اتصل بنا للقوائم المخصصة."
    }
  },
  {
    question: {
      en: "Are there vegetarian and vegan options?",
      ur: "کیا سبزی خور اور ویگن آپشنز بھی ہیں؟",
      ar: "هل توجد خيارات نباتية وخالية من المنتجات الحيوانية؟"
    },
    answer: {
      en: "Absolutely. We offer a dedicated vegetarian menu including Palak Paneer, Dal Makhani, Vegetable Biryani, and several vegan salad and pasta options.",
      ur: "جی ہاں۔ پالک پنیر، دال مکھنی، سبزی بریانی اور کئی ویگن سلاد اور پاسٹا آپشنز دستیاب ہیں۔",
      ar: "بالتأكيد. نقدم قائمة نباتية مخصصة تشمل البالاك بانير ودال مخاني وبرياني الخضار وخيارات سلطة وباستا نباتية."
    }
  }
];

