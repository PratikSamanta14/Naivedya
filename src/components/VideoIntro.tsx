import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import introVideo from "@/assets/intro.mp4";

interface VideoIntroProps {
  onComplete: () => void;
}

const VideoIntro = ({ onComplete }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play the video when component mounts
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video played successfully
        })
        .catch(error => {
          console.log("Autoplay prevented:", error);
          // If autoplay is prevented, we can still show the video poster
          // and let user initiate playback
        });
    }

    // Listen for when the video ends
    const handleVideoEnd = () => {
      onComplete();
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-contain max-w-screen max-h-screen"
            muted
            playsInline
            preload="auto"
          >
            <source src={introVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onComplete}
            className="absolute bottom-8 right-8 px-6 py-3 bg-white/80 hover:bg-white text-primary rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-105 font-medium z-10"
          >
            Skip
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoIntro;