import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./App.css"; // Import our custom CSS

export default function BirthdayCard() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);

  // Stop confetti after 4 seconds
  useEffect(() => {
    let timer;
    if (!candlesLit && showConfetti) {
      timer = setTimeout(() => setShowConfetti(false), 30000);
    }
    return () => clearTimeout(timer);
  }, [candlesLit, showConfetti]);

  // Play music when candles are blown out
  useEffect(() => {
    if (!candlesLit) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [candlesLit]);

  return (
    <div className="app-container">
      {/* Confetti Effect */}
      {showConfetti && <Confetti />}

      {/* Background Music */}
      <audio ref={audioRef} src="/happy-birthday.mp3" />

      {/* Card Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="card"
      >
        {/* Birthday Cake */}
        <div className="cake">
          {/* Cake Base */}
          <div className="cake-base"></div>
          <div className="cake-layer"></div>
             {/* Candle */}  
          <div className="candle">
            <div className="wick"></div>
            <div className="flame"></div>
          </div>
        </div>

        {/* Text */}
        <h1 className="title">Happy Birthday Raman❤️</h1>

        <p className="subtitle">
          My Bachaa may your special day be blessed with endless happiness and your year ahead be filled with great success and all your heart"s wishes coming true.Sending you ton of love,everyday I want to make you happy and to love you more and more.You are my heart my my reason to live you are the one who taught me the meaning of love and care  ❤️ 
        </p>

        {/* Button */}
        <button
          onClick={() => {
            if (candlesLit) {
              setCandlesLit(false);
              setShowConfetti(true);
            } else {
              setCandlesLit(true);
            }
          }}
          className="btn"
        >
          {candlesLit ? "💨 Blow Out Candles" : "🔥 Relight Candles"}
        </button>
      </motion.div>
    </div>
  );
}
