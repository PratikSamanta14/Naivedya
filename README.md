# 🕉️ Naivedya - Divine Offerings at Your Doorstep

**Naivedya** is a holistic spiritual e-commerce platform designed to bridge the gap between devotion and convenience. We connect devotees with verified Pandits for flawless rituals and provide a seamless marketplace for authentic, pure puja essentials.

![Naivedya Hero](https://images.unsplash.com/photo-1567591414240-e1488c0953a1?q=80&w=2070&auto=format&fit=crop)

## 🚀 Vision
To simplify the spiritual journey of millions by making authentic rituals, verified priests, and pure offerings accessible with a single click.

## ✨ Key Features

### 👳 Book a Pandit
- **Smart Matching**: Find Pandits based on your location, language (Bengali, Hindi, Sanskrit), and puja specialization.
- **Verified Profiles**: Detailed profiles with experience, ratings, and reviews.
- **Direct Booking**: Check availability and book slots for Durga Puja, Griha Pravesh, Weddings, and more.

### 🛍️ Divine Marketplace
- **Puja Essentials**: Pure Cow Ghee, Camphor, Dhoop, and handcrafted Diyas.
- **Fresh Offerings**: Fresh Marigolds, Bel Patra, Tulsi, and Durva grass delivered daily.
- **Sacred Items**: Brass Thalis, Copper Kalash, Janeu, and specialized ritual cloth.

### 📦 One-Click Festival Combos
- **Curated Bundles**: Pre-packed puja kits for major festivals (Sharodiya, Diwali, Saraswati Puja).
- **All-in-One**: No need to hunt for individual items – get everything in one box.

### 🛒 Seamless Experience
- **Smart Cart**: Easy addition of products and pandit bookings to a single cart.
- **Secure Checkout**: Invoice generation and smooth order placement flow.
- **Responsive Design**: Beautiful, mobile-first interface built for modern devotees.

## � Project Structure

```bash
naivedya/
├── frontend/                 # React + TypeScript + Vite Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/        # React contexts (Auth, Cart)
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and API services
│   │   └── hooks/          # Custom React hooks
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Node.js + Express + MongoDB Backend
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Pandit.js
│   │   └── Category.js
│   ├── server.js           # Main server file
│   ├── db.js              # Database connection
│   └── package.json
├── package.json            # Root package.json with scripts
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (installed and running)
- Git

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd naivedya

# Install all dependencies (root, frontend, backend)
npm run setup

# Or manually:
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 2. Environment Setup

#### Backend Environment
Create `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/naivedya
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
```

#### Frontend Environment
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
VITE_RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_here
```

### 3. Start MongoDB
```bash
# Start MongoDB service
mongod
```

### 4. Run the Application

```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually:
npm run dev:backend    # Backend on port 3001
npm run dev:frontend   # Frontend on port 5173
```

## 📋 Available Scripts

### Root Scripts
- `npm run setup` - Install all dependencies
- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build` - Build frontend for production
- `npm run start` - Start backend server

### Backend Scripts (from `backend/` directory)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend Scripts (from `frontend/` directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

## �️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **React Router** - Navigation
- **React Query** - Data fetching
- **Framer Motion** - Animations
- **Stripe Elements** - Payment processing

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment gateway
- **CORS** - Cross-origin requests

## 📊 Database Models

### User
- Authentication (email, password)
- Profile information
- Addresses
- Wishlist

### Product
- Product details
- Categories
- Pricing
- Images
- Reviews

### Order
- Order management
- Payment processing
- Shipping details
- Order status tracking

### Pandit
- Pandit profiles
- Booking system
- Specializations
- Reviews

### Category
- Product categories
- Hierarchical structure

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Users
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/wishlist` - Get wishlist

### Payment
- `POST /api/create-payment-intent` - Stripe payment
- `POST /api/create-razorpay-order` - Razorpay payment

## 🎨 Features

- **User Authentication** - Register, login, profile management
- **Product Catalog** - Browse puja items, combos, pandits
- **Shopping Cart** - Add items, manage quantities
- **Order Management** - Complete checkout flow
- **Payment Integration** - Stripe, Razorpay, COD
- **Wishlist** - Save favorite items
- **Responsive Design** - Mobile-friendly interface
- **Search & Filter** - Find products easily
- **Order Tracking** - Monitor order status

## 🌟 Getting Started with Development

1. **Set up your development environment**
2. **Configure environment variables**
3. **Start MongoDB**
4. **Run `npm run setup`**
5. **Start development servers with `npm run dev`**
6. **Visit `http://localhost:5173`** for frontend
7. **API available at `http://localhost:3001`**

## 📝 License

This project is licensed under the ISC License.

---
🪔 **Naivedya** - Your trusted partner for puja essentials! by Pratik Samanta* 🙏
