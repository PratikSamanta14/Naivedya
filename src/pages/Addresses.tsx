import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  MapPin, 
  Phone, 
  User, 
  Building,
  Home,
  Landmark,
  Star
} from "lucide-react";

// Mock address data
const mockAddresses = [
  {
    id: 1,
    type: "home",
    name: "Home Address",
    recipient: "Amit Sharma",
    phone: "+91 98765 43210",
    address: "Flat 201, Tower A, Skyline Apartments",
    street: "Salt Lake Sector V",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700091",
    landmark: "Near City Center Mall",
    isDefault: true
  },
  {
    id: 2,
    type: "work",
    name: "Office Address",
    recipient: "Amit Sharma",
    phone: "+91 98765 43210",
    address: "15th Floor, Tech Park",
    street: "EM Bypass",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700091",
    landmark: "Opposite Infosys Building",
    isDefault: false
  },
  {
    id: 3,
    type: "other",
    name: "Parent's House",
    recipient: "Ramesh Sharma",
    phone: "+91 98310 12345",
    address: "12 Green Park Road",
    street: "Park Street Area",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700016",
    landmark: "Near Oxford Bookstore",
    isDefault: false
  }
];

const getAddressIcon = (type: string) => {
  switch (type) {
    case "home": return Home;
    case "work": return Building;
    case "other": return MapPin;
    default: return MapPin;
  }
};

const getAddressTypeLabel = (type: string) => {
  switch (type) {
    case "home": return "Home";
    case "work": return "Work";
    case "other": return "Other";
    default: return "Address";
  }
};

const Addresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(mockAddresses);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    type: "home",
    name: "",
    recipient: "",
    phone: "",
    address: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: ""
  });

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      type: "home",
      name: "",
      recipient: "",
      phone: "",
      address: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      landmark: ""
    });
  };

  const handleEdit = (address: typeof mockAddresses[0]) => {
    setEditingId(address.id);
    setIsAdding(false);
    setFormData({
      type: address.type,
      name: address.name,
      recipient: address.recipient,
      phone: address.phone,
      address: address.address,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      landmark: address.landmark
    });
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSubmit = () => {
    if (editingId) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingId ? { ...addr, ...formData } : addr
      ));
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Math.max(...addresses.map(a => a.id)) + 1,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddress]);
    }
    
    setIsAdding(false);
    setEditingId(null);
  };

  const setAsDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p>Please log in to manage your addresses</p>
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
              <h1 className="text-3xl font-bold text-foreground mb-2">My Addresses</h1>
              <p className="text-muted-foreground">Manage your delivery addresses</p>
            </div>
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Address Form */}
          {(isAdding || editingId !== null) && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingId ? "Edit Address" : "Add New Address"}
                  </CardTitle>
                  <CardDescription>
                    {editingId ? "Update your address details" : "Enter a new delivery address"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Type</Label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label>Name (Label)</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g., Home Address"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Recipient Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        value={formData.recipient}
                        onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                        placeholder="Full name"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 XXXXX XXXXX"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Building/Apartment</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Building name, apartment number"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Street/Area</Label>
                    <Textarea
                      value={formData.street}
                      onChange={(e) => setFormData({...formData, street: e.target.value})}
                      placeholder="Street name, area, colony"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>City</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Pincode</Label>
                      <Input
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                        placeholder="Pincode"
                      />
                    </div>
                    <div>
                      <Label>Nearby Landmark</Label>
                      <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        value={formData.landmark}
                        onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                        placeholder="Landmark"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSubmit} className="flex-1">
                      {editingId ? "Update Address" : "Save Address"}
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }} 
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Addresses List */}
          <div className={isAdding || editingId !== null ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => {
                const IconComponent = getAddressIcon(address.type);
                return (
                  <Card key={address.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-primary" />
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {address.name}
                              {address.isDefault && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current" />
                                  Default
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription>
                              {getAddressTypeLabel(address.type)} Address
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{address.recipient}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{address.phone}</span>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p>{address.address}</p>
                            <p>{address.street}</p>
                            <p>{address.city}, {address.state} - {address.pincode}</p>
                            {address.landmark && (
                              <p className="text-muted-foreground">Near {address.landmark}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(address)}
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        
                        {!address.isDefault && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setAsDefault(address.id)}
                          >
                            <Star className="w-3 h-3 mr-1" />
                            Make Default
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(address.id)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {addresses.length === 0 && !isAdding && (
              <Card>
                <CardContent className="p-12 text-center">
                  <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No addresses yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add your first delivery address to get started
                  </p>
                  <Button onClick={handleAddNew}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresses;