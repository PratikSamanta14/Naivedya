// import { motion } from "framer-motion";
// import { Star, Calendar, MapPin, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const pandits = [
//   {
//     id: 1,
//     name: "Pandit Ramesh Bhattacharya",
//     experience: "25+ years",
//     specialization: "Bengali Puja, Vivah, Grihapravesh",
//     languages: ["Bengali", "Hindi", "Sanskrit"],
//     rating: 4.9,
//     reviews: 342,
//     available: true,
//     image: "👳",
//   },
//   {
//     id: 2,
//     name: "Pandit Subir Chakraborty",
//     experience: "18 years",
//     specialization: "Durga Puja, Lakshmi Puja, Saraswati Puja",
//     languages: ["Bengali", "Hindi"],
//     rating: 4.8,
//     reviews: 256,
//     available: true,
//     image: "🧔",
//   },
//   {
//     id: 3,
//     name: "Pandit Arup Mukherjee",
//     experience: "30+ years",
//     specialization: "Kali Puja, Shiva Ratri, Satyanarayan",
//     languages: ["Bengali", "Sanskrit"],
//     rating: 5.0,
//     reviews: 489,
//     available: false,
//     image: "👨‍🦳",
//   },
//   {
//     id: 4,
//     name: "Pandit Debashis Banerjee",
//     experience: "12 years",
//     specialization: "Marriage Ceremonies, Annaprashan",
//     languages: ["Bengali", "Hindi", "English"],
//     rating: 4.7,
//     reviews: 178,
//     available: true,
//     image: "🧑",
//   },
// ];

// const PanditSection = () => {
//   return (
//     <section className="py-12 md:py-16 bg-card">
//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
//           <div>
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-sm font-medium text-primary uppercase tracking-wider mb-2"
//             >
//               👳 Verified Priests
//             </motion.p>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
//             >
//               Book a Pandit
//             </motion.h2>
//           </div>
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <Button variant="ghost" className="group text-primary hover:text-primary/80">
//               View All Pandits
//               <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </motion.div>
//         </div>

//         {/* Pandits Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {pandits.map((pandit, index) => (
//             <motion.div
//               key={pandit.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-background rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 group"
//             >
//               {/* Image / Avatar */}
//               <div className="relative h-32 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
//                 <span className="text-6xl">{pandit.image}</span>

//                 {/* Availability Badge */}
//                 <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full ${
//                   pandit.available 
//                     ? "bg-success/20 text-success" 
//                     : "bg-muted text-muted-foreground"
//                 }`}>
//                   {pandit.available ? "Available" : "Booked"}
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-4">
//                 <h3 className="font-heading text-lg font-bold text-foreground mb-1 line-clamp-1">
//                   {pandit.name}
//                 </h3>

//                 <p className="text-xs text-muted-foreground mb-2">{pandit.experience} experience</p>

//                 {/* Rating */}
//                 <div className="flex items-center gap-1 mb-3">
//                   <Star className="w-4 h-4 fill-secondary text-secondary" />
//                   <span className="text-sm font-semibold">{pandit.rating}</span>
//                   <span className="text-xs text-muted-foreground">({pandit.reviews} reviews)</span>
//                 </div>

//                 {/* Specialization */}
//                 <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
//                   {pandit.specialization}
//                 </p>

//                 {/* Languages */}
//                 <div className="flex flex-wrap gap-1 mb-4">
//                   {pandit.languages.map((lang) => (
//                     <span
//                       key={lang}
//                       className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full"
//                     >
//                       {lang}
//                     </span>
//                   ))}
//                 </div>

//                 {/* CTA */}
//                 <Button 
//                   variant={pandit.available ? "festive" : "outline"} 
//                   size="sm" 
//                   className="w-full"
//                   disabled={!pandit.available}
//                 >
//                   <Calendar className="w-4 h-4 mr-2" />
//                   {pandit.available ? "Book Now" : "Check Later"}
//                 </Button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PanditSection;
import { motion } from "framer-motion";
import { Star, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const pandits = [
  {
    id: "p1",
    name: "Pandit Ramesh Bhattacharya",
    experience: "25+ years",
    specialization: "Bengali Puja, Vivah, Grihapravesh",
    languages: ["Bengali", "Hindi", "Sanskrit"],
    rating: 4.9,
    reviews: 342,
    available: true,
    image: "https://images.unsplash.com/photo-1594901967204-63eedfbf6ba0?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "p2",
    name: "Pandit Subir Chakraborty",
    experience: "18 years",
    specialization: "Durga Puja, Lakshmi Puja, Saraswati Puja",
    languages: ["Bengali", "Hindi"],
    rating: 4.8,
    reviews: 256,
    available: true,
    image: "https://images.unsplash.com/photo-1620294977931-778eaee033bc?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "p3",
    name: "Pandit Arup Mukherjee",
    experience: "30+ years",
    specialization: "Kali Puja, Shiva Ratri, Satyanarayan",
    languages: ["Bengali", "Sanskrit"],
    rating: 5.0,
    reviews: 489,
    available: false,
    image: "https://images.unsplash.com/photo-1563240619-44ce0ceebcf0?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "p4",
    name: "Pandit Debashis Banerjee",
    experience: "12 years",
    specialization: "Marriage Ceremonies, Annaprashan",
    languages: ["Bengali", "Hindi", "English"],
    rating: 4.7,
    reviews: 178,
    available: true,
    image: "https://images.unsplash.com/photo-1542178243-78f7d98be7d2?auto=format&fit=crop&q=80&w=600",
  },
];

const PanditSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              👳 Verified Priests
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Book a Pandit
            </h2>
          </div>

          <Button
            variant="ghost"
            className="group text-primary"
            onClick={() => navigate("/book-pandit")}
          >
            View All Pandits
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Pandit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pandits.map((pandit) => (
            <motion.div
              key={pandit.id}
              whileHover={{ y: -6 }}
              className="bg-background rounded-2xl border shadow-soft hover:shadow-card transition"
            >
              <div className="h-32 bg-muted flex items-center justify-center relative overflow-hidden">
                <img src={pandit.image} alt={pandit.name} className="w-full h-full object-cover" />
                <span
                  className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full ${pandit.available
                    ? "bg-success/20 text-success"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {pandit.available ? "Available" : "Booked"}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{pandit.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {pandit.experience} experience
                </p>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="text-sm font-semibold">{pandit.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({pandit.reviews})
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {pandit.specialization}
                </p>

                <Button
                  size="sm"
                  className="w-full"
                  variant={pandit.available ? "festive" : "outline"}
                  disabled={!pandit.available}
                  onClick={() => navigate(`/pandit/${pandit.id}`)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {pandit.available ? "Book Now" : "Check Later"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PanditSection;
