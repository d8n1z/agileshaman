import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BACKGROUND_QUOTES } from '../data/quotes';

interface LandingPageProps {
  onStartGame: () => void;
  onBrowseCards: () => void;
  isMobilePreview?: boolean;
}



export const LandingPage: React.FC<LandingPageProps> = ({ onStartGame, onBrowseCards, isMobilePreview = false }) => {
  const [floatingQuotes, setFloatingQuotes] = useState<Array<{id: number, text: string, x: number, y: number, delay: number}>>([]);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Generate floating quotes - distributed around center with safe radius
  useEffect(() => {
    // Use only a subset of quotes to reduce density - much sparser
    const selectedQuotes = BACKGROUND_QUOTES.filter((_, index) => index % 6 === 0); // Use every 6th quote (~7-8 quotes total)
    
    const quotes = selectedQuotes.map((quote, index) => {
      let x, y;
      let attempts = 0;
      const maxAttempts = 50;
      
      // Keep trying until we find a position outside the center safe zone
      do {
        x = Math.random() * 90 + 5; // 5-95% from left
        y = Math.random() * 90 + 5; // 5-95% from top
        
        // Calculate distance from center (50%, 50%)
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
        );
        
        // Safe radius around center (adjust this value to control exclusion zone)
        const safeRadius = 35; // Larger radius = more space around center
        
        if (distanceFromCenter > safeRadius) {
          break; // Position is good, outside safe zone
        }
        
        attempts++;
      } while (attempts < maxAttempts);
      
      // If we couldn't find a good position, place it on the edges
      if (attempts >= maxAttempts) {
        const edge = Math.floor(Math.random() * 4);
        switch(edge) {
          case 0: x = Math.random() * 15 + 5; break;  // Left edge
          case 1: x = Math.random() * 15 + 80; break; // Right edge  
          case 2: y = Math.random() * 15 + 5; break;  // Top edge
          case 3: y = Math.random() * 15 + 80; break; // Bottom edge
        }
      }
      
      return {
        id: index,
        text: quote,
        x,
        y,
        delay: Math.random() * 15 // 0-15s delay for quicker starts
      };
    });
    setFloatingQuotes(quotes);
  }, []);

  // Background Option 1: Subtle Dot Pattern (CURRENT) - Clean tech aesthetic
  const subtleDotBackground = (
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251,241,199,0.3) 1px, transparent 0)`,
      backgroundSize: '20px 20px'
    }}></div>
  );

  return (
    <div className="h-screen bg-gruvbox-dark-bg0 flex flex-col overflow-hidden relative">
      {/* ACTIVE BACKGROUND */}
      {subtleDotBackground}
      
      {/* Floating Quotes Animation */}
      {!isMobilePreview && floatingQuotes.map((quote, index) => {
        // Cycle through vibrant Gruvbox colors
        const colors = [
          'text-gruvbox-bright-red',
          'text-gruvbox-bright-green', 
          'text-gruvbox-bright-yellow',
          'text-gruvbox-bright-blue',
          'text-gruvbox-bright-purple',
          'text-gruvbox-bright-aqua',
          'text-gruvbox-bright-orange'
        ];
        const colorClass = colors[index % colors.length];
        
        return (
          <motion.div
            key={quote.id}
            className={`absolute ${colorClass} text-sm font-mono pointer-events-none select-none z-0`}
            style={{
              left: `${quote.x}%`,
              top: `${quote.y}%`,
            }}
            initial={{ opacity: 0 }}
                                                animate={{
              opacity: [0, 0.25, 0.6, 0.25, 0],
            }}
            transition={{
              duration: 6,
              delay: quote.delay,
              repeat: showHowToPlay || hasInteracted || isMobilePreview ? 0 : Infinity,
              repeatDelay: 8,
              ease: "easeInOut"
            }}
          >
            <motion.span
              animate={{
                                textShadow: [
                  "0 0 2px currentColor",
                  "0 0 5px currentColor",
                  "0 0 10px currentColor",
                  "0 0 5px currentColor",
                  "0 0 2px currentColor"
                ],
                                filter: [
                  "brightness(0.9)",
                  "brightness(1.2)",
                  "brightness(1.5)",
                  "brightness(1.2)",
                  "brightness(0.9)"
                ]
              }}
              transition={{
                duration: 6,
                delay: quote.delay,
                repeat: showHowToPlay || hasInteracted || isMobilePreview ? 0 : Infinity,
                repeatDelay: 8,
                ease: "easeInOut"
              }}
            >
              {quote.text}
            </motion.span>
          </motion.div>
        );
      })}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center flex flex-col justify-center"
        >

          {/* Title with Logo */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.05 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
              <img
                src="./logo.png"
                alt="Agile Shaman"
                className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
              />
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal text-gruvbox-bright-yellow font-mono text-center">
                Agile Shaman
              </h1>
              <img
                src="./logo.png"
                alt="Agile Shaman"
                className="w-16 h-16 sm:w-24 sm:h-24 object-contain hidden sm:block"
              />
            </div>
          </motion.div>

          {/* Pure and mysterious - no subtitle */}

                    {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <motion.button
              onClick={() => {
                if (isMobilePreview) return;
                setHasInteracted(true);
                onStartGame();
              }}
              whileHover={{ 
                scale: isMobilePreview ? 1 : 1.02, 
                y: isMobilePreview ? 0 : -2,
                boxShadow: isMobilePreview ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 8px 20px rgba(250, 189, 47, 0.4)"
              }}
              whileTap={{ scale: isMobilePreview ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                opacity: { delay: 0.1, duration: 0.4, ease: "easeOut" },
                y: { delay: 0.1, duration: 0.4, ease: "easeOut" },
                scale: { duration: 0.15, ease: "easeOut" },
                boxShadow: { duration: 0.2, ease: "easeOut" }
              }}
              className="bg-gruvbox-bright-yellow bg-opacity-20 hover:bg-opacity-30 text-gruvbox-bright-yellow border border-gruvbox-bright-yellow border-opacity-50 hover:border-opacity-70 px-8 sm:px-12 py-4 sm:py-5 rounded-lg text-xl sm:text-2xl font-mono transition-all duration-200 w-full sm:w-auto cursor-not-allowed opacity-60"
            >
              <span className="text-gruvbox-bright-green">$</span> ./start
            </motion.button>

            <motion.button
              onClick={() => {
                if (isMobilePreview) return;
                setHasInteracted(true);
                setShowHowToPlay(true);
              }}
              whileHover={{ 
                scale: isMobilePreview ? 1 : 1.02, 
                y: isMobilePreview ? 0 : -2,
                boxShadow: isMobilePreview ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 8px 20px rgba(131, 165, 152, 0.4)"
              }}
              whileTap={{ scale: isMobilePreview ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                opacity: { delay: 0.2, duration: 0.4, ease: "easeOut" },
                y: { delay: 0.2, duration: 0.4, ease: "easeOut" },
                scale: { duration: 0.15, ease: "easeOut" },
                boxShadow: { duration: 0.2, ease: "easeOut" }
              }}
              className="bg-gruvbox-bright-blue bg-opacity-20 hover:bg-opacity-30 text-gruvbox-bright-blue border border-gruvbox-bright-blue border-opacity-50 hover:border-opacity-70 px-8 sm:px-12 py-4 sm:py-5 rounded-lg text-xl sm:text-2xl font-mono transition-all duration-200 w-full sm:w-auto cursor-not-allowed opacity-60"
            >
              <span className="text-gruvbox-bright-green">$</span> ./help
            </motion.button>

            <motion.button
              onClick={() => {
                if (isMobilePreview) return;
                setHasInteracted(true);
                onBrowseCards();
              }}
              whileHover={{ 
                scale: isMobilePreview ? 1 : 1.02, 
                y: isMobilePreview ? 0 : -2,
                boxShadow: isMobilePreview ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 8px 20px rgba(177, 98, 134, 0.4)"
              }}
              whileTap={{ scale: isMobilePreview ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                opacity: { delay: 0.3, duration: 0.4, ease: "easeOut" },
                y: { delay: 0.3, duration: 0.4, ease: "easeOut" },
                scale: { duration: 0.15, ease: "easeOut" },
                boxShadow: { duration: 0.2, ease: "easeOut" }
              }}
              className="bg-gruvbox-bright-purple bg-opacity-20 hover:bg-opacity-30 text-gruvbox-bright-purple border border-gruvbox-bright-purple border-opacity-50 hover:border-opacity-70 px-8 sm:px-12 py-4 sm:py-5 rounded-lg text-xl sm:text-2xl font-mono transition-all duration-200 w-full sm:w-auto cursor-not-allowed opacity-60"
            >
              <span className="text-gruvbox-bright-green">$</span> ./deck
            </motion.button>
          </motion.div>



        {/* Dave Thomas Quote - Agile Critic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 mb-4 px-8"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-gruvbox-bright-red text-base sm:text-lg font-mono italic leading-relaxed">
              "The word 'agile' has been subverted to the point where it is effectively meaningless, and what passes for an agile community seems to be largely an arena for consultants and vendors to hawk services and products."
            </div>
            <div className="text-gruvbox-dark-fg3 text-sm sm:text-base mt-3">
              — Dave Thomas, <span className="text-gruvbox-bright-yellow">Agile Manifesto Co-Author</span>
            </div>
          </div>
        </motion.div>

        </motion.div>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gruvbox-dark-fg3 text-xs text-center"
        >
          <span className="text-gruvbox-bright-purple">v2.0.0</span> • Agile Shaman Collective • Sprint Management Survival Satire
        </motion.div>
      </footer>

            {/* How to Play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="terminal-card p-8 max-w-4xl mx-auto max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-gruvbox-bright-aqua text-2xl font-mono">
                🎮 How to Play
              </div>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="text-gruvbox-bright-red hover:text-gruvbox-bright-yellow text-2xl font-mono transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="text-gruvbox-dark-fg2 leading-relaxed space-y-4 text-base">
              <p>
                <span className="text-gruvbox-bright-yellow text-lg">Your Mission:</span> Guide your development team through 8 challenging sprints to achieve software delivery enlightenment.
              </p>

              <p>
                Balance four critical aspects of software development while navigating the chaos of modern tech teams:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="bg-gruvbox-dark-bg2 p-3 rounded">
                  <span className="text-gruvbox-bright-blue text-lg">⚡ Velocity</span>
                  <div className="text-sm text-gruvbox-dark-fg3">Feature delivery speed</div>
                </div>
                <div className="bg-gruvbox-dark-bg2 p-3 rounded">
                  <span className="text-gruvbox-bright-green text-lg">♡ Team Spirit</span>
                  <div className="text-sm text-gruvbox-dark-fg3">Developer motivation & happiness</div>
                </div>
                <div className="bg-gruvbox-dark-bg2 p-3 rounded">
                  <span className="text-gruvbox-bright-yellow text-lg">★ Client Satisfaction</span>
                  <div className="text-sm text-gruvbox-dark-fg3">Stakeholder happiness</div>
                </div>
                <div className="bg-gruvbox-dark-bg2 p-3 rounded">
                  <span className="text-gruvbox-bright-red text-lg">⚠ Technical Debt</span>
                  <div className="text-sm text-gruvbox-dark-fg3">Code quality burden</div>
                </div>
              </div>

              <p>
                <span className="text-gruvbox-bright-yellow text-lg">How to Play:</span> Each sprint, face 3 scenario cards. Make 2 strategic decisions that will affect your team's destiny. Use bonus rituals wisely - they're limited!
              </p>

              <div className="mt-6 pt-4 border-t border-gruvbox-dark-bg3">
                <p className="text-gruvbox-bright-aqua text-lg mb-2">🎯 Victory Conditions:</p>
                <p>Survive all 8 sprints while keeping your metrics balanced. Avoid letting any metric drop to zero!</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
