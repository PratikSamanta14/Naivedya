import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, MapPin, Menu, X, ChevronDown, LogOut, Settings, UserCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";
const locations = ["Kolkata", "Howrah", "Salt Lake", "Dum Dum", "Barrackpore"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Kolkata");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [cartCount] = useState(3);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={logo} alt="Naivedya" className="h-12 md:h-16 w-auto" />
          </motion.a>

          {/* Location Selector - Desktop */}
          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-muted transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{selectedLocation}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isLocationOpen ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {isLocationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-popover rounded-lg shadow-elevated border border-border overflow-hidden"
                >
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors ${
                        selectedLocation === loc ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search puja samagri, pandits, combos..."
                className="w-full pl-12 pr-4 py-3 h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 md:p-3 rounded-full bg-card hover:bg-muted transition-colors"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-primary text-primary-foreground rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Profile Dropdown */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    console.log('User button clicked, isUserMenuOpen:', isUserMenuOpen);
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex items-center gap-2 p-2 md:p-3 rounded-full bg-card hover:bg-muted transition-colors"
                >
                  <UserCircle className="w-6 h-6 text-foreground" />
                  <span className="text-sm font-medium hidden md:block">
                    {user.email?.split('@')[0] || 'User'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-popover rounded-lg shadow-elevated border border-border overflow-hidden z-[100]"
                    >
                      {/* User Info Header */}
                      <div className="p-4 border-b border-border bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserCircle className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {user.email?.split('@')[0] || 'User'}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                          onClick={() => {
                            console.log('Profile link clicked');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          <User className="w-5 h-5 text-muted-foreground" />
                          <span>My Profile</span>
                        </Link>
                        
                        <Link 
                          to="/orders" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                          onClick={() => {
                            console.log('Orders link clicked');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                          <span>My Orders</span>
                        </Link>
                        
                        <Link 
                          to="/addresses" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                          onClick={() => {
                            console.log('Addresses link clicked');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <span>My Addresses</span>
                        </Link>
                        
                        <Link 
                          to="/wishlist" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                          onClick={() => {
                            console.log('Wishlist link clicked');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          <Heart className="w-5 h-5 text-muted-foreground" />
                          <span>Wishlist</span>
                        </Link>
                        
                        <Link 
                          to="/settings" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                          onClick={() => {
                            console.log('Settings link clicked');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          <Settings className="w-5 h-5 text-muted-foreground" />
                          <span>Account Settings</span>
                        </Link>
                        
                        <hr className="my-2 border-border" />
                        
                        <button
                          onClick={async () => {
                            console.log('Logout button clicked');
                            await signOut();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-muted transition-colors text-destructive hover:text-destructive"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Click outside to close */}
                {isUserMenuOpen && (
                  <div 
                    className="fixed inset-0 z-50"
                    onClick={() => {
                      console.log('Click outside detected');
                      setIsUserMenuOpen(false);
                    }}
                  />
                )}
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex p-3 rounded-full bg-card hover:bg-muted transition-colors"
              >
                <User className="w-6 h-6 text-foreground" />
              </motion.button>
            )}

            {/* Login/Logout Button - Desktop */}
            {user ? (
              <Button variant="festive" className="hidden md:flex" onClick={() => signOut()}>
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="festive" className="hidden md:flex">
                  Login
                </Button>
              </Link>
            )}
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-card"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search puja, samagri, pandit..."
              className="w-full pl-12 pr-4 py-2 bg-card"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-popover border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Location */}
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Select Location</span>
                <div className="flex flex-wrap gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedLocation === loc
                          ? "bg-primary text-primary-foreground"
                          : "bg-card hover:bg-muted"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nav Links */}
              <nav className="space-y-2">
                {["Festival Combos", "Puja Samagri", "Book Pandit", "Puja Knowledge"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* User Profile Section - Mobile */}
              {user && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {user.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  
                  <nav className="mt-3 space-y-1">
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <User className="w-5 h-5 text-muted-foreground" />
                      <span>My Profile</span>
                    </Link>
                    
                    <Link 
                      to="/orders" 
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                      <span>My Orders</span>
                    </Link>
                    
                    <Link 
                      to="/addresses" 
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span>My Addresses</span>
                    </Link>
                    
                    <Link 
                      to="/wishlist" 
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Heart className="w-5 h-5 text-muted-foreground" />
                      <span>Wishlist</span>
                    </Link>
                    
                    <Link 
                      to="/settings" 
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Settings className="w-5 h-5 text-muted-foreground" />
                      <span>Account Settings</span>
                    </Link>
                  </nav>
                </div>
              )}

              {user ? (
                <Button variant="festive" className="w-full" onClick={() => signOut()}>
                  Logout
                </Button>
              ) : (
                <Link to="/auth">
                  <Button variant="festive" className="w-full">
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
