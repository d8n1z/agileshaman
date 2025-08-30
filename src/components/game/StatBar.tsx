import React from 'react';
import { motion } from 'framer-motion';
import type { GameStats } from '../../types/game';

interface StatBarProps {
  label: string;
  value: number;
  statKey: keyof GameStats;
  icon: string;
}

const getStatColor = (statKey: keyof GameStats, value: number) => {
  const colors = {
    velocity: {
      bg: value < 30 ? 'bg-blue-600' : value < 60 ? 'bg-blue-500' : 'bg-blue-400',
      text: 'text-blue-100'
    },
    morale: {
      bg: value < 30 ? 'bg-green-600' : value < 60 ? 'bg-green-500' : 'bg-green-400',
      text: 'text-green-100'
    },
    happiness: {
      bg: value < 30 ? 'bg-yellow-600' : value < 60 ? 'bg-yellow-500' : 'bg-yellow-400',
      text: 'text-yellow-100'
    },
    techDebt: {
      bg: value > 70 ? 'bg-red-600' : value > 40 ? 'bg-red-500' : 'bg-red-400',
      text: 'text-red-100'
    }
  };

  return colors[statKey];
};

const getWarningLevel = (statKey: keyof GameStats, value: number) => {
  if (statKey === 'techDebt') {
    if (value >= 80) return { level: 'critical', icon: '💀', message: 'Critical!' };
    if (value >= 60) return { level: 'warning', icon: '⚠️', message: 'High' };
    return null;
  } else {
    if (value <= 20) return { level: 'critical', icon: '💀', message: 'Critical!' };
    if (value <= 40) return { level: 'warning', icon: '⚠️', message: 'Low' };
    return null;
  }
};

export const StatBar: React.FC<StatBarProps> = ({ label, value, statKey, icon }) => {
  const colors = getStatColor(statKey, value);
  const warning = getWarningLevel(statKey, value);

  return (
    <motion.div 
      className="bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="text-white font-semibold text-sm">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {warning && (
            <motion.span 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className={`text-xs ${warning.level === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}
            >
              {warning.icon}
            </motion.span>
          )}
          <span className="text-white font-bold text-lg tabular-nums">{value}</span>
        </div>
      </div>
      
      <div className="relative h-4 w-full rounded-full bg-black/30 overflow-hidden">
        <motion.div 
          className={`h-full transition-all duration-700 ease-out ${colors.bg} shadow-lg`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(2, value)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Shimmer effect for high values */}
        {value > 70 && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Pulse effect for critical values */}
        {warning?.level === 'critical' && (
          <motion.div 
            className="absolute inset-0 bg-red-500/20"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
      
      {warning && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs mt-2 font-semibold ${warning.level === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}
        >
          {warning.message}
        </motion.div>
      )}
    </motion.div>
  );
};
