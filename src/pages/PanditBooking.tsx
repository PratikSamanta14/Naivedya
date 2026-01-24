
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   Star,
//   Phone,
//   MessageSquare,
//   MapPin,
//   Calendar,
//   Languages,
//   BadgeCheck,
//   CheckCircle,
//   Shield,
//   AlertTriangle,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { useToast } from "@/hooks/use-toast";

// /* ---------------- TYPES ---------------- */

// interface PanditProfile {
//   id: string;
//   name: string;
//   photo: string;
//   location: string;
//   languages: string[];
//   experience: number;
//   rating: number;
//   reviewCount: number;
//   status: "available_today" | "available_soon" | "booked";
//   specializations: string[];
//   baseCharge: number;
//   travelCharge?: number;
//   duration: string;
//   samagriIncluded: boolean;
//   availability: {
//     date: string;
//     slots: string[];
//     bookedSlots: string[];
//   }[];
//   reviews: {
//     rating: number;
//     comment: string;
//     pujaType: string;
//     date: string;
//   }[];
//   verified: boolean;
//   backgroundCheck: boolean;
//   devoteeVerified: boolean;
// }

// /* ---------------- DATA ---------------- */

// const panditProfiles: PanditProfile[] = [
//   {
//     id: "p1",
//     name: "Pandit Rajesh Sharma",
//     photo: "👳",
//     location: "Kolkata, Salt Lake",
//     languages: ["Bengali", "Hindi", "Sanskrit"],
//     experience: 15,
//     rating: 4.9,
//     reviewCount: 128,
//     status: "available_today",
//     specializations: ["Wedding", "Durga Puja", "Griha Pravesh"],
//     baseCharge: 5000,
//     travelCharge: 500,
//     duration: "3–4 hours",
//     samagriIncluded: false,
//     availability: [
//       { date: "2024-01-25", slots: ["09:00 AM", "11:00 AM", "02:00 PM"], bookedSlots: ["02:00 PM"] },
//       { date: "2024-01-26", slots: ["10:00 AM", "01:00 PM"], bookedSlots: [] },
//     ],
//     reviews: [
//       { rating: 5, comment: "Performed Bengali wedding rituals perfectly.", pujaType: "Wedding", date: "2024-01-10" },
//     ],
//     verified: true,
//     backgroundCheck: true,
//     devoteeVerified: true,
//   },
//   {
//     id: "p2",
//     name: "Pandit Mukesh Das",
//     photo: "👨‍🦳",
//     location: "Kolkata, Dum Dum",
//     languages: ["Bengali", "Hindi"],
//     experience: 12,
//     rating: 4.8,
//     reviewCount: 95,
//     status: "available_soon",
//     specializations: ["Shradh", "Tarpan"],
//     baseCharge: 3500,
//     travelCharge: 300,
//     duration: "2–3 hours",
//     samagriIncluded: false,
//     availability: [
//       { date: "2024-01-26", slots: ["09:00 AM", "01:00 PM"], bookedSlots: ["09:00 AM"] },
//     ],
//     reviews: [
//       { rating: 5, comment: "Handled Shradh rituals respectfully.", pujaType: "Shradh", date: "2024-01-08" },
//     ],
//     verified: true,
//     backgroundCheck: true,
//     devoteeVerified: false,
//   },
// ];

// /* ---------------- COMPONENT ---------------- */

// const PanditBooking = () => {
//   const { id } = useParams();
//   const { toast } = useToast();

//   const [selectedPandit, setSelectedPandit] = useState<PanditProfile | null>(null);
//   const [showBookingModal, setShowBookingModal] = useState(false);

//   /*  AUTO OPEN MODAL WHEN COMING FROM HOME */
//   useEffect(() => {
//     if (id) {
//       const pandit = panditProfiles.find((p) => p.id === id);
//       if (pandit) {
//         setSelectedPandit(pandit);
//         setShowBookingModal(true);
//       }
//     }
//   }, [id]);

//   const handleBook = (pandit: PanditProfile) => {
//     setSelectedPandit(pandit);
//     setShowBookingModal(true);
//   };

//   const confirmBooking = () => {
//     if (!selectedPandit) return;
//     toast({
//       title: "Booking Confirmed ",
//       description: `Your booking with ${selectedPandit.name} has been successfully confirmed.`,
//     });
//     setShowBookingModal(false);
//     setSelectedPandit(null);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       <Header />

