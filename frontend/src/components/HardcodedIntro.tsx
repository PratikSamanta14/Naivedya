import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

interface HardcodedIntroProps {
  onComplete: () => void;
}

const HardcodedIntro = ({ onComplete }: HardcodedIntroProps) => {
  const [stage, setStage] = useState<"bike" | "logo" | "complete">("bike");

  useEffect(() => {
    // Bike animation stage - 3 seconds to mimic video length
    const bikeTimer = setTimeout(() => {
      setStage("logo");
    }, 3000); // Extended from 2s to 3s for better video-like experience

    // Logo animation stage - 3 seconds
    const logoTimer = setTimeout(() => {
      setStage("complete");
      onComplete();
    }, 6000); // Total 6 seconds including bike animation

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
                  duration: 2,
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
                  transition={{ duration: 0.5, repeat: 4, repeatDelay: 0.2 }}
                  className="absolute -left-20 top-1/2 -translate-y-1/2 space-y-2"
                >
                  <div className="h-1 w-16 bg-orange-300 rounded-full"></div>
                  <div className="h-1 w-12 bg-red-300 rounded-full"></div>
                  <div className="h-1 w-8 bg-yellow-300 rounded-full"></div>
                </motion.div>
                
                {/* Additional decorative elements to enhance the video-like feel */}
                <motion.div
                  animate={{ 
                    x: [-20, 20, -20],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-10 -right-10 text-4xl"
                >
                  🪔
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -bottom-10 -left-10 text-4xl"
                >
                  🌺
                </motion.div>
              </motion.div>

              {/* Animated Road */}
              <motion.div
                animate={{ x: ["0%", "-100%"] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute bottom-10 left-0 right-0 h-8 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-400"></div>
                <div className="absolute top-2 left-0 w-full h-1 flex">
                  {[...Array(40)].map((_, i) => (
                    <div key={i} className="w-8 h-1 bg-white mx-2"></div>
                  ))}
                </div>
              </motion.div>
              
              {/* Additional festive elements */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute top-20 left-1/4 text-3xl"
              >
                🪔
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="absolute top-16 right-1/4 text-3xl"
              >
                🌺
              </motion.div>
            </div>
          )}

          {/* Logo Animation Stage */}
          {stage === "logo" && (
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                type: "spring",
                stiffness: 80,
              }}
              className="relative"
            >
              {/* Enhanced glowing effect behind logo */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full"
              ></motion.div>

              <motion.img 
                src={logo} 
                alt="Naivedya" 
                className="w-64 md:w-80 h-auto drop-shadow-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Motto with enhanced animations */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-center mt-6 space-y-3"
              >
                <motion.p 
                  className="text-2xl md:text-3xl font-bold text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  No more worries
                </motion.p>
                <motion.p 
                  className="text-xl md:text-2xl font-semibold text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  Here is your puja essentials
                </motion.p>
                
                {/* Additional decorative elements during logo stage */}
                <motion.div
                  className="flex justify-center space-x-6 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="text-3xl"
                  >
                    🕉️
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-3xl"
                  >
                    🪔
                  </motion.div>
                  <motion.div
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 5, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="text-3xl"
                  >
                    🌺
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onComplete}
            className="absolute bottom-8 right-8 px-6 py-3 bg-white/80 hover:bg-white text-primary rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-105 font-medium z-20"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HardcodedIntro;