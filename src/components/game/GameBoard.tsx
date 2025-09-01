import React, { useState, useEffect } from 'react';
// Framer Motion imports removed - not currently used
import { useGameState } from '../../hooks/useGameState';
import { Tooltip } from '../ui/Tooltip';
import { PROJECT_QUOTES } from '../../data/quotes';

const STAT_CONFIG = {
  velocity: { key: 'velocity', label: 'VL', shortLabel: 'VL', fullName: 'Velocity', description: 'Development speed and delivery rate', icon: '⚡', color: 'blue', colorClass: 'text-blue-400' },
  morale: { key: 'morale', label: 'TM', shortLabel: 'TM', fullName: 'TeamMorale', description: 'Team spirit and motivation levels', icon: '♡', color: 'green', colorClass: 'text-green-400' },
  happiness: { key: 'happiness', label: 'CS', shortLabel: 'CS', fullName: 'ClientSat', description: 'Client satisfaction and feedback', icon: '★', color: 'yellow', colorClass: 'text-yellow-400' },
  techDebt: { key: 'techDebt', label: 'TD', shortLabel: 'TD', fullName: 'TechDebt', description: 'Technical debt and code quality', icon: '⚠', color: 'red', colorClass: 'text-red-400' }
};



interface GameBoardProps {
  onBackToMenu?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ onBackToMenu }) => {
  const { gameState, numberAnimations, chaosEffect, makeChoice, nextSprint, restartGame, performRitual } = useGameState();

  // Helper function to render metric effects with unified formatting
  const renderMetricEffect = (value: number, metricKey: string) => {
    const config = STAT_CONFIG[metricKey as keyof typeof STAT_CONFIG];
    const shortLabel = config ? config.shortLabel : metricKey;
    const colorClass = 'text-white'; // Use white for all metric effects
    return (
      <span className={colorClass}>
        {value > 0 ? '+' : ''}{value} {shortLabel}
      </span>
    );
  };


  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [shuffledQuotes, setShuffledQuotes] = useState<typeof PROJECT_QUOTES>([]);

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

  // Listen for restart shortcut requests
  useEffect(() => {
    const handleRestartRequest = () => {
      setShowRestartConfirm(true);
    };

    window.addEventListener('restartGameRequest', handleRestartRequest);
    return () => window.removeEventListener('restartGameRequest', handleRestartRequest);
  }, []);

  const handleBackToMenu = () => {
    // Clear game state and go back to menu
    localStorage.removeItem('agile-shaman-game-state');
    restartGame();
    if (onBackToMenu) {
      onBackToMenu();
    }
  };

  // Rotate quotes every 5 seconds
  useEffect(() => {
    if (shuffledQuotes.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % shuffledQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [shuffledQuotes]);

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
              $ ./agile-shaman --status=legendary --chaos-survived --sprints=8
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
      // Check if this was caused by an unplayed card
      const isUnplayedCardFailure = gameState.defeatReason && 
        gameState.defeatReason.includes('unplayed') && 
        gameState.defeatReason.includes('caused catastrophic failure');
      
      return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="terminal-card p-6 text-left max-w-2xl mx-auto shadow-2xl border border-gruvbox-bright-red border-opacity-50 font-mono text-sm">
            {/* Stack Trace Header */}
            <div className="text-gruvbox-bright-red text-lg mb-3 font-bold">
              ⚠️  FATAL ERROR - GAME TERMINATED
            </div>
            
            {/* Stack Trace Body */}
            <div className="space-y-2 text-gruvbox-dark-fg2">
              <div className="text-gruvbox-bright-orange">
                at GameEngine.crash() (sprint:{gameState.sprint})
              </div>
              
              {isUnplayedCardFailure && (
                <div className="text-red-400 ml-4">
                  at UnplayedCard.haunt() (unplayed card disaster)
                </div>
              )}
              
              <div className="text-gruvbox-bright-yellow ml-4">
                at Metrics.checkGameEnd() (critical threshold exceeded)
              </div>
              
              <div className="text-gruvbox-dark-fg3 ml-8">
                // {gameState.defeatReason}
              </div>
            </div>
            
            {/* Critical Metrics Stack */}
            <div className="mt-4 p-3 bg-gruvbox-dark-bg2 rounded border-l-4 border-red-500">
              <div className="text-gruvbox-bright-yellow text-sm font-bold mb-2">
                CRITICAL METRICS STACK:
              </div>
              <div className="space-y-1">
                {Object.entries(STAT_CONFIG).map(([key, config]) => {
                  const value = gameState.stats[key as keyof typeof gameState.stats];
                  
                  // Only show metrics that caused the game end
                  const isGameEndCause = (key === 'techDebt' && value > 80) || 
                                       (key !== 'techDebt' && value < 20);
                  
                  if (!isGameEndCause) return null;
                  
                  // Check if metric hit zero (catastrophic failure)
                  const isZero = value <= 0;
                  const isCritical = (key === 'techDebt' && value >= 100) || 
                                   (key !== 'techDebt' && value <= 0);
                  
                  return (
                    <div 
                      key={key} 
                      className={`flex items-center justify-between p-1 rounded ${
                        isCritical ? 'bg-red-500/20 border border-red-500/40' : 'bg-gruvbox-dark-bg3'
                      }`}
                    >
                      <span className="text-gruvbox-dark-fg2 text-xs">
                        {config.icon} {config.label}
                      </span>
                      <div className="flex items-center gap-2">
                        {isZero && (
                          <span className="text-red-400 text-lg animate-pulse" title="CRITICAL: Metric hit zero!">
                            💀
                          </span>
                        )}
                        {isCritical && !isZero && (
                          <span className="text-orange-400 text-sm animate-pulse" title="DANGEROUS: Metric at critical level">
                            ⚠️
                          </span>
                        )}
                        <span className={`font-bold text-xs ${
                          isZero ? 'text-red-400' : 
                          isCritical ? 'text-orange-400' : 'text-gruvbox-bright-yellow'
                        }`}>
                          {value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Stack Trace Footer */}
            <div className="mt-4 text-gruvbox-dark-fg3 text-xs">
              <div>Process terminated with exit code: FAILURE</div>
              <div>Stack trace generated at: {new Date().toLocaleTimeString()}</div>
            </div>
            
            {/* Action Button */}
            <div className="mt-4 text-center">
              <button
                onClick={restartGame}
                className="button-primary px-4 py-2 rounded text-sm font-mono transition-all"
              >
                ./restart-game
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="game-container bg-gruvbox-dark-bg0 p-4 font-mono">
      <div className="h-full flex flex-col min-h-0">
        
        {/* Header - Sprint Info with Metrics in Center */}
        <div className="terminal-card p-3 md:p-4 mb-4 flex-shrink-0 overflow-visible">
          <div className="grid grid-cols-12 gap-2 md:gap-4 items-center">
            
            {/* Left Section - Game Name */}
            <div className="col-span-4 md:col-span-3 flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setShowExitConfirm(true)}
                className="text-gruvbox-bright-yellow text-xl font-bold hover:text-gruvbox-light-yellow transition-colors duration-200 cursor-pointer hover:underline"
                title="Back to Main Menu"
              >
                ../agile-shaman
              </button>
              <span className="text-gruvbox-dark-fg4 text-xs font-mono opacity-60 hover:opacity-100 transition-opacity duration-200">
                --quit
              </span>
              {import.meta.env.DEV && (
                <span className="text-gruvbox-bright-red text-xs font-mono bg-gruvbox-dark-bg2 px-2 py-1 rounded opacity-75 hover:opacity-100 transition-opacity duration-200 animate-pulse"
                      title="Ctrl+Shift+R = Restart Game">
                  DEV
                </span>
              )}
            </div>

            {/* Center Section - Metrics (Wider & More Readable) */}
            <div className="col-span-4 md:col-span-6 transition-all duration-500 overflow-visible">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 overflow-visible">
                {Object.entries(STAT_CONFIG).map(([key, config]) => {
                  const value = gameState.stats[key as keyof typeof gameState.stats];

                  // Get semantic colors based on value meaning (green = good, red = bad)
                  const getSemanticColor = (val: number, metricKey: string) => {
                    const isInverse = metricKey === 'techDebt';
                    const normalizedValue = isInverse ? 100 - val : val;
                    
                    // Semantic color mapping: green = good, red = bad
                    if (normalizedValue >= 80) return { text: 'text-green-400', bg: 'bg-green-500', border: 'border-green-400', glow: 'shadow-green-500/50' };
                    if (normalizedValue >= 60) return { text: 'text-green-300', bg: 'bg-green-400', border: 'border-green-300', glow: 'shadow-green-400/50' };
                    if (normalizedValue >= 40) return { text: 'text-yellow-400', bg: 'bg-yellow-500', border: 'border-yellow-400', glow: 'shadow-yellow-500/50' };
                    if (normalizedValue >= 20) return { text: 'text-orange-400', bg: 'bg-orange-500', border: 'border-orange-400', glow: 'shadow-orange-500/50' };
                    return { text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-400', glow: 'shadow-red-500/50' };
                  };

                  // Clean white colors for all metrics
                  const getMetricAccentColor = (metricKey: string) => {
                    const accentColors = {
                      velocity: { text: 'text-white', border: 'border-white' },
                      morale: { text: 'text-white', border: 'border-white' }, 
                      happiness: { text: 'text-white', border: 'border-white' },
                      techDebt: { text: 'text-white', border: 'border-white' }
                    };
                    return accentColors[metricKey as keyof typeof accentColors];
                  };

                  const semanticColors = getSemanticColor(value, key);
                  const accentColor = getMetricAccentColor(key);
                  const isDangerous = (key === 'techDebt' && value > 80) || (key !== 'techDebt' && value < 20);

                  return (
                    <Tooltip
                      key={key}
                      content={`${config.fullName}: ${config.description}`}
                      position="bottom"
                      delay={300}
                    >
                      <div
                        className={`group flex flex-col items-center gap-1.5 transition-all duration-300 px-3 py-2.5 rounded-lg border-2 ${accentColor.border} ${isDangerous ? `${semanticColors.glow} shadow-lg animate-pulse bg-gruvbox-dark-bg2 border-opacity-60` : 'border-opacity-30 hover:border-opacity-60 hover:bg-gruvbox-dark-bg1 active:scale-95'} ${chaosEffect ? 'animate-pulse' : ''} cursor-pointer focus:outline-none focus:ring-2 focus:ring-gruvbox-bright-blue focus:ring-opacity-50`} 
                        style={chaosEffect ? { animation: 'chaosShake 0.5s ease-in-out' } : {}}
                        onClick={() => {
                          // Add click feedback - could be used for future features like detailed metric view
                          console.log(`Clicked on ${config.fullName}: ${value}`);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            console.log(`Clicked on ${config.fullName}: ${value}`);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`${config.fullName}: ${value} - ${config.description}`}
                      >
                        {/* Progress bar on top - only show on large screens */}
                        <div className="w-full bg-gruvbox-dark-bg3 rounded-full h-1.5 overflow-hidden shadow-inner border border-gruvbox-dark-bg2 hidden xl:block">
                          <div
                            className={`h-full transition-all duration-500 ${semanticColors.bg} ${isDangerous ? 'animate-pulse' : ''}`}
                            style={{
                              width: `${Math.max(2, value)}%`,
                              boxShadow: isDangerous ? `inset 0 0 8px rgba(255,255,255,0.2)` : 'none'
                            }}
                          />
                        </div>
                        
                        {/* Icon, initials, and number - bigger when no bars */}
                        <div className="flex items-center gap-2">
                          <span className={`${accentColor.text} ${isDangerous ? 'animate-pulse' : ''} text-base xl:text-lg`}>{config.icon}</span>
                          <span className={`${accentColor.text} text-xs xl:text-sm font-bold tracking-wide`}>{config.shortLabel}</span>
                          <span className={`text-sm xl:text-base font-black ${semanticColors.text} ${isDangerous ? 'animate-pulse' : ''}`}>
                            {value}
                            {isDangerous && <span className="ml-1 text-red-400 text-xs">⚠</span>}
                          </span>
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
            
            {/* Right Section - Sprint Info */}
            <div className="col-span-4 md:col-span-3 flex justify-end">
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
        <div className="game-content grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Column - Background Image Area (Narrower) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="h-full w-full rounded relative overflow-hidden border border-gruvbox-dark-bg3">
              {/* Background image */}
              <div className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-[url('/shaman-bg.png')]" />
              {/* Subtle dark overlay for readability */}
              <div className="absolute inset-0 bg-gruvbox-dark-bg0/30" />
              

              
              {/* Rotating Satirical Quotes */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-gruvbox-dark-bg0/80 backdrop-blur-sm rounded-lg p-3 pb-6 border border-gruvbox-dark-bg3/50 cursor-pointer hover:bg-gruvbox-dark-bg0/90 transition-all duration-300 relative">
                  {currentQuote ? (
                    <div 
                      key={currentQuoteIndex}
                      className="text-gruvbox-bright-yellow text-sm font-mono italic text-center leading-relaxed mb-2"
                    >
                      <div className="mb-2">"{currentQuote.quote}"</div>
                      <div className="text-gruvbox-bright-red text-xs">— {currentQuote.attribution}</div>
                    </div>
                  ) : (
                    <div className="text-gruvbox-dark-fg3 text-sm font-mono text-center mb-2">
                      ...
                    </div>
                  )}


                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Game Content (Wider) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col min-h-0 overflow-hidden">
            
            {/* Cards Container with integrated labels */}
            <div className="terminal-card p-4 flex-1 flex flex-col min-h-0 overflow-hidden">
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

              {gameState.hand.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <div className="text-gruvbox-dark-fg3 text-lg mb-4">Loading cards...</div>
                  <div className="text-gruvbox-dark-fg4 text-sm">Drawing from the mystical deck...</div>
                </div>
              )}
              <div className={`scrollable-content flex-1 gap-3 p-2 ${
                gameState.hand.length === 1
                  ? 'flex justify-center'
                  : gameState.hand.length === 2
                  ? 'grid grid-cols-1 md:grid-cols-2'
                  : gameState.cardActionsCompleted >= 2
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 card-grid' // More compact when drawer is open
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 card-grid'
              }`}>
                {gameState.hand.map((card) => {
                  const isOnlyCardLeft = gameState.cardActionsCompleted === 2 && gameState.hand.length === 1;
                  const isCardDisabled = gameState.actionsLeft === 0;
                  const isPostponedToEternity = gameState.hand.length === 1 && gameState.cardActionsCompleted === 2 && isCardDisabled;

                  return (
                    <div
                      key={card.id}
                      className={`terminal-card game-card ${gameState.cardActionsCompleted >= 2 ? 'p-2' : 'p-2 md:p-3'} flex flex-col transition-all duration-300 relative rounded-lg shadow-md border-2 m-1 ${
                        isCardDisabled ? 'opacity-60 saturate-50 border-gruvbox-dark-bg3' :
                        isOnlyCardLeft ? 'ring-2 ring-gruvbox-bright-yellow ring-opacity-60 shadow-xl border-gruvbox-bright-yellow border-opacity-40' :
                        gameState.actionsLeft > 0 && gameState.cardActionsCompleted === 0 ? 'ring-2 ring-gruvbox-bright-blue ring-opacity-30 border-gruvbox-bright-blue border-opacity-30' :
                        gameState.actionsLeft > 0 ? 'ring-1 ring-gruvbox-bright-blue ring-opacity-25 border-gruvbox-dark-bg3' : 'border-gruvbox-dark-bg3'
                      } ${gameState.hand.length === 1 ? 'max-w-md w-full self-start' : ''} ${
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
                      <div className="card-content-area">
                        <p className="card-text text-gruvbox-dark-fg2 text-sm mb-4 leading-relaxed">
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
                            className={`choice-button w-full text-left p-2 md:p-3 lg:p-4 rounded text-sm transition-all duration-200 relative border ${
                              isCardDisabled
                                ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed border-gruvbox-dark-fg4 border-opacity-30'
                                : isOnlyCardLeft
                                ? 'bg-gruvbox-dark-bg1 text-gruvbox-dark-fg hover:bg-gruvbox-bright-yellow hover:bg-opacity-10 border-gruvbox-bright-yellow border-opacity-30 hover:border-opacity-50 hover:shadow-md hover:z-10'
                                : 'bg-gruvbox-dark-bg1 text-gruvbox-dark-fg hover:bg-gruvbox-dark-bg2 border-gruvbox-dark-bg3 hover:border-gruvbox-bright-aqua hover:border-opacity-50 hover:shadow-md hover:z-10'
                            }`}
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <span className={`font-bold flex-shrink-0 ${isCardDisabled ? 'text-gruvbox-dark-fg4' : 'text-gruvbox-bright-yellow'}`}>
                                {String.fromCharCode(97 + choiceIndex)})
                              </span>
                              <span className="choice-label font-medium">{choice.label}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(choice.effects).map(([key, value]) => {
                                const config = STAT_CONFIG[key as keyof typeof STAT_CONFIG];
                                const statName = config ? config.shortLabel : key;
                                const colorClass = 'text-white'; // Use white for all card choice effects
                                // For tech debt, positive is bad (red), negative is good (green)
                                const isGoodEffect = key === 'techDebt' ? value! < 0 : value! > 0;
                                const isBadEffect = key === 'techDebt' ? value! > 0 : value! < 0;
                                return (
                                  <span
                                    key={key}
                                    className={`text-xs px-1.5 py-0.5 rounded font-mono font-semibold flex-shrink-0 text-white ${
                                      isCardDisabled ? 'bg-gruvbox-dark-bg3 opacity-60' :
                                      isGoodEffect ? 'bg-gruvbox-light-green' :
                                      isBadEffect ? 'bg-gruvbox-light-red' :
                                      'bg-gruvbox-dark-bg3'
                                    }`}
                                  >
                                    {value! > 0 ? '+' : ''}{value} <span className={colorClass}>{statName}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </button>
                        ))}
                      </div>
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
                      
                      <div className="toolkit-grid mb-3 max-h-48 overflow-y-auto">
                        {/* VELOCITY & PRODUCTIVITY */}
                        <button
                          onClick={() => performRitual('coffee')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('coffee')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('coffee')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>☕</span>
                            <span className="font-semibold text-xs">./coffee</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(6, 'velocity')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(4, 'morale')}
                    </div>
                  </button>
                  
                  <button
                          onClick={() => performRitual('overtime')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('overtime')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('overtime')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>⚡</span>
                            <span className="font-semibold text-xs">./overtime</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(12, 'velocity')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(-6, 'morale')}
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('intern')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('intern')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('intern')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>👶</span>
                            <span className="font-semibold text-xs">./intern</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(8, 'velocity')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(5, 'techDebt')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(3, 'morale')}
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('automation')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('automation')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('automation')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🤖</span>
                            <span className="font-semibold text-xs">./automate</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(-12, 'techDebt')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(8, 'velocity')}
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('startup')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('startup')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('startup')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🚀</span>
                            <span className="font-semibold text-xs">./startup</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(25, 'velocity')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(-10, 'morale')}
                          </div>
                        </button>

                        {/* TEAM & MORALE */}
                        <button
                          onClick={() => performRitual('pastries')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('pastries')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('pastries')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🥐</span>
                            <span className="font-semibold text-xs">./pastries</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(10, 'morale')}
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('pizza')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('pizza')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('pizza')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🍕</span>
                            <span className="font-semibold text-xs">./pizza</span>
                      </div>
                          <div className="text-xs">
                            {renderMetricEffect(12, 'morale')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(4, 'velocity')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(6, 'happiness')}
                    </div>
                  </button>

                        <button
                          onClick={() => performRitual('inspiration')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('inspiration')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('inspiration')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🌟</span>
                            <span className="font-semibold text-xs">./inspire</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(10, 'morale')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(6, 'velocity')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(3, 'happiness')}
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('mentorship')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('mentorship')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('mentorship')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>👨‍🏫</span>
                            <span className="font-semibold text-xs">./mentor</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(12, 'morale')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(-6, 'techDebt')}
                          </div>
                        </button>

                        {/* QUALITY & TECH DEBT */}
                  <button
                    onClick={() => performRitual('refactor')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('refactor')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('refactor')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🔧</span>
                            <span className="font-semibold text-xs">./refactor</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(-10, 'techDebt')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(-3, 'velocity')}
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('architect')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('architect')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('architect')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🏗️</span>
                            <span className="font-semibold text-xs">./architect</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(-15, 'techDebt')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(-5, 'velocity')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(-3, 'morale')}
                          </div>
                        </button>

                        {/* BUSINESS & CLIENT */}
                        <button
                          onClick={() => performRitual('demo')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('demo')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('demo')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🎭</span>
                            <span className="font-semibold text-xs">./demo</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(8, 'happiness')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(-2, 'velocity')}
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('partnership')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('partnership')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('partnership')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>🤝</span>
                            <span className="font-semibold text-xs">./partner</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(15, 'happiness')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(6, 'velocity')}
                          </div>
                        </button>

                        {/* EXTERNAL HELP */}
                        <button
                          onClick={() => performRitual('consultant')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('consultant')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('consultant')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>👨‍💼</span>
                            <span className="font-semibold text-xs">./consult</span>
                          </div>
                          <div className="text-xs">
                            {renderMetricEffect(5, 'velocity')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(12, 'happiness')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(-8, 'techDebt')}
                          </div>
                        </button>

                        <button
                          onClick={() => performRitual('bonus')}
                          disabled={gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('bonus')}
                          className={`toolkit-button rounded font-mono text-xs text-left transition-all duration-200 ${
                            gameState.cardActionsCompleted === 0 || gameState.usedRituals.length >= 8 || gameState.usedRituals.includes('bonus')
                              ? 'bg-gruvbox-dark-bg2 text-gruvbox-dark-fg4 cursor-not-allowed opacity-50'
                              : 'button-secondary hover:bg-gruvbox-bright-purple hover:bg-opacity-20 border border-gruvbox-bright-purple border-opacity-30 hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span>💰</span>
                            <span className="font-semibold text-xs">./bonus</span>
                      </div>
                          <div className="text-xs">
                            {renderMetricEffect(15, 'morale')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(3, 'velocity')}
                            <span className="text-gruvbox-dark-fg4 mx-1">•</span>
                            {renderMetricEffect(5, 'happiness')}
                    </div>
                  </button>
                </div>
                
                      <div className="flex justify-between items-center pt-3 border-t border-gruvbox-dark-bg3">
                        <button
                          onClick={() => setShowRestartConfirm(true)}
                          className="text-gruvbox-bright-orange text-sm font-mono bg-gruvbox-dark-bg2 px-3 py-2 rounded hover:bg-gruvbox-dark-bg1 transition-all duration-200"
                          title="Restart game (Ctrl+Shift+R)"
                        >
                          🔄 ./restart
                        </button>

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
                  <div className="flex items-center gap-3">
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
                      <span className="text-gruvbox-dark-fg4 text-xs">/8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

          {/* Right Column - Event Journal */}
          <div className="col-span-1 lg:col-span-3 flex flex-col min-h-0 overflow-hidden">
            <div className="terminal-card h-full flex flex-col min-h-0 overflow-hidden">
              <div className="flex items-center justify-between p-3 pb-2 border-b border-gruvbox-dark-bg3 flex-shrink-0">
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
              <div className="flex-1 overflow-hidden p-4 pt-3 min-h-0">
                <div className="scrollable-content h-full" id="journal-container">
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
              
              {/* Journal Footer with Cool Elements */}
              <div className="flex items-center justify-between p-3 pt-2 border-t border-gruvbox-dark-bg3 flex-shrink-0">
                {/* Left Side - Cool Element */}
                <div className="flex items-center gap-2 text-gruvbox-dark-fg3 text-xs">
                  <span className="animate-pulse">⚡</span>
                  <span className="font-mono">log_entries: {gameState.log.length}</span>
                </div>
                
                {/* Center - Feedback Button */}
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="text-gruvbox-bright-orange text-xs font-mono hover:text-gruvbox-light-orange transition-all duration-200 cursor-pointer bg-gruvbox-dark-bg2 hover:bg-gruvbox-dark-bg3 px-2 py-1 rounded border border-gruvbox-bright-orange border-opacity-30 hover:border-opacity-60"
                  title="Submit Feedback"
                >
                  🔨 feedback
                </button>
                
                {/* Right Side - Cool Element */}
                <div className="flex items-center gap-2 text-gruvbox-dark-fg3 text-xs">
                  <span className="font-mono">status:</span>
                  <span className={`px-1 rounded text-xs ${
                    gameState.actionsLeft > 0 
                      ? 'bg-green-400 bg-opacity-20 text-green-400' 
                      : 'bg-red-400 bg-opacity-20 text-red-400'
                  }`}>
                    {gameState.actionsLeft > 0 ? 'active' : 'idle'}
                  </span>
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

      {/* Restart Confirmation Dialog */}
      {showRestartConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="terminal-card p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="text-gruvbox-bright-orange text-xl font-bold mb-4">
                🔄 Restart Game?
              </div>
              <div className="text-gruvbox-dark-fg2 mb-6">
                Real life doesn't have a restart button, but every great developer knows when to embrace a fresh perspective. Your current sprint data will reset, but the wisdom you've gained remains. Ready for a new journey?
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                
                    restartGame();
                    setShowRestartConfirm(false);
                  }}
                  className="bg-gruvbox-bright-orange hover:bg-gruvbox-bright-orange text-gruvbox-dark-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Yes, Restart Game
                </button>
                <button
                  onClick={() => setShowRestartConfirm(false)}
                  className="bg-gruvbox-dark-bg2 text-gruvbox-dark-fg hover:bg-gruvbox-dark-bg3 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

            {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gruvbox-dark-bg0 border-2 border-gruvbox-bright-purple p-6 max-w-md mx-4 rounded-lg shadow-2xl">
            <div className="text-center">
              <div className="text-gruvbox-bright-purple text-lg font-bold mb-4">
                🔨 Feedback
              </div>
              <div className="bg-gruvbox-dark-bg1 border border-gruvbox-bright-aqua p-3 rounded mb-4">
                <code className="text-gruvbox-bright-green text-sm font-mono">
                  agileshaman.dev@gmail.com
                </code>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('agileshaman.dev@gmail.com');
                    // Show copy confirmation
                    const button = event?.target as HTMLButtonElement;
                    if (button) {
                      button.innerHTML = 'Copied!';
                      button.className = 'bg-gruvbox-bright-green text-gruvbox-dark-bg0 px-4 py-2 rounded font-semibold transition-all duration-200';
                      setTimeout(() => {
                        button.innerHTML = 'Copy';
                        button.className = 'bg-gruvbox-bright-aqua hover:bg-gruvbox-light-aqua text-gruvbox-dark-bg0 px-4 py-2 rounded font-semibold transition-all duration-200';
                      }, 1500);
                    }
                  }}
                  className="bg-gruvbox-bright-aqua hover:bg-gruvbox-light-aqua text-gruvbox-dark-bg0 px-4 py-2 rounded font-semibold transition-all duration-200"
                  title="Copy to clipboard"
                >
                  Copy
                </button>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="bg-gruvbox-dark-bg2 text-gruvbox-dark-fg hover:bg-gruvbox-dark-bg3 px-4 py-2 rounded font-semibold transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
