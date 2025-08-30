import React from 'react';
import { motion } from 'framer-motion';
import type { Card as CardType, Choice } from '../../types/game';

interface CardProps {
  card: CardType;
  onChoice: (choice: Choice) => void;
  disabled?: boolean;
}

const getRarityStyle = (rarity: CardType['rarity']) => {
  switch (rarity) {
    case 'common':
      return { 
        bg: 'bg-gradient-to-br from-slate-600 to-slate-700',
        border: 'border-slate-400/50',
        badge: { bg: 'bg-slate-600', text: 'Common', icon: '⚪' }
      };
    case 'rare':
      return { 
        bg: 'bg-gradient-to-br from-blue-600 to-purple-700',
        border: 'border-blue-400/60',
        badge: { bg: 'bg-blue-600', text: 'Rare', icon: '🔮' }
      };
    case 'legendary':
      return { 
        bg: 'bg-gradient-to-br from-yellow-500 to-orange-600',
        border: 'border-yellow-400/80',
        badge: { bg: 'bg-yellow-600', text: 'Legendary', icon: '⭐' }
      };
  }
};

const getThemeIcon = (theme: CardType['theme']) => {
  switch (theme) {
    case 'mystical':
      return '🌙';
    case 'agile':
      return '⚡';
    case 'chaos':
      return '🌪️';
    case 'wisdom':
      return '🧿';
  }
};

const formatEffectValue = (key: string, value: number) => {
  const statNames = {
    velocity: 'Velocity',
    morale: 'Morale', 
    happiness: 'Happiness',
    techDebt: 'Tech Debt'
  };
  
  const sign = value > 0 ? '+' : '';
  return `${sign}${value} ${statNames[key as keyof typeof statNames]}`;
};

export const Card: React.FC<CardProps> = ({ card, onChoice, disabled = false }) => {
  const rarityStyle = getRarityStyle(card.rarity);
  const themeIcon = getThemeIcon(card.theme);

  return (
    <motion.div 
      className={`
        ${rarityStyle.bg} ${rarityStyle.border} border-2 rounded-2xl p-6 shadow-2xl backdrop-blur-sm
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.span 
            className="text-4xl filter drop-shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {card.icon}
          </motion.span>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">
              {card.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`${rarityStyle.badge.bg} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                {rarityStyle.badge.icon} {rarityStyle.badge.text}
              </span>
              <span className="text-white/70 text-xs">
                {themeIcon} {card.theme}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario */}
      <motion.div 
        className="mb-4 p-3 bg-black/20 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-white/90 text-sm leading-relaxed italic">
          "{card.scenario}"
        </p>
      </motion.div>

      {/* Choices */}
      <div className="space-y-3">
        {card.choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            onClick={() => !disabled && onChoice(choice)}
            disabled={disabled}
            className={`
              w-full text-left p-4 rounded-xl border-2 transition-all duration-200 bg-white/10 backdrop-blur-sm
              ${disabled 
                ? 'border-gray-600 cursor-not-allowed' 
                : 'border-white/30 hover:border-white/60 hover:bg-white/20'
              }
            `}
            whileHover={disabled ? {} : { scale: 1.02 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {choice.icon && <span className="text-lg">{choice.icon}</span>}
                <span className="text-white font-semibold">{choice.label}</span>
              </div>
              
              {choice.ritual && (
                <span className="text-yellow-300 text-xs bg-yellow-900/50 px-2 py-1 rounded-full border border-yellow-600/30">
                  🎲 {Math.round(choice.ritual.chance * 100)}%
                </span>
              )}
            </div>
            
            {choice.description && (
              <p className="text-white/70 text-sm mb-3">
                {choice.description}
              </p>
            )}
            
            {/* Effects */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(choice.effects).map(([key, value]) => (
                <motion.span 
                  key={key}
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    value! > 0 
                      ? 'bg-green-500/20 border border-green-400/40 text-green-300' 
                      : value! < 0 
                      ? 'bg-red-500/20 border border-red-400/40 text-red-300'
                      : 'bg-gray-500/20 border border-gray-400/40 text-gray-300'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {formatEffectValue(key, value!)}
                </motion.span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