//       <main className="flex-1">
//         {/* HERO */}
//         <div className="border-b bg-gradient-to-br from-primary/10 to-secondary/10">
//           <div className="container mx-auto px-4 py-8">
//             <Link to="/" className="flex items-center gap-2 text-primary mb-4">
//               <ArrowLeft className="w-4 h-4" /> Back to Home
//             </Link>
//             <h1 className="font-heading text-3xl font-bold">Book Pandit</h1>
//             <p className="text-muted-foreground">Verified pandits for every puja</p>
//           </div>
//         </div>

//         {/* LISTING */}
//         <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
//           {panditProfiles.map((pandit) => (
//             <motion.div
//               key={pandit.id}
//               whileHover={{ y: -6 }}
//               className="bg-card border rounded-xl p-5 shadow-soft"
//             >
//               <div className="flex gap-4">
//                 <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
//                   {pandit.photo}
//                 </div>

//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg">{pandit.name}</h3>
//                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                     <MapPin className="w-4 h-4" /> {pandit.location}
//                   </div>

//                   <div className="flex items-center gap-1 mt-1">
//                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                     <span>{pandit.rating}</span>
//                     <span className="text-xs text-muted-foreground">
//                       ({pandit.reviewCount})
//                     </span>
//                   </div>

//                   <div className="flex flex-wrap gap-1 mt-2">
//                     {pandit.specializations.map((s) => (
//                       <span key={s} className="px-2 py-1 text-xs bg-primary/10 rounded-full">
//                         {s}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="mt-3 flex justify-between items-center">
//                     <span className="font-bold text-primary">₹{pandit.baseCharge}</span>
//                     <Button size="sm" onClick={() => handleBook(pandit)}>
//                       Book Now
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {/* Trust */}
//               <div className="flex gap-3 mt-4 text-xs text-muted-foreground">
//                 {pandit.verified && (
//                   <span className="flex items-center gap-1">
//                     <BadgeCheck className="w-4 h-4 text-green-500" /> ID Verified
//                   </span>
//                 )}
//                 {pandit.backgroundCheck && (
//                   <span className="flex items-center gap-1">
//                     <Shield className="w-4 h-4 text-blue-500" /> Background Checked
//                   </span>
//                 )}
//                 {pandit.devoteeVerified && (
//                   <span className="flex items-center gap-1">
//                     <CheckCircle className="w-4 h-4 text-purple-500" /> Devotee Verified
//                   </span>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </main>

//       {/* BOOKING MODAL */}
//       <AnimatePresence>
//         {showBookingModal && selectedPandit && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="bg-card rounded-xl p-6 max-w-md w-full"
//             >
//               <div className="flex justify-between mb-4">
//                 <h3 className="font-bold text-xl">Confirm Booking</h3>
//                 <button onClick={() => setShowBookingModal(false)}>
//                   <AlertTriangle />
//                 </button>
//               </div>

//               <p className="mb-2 font-medium">{selectedPandit.name}</p>
//               <p className="text-sm text-muted-foreground mb-4">
//                 {selectedPandit.location}
//               </p>

//               <div className="border-t pt-4 space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span>Puja Charge</span>
//                   <span>₹{selectedPandit.baseCharge}</span>
//                 </div>
//                 {selectedPandit.travelCharge && (
//                   <div className="flex justify-between">
//                     <span>Travel Charge</span>
//                     <span>₹{selectedPandit.travelCharge}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>
//                     ₹
//                     {selectedPandit.baseCharge +
//                       (selectedPandit.travelCharge || 0)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex gap-3 mt-6">
//                 <Button variant="outline" className="flex-1" onClick={() => setShowBookingModal(false)}>
//                   Cancel
//                 </Button>
//                 <Button className="flex-1" onClick={confirmBooking}>
//                   Confirm
//                 </Button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <Footer />
//     </div>
//   );
// };

// export default PanditBooking;
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Star, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Calendar, 
  Clock, 
  Languages, 
  BadgeCheck, 
  CheckCircle, 
  AlertTriangle,
  Users,
  IndianRupee,
  Shield,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

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

