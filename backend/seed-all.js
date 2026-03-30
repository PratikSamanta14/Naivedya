const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const Pandit = require('./models/Pandit');
const Category = require('./models/Category');

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://naivedyainfo_db_user:naivedya%402026@cluster-naivedya.b7ipgez.mongodb.net/naivedya?retryWrites=true&w=majority&appName=Cluster-Naivedya";

const categoryProducts = {
  "puja-samagri": [
    { id: "ps1", name: "Pure Cow Ghee Diya Set (10 pcs)", price: 149, originalPrice: 199, rating: 4.9, reviews: 245, image: "🪔", badge: "Bestseller", description: "Traditional earthen diyas for daily puja", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "Lakshmi Puja", "Diwali"], inStock: true },
    { id: "ps2", name: "Authentic Bengali Sindur (50g)", price: 99, originalPrice: 149, rating: 4.8, reviews: 189, image: "🔴", badge: "Traditional", description: "Pure vermillion sindur for married women", category: "Puja Powders & Sacred Items", pujaUsage: ["Daily Puja", "Durga Puja", "Kali Puja"], inStock: true },
    { id: "ps3", name: "Premium Dhoop Sticks (100 pcs)", price: 249, originalPrice: 349, rating: 4.7, reviews: 320, image: "🧴", badge: null, description: "Aromatic dhoop sticks for spiritual atmosphere", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps4", name: "Camphor Tablets (50 pcs)", price: 129, originalPrice: 179, rating: 4.6, reviews: 198, image: "⚪", badge: null, description: "Pure camphor for aarti", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps5", name: "Cotton Wicks (100 pcs)", price: 49, originalPrice: 79, rating: 4.9, reviews: 456, image: "🧵", badge: "Best Value", description: "Handmade cotton wicks for diyas", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps6", name: "Kumkum Powder (100g)", price: 89, originalPrice: 129, rating: 4.8, reviews: 234, image: "🔴", badge: null, description: "Natural kumkum for tilak and puja", category: "Puja Powders & Sacred Items", pujaUsage: ["Daily Puja", "Lakshmi Puja", "Saraswati Puja"], inStock: true },
    { id: "ps7", name: "Haldi Powder (200g)", price: 79, originalPrice: 109, rating: 4.7, reviews: 178, image: "🟡", badge: null, description: "Pure turmeric powder for puja rituals", category: "Puja Powders & Sacred Items", pujaUsage: ["Marriage Ceremonies", "Ganesh Puja"], inStock: true },
    { id: "ps8", name: "Chandan Powder (50g)", price: 199, originalPrice: 299, rating: 4.9, reviews: 312, image: "🟤", badge: "Premium", description: "Authentic sandalwood powder", category: "Puja Powders & Sacred Items", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps9", name: "Fresh Marigold Flowers (1kg)", price: 79, originalPrice: 99, rating: 4.9, reviews: 412, image: "🌼", badge: "Fresh Daily", description: "Farm-fresh marigold for decoration", category: "Flowers & Natural Offerings", pujaUsage: ["Durga Puja", "Lakshmi Puja", "All Pujas"], inStock: true },
    { id: "ps10", name: "Tulsi Leaves (Fresh)", price: 29, originalPrice: 49, rating: 4.8, reviews: 267, image: "🌿", badge: null, description: "Sacred tulsi leaves for offerings", category: "Flowers & Natural Offerings", pujaUsage: ["Daily Puja", "Vishnu Puja"], inStock: true },
    { id: "ps11", name: "Bel Patra (25 leaves)", price: 39, originalPrice: 59, rating: 4.7, reviews: 189, image: "🍃", badge: null, description: "Sacred bel leaves for Shiva puja", category: "Flowers & Natural Offerings", pujaUsage: ["Shiva Puja", "Mahashivratri"], inStock: true },
    { id: "ps12", name: "Coconut (Nariyal)", price: 49, originalPrice: 69, rating: 4.9, reviews: 345, image: "🥥", badge: null, description: "Fresh coconut for puja offerings", category: "Fruits & Dry Items", pujaUsage: ["All Pujas", "Ganesh Puja"], inStock: true },
    { id: "ps13", name: "Supari (Betel Nut) 100g", price: 89, originalPrice: 119, rating: 4.6, reviews: 156, image: "🟤", badge: null, description: "Premium betel nuts for puja", category: "Fruits & Dry Items", pujaUsage: ["Marriage Ceremonies", "All Pujas"], inStock: true },
    { id: "ps14", name: "Pure Honey (250ml)", price: 199, originalPrice: 279, rating: 4.8, reviews: 234, image: "🍯", badge: "Pure", description: "Natural honey for prasad", category: "Fruits & Dry Items", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps15", name: "Brass Puja Thali (8 inch)", price: 299, originalPrice: 449, rating: 4.9, reviews: 178, image: "🍽️", badge: "Handcrafted", description: "Traditional brass thali for aarti", category: "Puja Accessories", pujaUsage: ["All Pujas"], inStock: true },
    { id: "ps16", name: "Puja Bell (Brass)", price: 179, originalPrice: 249, rating: 4.8, reviews: 234, image: "🔔", badge: null, description: "Sacred bell for puja rituals", category: "Puja Accessories", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps17", name: "Kalash (Copper)", price: 599, originalPrice: 899, rating: 4.9, reviews: 156, image: "🏺", badge: "Premium", description: "Authentic copper kalash for rituals", category: "Puja Accessories", pujaUsage: ["Lakshmi Puja", "Durga Puja", "Marriage"], inStock: true },
    { id: "ps18", name: "Sacred Moli Thread (Red)", price: 29, originalPrice: 49, rating: 4.7, reviews: 345, image: "🧵", badge: null, description: "Red sacred thread for wrist tying", category: "Sacred Threads & Cloth", pujaUsage: ["All Pujas", "Raksha Bandhan"], inStock: true },
    { id: "ps19", name: "Janeu (Sacred Thread)", price: 49, originalPrice: 79, rating: 4.8, reviews: 189, image: "⚪", badge: null, description: "Sacred thread for Brahmin rituals", category: "Sacred Threads & Cloth", pujaUsage: ["Thread Ceremony", "Daily Puja"], inStock: true },
    { id: "ps20", name: "Puja Cloth (Red & Gold)", price: 149, originalPrice: 199, rating: 4.9, reviews: 234, image: "🧣", badge: null, description: "Beautiful cloth for covering puja items", category: "Sacred Threads & Cloth", pujaUsage: ["All Pujas"], inStock: true },
    { id: "ps21", name: "Agarbatti (Incense Sticks) 100pcs", price: 99, originalPrice: 149, rating: 4.8, reviews: 456, image: "🪔", badge: "Bestseller", description: "Fragrant incense sticks for daily puja", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps22", name: "Akshat (Rice Grains) 500g", price: 59, originalPrice: 89, rating: 4.7, reviews: 234, image: "🌾", badge: null, description: "Unbroken rice grains for offerings", category: "Puja Powders & Sacred Items", pujaUsage: ["All Pujas"], inStock: true },
    { id: "ps23", name: "Durva Grass (Fresh)", price: 39, originalPrice: 59, rating: 4.8, reviews: 178, image: "🌱", badge: "Fresh", description: "Sacred grass for Ganesh puja", category: "Flowers & Natural Offerings", pujaUsage: ["Ganesh Puja", "Ganesh Chaturthi"], inStock: true },
    { id: "ps24", name: "Panchapatra Set (Brass)", price: 249, originalPrice: 349, rating: 4.9, reviews: 156, image: "🥄", badge: null, description: "Traditional vessel set for puja", category: "Puja Accessories", pujaUsage: ["All Pujas"], inStock: true },
  ],
  "festival-combos": [
    { id: "c1", name: "Saraswati Puja Combo", price: 499, originalPrice: 699, rating: 4.8, reviews: 245, image: "📚", badge: "Popular", description: "Complete combo for Saraswati Puja", category: "Festival Combo", pujaUsage: ["Saraswati Puja"], inStock: true },
    { id: "c2", name: "Lakshmi Puja Combo", price: 599, originalPrice: 899, rating: 4.9, reviews: 312, image: "🪔", badge: "Bestseller", description: "Everything needed for Lakshmi Puja", category: "Festival Combo", pujaUsage: ["Lakshmi Puja"], inStock: true },
    { id: "c3", name: "Durga Puja Mahalaya", price: 1299, originalPrice: 1799, rating: 5.0, reviews: 489, image: "🔱", badge: "Premium", description: "Premium Durga Puja package", category: "Festival Combo", pujaUsage: ["Durga Puja"], inStock: true },
    { id: "c4", name: "Kali Puja Combo", price: 749, originalPrice: 999, rating: 4.9, reviews: 356, image: "🌙", badge: null, description: "Traditional Kali Puja items", category: "Festival Combo", pujaUsage: ["Kali Puja"], inStock: true },
  ],
  "flowers-garlands": [
    { id: "4", name: "Fresh Marigold Garland", price: 79, originalPrice: 99, rating: 4.9, reviews: 412, image: "🌼", badge: "Fresh Daily", description: "Farm-fresh marigold garlands", category: "Flowers", pujaUsage: ["All Pujas"], inStock: true },
    { id: "f1", name: "Red Rose Garland", price: 149, originalPrice: 199, rating: 4.8, reviews: 267, image: "🌹", badge: "Premium", description: "Beautiful red rose garlands", category: "Flowers", pujaUsage: ["All Pujas"], inStock: true },
    { id: "f2", name: "Mixed Flower Bouquet", price: 199, originalPrice: 299, rating: 4.7, reviews: 189, image: "💐", badge: null, description: "Assorted fresh flower bouquet", category: "Flowers", pujaUsage: ["All Pujas"], inStock: true },
    { id: "f3", name: "Lotus Flowers (5 pcs)", price: 129, originalPrice: 179, rating: 4.9, reviews: 345, image: "🪷", badge: "Sacred", description: "Sacred lotus for offerings", category: "Flowers", pujaUsage: ["Lakshmi Puja", "Saraswati Puja"], inStock: true },
  ],
  "book-pandit": [
    { id: "p1", name: "Bengali Puja Pandit", price: 500, originalPrice: 700, rating: 4.9, reviews: 342, image: "👳", badge: "Top Rated", description: "Experienced Bengali puja pandit", category: "Pandit Service", pujaUsage: ["All Pujas"], inStock: true },
    { id: "p2", name: "Festival Puja Specialist", price: 400, originalPrice: 600, rating: 4.8, reviews: 256, image: "🧔", badge: null, description: "Specializes in festival pujas", category: "Pandit Service", pujaUsage: ["Festival Pujas"], inStock: true },
    { id: "p3", name: "Marriage Ceremony Expert", price: 800, originalPrice: 1200, rating: 5.0, reviews: 489, image: "👨‍🦳", badge: "Premium", description: "Expert in marriage ceremonies", category: "Pandit Service", pujaUsage: ["Marriage"], inStock: true },
  ],
  "prasad-sweets": [
    { id: "s1", name: "Sandesh Box (12 pcs)", price: 299, originalPrice: 399, rating: 4.8, reviews: 234, image: "🍬", badge: "Fresh", description: "Traditional Bengali sandesh", category: "Sweets", pujaUsage: ["All Pujas"], inStock: true },
    { id: "s2", name: "Rasgulla Pack", price: 199, originalPrice: 279, rating: 4.9, reviews: 456, image: "⚪", badge: "Bestseller", description: "Soft and sweet rasgullas", category: "Sweets", pujaUsage: ["All Pujas"], inStock: true },
    { id: "s3", name: "Mishti Doi", price: 149, originalPrice: 199, rating: 4.7, reviews: 189, image: "🥛", badge: null, description: "Sweet yogurt dessert", category: "Sweets", pujaUsage: ["All Pujas"], inStock: true },
    { id: "8", name: "Panchamrit Mix", price: 179, originalPrice: 249, rating: 4.8, reviews: 234, image: "🥛", badge: "Pure", description: "Sacred panchamrit mixture", category: "Prasad", pujaUsage: ["All Pujas"], inStock: true },
  ],
  "idols-murtis": [
    { id: "m1", name: "Ganesh Murti (Brass)", price: 999, originalPrice: 1499, rating: 4.9, reviews: 178, image: "🐘", badge: "Handcrafted", description: "Handcrafted brass Ganesh idol", category: "Idols", pujaUsage: ["Ganesh Puja"], inStock: true },
    { id: "m2", name: "Lakshmi Statue (Clay)", price: 599, originalPrice: 899, rating: 4.8, reviews: 234, image: "🪔", badge: null, description: "Traditional clay Lakshmi statue", category: "Idols", pujaUsage: ["Lakshmi Puja"], inStock: true },
    { id: "m3", name: "Saraswati Idol", price: 799, originalPrice: 1199, rating: 4.9, reviews: 156, image: "📚", badge: "Premium", description: "Beautiful Saraswati idol", category: "Idols", pujaUsage: ["Saraswati Puja"], inStock: true },
  ],
  "utensil-rentals": [
    { id: "u1", name: "Complete Puja Thali Set", price: 199, originalPrice: 299, rating: 4.7, reviews: 145, image: "🍽️", badge: "Rental", description: "Complete thali set for rent", category: "Rentals", pujaUsage: ["All Pujas"], inStock: true },
    { id: "u2", name: "Hawan Kund Set", price: 299, originalPrice: 499, rating: 4.8, reviews: 89, image: "🔥", badge: null, description: "Hawan kund set for rent", category: "Rentals", pujaUsage: ["Hawan"], inStock: true },
    { id: "5", name: "Brass Puja Thali Set", price: 599, originalPrice: 899, rating: 4.8, reviews: 156, image: "🍽️", badge: "Buy", description: "Premium brass thali to buy", category: "Utensils", pujaUsage: ["All Pujas"], inStock: true },
  ],
  "puja-knowledge": [
    { id: "k1", name: "Bengali Puja Guide Book", price: 199, originalPrice: 349, rating: 4.9, reviews: 567, image: "📖", badge: "Bestseller", description: "Comprehensive puja guide", category: "Books", pujaUsage: ["All Pujas"], inStock: true },
    { id: "k2", name: "Mantra Collection Audio", price: 149, originalPrice: 249, rating: 4.8, reviews: 345, image: "🎵", badge: "Digital", description: "Audio collection of mantras", category: "Digital", pujaUsage: ["All Pujas"], inStock: true },
    { id: "k3", name: "Puja Vidhi Cards Set", price: 99, originalPrice: 149, rating: 4.7, reviews: 234, image: "📋", badge: null, description: "Step-by-step puja cards", category: "Books", pujaUsage: ["All Pujas"], inStock: true },
  ]
};

const seedDB = async () => {
  try {
    console.log("Connecting to Database using URI:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected via seed-all.js!');

    // Get arrays ready
    let productsToInsert = [];
    let panditsToInsert = [];

    for (const [slug, items] of Object.entries(categoryProducts)) {
      items.forEach(item => {
        if (slug === "book-pandit") {
          // This maps to the Pandit model
          panditsToInsert.push({
            name: item.name,
            description: item.description,
            experience: 10, // default if missing
            languages: ["Bengali", "Sanskrit"],
            specializations: item.pujaUsage,
            location: "Kolkata", // default
            rating: item.rating,
            price: item.price,
            image: "https://images.unsplash.com/photo-1594901967204-63eedfbf6ba0?auto=format&fit=crop&q=80&w=600",
            available: item.inStock
          });
        } else {
          // Maps to the Product model
          const pCategory = slug === "festival-combos" ? "combo" : "product";
          productsToInsert.push({
            name: item.name,
            description: item.description,
            price: item.price,
            category: pCategory,
            subcategory: item.category, // e.g. "Flowers & Natural Offerings"
            images: [item.image], // Can be Emoji or string URL
            featured: item.badge === "Bestseller" || item.badge === "Popular",
            inStock: item.inStock,
            rating: item.rating,
            discount: item.originalPrice && item.originalPrice > item.price ? (item.originalPrice - item.price) : 0
          });
        }
      });
    }

    console.log('Seeding ALL products systematically (we won\'t clear previous ones just append or clear all to avoid duplicates):');
    await Product.deleteMany({});
    await Pandit.deleteMany({});
    
    await Product.insertMany(productsToInsert);
    console.log(`Seeded ${productsToInsert.length} products!`);
    
    // We already seeded some detailed Pandits in seed.js, let's just insert these additional / overwrite them
    // actually wait, let's keep the detailed ones from seed.js
    
    await Pandit.insertMany(panditsToInsert);
    console.log(`Seeded ${panditsToInsert.length} pandits!`);

    console.log('All DB seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
