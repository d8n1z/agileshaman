import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MYSTICAL_DECK } from '../data/cards';
import type { Card, CardRarity } from '../types/game';

interface CardBrowserProps {
  onBack: () => void;
}

export const CardBrowser: React.FC<CardBrowserProps> = ({ onBack }) => {
  const [selectedRarity, setSelectedRarity] = useState<CardRarity | 'all'>('all');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter cards based on rarity and search term
  const filteredCards = useMemo(() => {
    let cards = MYSTICAL_DECK;
    
    if (selectedRarity !== 'all') {
      cards = cards.filter(card => card.rarity === selectedRarity);
    }
    
    if (searchTerm) {
      cards = cards.filter(card => 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.scenario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.choices.some(choice => 
          choice.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return cards;
  }, [selectedRarity, searchTerm]);

  const getRarityColor = (rarity: CardRarity) => {
    switch (rarity) {
      case 'common': return 'text-gruvbox-bright-green';
      case 'rare': return 'text-gruvbox-bright-blue';
      case 'legendary': return 'text-gruvbox-bright-purple';
      default: return 'text-gruvbox-dark-fg2';
    }
  };

  const getRarityBg = (rarity: CardRarity) => {
    switch (rarity) {
      case 'common': return 'border-gruvbox-bright-green';
      case 'rare': return 'border-gruvbox-bright-blue';
      case 'legendary': return 'border-gruvbox-bright-purple';
      default: return 'border-gruvbox-dark-bg3';
    }
  };

  const getEffectColor = (key: string, value: number) => {
    if (key === 'techDebt') {
      return value > 0 ? 'text-gruvbox-bright-red' : 'text-gruvbox-bright-green';
    }
    return value > 0 ? 'text-gruvbox-bright-green' : 'text-gruvbox-bright-red';
  };

  const getStatLabel = (key: string) => {
    switch (key) {
      case 'velocity': return 'vel';
      case 'morale': return 'team';
      case 'happiness': return 'client';
      case 'techDebt': return 'debt';
      default: return key;
    }
  };

  return (
    <div className="h-screen bg-gruvbox-dark-bg0 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="terminal-card p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gruvbox-bright-yellow text-3xl font-bold font-mono">
              📚 # card_browser.explore()
            </h1>
            <p className="text-gruvbox-dark-fg2 text-sm mt-2">
              Browse all {MYSTICAL_DECK.length} scenario cards in the Agile Shaman deck
            </p>
          </div>
          <button
            onClick={onBack}
            className="button-secondary px-6 py-3 rounded-lg font-mono transition-all duration-200"
          >
            ← ./back
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gruvbox-dark-bg2 border border-gruvbox-dark-bg3 rounded-lg px-4 py-2 text-gruvbox-dark-fg2 font-mono text-sm focus:border-gruvbox-bright-yellow focus:outline-none"
            />
          </div>

          {/* Rarity Filter */}
          <div className="flex gap-2">
            {(['all', 'common', 'rare', 'legendary'] as const).map((rarity) => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200 ${
                  selectedRarity === rarity
                    ? 'bg-gruvbox-bright-yellow bg-opacity-20 border border-gruvbox-bright-yellow text-gruvbox-bright-yellow'
                    : 'bg-gruvbox-dark-bg2 border border-gruvbox-dark-bg3 text-gruvbox-dark-fg3 hover:border-gruvbox-dark-fg4'
                }`}
              >
                {rarity === 'all' ? `all (${MYSTICAL_DECK.length})` : `${rarity} (${MYSTICAL_DECK.filter(c => c.rarity === rarity).length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`terminal-card p-4 cursor-pointer transition-all duration-200 border-2 ${getRarityBg(card.rarity)} hover:shadow-lg`}
              onClick={() => setSelectedCard(card)}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">{card.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gruvbox-dark-fg2 font-bold text-sm mb-1 line-clamp-2">
                    {card.title}
                  </h3>
                  <span className={`text-xs font-mono ${getRarityColor(card.rarity)}`}>
                    {card.rarity}
                  </span>
                </div>
              </div>
              
              <p className="text-gruvbox-dark-fg3 text-xs mb-3 line-clamp-3">
                {card.scenario}
              </p>
              
              <div className="text-xs text-gruvbox-dark-fg4">
                {card.choices.length} choices
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gruvbox-dark-fg4 text-lg mb-2">🔍</div>
            <p className="text-gruvbox-dark-fg3">No cards found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Card Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="terminal-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card Header */}
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl flex-shrink-0">{selectedCard.icon}</span>
                <div className="flex-1">
                  <h2 className="text-gruvbox-bright-yellow text-xl font-bold mb-2">
                    {selectedCard.title}
                  </h2>
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`text-sm font-mono ${getRarityColor(selectedCard.rarity)}`}>
                      {selectedCard.rarity}
                    </span>
                    <span className="text-gruvbox-dark-fg4 text-sm">
                      {selectedCard.theme}
                    </span>
                  </div>
                  <p className="text-gruvbox-dark-fg2 leading-relaxed">
                    {selectedCard.scenario}
                  </p>
                </div>
              </div>

              {/* Choices */}
              <div className="space-y-4">
                <h3 className="text-gruvbox-bright-aqua font-mono text-lg mb-4">
                  # choices.available()
                </h3>
                {selectedCard.choices.map((choice, index) => (
                  <div
                    key={choice.id}
                    className="bg-gruvbox-dark-bg2 rounded-lg p-4 border border-gruvbox-dark-bg3"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-gruvbox-bright-yellow font-bold text-sm">
                        {String.fromCharCode(97 + index)})
                      </span>
                      <div className="flex-1">
                        <h4 className="text-gruvbox-dark-fg2 font-semibold mb-1">
                          {choice.label}
                        </h4>
                        {choice.description && (
                          <p className="text-gruvbox-dark-fg3 text-sm mb-2">
                            {choice.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Effects */}
                    <div className="flex flex-wrap gap-2 ml-6">
                      {Object.entries(choice.effects).map(([key, value]) => (
                        <span
                          key={key}
                          className={`px-2 py-1 rounded text-xs font-mono ${getEffectColor(key, value!)} bg-gruvbox-dark-bg3`}
                        >
                          {value! > 0 ? '+' : ''}{value} {getStatLabel(key)}
                        </span>
                      ))}
                    </div>

                    {/* Ritual Effect */}
                    {choice.ritual && (
                      <div className="ml-6 mt-2 text-xs text-gruvbox-bright-purple">
                        🎲 {Math.round(choice.ritual.chance * 100)}% ritual chance
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="button-primary px-6 py-2 rounded-lg font-mono"
                >
                  ./close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
