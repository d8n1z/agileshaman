import React from 'react';
import { motion } from 'framer-motion';

interface MobileNotSupportedProps {
  onContinue?: () => void;
}

export const MobileNotSupported: React.FC<MobileNotSupportedProps> = ({ onContinue }) => {
  return (
    <div className="h-screen bg-gruvbox-dark-bg0 flex flex-col overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251,241,199,0.5) 1px, transparent 0)`,
        backgroundSize: '30px 30px'
      }}></div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >

          {/* Mobile Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="text-8xl mb-4">📱</div>
            <h1 className="text-3xl font-bold text-gruvbox-bright-yellow font-mono mb-4">
              Mobile Not Optimized
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gruvbox-dark-fg2 leading-relaxed mb-8 space-y-4"
          >
            <p className="text-lg">
              The Agile Shaman game requires a desktop or tablet experience for the best gameplay.
            </p>

            <div className="bg-gruvbox-dark-bg2 p-4 rounded-lg border border-gruvbox-dark-bg3">
              <p className="text-sm text-gruvbox-dark-fg3">
                <span className="text-gruvbox-bright-red">⚠️</span> Small screens may cause:
              </p>
              <ul className="text-sm text-gruvbox-dark-fg4 mt-2 space-y-1 text-left">
                <li>• Overlapping buttons and text</li>
                <li>• Difficult-to-read interface elements</li>
                <li>• Poor game performance</li>
                <li>• Limited strategic decision-making</li>
              </ul>
            </div>

            <p className="text-sm">
              <span className="text-gruvbox-bright-green">💡 Recommended:</span> Play on a device with at least 768px width for optimal experience.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <button
              onClick={onContinue}
              className="w-full bg-gruvbox-bright-blue bg-opacity-20 hover:bg-opacity-30 text-gruvbox-bright-blue border border-gruvbox-bright-blue border-opacity-50 hover:border-opacity-70 px-6 py-4 rounded-lg text-lg font-mono transition-all duration-200"
            >
              <span className="text-gruvbox-bright-green">$</span> ./preview-app
            </button>

            <div className="text-xs text-gruvbox-dark-fg4 text-center">
              Preview the app (buttons will be disabled on mobile)
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-6 border-t border-gruvbox-dark-bg3"
          >
            <div className="text-gruvbox-dark-fg4 text-xs">
              <span className="text-gruvbox-bright-purple">v2.0.0</span> • Agile Shaman Collective
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
