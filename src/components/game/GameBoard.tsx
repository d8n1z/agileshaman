import React, { useState, useEffect } from 'react';
// Framer Motion imports removed - not currently used
import { useGameState } from '../../hooks/useGameState';
import { PROJECT_QUOTES } from '../../data/quotes';

const STAT_CONFIG = {
  velocity: { key: 'velocity', label: 'velocity', icon: '⚡', color: 'blue' },
  morale: { key: 'morale', label: 'team_spirit', icon: '♡', color: 'green' },
  happiness: { key: 'happiness', label: 'client_sat', icon: '★', color: 'yellow' },
  techDebt: { key: 'techDebt', label: 'tech_debt', icon: '⚠', color: 'red' }
};



interface GameBoardProps {
  onBackToMenu?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ onBackToMenu }) => {
  const { gameState, numberAnimations, chaosEffect, makeChoice, nextSprint, restartGame, performRitual, triggerDevVictory } = useGameState();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [shuffledQuotes, setShuffledQuotes] = useState<typeof PROJECT_QUOTES>([]);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  // Shuffle quotes on component mount
  useEffect(() => {
    const shuffled = [...PROJECT_QUOTES].sort(() => Math.random() - 0.5);
    setShuffledQuotes(shuffled);
  }, []);

  // Listen for browser back button exit requests
  useEffect(() => {
    const handleExitRequest = () => {
      setShowExitConfirm(true);
    };

    window.addEventListener('requestGameExit', handleExitRequest);
    return () => window.removeEventListener('requestGameExit', handleExitRequest);
  }, []);

  const handleBackToMenu = () => {
    // Clear game state and go back to menu
    localStorage.removeItem('agile-shaman-game-state');
    restartGame();
    if (onBackToMenu) {
      onBackToMenu();
    }
  };

  // Rotate quotes every 4 seconds (pause when hovered)
  useEffect(() => {
    if (shuffledQuotes.length === 0 || isQuoteHovered) return;
    
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % shuffledQuotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [shuffledQuotes, isQuoteHovered]);

  const currentQuote = shuffledQuotes[currentQuoteIndex];

  const renderEndGameModal = () => {
    if (gameState.gameStatus === 'victory') {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="terminal-card p-8 text-center max-w-lg mx-auto shadow-2xl border-2 border-gruvbox-bright-green border-opacity-50">
            <div className="text-gruvbox-bright-green text-4xl mb-4 font-mono">
              PROCESS COMPLETED SUCCESSFULLY
            </div>
            <div className="text-gruvbox-bright-yellow text-xl mb-4">
              $ ./agile-shaman --status=legendary --chaos-survived --8-sprints-conquered
            </div>
            <p className="text-gruvbox-dark-fg2 mb-6 font-mono">
              # {gameState.sprint}/8 sprints completed. All systems green. ✓
          </p>
          <button
            onClick={restartGame}
              className="button-primary px-6 py-3 rounded font-mono transition-all"
          >
              ./restart-journey
          </button>
          </div>
        </div>
      );
    }

    if (gameState.gameStatus === 'defeat') {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="terminal-card p-8 text-center max-w-lg mx-auto shadow-2xl border-2 border-gruvbox-bright-red border-opacity-50">
            <div className="text-gruvbox-bright-red text-4xl mb-4 font-mono">
              PROCESS TERMINATED
            </div>
            <div className="text-gruvbox-bright-orange text-lg mb-2 font-mono">
              Sprint {gameState.sprint} • Exit Code: FAILURE
            </div>
            <div className="text-gruvbox-dark-fg2 mb-6 font-mono text-sm bg-gruvbox-dark-bg2 p-3 rounded">
            {gameState.defeatReason}
            </div>
          <button
            onClick={restartGame}
              className="button-primary px-6 py-3 rounded font-mono transition-all"
          >
              ./retry-mission
          </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-screen bg-gruvbox-dark-bg0 p-4 font-mono overflow-hidden">
      <div className="h-full flex flex-col">
        
        {/* Header - Sprint Info with Metrics in Center */}
        <div className="terminal-card p-4 mb-4 flex-shrink-0">
          <div className="grid grid-cols-12 gap-4 items-center">
            
            {/* Left Section - Game Name */}
            <div className="col-span-3 flex items-center gap-3">
              <button 
                onClick={() => setShowExitConfirm(true)}
                className="text-gruvbox-bright-yellow text-xl font-bold hover:text-gruvbox-light-yellow transition-colors duration-200 cursor-pointer hover:underline"
                title="Back to Main Menu"
              >
                ./agile-shaman
              </button>
              <span className="text-gruvbox-dark-fg4 text-xs font-mono opacity-60 hover:opacity-100 transition-opacity duration-200">
                --quit
              </span>
              {import.meta.env.DEV && (
                <>
                  <span className="text-gruvbox-bright-red text-xs font-mono bg-gruvbox-dark-bg2 px-2 py-1 rounded ml-2 opacity-75 hover:opacity-100 transition-opacity duration-200 animate-pulse"
                        title="Ctrl+Shift+W = Win Screen">
                    DEV: Ctrl+Shift+W
                  </span>
                  <button
                    onClick={() => {
                      console.log('🎯 DEV BUTTON: Triggering victory...');
                      triggerDevVictory();
                    }}
                    className="text-gruvbox-bright-orange text-xs font-mono bg-gruvbox-dark-bg2 px-2 py-1 rounded ml-2 opacity-75 hover:opacity-100 hover:bg-gruvbox-dark-bg1 transition-all duration-200"
                    title="Click to win (dev mode only)"
                  >
                    🎯 WIN
                  </button>
                </>
              )}
            </div>
            
            {/* Center Section - Metrics (Wider & More Readable) */}
            <div className={`col-span-6 transition-all duration-500 ${chaosEffect ? 'animate-pulse' : ''}`}>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(STAT_CONFIG).map(([key, config]) => {
                  const value = gameState.stats[key as keyof typeof gameState.stats];
                  
                  // Create gradient-based color system
                  const getStatColor = (val: number, isInverse = false) => {
                    const normalizedValue = isInverse ? 100 - val : val;
                    if (normalizedValue >= 80) return { text: 'text-green-400', bg: 'bg-green-500', glow: 'shadow-green-500/50' };
                    if (normalizedValue >= 60) return { text: 'text-green-300', bg: 'bg-green-400', glow: 'shadow-green-400/30' };
                    if (normalizedValue >= 40) return { text: 'text-yellow-400', bg: 'bg-yellow-500', glow: 'shadow-yellow-500/30' };
                    if (normalizedValue >= 20) return { text: 'text-orange-400', bg: 'bg-orange-500', glow: 'shadow-orange-500/30' };
                    return { text: 'text-red-400', bg: 'bg-red-500', glow: 'shadow-red-500/50' };
                  };
                  
                  const colors = getStatColor(value, key === 'techDebt');
                  const isDangerous = (key === 'techDebt' && value > 80) || (key !== 'techDebt' && value < 20);
                  
                  return (
                    <div key={key} className={`flex items-center gap-2 transition-all duration-300 px-2 py-2 ${isDangerous ? `${colors.glow} shadow-lg animate-pulse rounded-lg bg-gruvbox-dark-bg2` : ''} ${chaosEffect ? 'animate-pulse' : ''}`} style={chaosEffect ? { animation: 'chaosShake 0.5s ease-in-out' } : {}}>
                      <span className={`${colors.text} ${isDangerous ? 'animate-pulse' : ''} text-base flex-shrink-0`}>{config.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-gruvbox-dark-fg2 text-xs font-medium mb-1">{config.label}</div>
                        <div className="bg-gruvbox-dark-bg3 rounded-full h-2 overflow-hidden shadow-inner">
                          <div 
                            className={`h-full transition-all duration-500 ${colors.bg} ${isDangerous ? 'animate-pulse' : ''}`}
                            style={{ 
                              width: `${Math.max(2, value)}%`,
                              boxShadow: isDangerous ? `inset 0 0 10px rgba(255,255,255,0.3)` : 'none'
                            }}
                          />
                        </div>
                      </div>
                      <div className={`text-base font-black ${colors.text} ${isDangerous ? 'animate-pulse' : ''} flex-shrink-0`}>
                        {value}
                        {isDangerous && <span className="ml-1 text-red-400">⚠</span>}
            </div>
          </div>
                  );
                })}
              </div>
            </div>
            
            {/* Right Section - Sprint Info */}
            <div className="col-span-3 flex justify-end">
              <div className="bg-gruvbox-dark-bg2 px-4 py-2 rounded text-center">
                <span className="text-gruvbox-dark-fg3 text-xs">sprint </span>
                <span className={`text-gruvbox-bright-aqua font-bold text-lg transition-all duration-300 transform hover:scale-110 ${numberAnimations.sprint}`}>
                  {gameState.sprint}
                </span>
                <span className="text-gruvbox-dark-fg3 text-xs"> of {gameState.maxSprints}</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3-Column Main Content Area - Full Height */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
          
          {/* Left Column - Background Image Area (Narrower) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="h-full w-full rounded relative overflow-hidden border border-gruvbox-dark-bg3 min-h-[600px]">
              {/* Background image */}
              <div className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-[url('/shaman-bg.png')]" />
              {/* Subtle dark overlay for readability */}
              <div className="absolute inset-0 bg-gruvbox-dark-bg0/30" />
              
              {/* Rotating Satirical Quotes */}
              <div className="absolute bottom-4 left-4 right-4">
                <div 
                  className="bg-gruvbox-dark-bg0/80 backdrop-blur-sm rounded-lg p-3 pb-6 border border-gruvbox-dark-bg3/50 cursor-pointer hover:bg-gruvbox-dark-bg0/90 transition-all duration-300 relative"
                  onMouseEnter={() => setIsQuoteHovered(true)}
                  onMouseLeave={() => setIsQuoteHovered(false)}
                >
                  {currentQuote && (
                    <div 
                      key={currentQuoteIndex}
                      className="text-gruvbox-bright-yellow text-xs font-mono italic text-center leading-relaxed mb-2"
                      style={{
                        animation: 'fadeInSlide 0.5s ease-in-out'
                      }}
                    >
                      <div>"{currentQuote.quote}"</div>
                      <div className="text-gruvbox-bright-red mt-1">— {currentQuote.attribution}</div>
                    </div>
                  )}
                  
                  {/* Terminal-style status indicator */}
                  <div className="absolute bottom-1 left-2 text-xs font-mono">
                    {isQuoteHovered ? (
                      <span className="text-gruvbox-bright-aqua opacity-70">[PAUSED]</span>
                    ) : (
                      <span className="text-gruvbox-dark-fg3 opacity-40">[LIVE]</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Game Content (Wider) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col min-w-0">
            
            {/* Cards Container with integrated labels */}
            <div className="terminal-card p-4 flex-1 flex flex-col">
              {/* Header inside card container */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gruvbox-dark-bg3">
                <span className="text-gruvbox-bright-yellow font-semibold"># scenario_cards.active()</span>
                <span className="text-gruvbox-dark-fg3">
                  {gameState.cardActionsCompleted > 0 ? (
                    <span className="text-gruvbox-bright-green font-medium">
                      {gameState.cardActionsCompleted}/2 played
                    </span>
                  ) : gameState.actionsLeft > 0 ? (
                    <span className="text-gruvbox-bright-blue font-medium">
                      👉 Choose cards to play
                    </span>
                  ) : null}
                </span>
              </div>
              
                              <div className={`flex-1 gap-3 min-h-0 overflow-y-auto p-2 ${
              gameState.hand.length === 1 
                ? 'flex justify-center' 
                : gameState.hand.length === 2
                ? 'grid grid-cols-1 md:grid-cols-2'
                : gameState.cardActionsCompleted >= 2
                ? 'grid grid-cols-1 md:grid-cols-3' // More compact when drawer is open
                : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            }`}>
              {gameState.hand.map((card) => {
                const isOnlyCardLeft = gameState.cardActionsCompleted === 2 && gameState.hand.length === 1;
                const isCardDisabled = gameState.actionsLeft === 0;
                const isPostponedToEternity = gameState.hand.length === 1 && gameState.cardActionsCompleted === 2 && isCardDisabled;
                
                return (
                                      <div 
                      key={card.id} 
                      className={`terminal-card ${gameState.cardActionsCompleted >= 2 ? 'p-2' : 'p-3'} flex flex-col transition-all duration-300 relative rounded-lg shadow-md border-2 min-h-0 m-1 ${
                        isCardDisabled ? 'opacity-60 saturate-50 border-gruvbox-dark-bg3' :
                        isOnlyCardLeft ? 'ring-2 ring-gruvbox-bright-yellow ring-opacity-60 shadow-xl border-gruvbox-bright-yellow border-opacity-40' :
                        gameState.actionsLeft > 0 && gameState.cardActionsCompleted === 0 ? 'ring-2 ring-gruvbox-bright-blue ring-opacity-30 border-gruvbox-bright-blue border-opacity-30' :
                        gameState.actionsLeft > 0 ? 'ring-1 ring-gruvbox-bright-blue ring-opacity-25 border-gruvbox-dark-bg3' : 'border-gruvbox-dark-bg3'
                      } ${gameState.hand.length === 1 ? 'max-w-md w-full self-start' : 'h-full'} ${
                        !isCardDisabled ? 'hover:shadow-xl hover:scale-[1.01] hover:border-gruvbox-bright-aqua hover:border-opacity-50 cursor-pointer transform' : ''
                      }`}
                      style={{
                        background: isCardDisabled 
                          ? 'linear-gradient(135deg, rgba(40, 40, 40, 0.8), rgba(50, 48, 47, 0.6))'
                          : 'linear-gradient(135deg, rgba(60, 56, 54, 0.9), rgba(80, 73, 69, 0.7))',
                        backdropFilter: 'blur(2px)'
                      }}
                  >
                    {/* Card Header */}
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gruvbox-dark-bg3 border-opacity-50">
                      <span className="text-2xl">{card.icon}</span>
                      <span className="text-gruvbox-bright-aqua text-base font-semibold">{card.title}</span>
                      {isOnlyCardLeft && !isCardDisabled ? (
                        <span className="text-gruvbox-bright-yellow text-xs bg-gruvbox-dark-bg2 px-2 py-1 rounded ml-auto">
                          final_card
                        </span>
                      ) : isCardDisabled ? (
                        <span className="text-gruvbox-bright-red text-xs bg-gruvbox-dark-bg2 px-2 py-1 rounded ml-auto border border-gruvbox-bright-red border-opacity-30">
                          no_actions_left
                        </span>
                      ) : null}
                      {isPostponedToEternity && (
                        <div className="absolute top-2 right-2 transform rotate-12">
                          <span className="text-gruvbox-bright-purple text-xs bg-gruvbox-dark-bg1 px-2 py-1 rounded border border-gruvbox-bright-purple border-opacity-50 font-mono shadow-lg">
                            ∞ ETERNAL
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-gruvbox-dark-fg2 text-sm mb-4 flex-1 leading-relaxed">
                      {card.scenario}
                    </p>
                    {isOnlyCardLeft && !isCardDisabled && (
                      <div className="mb-3 p-2 bg-gruvbox-dark-bg2 rounded text-xs text-gruvbox-bright-yellow">
                        💭 This is your final decision for this sprint. Choose wisely, Agile Shaman.
                      </div>
                    )}
                    {isCardDisabled && !isPostponedToEternity && (
                      <div className="mb-3 p-2 bg-gruvbox-dark-bg2 rounded text-xs border border-gruvbox-bright-red border-opacity-20">
                        <div className="text-gruvbox-bright-red">
                          🚫 No actions remaining. Use bonus rituals or advance to next sprint.
                        </div>
                      </div>
                    )}
                    <div className="space-y-3">
                      {card.choices.map((choice, choiceIndex) => (
                        <button
                          key={choice.id}
                          onClick={() => makeChoice(card, choice)}
                          disabled={isCardDisabled}
                          className={`w-full text-left p-3 md:p-4 rounded text-sm transition-all duration-200 relative border ${
                            isCardDisabled
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed border-gruvbox-dark-fg4 border-opacity-30' 
                              : isOnlyCardLeft
                              ? 'bg-gruvbox-dark-bg1 text-gruvbox-dark-fg hover:bg-gruvbox-bright-yellow hover:bg-opacity-10 border-gruvbox-bright-yellow border-opacity-30 hover:border-opacity-50 hover:shadow-md hover:z-10'
                              : 'bg-gruvbox-dark-bg1 text-gruvbox-dark-fg hover:bg-gruvbox-dark-bg2 border-gruvbox-dark-bg3 hover:border-gruvbox-bright-aqua hover:border-opacity-50 hover:shadow-md hover:z-10'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`font-bold ${isCardDisabled ? 'text-gruvbox-dark-fg4' : 'text-gruvbox-bright-yellow'}`}>
                              {String.fromCharCode(97 + choiceIndex)})
                            </span>
                            <span className="font-medium">{choice.label}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(choice.effects).map(([key, value]) => {
                              const statNames = {
                                velocity: 'vel',
                                morale: 'team', 
                                happiness: 'client',
                                techDebt: 'debt'
                              };
                              const statName = statNames[key as keyof typeof statNames] || key;
                              // For tech debt, positive is bad (red), negative is good (green)
                              const isGoodEffect = key === 'techDebt' ? value! < 0 : value! > 0;
                              const isBadEffect = key === 'techDebt' ? value! > 0 : value! < 0;
                              return (
                                <span 
                                  key={key}
                                  className={`text-xs px-2 py-1 rounded font-mono font-semibold ${
                                    isCardDisabled ? 'bg-gruvbox-dark-bg3 text-gruvbox-dark-fg4 opacity-60' :
                                    isGoodEffect ? 'bg-gruvbox-light-green text-gruvbox-dark-bg' : 
                                    isBadEffect ? 'bg-gruvbox-light-red text-gruvbox-dark-bg' :
                                    'bg-gruvbox-dark-bg3 text-gruvbox-dark-fg3'
                                  }`}
                                >
                                  {value! > 0 ? '+' : ''}{value} {statName}
                                </span>
                              );
                            })}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              </div>
            </div>

            {/* Sprint Boost Toolkit Drawer */}
            <div className="mt-4 flex-shrink-0 relative">
              <div className="relative">
                
                {/* Drawer Content - Positioned above header, opens upward */}
                <div className={`absolute bottom-full left-0 right-0 mb-2 overflow-hidden transition-all duration-500 ease-out ${
                  gameState.cardActionsCompleted >= 2
                    ? 'max-h-96 opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 translate-y-4'
                }`}>
                  <div className="terminal-card bg-gruvbox-dark-bg1 border-2 border-gruvbox-bright-purple border-opacity-30 shadow-2xl">
                    <div className="p-3 bg-gruvbox-bright-purple bg-opacity-10">
                      <div className="text-xs text-gruvbox-dark-fg3 mb-3 text-center">
                        {gameState.cardActionsCompleted < 2
                          ? `🔒 Complete ${2 - gameState.cardActionsCompleted} more card action${2 - gameState.cardActionsCompleted === 1 ? '' : 's'} to unlock toolkit`
                          : <span className="text-gruvbox-bright-purple">✨ Toolkit ready! Each item can only be used once per game</span>
                        }
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
                        {/* Team Boosters */}
                        <button
                          onClick={() => performRitual('pastries')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('pastries')}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('pastries')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🥐</span>
                            <span className="font-semibold text-xs">./pastries</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-green">+10 team</span>
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('coffee')}
                          disabled={gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>☕</span>
                            <span className="font-semibold text-xs">./coffee</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-blue">+6 vel</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-green">+4 team</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => performRitual('refactor')}
                          disabled={gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🔧</span>
                            <span className="font-semibold text-xs">./refactor</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-red">-10 debt</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-orange">-3 vel</span>
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('demo')}
                          disabled={gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🎭</span>
                            <span className="font-semibold text-xs">./demo</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-yellow">+8 client</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-orange">-2 vel</span>
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('overtime')}
                          disabled={gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>⚡</span>
                            <span className="font-semibold text-xs">./overtime</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-blue">+12 vel</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-red">-6 team</span>
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('raise')}
                          disabled={gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.ritualsUsed >= gameState.maxRituals || gameState.cardActionsCompleted === 0
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>💰</span>
                            <span className="font-semibold text-xs">./raise</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-green">+15 team</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-blue">+3 vel</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-yellow">+5 client</span>
                          </div>
                        </button>

                        {/* New Toolkit Items */}
                        <button
                          onClick={() => performRitual('intern')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('intern')}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('intern')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🎓</span>
                            <span className="font-semibold text-xs">./intern</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-blue">+8 vel</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-red">+5 debt</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-green">+3 team</span>
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('consultant')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('consultant')}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('consultant')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🧙</span>
                            <span className="font-semibold text-xs">./consultant</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-blue">+5 vel</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-yellow">+12 client</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-green">-8 debt</span>
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('architect')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('architect')}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('architect')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🏗️</span>
                            <span className="font-semibold text-xs">./architect</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-green">-15 debt</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-red">-5 vel</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-red">-3 team</span>
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('pizza')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('pizza')}
                          className={`p-2 rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.includes('pizza')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🍕</span>
                            <span className="font-semibold text-xs">./pizza</span>
                      </div>
                          <div className="text-xs">
                            <span className="text-gruvbox-bright-green">+12 team</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-blue">+4 vel</span>
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            <span className="text-gruvbox-bright-yellow">+6 client</span>
                    </div>
                  </button>
                </div>
                
                      <div className="flex justify-end pt-3 border-t border-gruvbox-dark-bg3">
                  <button
                    onClick={nextSprint}
                          disabled={gameState.cardActionsCompleted < 2}
                          className={`px-4 py-2 rounded font-mono transition-all ${
                            gameState.cardActionsCompleted < 2
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed'
                              : 'button-primary'
                          }`}
                        >
                          {gameState.cardActionsCompleted < 2 ? './complete-actions-first' : './next-sprint'}
                  </button>
                </div>
              </div>
            </div>
                </div>

                {/* Drawer Header with Boost Counter */}
                <div className="terminal-card p-3 border-b border-gruvbox-dark-bg3 flex items-center justify-between">
                  <div className={`text-sm font-mono transition-all duration-300 ${
                    gameState.ritualsUsed < gameState.maxRituals && gameState.cardActionsCompleted >= 1
                      ? 'text-gruvbox-bright-purple font-bold'
                      : 'text-gruvbox-bright-yellow'
                  }`}>
                    🚀 # sprint_boost.toolkit()
                  </div>
                  <div className={`px-3 py-1 rounded flex items-center gap-2 transition-all duration-300 ${
                    gameState.cardActionsCompleted >= 1 && gameState.ritualsUsed < gameState.maxRituals
                      ? 'bg-gruvbox-bright-purple bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30'
                      : 'bg-gruvbox-dark-bg2'
                  }`}>
                    <span className="text-gruvbox-dark-fg3 text-xs">used: </span>
                    <span className={`font-bold text-sm transition-all duration-500 transform ${
                      gameState.cardActionsCompleted >= 1
                        ? 'text-gruvbox-bright-purple'
                        : 'text-gruvbox-dark-fg3'
                    } ${numberAnimations.ritualsAvailable}`}>
                      {gameState.usedRituals.length}
                    </span>
                    <span className="text-gruvbox-dark-fg4 text-xs">/10</span>
                  </div>
                </div>
              </div>
            </div>
            </div>

          {/* Right Column - Event Journal */}
          <div className="col-span-1 lg:col-span-3">
            <div className="terminal-card h-full flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-3 pb-2 border-b border-gruvbox-dark-bg3">
                <span className="text-gruvbox-bright-yellow text-sm"># agile_journal.log</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    gameState.actionsLeft > 0
                      ? 'bg-green-400'
                      : 'bg-red-400'
                  }`}></div>
                  <span className="text-gruvbox-dark-fg3 text-xs">LIVE</span>
                </div>
              </div>
              <div className="flex-1 overflow-hidden p-4 pt-3">
                <div className="h-full overflow-y-auto" id="journal-container">
                  {gameState.log.length === 0 ? (
                  <div className="text-gruvbox-dark-fg3 text-center py-8 text-sm">
                    <div className="animate-pulse">// Waiting for events...</div>
                    </div>
                  ) : (
                  <div className="space-y-3">
                    {gameState.log.slice(0, 10).map((entry, index) => (
                        <div
                          key={entry.id}
                        className={`text-sm transition-all duration-500 ${
                          index === 0 ? 'animate-fadeInSlide border-l-2 border-gruvbox-bright-aqua pl-3 bg-gruvbox-dark-bg2 bg-opacity-50 rounded-r' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2 text-gruvbox-dark-fg3 text-xs">
                          <span className="font-mono">[{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                          <span className="bg-gruvbox-dark-bg3 px-1 rounded text-xs">S{entry.sprint}</span>
                          {index === 0 && <span className="text-green-400 text-xs animate-pulse">NEW</span>}
                        </div>
                        <div className={`mt-1 leading-relaxed font-mono text-xs ${
                          entry.type === 'action' ? 'text-blue-300' :
                          entry.type === 'ritual' ? 'text-purple-300' :
                          entry.type === 'chaos' ? 'text-red-300' :
                          'text-gruvbox-dark-fg2'
                        }`}>
                          <span className="text-gruvbox-bright-aqua mr-1">&gt;</span>
                                {entry.message}
                        </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Game Modal */}
      {renderEndGameModal()}

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="terminal-card p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="text-gruvbox-bright-yellow text-xl font-bold mb-4">
                🚪 Exit to Main Menu?
              </div>
              <div className="text-gruvbox-dark-fg2 mb-6">
                This will end your current sprint session and clear all progress. Are you sure you want to return to the main menu?
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleBackToMenu}
                  className="button-primary px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Yes, Exit Game
                </button>
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="bg-gruvbox-dark-bg2 text-gruvbox-dark-fg hover:bg-gruvbox-dark-bg3 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