const panditProfiles: PanditProfile[] = [
  {
    id: "p1",
    name: "Pandit Rajesh Sharma",
    photo: "👳",
    location: "Kolkata, Salt Lake",
    languages: ["Bengali", "Hindi", "Sanskrit"],
    experience: 15,
    rating: 4.9,
    reviewCount: 128,
    status: "available_today",
    specializations: ["Wedding", "Durga Puja", "Griha Pravesh"],
    baseCharge: 5000,
    travelCharge: 500,
    duration: "3-4 hours",
    samagriIncluded: false,
    availability: [
      { date: "2024-01-25", slots: ["09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"], bookedSlots: ["02:00 PM"] },
      { date: "2024-01-26", slots: ["10:00 AM", "01:00 PM", "04:00 PM", "06:00 PM"], bookedSlots: [] },
      { date: "2024-01-27", slots: ["09:30 AM", "12:00 PM", "03:00 PM", "05:30 PM"], bookedSlots: ["09:30 AM", "12:00 PM"] },
    ],
    reviews: [
      { rating: 5, comment: "Performed Bengali wedding rituals perfectly.", pujaType: "Wedding", date: "2024-01-10" },
      { rating: 5, comment: "Very knowledgeable and experienced.", pujaType: "Durga Puja", date: "2024-01-05" },
      { rating: 4, comment: "Professional and punctual.", pujaType: "Griha Pravesh", date: "2024-01-01" },
    ],
    verified: true,
    backgroundCheck: true,
    devoteeVerified: true,
    videoIntro: "https://example.com/video",
    audioSample: "https://example.com/audio"
  },
  {
    id: "p2",
    name: "Pandit Mukesh Das",
    photo: "👨‍🦳",
    location: "Kolkata, Dum Dum",
    languages: ["Bengali", "Hindi"],
    experience: 12,
    rating: 4.8,
    reviewCount: 95,
    status: "available_soon",
    specializations: ["Shradh", "Tarpan", "Death Rituals"],
    baseCharge: 3500,
    travelCharge: 300,
    duration: "2-3 hours",
    samagriIncluded: false,
    availability: [
      { date: "2024-01-25", slots: ["10:00 AM", "02:00 PM", "04:00 PM"], bookedSlots: [] },
      { date: "2024-01-26", slots: ["09:00 AM", "01:00 PM", "05:00 PM"], bookedSlots: ["09:00 AM"] },
      { date: "2024-01-27", slots: ["11:00 AM", "03:00 PM", "06:00 PM"], bookedSlots: [] },
    ],
    reviews: [
      { rating: 5, comment: "Helped us with shradh ceremony perfectly.", pujaType: "Shradh", date: "2024-01-12" },
      { rating: 4, comment: "Respectful and knowledgeable.", pujaType: "Tarpan", date: "2024-01-08" },
    ],
    verified: true,
    backgroundCheck: true,
    devoteeVerified: false,
  },
  {
    id: "p3",
    name: "Pandit Arjun Chatterjee",
    photo: "👴",
    location: "Howrah, City Center",
    languages: ["Bengali", "Hindi", "Sanskrit"],
    experience: 20,
    rating: 5.0,
    reviewCount: 210,
    status: "available_today",
    specializations: ["Wedding", "Griha Pravesh", "Lakshmi Puja"],
    baseCharge: 6000,
    travelCharge: 700,
    duration: "4-5 hours",
    samagriIncluded: true,
    availability: [
      { date: "2024-01-25", slots: ["08:00 AM", "11:00 AM", "03:00 PM", "06:00 PM"], bookedSlots: [] },
      { date: "2024-01-26", slots: ["09:00 AM", "02:00 PM", "05:00 PM"], bookedSlots: ["09:00 AM", "02:00 PM"] },
      { date: "2024-01-27", slots: ["10:00 AM", "01:00 PM", "04:00 PM"], bookedSlots: [] },
    ],
    reviews: [
      { rating: 5, comment: "Perfect wedding ceremonies, very traditional.", pujaType: "Wedding", date: "2024-01-15" },
      { rating: 5, comment: "Brought prosperity to our home.", pujaType: "Griha Pravesh", date: "2024-01-10" },
    ],
    verified: true,
    backgroundCheck: true,
    devoteeVerified: true,
    videoIntro: "https://example.com/video2",
  },
  {
    id: "p4",
    name: "Pandit Debabrata Ghosh",
    photo: "🧔",
    location: "Kolkata, Park Street",
    languages: ["Bengali", "Hindi", "English"],
    experience: 8,
    rating: 4.7,
    reviewCount: 76,
    status: "booked",
    specializations: ["Durga Puja", "Kali Puja", "Navratri"],
    baseCharge: 4500,
    travelCharge: 400,
    duration: "3-4 hours",
    samagriIncluded: false,
    availability: [
      { date: "2024-01-25", slots: ["09:00 AM", "11:00 AM", "03:00 PM"], bookedSlots: ["09:00 AM", "11:00 AM", "03:00 PM"] },
      { date: "2024-01-26", slots: ["10:00 AM", "02:00 PM", "05:00 PM"], bookedSlots: ["10:00 AM", "02:00 PM", "05:00 PM"] },
      { date: "2024-01-27", slots: ["08:00 AM", "12:00 PM", "04:00 PM"], bookedSlots: ["08:00 AM", "12:00 PM", "04:00 PM"] },
    ],
    reviews: [
      { rating: 5, comment: "Beautiful Durga Puja, very spiritual.", pujaType: "Durga Puja", date: "2024-01-05" },
      { rating: 4, comment: "Knowledgeable about rituals.", pujaType: "Kali Puja", date: "2024-01-02" },
    ],
    verified: true,
    backgroundCheck: false,
    devoteeVerified: true,
  },
  {
    id: "p5",
    name: "Pandit Sumit Sinha",
    photo: "👨‍🦰",
    location: "Kolkata, New Town",
    languages: ["Bengali", "Hindi"],
    experience: 5,
    rating: 4.6,
    reviewCount: 54,
    status: "available_today",
    specializations: ["Griha Pravesh", "Lakshmi Puja", "Satyanarayan Katha"],
    baseCharge: 3000,
    travelCharge: 200,
    duration: "2-3 hours",
    samagriIncluded: false,
    availability: [
      { date: "2024-01-25", slots: ["10:00 AM", "02:00 PM", "04:00 PM"], bookedSlots: ["10:00 AM"] },
      { date: "2024-01-26", slots: ["09:00 AM", "01:00 PM", "05:00 PM"], bookedSlots: [] },
      { date: "2024-01-27", slots: ["11:00 AM", "03:00 PM", "06:00 PM"], bookedSlots: [] },
    ],
    reviews: [
      { rating: 5, comment: "Affordable and professional service.", pujaType: "Griha Pravesh", date: "2024-01-08" },
      { rating: 4, comment: "Good experience overall.", pujaType: "Lakshmi Puja", date: "2024-01-03" },
    ],
    verified: true,
    backgroundCheck: true,
    devoteeVerified: false,
  }
];

