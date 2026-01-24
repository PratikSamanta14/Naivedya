import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [stage, setStage] = useState<"bike" | "logo" | "complete">("bike");

  useEffect(() => {
    // Bike animation stage - 2 seconds
    const bikeTimer = setTimeout(() => {
      setStage("logo");
    }, 2000);

    // Logo animation stage - 2 seconds
    const logoTimer = setTimeout(() => {
      setStage("complete");
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(bikeTimer);
      clearTimeout(logoTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== "complete" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center overflow-hidden"
        >
          {/* Bike Animation Stage */}
          {stage === "bike" && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Delivery Person on Bike */}
              <motion.div
                initial={{ x: "-100vw", rotate: 0 }}
                animate={{ x: "0vw", rotate: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
                className="relative"
              >
                {/* Simple Bike and Rider Illustration using SVG */}
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="drop-shadow-2xl"
                >
                  {/* Rider Body (Red Kurta) */}
                  <ellipse cx="150" cy="80" rx="25" ry="35" fill="#DC2626" />
                  
                  {/* Head */}
                  <circle cx="150" cy="55" r="15" fill="#FED7AA" />
                  
                  {/* Arms */}
                  <rect x="130" y="85" width="8" height="30" fill="#DC2626" rx="4" transform="rotate(-30 134 85)" />
                  <rect x="162" y="85" width="8" height="30" fill="#DC2626" rx="4" transform="rotate(30 166 85)" />
                  
                  {/* Legs */}
                  <rect x="140" y="110" width="8" height="35" fill="#7C2D12" rx="4" />
                  <rect x="152" y="110" width="8" height="35" fill="#7C2D12" rx="4" />
                  
                  {/* Bike Frame */}
                  <line x1="100" y1="140" x2="180" y2="120" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                  <line x1="120" y1="140" x2="140" y2="100" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                  <line x1="140" y1="100" x2="180" y2="120" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Handlebars */}
                  <line x1="140" y1="100" x2="135" y2="90" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="133" cy="88" r="4" fill="#64748B" />
                  
                  {/* Seat */}
                  <rect x="155" y="115" width="25" height="8" fill="#1E293B" rx="4" />
                  
                  {/* Front Wheel */}
                  <circle cx="100" cy="155" r="25" fill="none" stroke="#1E293B" strokeWidth="5" />
                  <circle cx="100" cy="155" r="15" fill="none" stroke="#475569" strokeWidth="2" />
                  <circle cx="100" cy="155" r="5" fill="#334155" />
                  
                  {/* Back Wheel */}
                  <circle cx="180" cy="155" r="25" fill="none" stroke="#1E293B" strokeWidth="5" />
                  <circle cx="180" cy="155" r="15" fill="none" stroke="#475569" strokeWidth="2" />
                  <circle cx="180" cy="155" r="5" fill="#334155" />
                  
                  {/* Delivery Box */}
                  <rect x="185" y="125" width="35" height="30" fill="#F59E0B" stroke="#D97706" strokeWidth="2" rx="3" />
                  <text x="202" y="145" fontSize="12" fill="#7C2D12" textAnchor="middle" fontWeight="bold">🕉️</text>
                </svg>

                {/* Motion lines for speed effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="absolute -left-20 top-1/2 -translate-y-1/2 space-y-2"
                >
                  <div className="h-1 w-16 bg-orange-300 rounded-full"></div>
                  <div className="h-1 w-12 bg-red-300 rounded-full"></div>
                  <div className="h-1 w-8 bg-yellow-300 rounded-full"></div>
                </motion.div>
              </motion.div>

              {/* Road */}
              <div className="absolute bottom-10 left-0 right-0 h-2 bg-gray-400"></div>
              <div className="absolute bottom-10 left-0 right-0 h-1 flex justify-around">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-8 h-1 bg-white"></div>
                ))}
              </div>
            </div>
          )}

          {/* Logo Animation Stage */}
          {stage === "logo" && (
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
              className="relative"
            >
              {/* Glowing effect behind logo */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-full"
              ></motion.div>

              <img src={logo} alt="Naivedya" className="w-64 md:w-96 h-auto drop-shadow-2xl" />

              {/* Motto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center mt-6 space-y-2"
              >
                <p className="text-xl md:text-2xl font-bold text-primary">
                  No more worries
                </p>
                <p className="text-lg md:text-xl font-semibold text-gray-700">
                  Here is your puja essentials
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onComplete}
            className="absolute bottom-8 right-8 px-6 py-3 bg-white/80 hover:bg-white text-primary rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-105 font-medium"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
