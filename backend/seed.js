const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const Pandit = require('./models/Pandit');
const Category = require('./models/Category');

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://naivedyainfo_db_user:naivedya%402026@cluster-naivedya.b7ipgez.mongodb.net/naivedya?retryWrites=true&w=majority&appName=Cluster-Naivedya";

const products = [
  // Products from FeaturedProducts
  {
    name: "Pure Cow Ghee Diya Set",
    description: "Pure Cow Ghee Diya Set - Bestseller",
    price: 149,
    category: "product",
    subcategory: "Diyas",
    images: ["https://images.unsplash.com/photo-1605650123985-115f013bd01d?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.9,
    discount: 50
  },
  {
    name: "Authentic Bengali Sindur",
    description: "Authentic Bengali Sindur - Traditional",
    price: 99,
    category: "product",
    subcategory: "Sindur",
    images: ["https://images.unsplash.com/photo-1614717140889-1ea23ee2ca1e?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.8,
    discount: 50
  },
  {
    name: "Premium Dhup Sticks (100 pcs)",
    description: "Premium Dhup Sticks (100 pcs)",
    price: 249,
    category: "product",
    subcategory: "Dhup",
    images: ["https://images.unsplash.com/photo-1541814032770-4f05b0c74148?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.7,
    discount: 100
  },
  {
    name: "Fresh Marigold Garland",
    description: "Fresh Marigold Garland - Fresh Daily",
    price: 79,
    category: "product",
    subcategory: "Flowers",
    images: ["https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.9,
    discount: 20
  },
  {
    name: "Brass Puja Thali Set",
    description: "Brass Puja Thali Set",
    price: 599,
    category: "product",
    subcategory: "Utensils",
    images: ["https://images.unsplash.com/photo-1594916894002-3deabce3ef30?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.8,
    discount: 300
  },
  {
    name: "Tulsi Holy Basil Plant",
    description: "Tulsi Holy Basil Plant - Sacred",
    price: 199,
    category: "product",
    subcategory: "Plants",
    images: ["https://images.unsplash.com/photo-1598501235339-4d6d6e2eef29?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.9,
    discount: 100
  },
  {
    name: "Camphor Tablets (50 pcs)",
    description: "Camphor Tablets (50 pcs)",
    price: 129,
    category: "product",
    subcategory: "Samagri",
    images: ["https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.6,
    discount: 50
  },
  {
    name: "Panchamrit Mix",
    description: "Panchamrit Mix - Pure",
    price: 179,
    category: "product",
    subcategory: "Prasad",
    images: ["https://images.unsplash.com/photo-1544004940-02bfbaaa481a?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.8,
    discount: 70
  },

  // Combos from FestivalCombos
  {
    name: "Saraswati Puja",
    description: "Saraswati Puja Combo",
    price: 499,
    category: "combo",
    subcategory: "Festivals",
    images: ["https://images.unsplash.com/photo-1510166089176-b57564a5ec3a?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.8,
    discount: 200
  },
  {
    name: "Lakshmi Puja",
    description: "Lakshmi Puja Combo",
    price: 599,
    category: "combo",
    subcategory: "Festivals",
    images: ["https://images.unsplash.com/photo-1605650123985-115f013bd01d?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.9,
    discount: 300
  },
  {
    name: "Durga Puja Mahalaya",
    description: "Durga Puja Mahalaya Combo",
    price: 1299,
    category: "combo",
    subcategory: "Festivals",
    images: ["https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 5.0,
    discount: 500
  },
  {
    name: "Vishwakarma Puja",
    description: "Vishwakarma Puja Combo",
    price: 449,
    category: "combo",
    subcategory: "Festivals",
    images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.7,
    discount: 150
  },
  {
    name: "Ganesh Puja",
    description: "Ganesh Puja Combo",
    price: 399,
    category: "combo",
    subcategory: "Festivals",
    images: ["https://images.unsplash.com/photo-1567115160875-103362a7cfd1?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.8,
    discount: 150
  },
  {
    name: "Kali Puja",
    description: "Kali Puja Combo",
    price: 749,
    category: "combo",
    subcategory: "Festivals",
    images: ["https://images.unsplash.com/photo-1614717140889-1ea23ee2ca1e?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.9,
    discount: 250
  },
  {
    name: "Kartik Puja",
    description: "Kartik Puja Combo",
    price: 349,
    category: "combo",
    subcategory: "Festivals",
    images: ["https://images.unsplash.com/photo-1508210156976-74fcce0f9a2b?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.6,
    discount: 150
  },
  {
    name: "Shiva Ratri",
    description: "Shiva Ratri Combo",
    price: 549,
    category: "combo",
    subcategory: "Festivals",
    images: ["https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=600"],
    featured: true,
    rating: 4.9,
    discount: 200
  }
];

const pandits = [
  {
    name: "Pandit Ramesh Bhattacharya",
    description: "Bengali Puja, Vivah, Grihapravesh",
    experience: 25,
    languages: ["Bengali", "Hindi", "Sanskrit"],
    specializations: ["Bengali Puja", "Vivah", "Grihapravesh"],
    location: "Kolkata",
    rating: 4.9,
    price: 1500,
    image: "https://images.unsplash.com/photo-1594901967204-63eedfbf6ba0?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    name: "Pandit Subir Chakraborty",
    description: "Durga Puja, Lakshmi Puja, Saraswati Puja",
    experience: 18,
    languages: ["Bengali", "Hindi"],
    specializations: ["Durga Puja", "Lakshmi Puja", "Saraswati Puja"],
    location: "Howrah",
    rating: 4.8,
    price: 1200,
    image: "https://images.unsplash.com/photo-1620294977931-778eaee033bc?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    name: "Pandit Arup Mukherjee",
    description: "Kali Puja, Shiva Ratri, Satyanarayan",
    experience: 30,
    languages: ["Bengali", "Sanskrit"],
    specializations: ["Kali Puja", "Shiva Ratri", "Satyanarayan"],
    location: "Salt Lake",
    rating: 5.0,
    price: 2000,
    image: "https://images.unsplash.com/photo-1563240619-44ce0ceebcf0?auto=format&fit=crop&q=80&w=600",
    available: false
  },
  {
    name: "Pandit Debashis Banerjee",
    description: "Marriage Ceremonies, Annaprashan",
    experience: 12,
    languages: ["Bengali", "Hindi", "English"],
    specializations: ["Marriage Ceremonies", "Annaprashan"],
    location: "Dum Dum",
    rating: 4.7,
    price: 1800,
    image: "https://images.unsplash.com/photo-1542178243-78f7d98be7d2?auto=format&fit=crop&q=80&w=600",
    available: true
  }
];

const categories = [
  {
    name: "Puja Samagri",
    slug: "puja-samagri",
    description: "Individual Items for Every Puja",
    image: "https://images.unsplash.com/photo-1605650123985-115f013bd01d?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Festival Combos",
    slug: "festival-combos",
    description: "Ready-to-use combo packs for all Bengali festivals",
    image: "https://images.unsplash.com/photo-1510166089176-b57564a5ec3a?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Flowers & Garlands",
    slug: "flowers-garlands",
    description: "Fresh flowers and garlands delivered daily",
    image: "https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Book Pandit",
    slug: "book-pandit",
    description: "Verified pandits for all ceremonies",
    image: "https://images.unsplash.com/photo-1594901967204-63eedfbf6ba0?auto=format&fit=crop&q=80&w=600"
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to Database using URI:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected successfully!');

    console.log('Clearing existing data...');

    console.log('Existing DB cleared');

    console.log('Seeding products...');
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products!`);

    console.log('Seeding pandits...');
    await Pandit.insertMany(pandits);
    console.log(`Seeded ${pandits.length} pandits!`);

    console.log('Seeding categories...');
    await Category.insertMany(categories);
    console.log(`Seeded ${categories.length} categories!`);

    console.log('All DB seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