const pujaTypes = [
  "Wedding", "Lakshmi Puja", "Shradh", "Durga Puja", "Griha Pravesh", 
  "Kali Puja", "Satyanarayan Katha", "Navratri", "Tarpan", "Ganesh Puja"
];

const locations = [
  "Kolkata", "Howrah", "Salt Lake", "Dum Dum", "Park Street", 
  "New Town", "Baranagar", "Ballygunge", "Behala", "Jadavpur"
];

const languages = ["Bengali", "Hindi", "Sanskrit", "English"];

const PanditBooking = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Smart matching state
  const [selectedPuja, setSelectedPuja] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showSmartMatch, setShowSmartMatch] = useState(false);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [filterExperience, setFilterExperience] = useState<[number, number]>([0, 30]);
  const [filterRating, setFilterRating] = useState(0);
  const [filterStatus, setFilterStatus] = useState("");
  
  // Selected pandit state
  const [selectedPandit, setSelectedPandit] = useState<PanditProfile | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Get all unique specializations
  const allSpecializations = Array.from(
    new Set(panditProfiles.flatMap(p => p.specializations))
  );

  // Filter pandits based on smart matching
  const getSmartMatchedPandits = (): PanditProfile[] => {
    if (!selectedPuja && !selectedLocation && !selectedLanguage) return [];

    return panditProfiles
      .filter(pandit => {
        // Match puja type
        const pujaMatch = !selectedPuja || pandit.specializations.includes(selectedPuja);
        
        // Match location
        const locationMatch = !selectedLocation || pandit.location.toLowerCase().includes(selectedLocation.toLowerCase());
        
        // Match language
        const languageMatch = !selectedLanguage || pandit.languages.includes(selectedLanguage);
        
        // Check if pandit is available on selected date
        const dateMatch = !selectedDate || pandit.availability.some(avail => avail.date === selectedDate);
        
        return pujaMatch && locationMatch && languageMatch && dateMatch;
      })
      .sort((a, b) => {
        // Prioritize by:
        // 1. Specialization match
        const aSpecMatch = a.specializations.includes(selectedPuja) ? 1 : 0;
        const bSpecMatch = b.specializations.includes(selectedPuja) ? 1 : 0;
        
        // 2. Location proximity (simplified)
        const aLocMatch = selectedLocation && a.location.toLowerCase().includes(selectedLocation.toLowerCase()) ? 1 : 0;
        const bLocMatch = selectedLocation && b.location.toLowerCase().includes(selectedLocation.toLowerCase()) ? 1 : 0;
        
        // 3. Language match
        const aLangMatch = selectedLanguage && a.languages.includes(selectedLanguage) ? 1 : 0;
        const bLangMatch = selectedLanguage && b.languages.includes(selectedLanguage) ? 1 : 0;
        
        // 4. Rating
        const ratingDiff = b.rating - a.rating;
        
        return (bSpecMatch - aSpecMatch) * 100 + 
               (bLocMatch - aLocMatch) * 10 + 
               (bLangMatch - aLangMatch) * 5 + 
               ratingDiff;
      })
      .slice(0, 3); // Return top 3 matches
  };

  // Filter pandits based on filters
  const filteredPandits = panditProfiles.filter(pandit => {
    const termMatch = pandit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      pandit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      pandit.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const specializationMatch = !filterSpecialization || pandit.specializations.includes(filterSpecialization);
    const experienceMatch = pandit.experience >= filterExperience[0] && pandit.experience <= filterExperience[1];
    const ratingMatch = pandit.rating >= filterRating;
    const statusMatch = !filterStatus || pandit.status === filterStatus;
    
    return termMatch && specializationMatch && experienceMatch && ratingMatch && statusMatch;
  });

  const smartMatchedPandits = getSmartMatchedPandits();

  const handleBookPandit = (pandit: PanditProfile) => {
    setSelectedPandit(pandit);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (selectedPandit) {
      toast({
        title: "Booking Confirmed! 📅",
        description: `Your booking with ${selectedPandit.name} has been confirmed.`,
      });
      setShowBookingModal(false);
      setSelectedPandit(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-2">
              <span className="text-6xl">👳</span>
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  Book Pandit – Expert Puja Performers
                </h1>
                <p className="text-lg text-muted-foreground mt-1">Find and book verified pandits for all Hindu rituals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Smart Matching Section */}
          <div className="bg-card rounded-2xl p-6 mb-8 border-2 border-primary/20 shadow-lg">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">Find the Best Pandit for Your Puja</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Puja Type</label>
                <select
                  value={selectedPuja}
                  onChange={(e) => setSelectedPuja(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="">Select Puja</option>
                  {pujaTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="">Select Location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="">Select Time</option>
                  <option value="morning">Morning (8AM-12PM)</option>
                  <option value="afternoon">Afternoon (12PM-4PM)</option>
                  <option value="evening">Evening (4PM-8PM)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="">Select Language</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="festive" 
                size="lg"
                onClick={() => setShowSmartMatch(true)}
                disabled={!selectedPuja}
              >
                Find Best Matched Pandits
              </Button>
            </div>
          </div>

          {/* Smart Match Results */}
          {showSmartMatch && smartMatchedPandits.length > 0 && (
            <div className="mb-12">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Best matched pandits for your puja</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {smartMatchedPandits.map(pandit => (
                  <motion.div
                    key={pandit.id}
                    whileHover={{ y: -8 }}
                    className="bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer"
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-2xl">
                          {pandit.photo}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-lg text-foreground">{pandit.name}</h3>
                            {pandit.status === "available_today" && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                Available Today
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{pandit.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{pandit.rating}</span>
                            <span className="text-sm text-muted-foreground">({pandit.reviewCount} reviews)</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {pandit.specializations.slice(0, 2).map(spec => (
                              <span key={spec} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                {spec}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-primary">₹{pandit.baseCharge}</span>
                              <span className="text-xs text-muted-foreground"> + travel charges</span>
                            </div>
                            
                            <div className="flex gap-2">
                              <button className="p-2 rounded-full bg-muted hover:bg-muted/80">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-2 rounded-full bg-muted hover:bg-muted/80">
                                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBookPandit(pandit)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Pandit Listing Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Filters</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Search by name or location"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Specialization</label>
                    <select
                      value={filterSpecialization}
                      onChange={(e) => setFilterSpecialization(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    >
                      <option value="">All Specializations</option>
                      {allSpecializations.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Experience (years)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={filterExperience[1]}
                        onChange={(e) => setFilterExperience([filterExperience[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <span className="text-xs">{filterExperience[1]}+</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Rating</label>
                    <select
                      value={filterRating}
                      onChange={(e) => setFilterRating(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    >
                      <option value="0">Any Rating</option>
                      <option value="4">4+ Stars</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    >
                      <option value="">All Statuses</option>
                      <option value="available_today">Available Today</option>
                      <option value="available_soon">Available Soon</option>
                      <option value="booked">Booked</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Pandit Listings */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-xl font-bold text-foreground">Available Pandits</h2>
                <p className="text-sm text-muted-foreground">{filteredPandits.length} pandits found</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPandits.map(pandit => (
                  <motion.div
                    key={pandit.id}
                    whileHover={{ y: -8 }}
                    className="bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer"
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-2xl">
                          {pandit.photo}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-lg text-foreground">{pandit.name}</h3>
                            {pandit.status === "available_today" && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                Available Today
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{pandit.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{pandit.rating}</span>
                            <span className="text-sm text-muted-foreground">({pandit.reviewCount} reviews)</span>
                          </div>
                          
                          <div className="flex items-center gap-1 mb-2">
                            <Languages className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{pandit.languages.join(", ")}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {pandit.specializations.slice(0, 3).map(spec => (
                              <span key={spec} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                {spec}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-primary">₹{pandit.baseCharge}</span>
                              <span className="text-xs text-muted-foreground"> + travel charges</span>
                            </div>
                            
                            <div className="flex gap-2">
                              <button className="p-2 rounded-full bg-muted hover:bg-muted/80">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-4 rounded-full bg-muted hover:bg-muted/80">
                                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Trust indicators */}
                      <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-3">
                        {pandit.verified && (
                          <div className="flex items-center gap-1 text-sm">
                            <BadgeCheck className="w-4 h-4 text-green-500" />
                            <span className="text-muted-foreground">ID Verified</span>
                          </div>
                        )}
                        
                        {pandit.backgroundCheck && (
                          <div className="flex items-center gap-1 text-sm">
                            <Shield className="w-4 h-4 text-blue-500" />
                            <span className="text-muted-foreground">Background Checked</span>
                          </div>
                        )}
                        
                        {pandit.devoteeVerified && (
                          <div className="flex items-center gap-1 text-sm">
                            <CheckCircle className="w-4 h-4 text-purple-500" />
                            <span className="text-muted-foreground">Devotee Verified</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Pricing breakdown */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Base Charge:</span>
                            <span>₹{pandit.baseCharge}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{pandit.duration}</span>
                          </div>
                          {pandit.travelCharge && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Travel:</span>
                              <span>₹{pandit.travelCharge}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Samagri:</span>
                            <span>{pandit.samagriIncluded ? "Included" : "Not Included"}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Availability */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Next Available</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {pandit.availability.slice(0, 2).map((avail, idx) => (
                            <span key={idx} className="px-2 py-1 bg-muted rounded text-xs">
                              {new Date(avail.date).toLocaleDateString()} ({avail.slots.length - avail.bookedSlots.length} slots)
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border flex justify-between">
                        <div>
                          <span className="text-sm text-muted-foreground">Experience:</span>
                          <span className="text-sm font-medium ml-1">{pandit.experience} years</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBookPandit(pandit)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedPandit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-heading text-xl font-bold">Confirm Booking</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="p-1 rounded-full hover:bg-muted"
                >
                  <AlertTriangle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-2xl">
                  {selectedPandit.photo}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{selectedPandit.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedPandit.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{selectedPandit.rating}</span>
                    <span className="text-sm text-muted-foreground">({selectedPandit.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                    {selectedPandit.availability.map((avail, idx) => (
                      <option key={idx} value={avail.date}>
                        {new Date(avail.date).toLocaleDateString()} ({avail.slots.length - avail.bookedSlots.length} slots available)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Select Time Slot</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                    <option value="">Select a slot</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-3">Pricing Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Puja Charge:</span>
                      <span>₹{selectedPandit.baseCharge}</span>
                    </div>
                    {selectedPandit.travelCharge && (
                      <div className="flex justify-between">
                        <span>Travel Charge:</span>
                        <span>₹{selectedPandit.travelCharge}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold pt-2 border-t border-border">
                      <span>Total:</span>
                      <span>₹{selectedPandit.baseCharge + (selectedPandit.travelCharge || 0)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="festive" 
                    className="flex-1"
                    onClick={confirmBooking}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default PanditBooking;
