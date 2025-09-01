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

  // Generate floating quotes with collision detection and optimal distribution
  useEffect(() => {
    // Use only a subset of quotes to reduce density
    const selectedQuotes = BACKGROUND_QUOTES.filter((_, index) => index % 6 === 0);
    
    const quotes: Array<{id: number, text: string, x: number, y: number, delay: number}> = [];
    const minDistance = 25; // Minimum distance between quotes (in %)
    const maxAttempts = 100;
    
    selectedQuotes.forEach((quote, index) => {
      let x, y;
      let attempts = 0;
      let positionFound = false;
      
      // Try to find a position that doesn't overlap with existing quotes
      do {
        x = Math.random() * 90 + 5; // 5-95% from left
        y = Math.random() * 90 + 5; // 5-95% from top
        
        // Calculate distance from center (50%, 50%)
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
        );
        
        // Enhanced safe zone calculation - keep quotes away from central content
        const safeRadius = 45; // Increased from 30 to 45 for better content protection
        
        // Check if position is outside center safe zone
        if (distanceFromCenter > safeRadius) {
          // Additional safety checks for specific content areas
          const logoArea = { x: 50, y: 35, radius: 20 }; // Logo area
          const titleArea = { x: 50, y: 45, radius: 25 }; // Title area  
          const buttonsArea = { x: 50, y: 55, radius: 30 }; // Buttons area
          const quoteArea = { x: 50, y: 70, radius: 35 }; // Dave Thomas quote area
          
          // Check if position is too close to any content area
          const logoDistance = Math.sqrt(Math.pow(x - logoArea.x, 2) + Math.pow(y - logoArea.y, 2));
          const titleDistance = Math.sqrt(Math.pow(x - titleArea.x, 2) + Math.pow(y - titleArea.y, 2));
          const buttonsDistance = Math.sqrt(Math.pow(x - buttonsArea.x, 2) + Math.pow(y - buttonsArea.y, 2));
          const quoteDistance = Math.sqrt(Math.pow(x - quoteArea.x, 2) + Math.pow(y - quoteArea.y, 2));
          
          if (logoDistance < logoArea.radius || 
              titleDistance < titleArea.radius || 
              buttonsDistance < buttonsArea.radius || 
              quoteDistance < quoteArea.radius) {
            attempts++;
            continue; // Try another position
          }
          
          // Check collision with existing quotes
          let collision = false;
          for (const existingQuote of quotes) {
            const distance = Math.sqrt(
              Math.pow(x - existingQuote.x, 2) + Math.pow(y - existingQuote.y, 2)
            );
            if (distance < minDistance) {
              collision = true;
              break;
            }
          }
          
          if (!collision) {
            positionFound = true;
            break;
          }
        }
        
        attempts++;
      } while (attempts < maxAttempts);
      
      // If we couldn't find a collision-free position, use edge placement strategy
      if (!positionFound) {
        const edge = Math.floor(Math.random() * 4);
        switch(edge) {
          case 0: x = Math.random() * 12 + 2; break;   // Left edge
          case 1: x = Math.random() * 12 + 86; break;  // Right edge  
          case 2: y = Math.random() * 12 + 2; break;   // Top edge
          case 3: y = Math.random() * 12 + 86; break;  // Bottom edge
        }
        
        // Try to adjust edge position to avoid collisions
        for (const existingQuote of quotes) {
          const distance = Math.sqrt(
            Math.pow(x - existingQuote.x, 2) + Math.pow(y - existingQuote.y, 2)
          );
          if (distance < minDistance) {
            // Move slightly along the edge
            if (edge === 0 || edge === 1) { // Left/Right edges
              y = Math.max(2, Math.min(98, y + (Math.random() > 0.5 ? 15 : -15)));
            } else { // Top/Bottom edges
              x = Math.max(2, Math.min(98, x + (Math.random() > 0.5 ? 15 : -15)));
            }
            break;
          }
        }
      }
      
      quotes.push({
        id: index,
        text: quote,
        x,
        y,
        delay: Math.random() * 12 + 2 // 2-14s delay for better distribution
      });
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
    <div className="min-h-screen bg-gruvbox-dark-bg0 flex flex-col overflow-hidden relative" style={{ height: '100dvh' }}>
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
              className="bg-gruvbox-bright-yellow bg-opacity-20 hover:bg-opacity-30 text-gruvbox-bright-yellow border border-gruvbox-bright-yellow border-opacity-50 hover:border-opacity-70 px-8 sm:px-12 py-4 sm:py-5 rounded-lg text-xl sm:text-2xl font-mono transition-all duration-200 w-full sm:w-auto cursor-pointer"
            >
              ./start
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
              className="bg-gruvbox-bright-blue bg-opacity-20 hover:bg-opacity-30 text-gruvbox-bright-blue border border-gruvbox-bright-blue border-opacity-50 hover:border-opacity-70 px-8 sm:px-12 py-4 sm:py-5 rounded-lg text-xl sm:text-2xl font-mono transition-all duration-200 w-full sm:w-auto cursor-pointer"
            >
              ./help
            </motion.button>

            <motion.button
              onClick={() => {
                if (isMobilePreview) return;
                setHasInteracted(true);
                onBrowseCards();
              }}
              whileHover={{ 
                scale: isMobilePreview ? 1 : 1.02, 
                y: isMobilePreview ? 1 : -2,
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
              className="bg-gruvbox-bright-purple bg-opacity-20 hover:bg-opacity-30 text-gruvbox-bright-purple border border-gruvbox-bright-purple border-opacity-50 hover:border-opacity-70 px-8 sm:px-12 py-4 sm:py-5 rounded-lg text-xl sm:text-2xl font-mono transition-all duration-200 w-full sm:w-auto cursor-pointer"
            >
              ./deck
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
          <span className="text-gruvbox-bright-purple">v2.1.chaos-resonance-8</span> • Agile Shaman Collective • Sprint Management Survival Satire
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
