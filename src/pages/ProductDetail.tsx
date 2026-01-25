import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Award, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const productDetails = {
  "ps1": {
    id: "ps1",
    name: "Pure Cow Ghee Diya Set (10 pcs)",
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviews: 245,
    image: "🪔",
    badge: "Bestseller",
    description: "Traditional earthen diyas for daily puja",
    category: "Daily Puja Essentials",
    pujaUsage: ["Daily Puja", "Lakshmi Puja", "Diwali"],
    inStock: true,
    images: ["🪔", "🪔", "🪔", "🪔"],
    highlights: [
      "Made from pure clay",
      "Perfect for ghee lighting",
      "Traditional shape and size",
      "Durable and reusable"
    ],
    usage: [
      "Used during daily aarti",
      "Essential for Lakshmi Puja",
      "Signifies victory of light over darkness",
      "Creates positive energy in home"
    ],
    specifications: {
      "Quantity": "10 pieces",
      "Material": "Earthen clay",
      "Size": "2.5 inches diameter",
      "Weight": "150g",
      "Origin": "Varanasi"
    }
  },
  "ps2": {
    id: "ps2",
    name: "Authentic Bengali Sindur (50g)",
    price: 99,
    originalPrice: 149,
    rating: 4.8,
    reviews: 189,
    image: "🔴",
    badge: "Traditional",
    description: "Pure vermillion sindur for married women",
    category: "Puja Powders & Sacred Items",
    pujaUsage: ["Daily Puja", "Durga Puja", "Kali Puja"],
    inStock: true,
    images: ["🔴", "🔴", "🔴", "🔴"],
    highlights: [
      "Made from pure ingredients",
      "Traditionally prepared",
      "Long lasting color",
      "Safe for skin"
    ],
    usage: [
      "Applied by married women on forehead",
      "Signifies marital status",
      "Used in religious ceremonies",
      "Brings good fortune"
    ],
    specifications: {
      "Weight": "50g",
      "Ingredients": "Turmeric, lime, camphor",
      "Packaging": "Airtight container",
      "Shelf Life": "2 years"
    }
  },
  "ps3": {
    id: "ps3",
    name: "Premium Dhoop Sticks (100 pcs)",
    price: 249,
    originalPrice: 349,
    rating: 4.7,
    reviews: 320,
    image: "🧴",
    badge: null,
    description: "Aromatic dhoop sticks for spiritual atmosphere",
    category: "Daily Puja Essentials",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["🧴", "🧴", "🧴", "🧴"],
    highlights: [
      "Natural aromatic blend",
      "Long burning time",
      "Creates peaceful ambiance",
      "Smoke-free formula"
    ],
    usage: [
      "Burn during daily prayers",
      "Purifies the environment",
      "Enhances meditation",
      "Repels negative energy"
    ],
    specifications: {
      "Quantity": "100 pieces",
      "Length": "15cm",
      "Burning Time": "30-40 minutes",
      "Ingredients": "Sandalwood, herbs"
    }
  },
  "ps4": {
    id: "ps4",
    name: "Camphor Tablets (50 pcs)",
    price: 129,
    originalPrice: 179,
    rating: 4.6,
    reviews: 198,
    image: "⚪",
    badge: null,
    description: "Pure camphor for aarti",
    category: "Daily Puja Essentials",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["⚪", "⚪", "⚪", "⚪"],
    highlights: [
      "Made from pure camphor",
      "Clean burning",
      "Strong fragrance",
      "Traditional offering"
    ],
    usage: [
      "Used during evening aarti",
      "Creates divine atmosphere",
      "Signifies surrender to God",
      "Purifies air naturally"
    ],
    specifications: {
      "Quantity": "50 tablets",
      "Weight": "50g",
      "Diameter": "1cm",
      "Material": "Pure camphor"
    }
  },
  "ps5": {
    id: "ps5",
    name: "Cotton Wicks (100 pcs)",
    price: 49,
    originalPrice: 79,
    rating: 4.9,
    reviews: 456,
    image: "🧵",
    badge: "Best Value",
    description: "Handmade cotton wicks for diyas",
    category: "Daily Puja Essentials",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["🧵", "🧵", "🧵", "🧵"],
    highlights: [
      "100% pure cotton",
      "Even burning",
      "Long lasting",
      "Handmade quality"
    ],
    usage: [
      "For lighting diyas with ghee/oil",
      "Essential for daily aarti",
      "Creates bright flame",
      "Used in all Hindu rituals"
    ],
    specifications: {
      "Quantity": "100 pieces",
      "Length": "15cm",
      "Material": "Pure cotton",
      "Thickness": "Medium"
    }
  },
  "ps6": {
    id: "ps6",
    name: "Kumkum Powder (100g)",
    price: 89,
    originalPrice: 129,
    rating: 4.8,
    reviews: 234,
    image: "🔴",
    badge: null,
    description: "Natural kumkum for tilak and puja",
    category: "Puja Powders & Sacred Items",
    pujaUsage: ["Daily Puja", "Lakshmi Puja", "Saraswati Puja"],
    inStock: true,
    images: ["🔴", "🔴", "🔴", "🔴"],
    highlights: [
      "Natural ingredients",
      "Long lasting color",
      "Safe for skin",
      "Traditional preparation"
    ],
    usage: [
      "Applied as tilak on forehead",
      "Used during religious ceremonies",
      "Signifies auspiciousness",
      "Brings good fortune"
    ],
    specifications: {
      "Weight": "100g",
      "Ingredients": "Turmeric, lime",
      "Packaging": "Airtight container",
      "Shelf Life": "18 months"
    }
  },
  "ps7": {
    id: "ps7",
    name: "Haldi Powder (200g)",
    price: 79,
    originalPrice: 109,
    rating: 4.7,
    reviews: 178,
    image: "🟡",
    badge: null,
    description: "Pure turmeric powder for puja rituals",
    category: "Puja Powders & Sacred Items",
    pujaUsage: ["Marriage Ceremonies", "Ganesh Puja"],
    inStock: true,
    images: ["🟡", "🟡", "🟡", "🟡"],
    highlights: [
      "100% pure turmeric",
      "Natural antiseptic",
      "Bright golden color",
      "Traditional significance"
    ],
    usage: [
      "Used in marriage ceremonies",
      "Applied during religious rituals",
      "Symbol of purity and prosperity",
      "Natural healing properties"
    ],
    specifications: {
      "Weight": "200g",
      "Ingredients": "Pure turmeric",
      "Packaging": "Airtight container",
      "Origin": "India"
    }
  },
  "ps8": {
    id: "ps8",
    name: "Chandan Powder (50g)",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviews: 312,
    image: "🟤",
    badge: "Premium",
    description: "Authentic sandalwood powder",
    category: "Puja Powders & Sacred Items",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["🟤", "🟤", "🟤", "🟤"],
    highlights: [
      "Premium sandalwood",
      "Cooling properties",
      "Divine fragrance",
      "Spiritual significance"
    ],
    usage: [
      "Applied during puja ceremonies",
      "Creates cooling effect",
      "Used in religious offerings",
      "Symbol of devotion"
    ],
    specifications: {
      "Weight": "50g",
      "Ingredients": "Pure sandalwood",
      "Packaging": "Glass bottle",
      "Origin": "South India"
    }
  },
  "ps9": {
    id: "ps9",
    name: "Fresh Marigold Flowers (1kg)",
    price: 79,
    originalPrice: 99,
    rating: 4.9,
    reviews: 412,
    image: "🌼",
    badge: "Fresh Daily",
    description: "Farm-fresh marigold for decoration",
    category: "Flowers & Natural Offerings",
    pujaUsage: ["Durga Puja", "Lakshmi Puja", "All Pujas"],
    inStock: true,
    images: ["🌼", "🌼", "🌼", "🌼"],
    highlights: [
      "Harvested fresh daily",
      "Vibrant orange color",
      "Long-lasting freshness",
      "Farm direct"
    ],
    usage: [
      "Used for decoration during pujas",
      "Creates festive atmosphere",
      "Symbol of auspiciousness",
      "Offered to deities"
    ],
    specifications: {
      "Weight": "1kg",
      "Freshness": "Same day harvest",
      "Storage": "Refrigerated",
      "Best consumed": "Within 2 days"
    }
  },
  "ps10": {
    id: "ps10",
    name: "Tulsi Leaves (Fresh)",
    price: 29,
    originalPrice: 49,
    rating: 4.8,
    reviews: 267,
    image: "🌿",
    badge: null,
    description: "Sacred tulsi leaves for offerings",
    category: "Flowers & Natural Offerings",
    pujaUsage: ["Daily Puja", "Vishnu Puja"],
    inStock: true,
    images: ["🌿", "🌿", "🌿", "🌿"],
    highlights: [
      "Sacred basil leaves",
      "Spiritual significance",
      "Medicinal properties",
      "Fresh daily"
    ],
    usage: [
      "Offered to Lord Vishnu",
      "Used in daily prayers",
      "Symbol of devotion",
      "Natural healing benefits"
    ],
    specifications: {
      "Quantity": "Small bunch",
      "Freshness": "Same day harvest",
      "Storage": "In water",
      "Best consumed": "Same day"
    }
  },
  "ps11": {
    id: "ps11",
    name: "Bel Patra (25 leaves)",
    price: 39,
    originalPrice: 59,
    rating: 4.7,
    reviews: 189,
    image: "🍃",
    badge: null,
    description: "Sacred bel leaves for Shiva puja",
    category: "Flowers & Natural Offerings",
    pujaUsage: ["Shiva Puja", "Mahashivratri"],
    inStock: true,
    images: ["🍃", "🍃", "🍃", "🍃"],
    highlights: [
      "Sacred wood apple leaves",
      "Essential for Shiva worship",
      "Traditional significance",
      "Fresh quality"
    ],
    usage: [
      "Offered to Lord Shiva",
      "Used during Mahashivratri",
      "Symbol of devotion to Shiva",
      "Traditional puja requirement"
    ],
    specifications: {
      "Quantity": "25 leaves",
      "Freshness": "Same day harvest",
      "Storage": "Refrigerated",
      "Best consumed": "Within 2 days"
    }
  },
  "ps12": {
    id: "ps12",
    name: "Coconut (Nariyal)",
    price: 49,
    originalPrice: 69,
    rating: 4.9,
    reviews: 345,
    image: "🥥",
    badge: null,
    description: "Fresh coconut for puja offerings",
    category: "Fruits & Dry Items",
    pujaUsage: ["All Pujas", "Ganesh Puja"],
    inStock: true,
    images: ["🥥", "🥥", "🥥", "🥥"],
    highlights: [
      "Fresh green coconut",
      "Traditional offering",
      "Symbol of prosperity",
      "Nutritious and healthy"
    ],
    usage: [
      "Broken as offering to deities",
      "Symbolizes breaking of ego",
      "Used in all religious ceremonies",
      "Traditional puja item"
    ],
    specifications: {
      "Size": "Medium",
      "Freshness": "Same day harvest",
      "Storage": "Room temperature",
      "Best consumed": "Within 3 days"
    }
  },
  "ps13": {
    id: "ps13",
    name: "Supari (Betel Nut) 100g",
    price: 89,
    originalPrice: 119,
    rating: 4.6,
    reviews: 156,
    image: "🟤",
    badge: null,
    description: "Premium betel nuts for puja",
    category: "Fruits & Dry Items",
    pujaUsage: ["Marriage Ceremonies", "All Pujas"],
    inStock: true,
    images: ["🟤", "🟤", "🟤", "🟤"],
    highlights: [
      "Premium quality betel nuts",
      "Traditional significance",
      "Ceremonial use",
      "Fresh processing"
    ],
    usage: [
      "Used in marriage ceremonies",
      "Traditional offering item",
      "Symbol of auspiciousness",
      "Cultural importance"
    ],
    specifications: {
      "Weight": "100g",
      "Processing": "Sun dried",
      "Packaging": "Airtight container",
      "Shelf Life": "6 months"
    }
  },
  "ps14": {
    id: "ps14",
    name: "Pure Honey (250ml)",
    price: 199,
    originalPrice: 279,
    rating: 4.8,
    reviews: 234,
    image: "🍯",
    badge: "Pure",
    description: "Natural honey for prasad",
    category: "Fruits & Dry Items",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["🍯", "🍯", "🍯", "🍯"],
    highlights: [
      "100% natural honey",
      "Pure and unprocessed",
      "Traditional sweetener",
      "Healthy alternative"
    ],
    usage: [
      "Used as prasad offering",
      "Mixed in religious preparations",
      "Symbol of sweetness",
      "Traditional puja ingredient"
    ],
    specifications: {
      "Volume": "250ml",
      "Ingredients": "Pure honey",
      "Packaging": "Glass bottle",
      "Shelf Life": "12 months"
    }
  },
  "ps15": {
    id: "ps15",
    name: "Brass Puja Thali (8 inch)",
    price: 299,
    originalPrice: 449,
    rating: 4.9,
    reviews: 178,
    image: "🍽️",
    badge: "Handcrafted",
    description: "Traditional brass thali for aarti",
    category: "Puja Accessories",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🍽️", "🍽️", "🍽️", "🍽️"],
    highlights: [
      "Handcrafted brass",
      "Traditional design",
      "Durable and long-lasting",
      "Authentic craftsmanship"
    ],
    usage: [
      "Used for aarti ceremony",
      "Holds puja items",
      "Traditional serving plate",
      "Cultural significance"
    ],
    specifications: {
      "Diameter": "8 inches",
      "Material": "Pure brass",
      "Finish": "Polished",
      "Care": "Hand wash only"
    }
  },
  "ps16": {
    id: "ps16",
    name: "Puja Bell (Brass)",
    price: 179,
    originalPrice: 249,
    rating: 4.8,
    reviews: 234,
    image: "🔔",
    badge: null,
    description: "Sacred bell for puja rituals",
    category: "Puja Accessories",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["🔔", "🔔", "🔔", "🔔"],
    highlights: [
      "Pure brass construction",
      "Clear resonant sound",
      "Traditional design",
      "Spiritual significance"
    ],
    usage: [
      "Rung during puja ceremonies",
      "Creates divine atmosphere",
      "Symbolizes calling deities",
      "Traditional puja item"
    ],
    specifications: {
      "Material": "Brass",
      "Height": "12cm",
      "Sound Quality": "Clear resonance",
      "Care": "Regular polishing"
    }
  },
  "ps17": {
    id: "ps17",
    name: "Kalash (Copper)",
    price: 599,
    originalPrice: 899,
    rating: 4.9,
    reviews: 156,
    image: "🏺",
    badge: "Premium",
    description: "Authentic copper kalash for rituals",
    category: "Puja Accessories",
    pujaUsage: ["Lakshmi Puja", "Durga Puja", "Marriage"],
    inStock: true,
    images: ["🏺", "🏺", "🏺", "🏺"],
    highlights: [
      "Pure copper construction",
      "Traditional kalash design",
      "Premium quality",
      "Cultural significance"
    ],
    usage: [
      "Filled with water during pujas",
      "Symbol of abundance",
      "Used in marriage ceremonies",
      "Traditional ritual vessel"
    ],
    specifications: {
      "Material": "Pure copper",
      "Capacity": "2 liters",
      "Height": "25cm",
      "Care": "Regular cleaning"
    }
  },
  "ps18": {
    id: "ps18",
    name: "Sacred Moli Thread (Red)",
    price: 29,
    originalPrice: 49,
    rating: 4.7,
    reviews: 345,
    image: "🧵",
    badge: null,
    description: "Red sacred thread for wrist tying",
    category: "Sacred Threads & Cloth",
    pujaUsage: ["All Pujas", "Raksha Bandhan"],
    inStock: true,
    images: ["🧵", "🧵", "🧵", "🧵"],
    highlights: [
      "Pure red thread",
      "Traditional significance",
      "Cultural importance",
      "Quality material"
    ],
    usage: [
      "Tied during religious ceremonies",
      "Symbol of protection",
      "Used in Raksha Bandhan",
      "Traditional ritual item"
    ],
    specifications: {
      "Length": "1 meter",
      "Color": "Red",
      "Material": "Cotton thread",
      "Quantity": "1 piece"
    }
  },
  "ps19": {
    id: "ps19",
    name: "Janeu (Sacred Thread)",
    price: 49,
    originalPrice: 79,
    rating: 4.8,
    reviews: 189,
    image: "⚪",
    badge: null,
    description: "Sacred thread for Brahmin rituals",
    category: "Sacred Threads & Cloth",
    pujaUsage: ["Thread Ceremony", "Daily Puja"],
    inStock: true,
    images: ["⚪", "⚪", "⚪", "⚪"],
    highlights: [
      "Traditional janeu thread",
      "Religious significance",
      "Ceremonial use",
      "Authentic preparation"
    ],
    usage: [
      "Worn during thread ceremony",
      "Symbol of spiritual commitment",
      "Traditional Brahmin ritual",
      "Religious significance"
    ],
    specifications: {
      "Material": "Cotton and silk",
      "Length": "9 yards",
      "Preparation": "Traditional method",
      "Care": "Handle with respect"
    }
  },
  "ps20": {
    id: "ps20",
    name: "Puja Cloth (Red & Gold)",
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviews: 234,
    image: "🧣",
    badge: null,
    description: "Beautiful cloth for covering puja items",
    category: "Sacred Threads & Cloth",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🧣", "🧣", "🧣", "🧣"],
    highlights: [
      "Beautiful red and gold design",
      "Traditional pattern",
      "Quality fabric",
      "Cultural significance"
    ],
    usage: [
      "Used to cover puja items",
      "Adds beauty to altar",
      "Traditional decoration",
      "Cultural importance"
    ],
    specifications: {
      "Size": "36 x 36 inches",
      "Material": "Cotton blend",
      "Design": "Red and gold pattern",
      "Care": "Machine wash cold"
    }
  },
  "ps21": {
    id: "ps21",
    name: "Agarbatti (Incense Sticks) 100pcs",
    price: 99,
    originalPrice: 149,
    rating: 4.8,
    reviews: 456,
    image: "🪔",
    badge: "Bestseller",
    description: "Fragrant incense sticks for daily puja",
    category: "Daily Puja Essentials",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["🪔", "🪔", "🪔", "🪔"],
    highlights: [
      "Natural fragrances",
      "Long burning time",
      "Creates peaceful atmosphere",
      "Traditional puja item"
    ],
    usage: [
      "Burned during daily prayers",
      "Creates divine atmosphere",
      "Enhances meditation",
      "Traditional offering"
    ],
    specifications: {
      "Quantity": "100 pieces",
      "Length": "20cm",
      "Burning Time": "45-60 minutes",
      "Fragrance": "Sandalwood/Mogra"
    }
  },
  "ps22": {
    id: "ps22",
    name: "Akshat (Rice Grains) 500g",
    price: 59,
    originalPrice: 89,
    rating: 4.7,
    reviews: 234,
    image: "🌾",
    badge: null,
    description: "Unbroken rice grains for offerings",
    category: "Puja Powders & Sacred Items",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🌾", "🌾", "🌾", "🌾"],
    highlights: [
      "Unbroken rice grains",
      "Traditional offering item",
      "Pure and clean",
      "Cultural significance"
    ],
    usage: [
      "Offered to deities",
      "Used in religious ceremonies",
      "Symbol of prosperity",
      "Traditional puja requirement"
    ],
    specifications: {
      "Weight": "500g",
      "Grain Type": "Basmati rice",
      "Processing": "Hand picked",
      "Storage": "Airtight container"
    }
  },
  "ps23": {
    id: "ps23",
    name: "Durva Grass (Fresh)",
    price: 39,
    originalPrice: 59,
    rating: 4.8,
    reviews: 178,
    image: "🌱",
    badge: "Fresh",
    description: "Sacred grass for Ganesh puja",
    category: "Flowers & Natural Offerings",
    pujaUsage: ["Ganesh Puja", "Ganesh Chaturthi"],
    inStock: true,
    images: ["🌱", "🌱", "🌱", "🌱"],
    highlights: [
      "Sacred durva grass",
      "Essential for Ganesh worship",
      "Fresh daily harvest",
      "Traditional significance"
    ],
    usage: [
      "Offered to Lord Ganesha",
      "Essential for Ganesh puja",
      "Symbol of devotion",
      "Traditional requirement"
    ],
    specifications: {
      "Quantity": "Small bunch",
      "Freshness": "Same day harvest",
      "Storage": "In water",
      "Best consumed": "Same day"
    }
  },
  "ps24": {
    id: "ps24",
    name: "Panchapatra Set (Brass)",
    price: 249,
    originalPrice: 349,
    rating: 4.9,
    reviews: 156,
    image: "🥄",
    badge: null,
    description: "Traditional vessel set for puja",
    category: "Puja Accessories",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🥄", "🥄", "🥄", "🥄"],
    highlights: [
      "Traditional brass vessels",
      "Complete puja set",
      "Authentic craftsmanship",
      "Cultural significance"
    ],
    usage: [
      "Used during puja ceremonies",
      "Holds holy water and materials",
      "Traditional puja requirement",
      "Cultural importance"
    ],
    specifications: {
      "Material": "Brass",
      "Pieces": "5-piece set",
      "Finish": "Polished brass",
      "Care": "Hand wash only"
    }
  },
  "4": {
    id: "4",
    name: "Fresh Marigold Garland",
    price: 79,
    originalPrice: 99,
    rating: 4.9,
    reviews: 412,
    image: "🌼",
    badge: "Fresh Daily",
    description: "Farm-fresh marigold garlands",
    category: "Flowers",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🌼", "🌼", "🌼", "🌼"],
    highlights: [
      "Harvested fresh daily",
      "Vibrant orange color",
      "Long-lasting freshness",
      "Farm direct"
    ],
    usage: [
      "Used for decoration during pujas",
      "Creates festive atmosphere",
      "Symbol of auspiciousness",
      "Offered to deities"
    ],
    specifications: {
      "Length": "2 feet",
      "Freshness": "Same day harvest",
      "Storage": "Refrigerated",
      "Best consumed": "Within 1 day"
    }
  },
  "f1": {
    id: "f1",
    name: "Red Rose Garland",
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    reviews: 267,
    image: "🌹",
    badge: "Premium",
    description: "Beautiful red rose garlands",
    category: "Flowers",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🌹", "🌹", "🌹", "🌹"],
    highlights: [
      "Premium quality roses",
      "Deep red color",
      "Long lasting freshness",
      "Perfect for offerings"
    ],
    usage: [
      "Used for special pujas",
      "Decoration for religious events",
      "Symbol of devotion",
      "Offered to deities"
    ],
    specifications: {
      "Length": "2 feet",
      "Quantity": "12 roses",
      "Freshness": "Same day harvest",
      "Best consumed": "Within 2 days"
    }
  },
  "f2": {
    id: "f2",
    name: "Mixed Flower Bouquet",
    price: 199,
    originalPrice: 299,
    rating: 4.7,
    reviews: 189,
    image: "💐",
    badge: null,
    description: "Assorted fresh flower bouquet",
    category: "Flowers",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["💐", "💐", "💐", "💐"],
    highlights: [
      "Assorted fresh flowers",
      "Beautiful arrangement",
      "Perfect for offerings",
      "Seasonal variety"
    ],
    usage: [
      "Used for special occasions",
      "Decoration for prayer area",
      "Symbol of devotion",
      "Offered to deities"
    ],
    specifications: {
      "Size": "Medium",
      "Variety": "Seasonal mixed flowers",
      "Freshness": "Same day harvest",
      "Best consumed": "Within 2 days"
    }
  },
  "f3": {
    id: "f3",
    name: "Lotus Flowers (5 pcs)",
    price: 129,
    originalPrice: 179,
    rating: 4.9,
    reviews: 345,
    image: "🪷",
    badge: "Sacred",
    description: "Sacred lotus for offerings",
    category: "Flowers",
    pujaUsage: ["Lakshmi Puja", "Saraswati Puja"],
    inStock: true,
    images: ["🪷", "🪷", "🪷", "🪷"],
    highlights: [
      "Sacred lotus flowers",
      "Traditional offering",
      "Symbol of purity",
      "Spiritual significance"
    ],
    usage: [
      "Offered to Goddess Lakshmi",
      "Used in Saraswati Puja",
      "Symbol of purity and enlightenment",
      "Traditional ritual requirement"
    ],
    specifications: {
      "Quantity": "5 pieces",
      "Size": "Medium blooms",
      "Freshness": "Same day harvest",
      "Best consumed": "Same day"
    }
  },
  "m1": {
    id: "m1",
    name: "Ganesh Murti (Brass)",
    price: 999,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 178,
    image: "🐘",
    badge: "Handcrafted",
    description: "Handcrafted brass Ganesh idol",
    category: "Idols",
    pujaUsage: ["Ganesh Puja"],
    inStock: true,
    images: ["🐘", "🐘", "🐘", "🐘"],
    highlights: [
      "Handcrafted brass",
      "Detailed features",
      "Traditional design",
      "Durable finish"
    ],
    usage: [
      "Used for Ganesh Puja",
      "Ideal for Ganesh Chaturthi",
      "Can be immersed after puja",
      "Traditional worship item"
    ],
    specifications: {
      "Material": "Brass",
      "Height": "6 inches",
      "Width": "4 inches",
      "Weight": "500g",
      "Crafting": "Handcrafted by artisans"
    }
  },
  "m2": {
    id: "m2",
    name: "Lakshmi Statue (Clay)",
    price: 599,
    originalPrice: 899,
    rating: 4.8,
    reviews: 234,
    image: "🪔",
    badge: null,
    description: "Traditional clay Lakshmi statue",
    category: "Idols",
    pujaUsage: ["Lakshmi Puja"],
    inStock: true,
    images: ["🪔", "🪔", "🪔", "🪔"],
    highlights: [
      "Authentic clay crafting",
      "Traditional design",
      "Eco-friendly",
      "Cultural significance"
    ],
    usage: [
      "Used for Lakshmi Puja",
      "Ideal for Diwali celebrations",
      "Biodegradable after puja",
      "Traditional worship item"
    ],
    specifications: {
      "Material": "Clay",
      "Height": "8 inches",
      "Width": "5 inches",
      "Weight": "300g",
      "Crafting": "Traditional clay art"
    }
  },
  "m3": {
    id: "m3",
    name: "Saraswati Idol",
    price: 799,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 156,
    image: "📚",
    badge: "Premium",
    description: "Beautiful Saraswati idol",
    category: "Idols",
    pujaUsage: ["Saraswati Puja"],
    inStock: true,
    images: ["📚", "📚", "📚", "📚"],
    highlights: [
      "Detailed craftsmanship",
      "Traditional pose",
      "Premium quality",
      "Educational symbolism"
    ],
    usage: [
      "Used for Saraswati Puja",
      "Ideal for Vasant Panchami",
      "Symbol of knowledge and learning",
      "Traditional worship item"
    ],
    specifications: {
      "Material": "Brass",
      "Height": "7 inches",
      "Width": "4 inches",
      "Weight": "400g",
      "Crafting": "Fine handcrafted details"
    }
  },
  "8": {
    id: "8",
    name: "Panchamrit Mix",
    price: 179,
    originalPrice: 249,
    rating: 4.8,
    reviews: 234,
    image: "🥛",
    badge: "Pure",
    description: "Sacred panchamrit mixture",
    category: "Prasad",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🥛", "🥛", "🥛", "🥛"],
    highlights: [
      "Traditional recipe",
      "Five ingredients mix",
      "Sacred offering",
      "Authentic preparation"
    ],
    usage: [
      "Used as prasad offering",
      "Distributed after pujas",
      "Sacred food for devotees",
      "Symbol of divine blessing"
    ],
    specifications: {
      "Weight": "200g",
      "Ingredients": "Milk, curd, ghee, honey, sugar",
      "Packaging": "Sealed container",
      "Shelf Life": "7 days refrigerated"
    }
  },
  "5": {
    id: "5",
    name: "Brass Puja Thali Set",
    price: 599,
    originalPrice: 899,
    rating: 4.8,
    reviews: 156,
    image: "🍽️",
    badge: "Buy",
    description: "Premium brass thali to buy",
    category: "Utensils",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🍽️", "🍽️", "🍽️", "🍽️"],
    highlights: [
      "Premium brass quality",
      "Complete set",
      "Durable and long-lasting",
      "Traditional design"
    ],
    usage: [
      "Used for daily aarti",
      "Holds puja items",
      "Traditional serving plate",
      "Cultural significance"
    ],
    specifications: {
      "Material": "Brass",
      "Diameter": "8 inches",
      "Pieces": "Complete set",
      "Finish": "Polished"
    }
  },
  "s1": {
    id: "s1",
    name: "Sandesh Box (12 pcs)",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 234,
    image: "🍬",
    badge: "Fresh",
    description: "Traditional Bengali sandesh",
    category: "Sweets",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🍬", "🍬", "🍬", "🍬"],
    highlights: [
      "Authentic Bengali recipe",
      "Fresh preparation",
      "Traditional sweet",
      "Perfect for prasad"
    ],
    usage: [
      "Served as prasad after pujas",
      "Shared with family and friends",
      "Traditional celebration sweet",
      "Religious offering"
    ],
    specifications: {
      "Quantity": "12 pieces",
      "Weight": "300g",
      "Freshness": "Made to order",
      "Best consumed": "Within 3 days"
    }
  },
  "s2": {
    id: "s2",
    name: "Rasgulla Pack",
    price: 199,
    originalPrice: 279,
    rating: 4.9,
    reviews: 456,
    image: "⚪",
    badge: "Bestseller",
    description: "Soft and sweet rasgullas",
    category: "Sweets",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["⚪", "⚪", "⚪", "⚪"],
    highlights: [
      "Soft and spongy texture",
      "Authentic recipe",
      "Fresh preparation",
      "Traditional favorite"
    ],
    usage: [
      "Served as prasad after pujas",
      "Celebration sweet",
      "Shared during festivals",
      "Traditional offering"
    ],
    specifications: {
      "Quantity": "10 pieces",
      "Weight": "250g",
      "Freshness": "Made to order",
      "Best consumed": "Within 2 days"
    }
  },
  "s3": {
    id: "s3",
    name: "Mishti Doi",
    price: 149,
    originalPrice: 199,
    rating: 4.7,
    reviews: 189,
    image: "🥛",
    badge: null,
    description: "Sweet yogurt dessert",
    category: "Sweets",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🥛", "🥛", "🥛", "🥛"],
    highlights: [
      "Traditional Bengali dessert",
      "Sweet fermented yogurt",
      "Rich and creamy",
      "Perfect for prasad"
    ],
    usage: [
      "Served as prasad after pujas",
      "Festival dessert",
      "Traditional offering",
      "Cultural significance"
    ],
    specifications: {
      "Quantity": "200ml",
      "Flavor": "Cardamom & Sugar",
      "Freshness": "Made to order",
      "Best consumed": "Within 2 days"
    }
  },
  "u1": {
    id: "u1",
    name: "Complete Puja Thali Set",
    price: 199,
    originalPrice: 299,
    rating: 4.7,
    reviews: 145,
    image: "🍽️",
    badge: "Rental",
    description: "Complete thali set for rent",
    category: "Rentals",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🍽️", "🍽️", "🍽️", "🍽️"],
    highlights: [
      "Complete rental set",
      "All puja items included",
      "Cost-effective option",
      "Professional maintenance"
    ],
    usage: [
      "For occasional puja needs",
      "Festival celebrations",
      "Special occasions",
      "Economical alternative"
    ],
    specifications: {
      "Duration": "1 day rental",
      "Items": "Complete puja set",
      "Deposit": "Required",
      "Condition": "Well maintained"
    }
  },
  "u2": {
    id: "u2",
    name: "Hawan Kund Set",
    price: 299,
    originalPrice: 499,
    rating: 4.8,
    reviews: 89,
    image: "🔥",
    badge: null,
    description: "Hawan kund set for rent",
    category: "Rentals",
    pujaUsage: ["Hawan"],
    inStock: true,
    images: ["🔥", "🔥", "🔥", "🔥"],
    highlights: [
      "Traditional hawan kund",
      "Complete set for hawan",
      "Quality materials",
      "Rental convenience"
    ],
    usage: [
      "Used for hawan ceremonies",
      "Special religious functions",
      "Community gatherings",
      "Large scale pujas"
    ],
    specifications: {
      "Duration": "1 day rental",
      "Type": "Clay hawan kund",
      "Size": "Medium",
      "Deposit": "Required"
    }
  },
  "k1": {
    id: "k1",
    name: "Bengali Puja Guide Book",
    price: 199,
    originalPrice: 349,
    rating: 4.9,
    reviews: 567,
    image: "📖",
    badge: "Bestseller",
    description: "Comprehensive puja guide",
    category: "Books",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["📖", "📖", "📖", "📖"],
    highlights: [
      "Bengali language guide",
      "Step-by-step procedures",
      "Traditional methods",
      "Comprehensive coverage"
    ],
    usage: [
      "Reference for puja procedures",
      "Learning traditional methods",
      "Understanding rituals",
      "Daily practice guide"
    ],
    specifications: {
      "Pages": "300 pages",
      "Language": "Bengali",
      "Format": "Paperback",
      "Publisher": "Traditional Publishers"
    }
  },
  "k2": {
    id: "k2",
    name: "Mantra Collection Audio",
    price: 149,
    originalPrice: 249,
    rating: 4.8,
    reviews: 345,
    image: "🎵",
    badge: "Digital",
    description: "Audio collection of mantras",
    category: "Digital",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["🎵", "🎵", "🎵", "🎵"],
    highlights: [
      "Authentic pronunciation",
      "Multiple mantras included",
      "High quality audio",
      "Easy access"
    ],
    usage: [
      "For proper mantra recitation",
      "Learning correct pronunciation",
      "Background during pujas",
      "Daily meditation aid"
    ],
    specifications: {
      "Format": "Digital download",
      "Duration": "2 hours",
      "Languages": "Sanskrit",
      "Access": "Lifetime"
    }
  },
  "k3": {
    id: "k3",
    name: "Puja Vidhi Cards Set",
    price: 99,
    originalPrice: 149,
    rating: 4.7,
    reviews: 234,
    image: "📋",
    badge: null,
    description: "Step-by-step puja cards",
    category: "Books",
    pujaUsage: ["All Pujas"],
    inStock: true,
    images: ["📋", "📋", "📋", "📋"],
    highlights: [
      "Quick reference cards",
      "Simple instructions",
      "Portable format",
      "Visual guidance"
    ],
    usage: [
      "Quick reference during pujas",
      "Learning aid for beginners",
      "Step-by-step guidance",
      "Easy to follow format"
    ],
    specifications: {
      "Cards": "20 cards",
      "Language": "Bengali/English",
      "Size": "Pocket sized",
      "Material": "Water resistant"
    }
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const product = productDetails[id as keyof typeof productDetails];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Product not found</h1>
          <div className="flex flex-col sm:flex-row gap-2 justify-center flex-wrap">
            <Link to="/category/puja-samagri">
              <Button variant="outline" className="mb-2 sm:mb-0 sm:mr-2">Back to Puja Samagri</Button>
            </Link>
            <Link to="/category/flowers-garlands">
              <Button variant="outline" className="mb-2 sm:mb-0 sm:mr-2">Back to Flowers & Garlands</Button>
            </Link>
            <Link to="/category/idols-murtis">
              <Button variant="outline" className="mb-2 sm:mb-0 sm:mr-2">Back to Idols & Murtis</Button>
            </Link>
            <Link to="/category/prasad-sweets">
              <Button variant="outline" className="mb-2 sm:mb-0 sm:mr-2">Back to Prasad & Sweets</Button>
            </Link>
            <Link to="/category/utensil-rentals">
              <Button variant="outline" className="mb-2 sm:mb-0 sm:mr-2">Back to Utensil Rentals</Button>
            </Link>
            <Link to="/category/puja-knowledge">
              <Button variant="outline" className="mb-2 sm:mb-0">Back to Puja Knowledge</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    toast({
      title: wishlist ? "Removed from Wishlist" : "Added to Wishlist!",
      description: `${product.name} ${wishlist ? 'removed' : 'added'} to your wishlist.`,
    });
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Redirecting to Checkout",
      description: "Processing your order for " + product.name,
    });
    // In a real app, this would redirect to checkout
  };

  // Get related products (same category, different items)
  const relatedProducts = Object.values(productDetails)
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          {product.category.includes("Flowers") || product.category.includes("Flower") ? (
            <Link to="/category/flowers-garlands" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Flowers & Garlands
            </Link>
          ) : product.category.includes("Idol") || product.category.includes("Murti") ? (
            <Link to="/category/idols-murtis" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Idols & Murtis
            </Link>
          ) : product.category.includes("Sweets") || product.category.includes("Prasad") ? (
            <Link to="/category/prasad-sweets" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Prasad & Sweets
            </Link>
          ) : product.category.includes("Rental") || product.category.includes("Utensil") ? (
            <Link to="/category/utensil-rentals" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Utensil Rentals
            </Link>
          ) : product.category.includes("Book") || product.category.includes("Digital") ? (
            <Link to="/category/puja-knowledge" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Puja Knowledge
            </Link>
          ) : (
            <Link to="/category/puja-samagri" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Puja Samagri
            </Link>
          )}
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-muted/50 to-card rounded-2xl flex items-center justify-center">
                <span className="text-9xl">{product.images[selectedImage]}</span>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gradient-to-br from-muted/50 to-card rounded-xl flex items-center justify-center ${
                      selectedImage === idx ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <span className="text-2xl">{img}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-2">
                    {product.category}
                  </span>
                  <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-secondary text-secondary" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    {product.badge && (
                      <span className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={toggleWishlist}
                  className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlist ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>

              <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                <span className="text-lg font-semibold text-green-600">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>

              {/* Puja Usage Tags */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-2">Used in Pujas:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.pujaUsage.map((usage, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
                      {usage}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {product.inStock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="festive" 
                  size="lg"
                  onClick={handleBuyNow}
                  className="flex items-center gap-2"
                >
                  Buy Now
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <Truck className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Fast Delivery</p>
                    <p className="text-xs text-muted-foreground">Within 2-3 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Quality Assured</p>
                    <p className="text-xs text-muted-foreground">Authentic materials</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">7 days return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <Award className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Trusted Brand</p>
                    <p className="text-xs text-muted-foreground">100% authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12 border-b border-border">
            <div className="flex gap-6">
              <button className="pb-3 font-semibold text-primary border-b-2 border-primary">
                Description
              </button>
              <button className="pb-3 text-muted-foreground hover:text-foreground">
                Specifications
              </button>
              <button className="pb-3 text-muted-foreground hover:text-foreground">
                Reviews
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div className="py-8">
            <h2 className="font-heading text-xl font-bold mb-4">About this Item</h2>
            <div className="prose prose-sm max-w-none">
              <p className="mb-4 text-muted-foreground">{product.description}</p>
              
              <h3 className="font-semibold mb-2">Highlights</h3>
              <ul className="list-disc list-inside mb-4">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-muted-foreground">{highlight}</li>
                ))}
              </ul>
              
              <h3 className="font-semibold mb-2">Usage in Puja</h3>
              <ul className="list-disc list-inside">
                {product.usage.map((usage, idx) => (
                  <li key={idx} className="text-muted-foreground">{usage}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specifications */}
          <div className="py-8 border-t border-border">
            <h2 className="font-heading text-xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Bought Together */}
          <div className="py-12 border-t border-border">
            <h2 className="font-heading text-2xl font-bold mb-6">Frequently Bought Together</h2>
            <div className="flex flex-wrap items-center gap-4">
              {relatedProducts.map((related, index) => (
                <div key={related.id} className="flex items-center gap-4">
                  {index > 0 && <span className="text-2xl text-muted-foreground">+</span>}
                  <Link to={`/product/${related.id}`} className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 bg-gradient-to-br from-muted/50 to-card rounded-lg flex items-center justify-center">
                      <span className="text-3xl">{related.image}</span>
                    </div>
                    <span className="text-xs text-center line-clamp-2 max-w-24">{related.name.split(' ')[0]}</span>
                    <span className="text-sm font-bold text-primary">₹{related.price}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Related Items */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Related Items</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((related) => (
                  <Link to={`/product/${related.id}`} key={related.id}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
                    >
                      <div className="relative bg-gradient-to-br from-muted/50 to-card h-32 flex items-center justify-center">
                        <span className="text-4xl">{related.image}</span>
                        {related.badge && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                            {related.badge}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-2">
                          {related.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                          <span className="text-xs font-medium">{related.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary">₹{related.price}</span>
                          <span className="text-xs text-muted-foreground line-through">₹{related.originalPrice}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;