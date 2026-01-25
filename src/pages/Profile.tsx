import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit3, 
  Save, 
  Camera,
  Crown,
  Star,
  ShoppingCart,
  Heart,
  Settings
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.user_metadata?.full_name || "User",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
    joinDate: new Date(user?.created_at || "").toLocaleDateString(),
    avatar: user?.user_metadata?.avatar_url || ""
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p>Please log in to view your profile</p>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                      {userData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="absolute bottom-0 right-0 rounded-full p-2"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  {userData.name}
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Member
                  </Badge>
                </CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>New Customer</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{userData.email}</span>
                  </div>
                  
                  {userData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{userData.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined {userData.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your profile details</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} variant="default">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Member Since</Label>
                    <Input
                      id="joinDate"
                      value={userData.joinDate}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> Some information like email cannot be modified for security reasons.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">My Orders</h3>
                  <p className="text-sm text-muted-foreground">View your purchase history</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-3 text-red-500" />
                  <h3 className="font-semibold mb-1">Wishlist</h3>
                  <p className="text-sm text-muted-foreground">Your saved items</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Settings className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-semibold mb-1">Settings</h3>
                  <p className="text-sm text-muted-foreground">Account preferences</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;