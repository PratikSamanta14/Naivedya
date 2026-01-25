import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  Calendar,
  IndianRupee,
  MapPin,
  User
} from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2026-01-20",
    status: "delivered",
    total: 2450,
    items: 3,
    address: "123 Salt Lake, Kolkata",
    itemsList: [
      { name: "Durga Puja Samagri Set", quantity: 1, price: 1200 },
      { name: "Marigold Garland (Large)", quantity: 2, price: 300 },
      { name: "Sandalwood Incense Sticks", quantity: 1, price: 250 }
    ]
  },
  {
    id: "ORD-002",
    date: "2026-01-15",
    status: "processing",
    total: 1800,
    items: 2,
    address: "456 Park Street, Kolkata",
    itemsList: [
      { name: "Ganesh Puja Combo", quantity: 1, price: 1500 },
      { name: "Coconut (Narial)", quantity: 5, price: 300 }
    ]
  },
  {
    id: "ORD-003",
    date: "2026-01-10",
    status: "shipped",
    total: 3200,
    items: 4,
    address: "789 EM Bypass, Kolkata",
    itemsList: [
      { name: "Lakshmi Puja Essentials", quantity: 1, price: 2000 },
      { name: "Red Roses Bouquet", quantity: 1, price: 500 },
      { name: "Silver Bell", quantity: 2, price: 400 },
      { name: "Camphor Tablets", quantity: 1, price: 300 }
    ]
  },
  {
    id: "ORD-004",
    date: "2026-01-05",
    status: "cancelled",
    total: 950,
    items: 2,
    address: "321 Jadavpur, Kolkata",
    itemsList: [
      { name: "Kali Puja Kit", quantity: 1, price: 700 },
      { name: "Banana Leaves (Large)", quantity: 10, price: 250 }
    ]
  }
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100", text: "Delivered" };
    case "processing":
      return { icon: Clock, color: "text-blue-500", bg: "bg-blue-100", text: "Processing" };
    case "shipped":
      return { icon: Truck, color: "text-purple-500", bg: "bg-purple-100", text: "Shipped" };
    case "cancelled":
      return { icon: XCircle, color: "text-red-500", bg: "bg-red-100", text: "Cancelled" };
    default:
      return { icon: Package, color: "text-gray-500", bg: "bg-gray-100", text: "Unknown" };
  }
};

const Orders = () => {
  const { user } = useAuth();
  // Temporary mock user for testing
  const mockUser = { id: 'test-user', email: 'test@example.com' };
  const currentUser = user || mockUser;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.itemsList.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Temporary bypass for testing - remove this in production
  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <Card className="w-full max-w-md">
  //         <CardContent className="pt-6 text-center">
  //           <p>Please log in to view your orders</p>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track your order history and status</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search orders by ID or item name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-input bg-background rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "You haven't placed any orders yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                          <Badge className={`${statusConfig.bg} ${statusConfig.color} border-0`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig.text}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>{order.items} items</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            <span>{order.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Delivery Address</p>
                          <p className="text-sm text-muted-foreground">{order.address}</p>
                        </div>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Items:</p>
                        <div className="space-y-1">
                          {order.itemsList.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.quantity} × {item.name}
                              </span>
                              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{mockOrders.filter(o => o.status === "delivered").length}</div>
              <div className="text-sm text-muted-foreground">Delivered</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockOrders.filter(o => o.status === "processing").length}</div>
              <div className="text-sm text-muted-foreground">Processing</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{mockOrders.filter(o => o.status === "shipped").length}</div>
              <div className="text-sm text-muted-foreground">Shipped</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{mockOrders.filter(o => o.status === "cancelled").length}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Orders;