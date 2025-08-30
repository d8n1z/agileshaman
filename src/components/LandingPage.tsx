import React from 'react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onStartGame: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGame }) => {
  return (
    <div className="h-screen bg-gruvbox-dark-bg0 flex items-center justify-center p-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center h-full flex flex-col justify-center"
      >
        {/* Title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold text-gruvbox-bright-yellow mb-4 font-mono">
            Agile Shaman
          </h1>
          <div className="text-gruvbox-dark-fg2 text-xl">
            Master the Ancient Arts of Sprint Management
          </div>
        </motion.div>

                       {/* Game Description */}
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="terminal-card p-8 mb-8 text-left max-w-5xl mx-auto"
               >
          <div className="text-gruvbox-bright-aqua mb-6 font-mono text-lg">
            🎮 Sprint Management Survival Game
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
          </div>
        </motion.div>

                {/* Start Button */}
        <motion.button
          onClick={onStartGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="button-primary px-10 py-4 rounded-lg text-xl font-semibold transition-all duration-200"
        >
          Begin Your Sprint Journey
        </motion.button>

                       {/* Terminal Prompt */}
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="mt-6 text-gruvbox-dark-fg4 text-base"
               >
                 <span className="text-gruvbox-bright-green">$</span> ./agile-shaman --mode=survival --difficulty=8-sprints
               </motion.div>

               {/* Cheeky Developer Comment */}
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.9 }}
                 className="mt-2 text-gruvbox-dark-fg4 text-xs text-center italic"
               >
                 <span className="text-gruvbox-bright-orange">// TODO:</span> Handle refresh cases properly. Current dev clearly didn't consider this edge case. GG WP! 🤡
               </motion.div>

               {/* Footer - Author Info */}
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1.0 }}
                 className="mt-4 text-gruvbox-dark-fg3 text-sm text-center"
               >
                 <span className="text-gruvbox-bright-purple">Version 1.0.0</span> • Created by the Agile Shaman Collective • A satirical journey through sprint management survival
               </motion.div>
      </motion.div>
    </div>
  );
};
