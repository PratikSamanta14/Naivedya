import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ShoppingCart, 
  Share2, 
  Trash2, 
  IndianRupee,
  Star,
  Filter
} from "lucide-react";

// Mock wishlist data
const mockWishlist = [
  {
    id: 1,
    name: "Premium Durga Puja Samagri Set",
    price: 1200,
    originalPrice: 1500,
    discount: 20,
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    category: "Puja Samagri"
  },
  {
    id: 2,
    name: "Marigold Garland (Large Pack)",
    price: 300,
    originalPrice: 350,
    discount: 14,
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    category: "Flowers & Garlands"
  },
  {
    id: 3,
    name: "Designer Diya Set (12 Pieces)",
    price: 450,
    originalPrice: 600,
    discount: 25,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 203,
    inStock: false,
    category: "Decorations"
  },
  {
    id: 4,
    name: "Organic Prasad Box (Mixed)",
    price: 280,
    originalPrice: 320,
    discount: 12,
    image: "https://images.unsplash.com/photo-1551789645-ec0a0caf5e6c?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    category: "Prasad & Sweets"
  }
];

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  const filteredAndSortedWishlist = [...wishlist]
    .filter(item => filterBy === "all" || item.category === filterBy)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const moveToCart = (id: number) => {
    // In a real app, this would add to cart
    console.log(`Moved item ${id} to cart`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p>Please log in to view your wishlist</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Heart className="w-8 h-8 text-red-500 fill-current" />
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {wishlist.length} items saved for later
              </p>
            </div>
            
            {wishlist.length > 0 && (
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-input bg-background rounded-md px-3 py-2 text-sm"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="border border-input bg-background rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="Puja Samagri">Puja Samagri</option>
                  <option value="Flowers & Garlands">Flowers & Garlands</option>
                  <option value="Decorations">Decorations</option>
                  <option value="Prasad & Sweets">Prasad & Sweets</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-4">
                Start adding items you love to your wishlist
              </p>
              <Button>Browse Products</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedWishlist.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {item.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        {item.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base line-clamp-2">{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-lg font-bold">{item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{item.rating}</span>
                        <span className="text-xs text-muted-foreground">({item.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        disabled={!item.inStock}
                        onClick={() => moveToCart(item.id)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Summary */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Wishlist Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{wishlist.length}</div>
                    <div className="text-sm text-muted-foreground">Total Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{wishlist.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round(wishlist.reduce((sum, item) => sum + item.discount, 0) / wishlist.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Average Savings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;