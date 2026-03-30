import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Languages, 
  BadgeCheck, 
  CheckCircle, 
  Shield,
  AlertTriangle,
  IndianRupee,
  Users,
  Play,
  Phone,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PanditProfile {
  id: string;
  name: string;
  photo: string;
  location: string;
  languages: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  status: "available_today" | "available_soon" | "booked";
  specializations: string[];
  baseCharge: number;
  travelCharge?: number;
  duration: string;
  samagriIncluded: boolean;
  availability: {
    date: string;
    slots: string[];
    bookedSlots: string[];
  }[];
  reviews: {
    rating: number;
    comment: string;
    pujaType: string;
    date: string;
  }[];
  verified: boolean;
  backgroundCheck: boolean;
  devoteeVerified: boolean;
  videoIntro?: string;
  audioSample?: string;
}

interface PanditProfileModalProps {
  pandit: PanditProfile | null;
  open: boolean;
  onClose: () => void;
  onBook: () => void;
}

const PanditProfileModal = ({ pandit, open, onClose, onBook }: PanditProfileModalProps) => {
  if (!pandit) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-heading text-2xl font-bold">{pandit.name}</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-muted">
                  <AlertTriangle className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  {/* Basic Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl">
                      {pandit.photo}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{pandit.rating}</span>
                          <span className="text-sm text-muted-foreground">({pandit.reviewCount} reviews)</span>
                        </div>
                        
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          pandit.status === "available_today" 
                            ? "bg-green-100 text-green-800" 
                            : pandit.status === "available_soon" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-red-100 text-red-800"
                        }`}>
                          {pandit.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {pandit.location}
                      </div>
                      
                      <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
                        <Languages className="w-4 h-4" />
                        {pandit.languages.join(", ")}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {pandit.specializations.map(spec => (
                          <span key={spec} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Experience and Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Experience</span>
                      </div>
                      <div className="text-lg font-bold">{pandit.experience} years</div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <IndianRupee className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Starting From</span>
                      </div>
                      <div className="text-lg font-bold">₹{pandit.baseCharge}</div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Trust Indicators</h3>
                    <div className="flex flex-wrap gap-3">
                      {pandit.verified && (
                        <div className="flex items-center gap-1 text-sm">
                          <BadgeCheck className="w-4 h-4 text-green-500" />
                          <span>ID Verified</span>
                        </div>
                      )}
                      {pandit.backgroundCheck && (
                        <div className="flex items-center gap-1 text-sm">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span>Background Checked</span>
                        </div>
                      )}
                      {pandit.devoteeVerified && (
                        <div className="flex items-center gap-1 text-sm">
                          <CheckCircle className="w-4 h-4 text-purple-500" />
                          <span>Devotee Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Recent Reviews</h3>
                    <div className="space-y-3">
                      {pandit.reviews.slice(0, 2).map((review, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.pujaType}</span>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                          <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Contact Options */}
                  <div className="border rounded-xl p-4">
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border rounded-xl p-4">
                    <h3 className="font-semibold mb-3">Pricing</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Puja Charge:</span>
                        <span>₹{pandit.baseCharge}</span>
                      </div>
                      {pandit.travelCharge && (
                        <div className="flex justify-between">
                          <span>Travel:</span>
                          <span>₹{pandit.travelCharge}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{pandit.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Samagri:</span>
                        <span>{pandit.samagriIncluded ? "Included" : "Not Included"}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t mt-2">
                        <span>Total:</span>
                        <span>₹{pandit.baseCharge + (pandit.travelCharge || 0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="border rounded-xl p-4">
                    <h3 className="font-semibold mb-3">Availability</h3>
                    <div className="space-y-2 text-sm">
                      {pandit.availability.slice(0, 3).map((avail, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{new Date(avail.date).toLocaleDateString()}</span>
                          <span>{avail.slots.length - avail.bookedSlots.length} slots</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    onClick={onBook}
                  >
                    Book This Pandit
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PanditProfileModal;