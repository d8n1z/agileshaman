import React from 'react';
import type { GameLogEntry } from '../../types/game';

interface SprintDiaryProps {
  log: GameLogEntry[];
}

const getLogIcon = (type: GameLogEntry['type']) => {
  switch (type) {
    case 'action':
      return '⚔️';
    case 'ritual':
      return '🔮';
    case 'chaos':
      return '🌪️';
    case 'system':
      return '📜';
  }
};

const getLogStyle = (type: GameLogEntry['type']) => {
  switch (type) {
    case 'action':
      return 'border-l-mystical-400 bg-mystical-900/20';
    case 'ritual':
      return 'border-l-shaman-400 bg-shaman-900/20';
    case 'chaos':
      return 'border-l-red-400 bg-red-900/20';
    case 'system':
      return 'border-l-blue-400 bg-blue-900/20';
  }
};

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const SprintDiary: React.FC<SprintDiaryProps> = ({ log }) => {
  return (
    <div className="mystical-card rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-mystical-600/30">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-mystical font-bold text-white flex items-center gap-2">
            <span className="text-2xl">📖</span>
            Chronicles of the Sprint
          </h2>
          <span className="text-mystical-300 text-sm">
            Mystical events unfold...
          </span>
        </div>
      </div>

      {/* Log Entries */}
      <div className="max-h-80 overflow-y-auto">
        {log.length === 0 ? (
          <div className="p-6 text-center text-mystical-400">
            <span className="text-4xl block mb-2">🌌</span>
            <p>The cosmic energies await your first decision...</p>
          </div>
        ) : (
          <div className="divide-y divide-mystical-700/30">
            {log.map((entry) => (
              <div
                key={entry.id}
                className={`p-4 border-l-4 transition-colors duration-200 hover:bg-mystical-800/20 ${getLogStyle(entry.type)}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 flex-shrink-0">
                    {getLogIcon(entry.type)}
                  </span>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-mystical-100 text-sm leading-relaxed">
                      {entry.message}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-2 text-xs text-mystical-400">
                      <span>Sprint {entry.sprint}</span>
                      <span>•</span>
                      <span>{formatTimestamp(entry.timestamp)}</span>
                      <span>•</span>
                      <span className="capitalize">{entry.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-mystical-600/30 bg-mystical-900/30">
        <p className="text-xs text-mystical-400 text-center italic">
          "The shaman who remembers the past controls the future" - Ancient DevOps Proverb
        </p>
      </div>
    </div>
  );
};
