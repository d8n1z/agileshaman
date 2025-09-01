import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, GameLogEntry, Card, Choice, GameStats } from '../types/game';
import { DEFAULT_CONFIG, applyEffects, checkGameEnd, CHAOS_EVENTS } from '../data/gameConfig';
import { drawHand } from '../data/cards';

// Generate unique IDs for log entries
const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial game state
const createInitialState = (): GameState => ({
  stats: { ...DEFAULT_CONFIG.startingStats },
  sprint: 1,
  maxSprints: DEFAULT_CONFIG.maxSprints,
  hand: drawHand(3, []), // Draw initial hand immediately
  actionsLeft: 2, // 2 actions per sprint
  maxActions: 2,
  ritualsUsed: 0,
  maxRituals: 1, // 1 ritual per sprint max
  cardActionsCompleted: 0,
  playedCards: [], // Track all played cards across the entire game
  usedRituals: [], // Track which rituals have been used this sprint
  log: [
    {
      id: generateId(),
      sprint: 1,
      timestamp: Date.now(),
      message: '$ ./init-sprint.sh --sprint=1 --team=agile-shaman // Sprint planning complete. Backlog groomed. Coffee brewing.',
      type: 'system'
    }
  ],
  gameStatus: 'playing'
});

// Load game state from localStorage
const loadGameState = (): GameState => {
  try {
    const saved = localStorage.getItem('agile-shaman-game-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate that the saved state has the required structure
      if (parsed.gameStatus && parsed.stats && parsed.sprint) {
        // Ensure the saved state has a hand
        if (!parsed.hand || parsed.hand.length === 0) {
          parsed.hand = drawHand(3, parsed.playedCards || []);
        }
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to load game state from localStorage:', error);
  }
  return createInitialState();
};

// Save game state to localStorage
const saveGameState = (state: GameState) => {
  try {
    localStorage.setItem('agile-shaman-game-state', JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save game state to localStorage:', error);
  }
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(loadGameState);
  const [numberAnimations, setNumberAnimations] = useState({
    actionsLeft: '',
    ritualsAvailable: '',
    sprint: ''
  });
  const [chaosEffect, setChaosEffect] = useState(false);
  const prevValuesRef = useRef({
    actionsLeft: 2,
    ritualsAvailable: 0,
    sprint: 1
  });

  // Add entry to the mystical log
  const addLogEntry = useCallback((message: string, type: GameLogEntry['type'] = 'action') => {
    setGameState(prev => ({
      ...prev,
      log: [
        {
          id: generateId(),
          sprint: prev.sprint,
          timestamp: Date.now(),
          message,
          type
        },
        ...prev.log
      ].slice(0, 100) // Keep last 100 entries
    }));
  }, []);

  // Check for random chaos events
  const triggerChaosEvent = useCallback(() => {
    if (Math.random() < DEFAULT_CONFIG.chaosChance) {
      const event = CHAOS_EVENTS[Math.floor(Math.random() * CHAOS_EVENTS.length)];
      setGameState(prev => ({
        ...prev,
        stats: applyEffects(prev.stats, event.effects)
      }));
      addLogEntry(event.message, 'chaos');
      return true;
    }
    return false;
  }, [addLogEntry]);

  // Handle player choice
  const makeChoice = useCallback((card: Card, choice: Choice) => {
    if (gameState.gameStatus !== 'playing' || gameState.actionsLeft <= 0) return;

    setGameState(prev => {
      let newStats = applyEffects(prev.stats, choice.effects);
      const messages: string[] = [];

      // Test chaos effect for any choice with negative velocity (temporary for testing)
      if (choice.effects.velocity && choice.effects.velocity < -10) {
        setChaosEffect(true);
        setTimeout(() => setChaosEffect(false), 4000);
        messages.push(`🚨 CHAOS EVENT! High-risk decision triggered instability!`);
        messages.push(`📊 Stat changes: velocity: ${choice.effects.velocity}`);
      }

      // Handle ritual effects (RNG outcomes)
      if (choice.ritual) {
        const roll = Math.random();
        if (roll <= choice.ritual.chance) {
          // Success
          if (choice.ritual.onSuccess) {
            newStats = applyEffects(newStats, choice.ritual.onSuccess);
          }
          if (choice.ritual.successMessage) {
            messages.push(`✨ ${choice.ritual.successMessage}`);
          }
        } else {
          // Failure - trigger chaos effect
          if (choice.ritual.onFailure) {
            newStats = applyEffects(newStats, choice.ritual.onFailure);
            setChaosEffect(true);
            setTimeout(() => setChaosEffect(false), 4000);
            
            // Add chaos alarm to log with detailed breakdown
            const effectsText = Object.entries(choice.ritual.onFailure)
              .map(([stat, value]) => {
                const statName = stat === 'morale' ? 'team_spirit' : 
                                stat === 'happiness' ? 'client_sat' : 
                                stat === 'techDebt' ? 'tech_debt' : stat;
                return `${statName}: ${value > 0 ? '+' : ''}${value}`;
              })
              .join(', ');
            messages.push(`🚨 CHAOS EVENT! Ritual backfired!`);
            messages.push(`📊 Stat changes: ${effectsText}`);
          }
          if (choice.ritual.failureMessage) {
            messages.push(`💀 ${choice.ritual.failureMessage}`);
          }
        }
      }

      // Remove card from hand
      const newHand = prev.hand.filter(c => c.id !== card.id);
      
      // Check if this was the last action and apply unplayed card consequences
      let unplayedCardEffects: Partial<GameStats> = {};
      let unplayedCardLogMessage = '';
      let unplayedCardDefeatReason = '';
      
      // Check if this was the second action (actionsLeft was 1, now becomes 0)
      if (prev.actionsLeft === 1 && newHand.length === 1) {
        // This was the second action, so the remaining card is unplayed
        const unplayedCard = newHand[0];
        
        // Apply negative effects based on the unplayed card's theme
        switch (unplayedCard.theme) {
          case 'chaos':
            // Chaos cards left unplayed cause instability
            unplayedCardEffects = { velocity: -8, morale: -5 };
            break;
          case 'mystical':
            // Mystical cards left unplayed cause confusion
            unplayedCardEffects = { happiness: -6, techDebt: +8 };
            break;
          case 'wisdom':
            // Wisdom cards left unplayed cause missed opportunities
            unplayedCardEffects = { velocity: -5, happiness: -4 };
            break;
          case 'agile':
            // Agile cards left unplayed cause process issues
            unplayedCardEffects = { velocity: -6, morale: -4 };
            break;
          default:
            // Generic negative effects for unplayed cards
            unplayedCardEffects = { velocity: -4, morale: -3, happiness: -3, techDebt: +5 };
        }
        
        // Apply the negative effects
        newStats = applyEffects(newStats, unplayedCardEffects);
        
        // Create the log message for the unplayed card
        const effectsText = Object.entries(unplayedCardEffects)
          .filter(([, value]) => value !== 0)
          .map(([key, value]) => {
            const statName = key === 'morale' ? 'team_spirit' :
                            key === 'happiness' ? 'client_sat' :
                            key === 'techDebt' ? 'tech_debt' : key;
            return `${value! > 0 ? '+' : ''}${value} ${statName}`;
          })
          .join(', ');
        unplayedCardLogMessage = `🚨 The unplayed "${unplayedCard.title}" card haunts your sprint! ${effectsText}`;
        
        // Create a special defeat reason for unplayed card game end
        unplayedCardDefeatReason = `The unplayed "${unplayedCard.title}" card caused catastrophic failure!`;
      }

      // Check for game end AFTER all effects (including unplayed card) are applied
      const gameEnd = checkGameEnd(newStats);
      const newGameStatus = gameEnd.ended ? 'defeat' : prev.gameStatus;
      
      // If game ended due to unplayed card, use the special reason
      const finalDefeatReason = (gameEnd.ended && unplayedCardDefeatReason) ? 
        unplayedCardDefeatReason : gameEnd.reason;

      return {
        ...prev,
        stats: newStats,
        hand: newHand,
        actionsLeft: prev.actionsLeft - 1,
        cardActionsCompleted: prev.cardActionsCompleted + 1,
        playedCards: [...prev.playedCards, card.id],
        gameStatus: newGameStatus,
        defeatReason: finalDefeatReason,
        log: unplayedCardLogMessage ? [
          {
            id: generateId(),
            sprint: prev.sprint,
            timestamp: Date.now(),
            message: unplayedCardLogMessage,
            type: 'system' as const
          },
          ...prev.log
        ].slice(0, 100) : prev.log
      };
    });

    // Add log entry for the choice
    const effectsText = Object.entries(choice.effects)
      .filter(([, value]) => value !== 0)
      .map(([key, value]) => {
        const sign = value! > 0 ? '+' : '';
        const statName = key.charAt(0).toUpperCase() + key.slice(1);
        return `${sign}${value} ${statName}`;
      })
      .join(', ');

    const logMessage = `S${gameState.sprint} • ${card.title} → ${choice.label}${effectsText ? ` (${effectsText})` : ''}`;
    addLogEntry(logMessage, 'action');

    // Trigger chaos event after choice
    setTimeout(() => triggerChaosEvent(), 500);

  }, [gameState, addLogEntry, triggerChaosEvent]);

  // Advance to next sprint
  const nextSprint = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;
    
    if (gameState.actionsLeft === gameState.maxActions) {
      addLogEntry('The spirits demand action before time can flow forward...', 'system');
      return;
    }

    const newSprint = gameState.sprint + 1;
    
    setGameState(prev => {
      // Check for victory
      if (newSprint > prev.maxSprints) {
        return {
          ...prev,
          gameStatus: 'victory'
        };
      }

      return {
        ...prev,
        sprint: newSprint,
        hand: drawHand(3, prev.playedCards), // Pass played cards to avoid duplicates
        actionsLeft: prev.maxActions,
        cardActionsCompleted: 0
        // Don't reset usedRituals - keep track across entire game
        // Don't reset playedCards - keep track across entire game
      };
    });

    if (newSprint > gameState.maxSprints) {
      addLogEntry('🦄 The Legendary Unicorn Product materializes! You have mastered the ancient arts of Agile development!', 'system');
    } else {
      addLogEntry(`Sprint ${newSprint} begins. The cosmic energies realign as new challenges emerge from the digital ether...`, 'system');
    }
  }, [gameState, addLogEntry]);

  // Restart the game
  const restartGame = useCallback(() => {
    localStorage.removeItem('agile-shaman-game-state');
    setGameState(createInitialState());
  }, []);

  // Perform sprint boost actions (limited to once per game)
  const performRitual = useCallback((ritualType: 'pastries' | 'refactor' | 'coffee' | 'demo' | 'overtime' | 'bonus' | 'intern' | 'consultant' | 'architect' | 'pizza' | 'inspiration' | 'automation' | 'startup' | 'partnership' | 'mentorship') => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.cardActionsCompleted === 0) {
      addLogEntry('# ERROR: Complete card actions first before sprint boosts', 'system');
      return;
    }
    if (gameState.usedRituals.includes(ritualType)) {
      addLogEntry(`# ERROR: ${ritualType} boost already consumed - each toolkit item can only be used once per game`, 'system');
      return;
    }

    let effects: Partial<GameStats>;
    let message: string;

    switch (ritualType) {
      case 'pastries':
        effects = { morale: +10 };
        message = '> boost: sacred_pastries.execute() // +10 team_spirit';
        break;
      case 'refactor':
        effects = { techDebt: -10, velocity: -3 };
        message = '> boost: code_cleansing.run() // -10 tech_debt, -3 velocity';
        break;
      case 'coffee':
        effects = { velocity: +6, morale: +4 };
        message = '> boost: caffeine_boost.apply() // +6 velocity, +4 team_spirit';
        break;
      case 'demo':
        effects = { happiness: +8, velocity: -2 };
        message = '> boost: client_demo.present() // +8 client_sat, -2 velocity';
        break;
      case 'overtime':
        effects = { velocity: +12, morale: -6 };
        message = '> boost: crunch_mode.activate() // +12 velocity, -6 team_spirit';
        break;
      case 'bonus':
        effects = { morale: +15, velocity: +3, happiness: +5 };
        message = '> boost: bonus_time.announce() // +15 team_spirit, +3 velocity, +5 client_sat';
        break;
      case 'intern':
        effects = { velocity: +8, techDebt: +5, morale: +3 };
        message = '> boost: junior_dev.hire() // +8 velocity, +5 tech_debt, +3 team_spirit';
        break;
      case 'consultant':
        effects = { velocity: +5, happiness: +12, techDebt: -8 };
        message = '> boost: external_expert.engage() // +5 velocity, +12 client_sat, -8 tech_debt';
        break;
      case 'architect':
        effects = { techDebt: -15, velocity: -5, morale: -3 };
        message = '> boost: senior_architect.assign() // -15 tech_debt, -5 velocity, -3 team_spirit';
        break;
      case 'pizza':
        effects = { morale: +12, velocity: +4, happiness: +6 };
        message = '> boost: team_pizza.deliver() // +12 team_spirit, +4 velocity, +6 client_sat';
        break;
      case 'inspiration':
        effects = { morale: +10, velocity: +6, happiness: +3 };
        message = '> boost: team_inspiration.ignite() // +10 team_spirit, +6 velocity, +3 client_sat';
        break;
      case 'automation':
        effects = { techDebt: -12, velocity: +8 };
        message = '> boost: devops_automation.deploy() // -12 tech_debt, +8 velocity';
        break;
      case 'startup':
        effects = { velocity: +25, morale: -10, techDebt: +15 };
        message = '> boost: startup_mode.activate() // +25 velocity, -10 team_spirit, +15 tech_debt';
        break;
      case 'partnership':
        effects = { happiness: +15, velocity: +6 };
        message = '> boost: strategic_partnership.form() // +15 client_sat, +6 velocity';
        break;
      case 'mentorship':
        effects = { morale: +12, techDebt: -6, velocity: -2 };
        message = '> boost: senior_mentorship.program() // +12 team_spirit, -6 tech_debt, -2 velocity';
        break;
    }

    setGameState(prev => {
      const newStats = applyEffects(prev.stats, effects);
      
      // Check if this boost caused game end
      const gameEnd = checkGameEnd(newStats);
      if (gameEnd.ended) {
        addLogEntry(`🚨 BOOST BACKFIRE: ${ritualType} boost caused game end! ${gameEnd.reason}`, 'system');
      }
      
      return {
        ...prev,
        stats: newStats,
        gameStatus: gameEnd.ended ? 'defeat' : prev.gameStatus,
        defeatReason: gameEnd.reason,
        usedRituals: [...prev.usedRituals, ritualType]
      };
    });

    addLogEntry(message, 'ritual');
  }, [gameState.gameStatus, gameState.cardActionsCompleted, gameState.usedRituals, addLogEntry]);

  // Initialize hand on first load or when game restarts
  useEffect(() => {
    if (gameState.hand.length === 0 && gameState.gameStatus === 'playing') {
      const initialHand = drawHand(3, []);
      setGameState(prev => ({
        ...prev,
        hand: initialHand
      }));
    }
  }, [gameState.gameStatus, gameState.hand.length]); // Run when game status or hand changes

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Track number changes for animations
  useEffect(() => {
    const prev = prevValuesRef.current;
    const current = gameState;
    
    // Calculate available rituals (can use toolkit items)
    const currentRitualsAvailable = current.cardActionsCompleted >= 1 ? 1 : 0;
    
    // Check for changes and trigger animations
    if (prev.actionsLeft !== current.actionsLeft) {
      setNumberAnimations(prev => ({
        ...prev,
        actionsLeft: current.actionsLeft < prevValuesRef.current.actionsLeft ? 'animate-numberDecrement' : 'animate-numberPop'
      }));
      
      // Clear animation after duration
      setTimeout(() => {
        setNumberAnimations(prev => ({ ...prev, actionsLeft: '' }));
      }, 400);
    }
    
    if (prev.ritualsAvailable !== currentRitualsAvailable) {
      setNumberAnimations(prev => ({
        ...prev,
        ritualsAvailable: currentRitualsAvailable > prevValuesRef.current.ritualsAvailable ? 'animate-numberPop' : 'animate-numberDecrement'
      }));
      
      setTimeout(() => {
        setNumberAnimations(prev => ({ ...prev, ritualsAvailable: '' }));
      }, 400);
    }
    
    if (prev.sprint !== current.sprint) {
      setNumberAnimations(prev => ({
        ...prev,
        sprint: 'animate-numberPop'
      }));
      
      setTimeout(() => {
        setNumberAnimations(prev => ({ ...prev, sprint: '' }));
      }, 400);
    }
    
    // Update previous values
    prevValuesRef.current = {
      actionsLeft: current.actionsLeft,
      ritualsAvailable: currentRitualsAvailable,
      sprint: current.sprint
    };
  }, [gameState.actionsLeft, gameState.cardActionsCompleted, gameState.sprint]);

  // Listen for restart shortcut (works in production)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        // Dispatch custom event for component to handle confirmation
        window.dispatchEvent(new CustomEvent('restartGameRequest'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    gameState,
    numberAnimations,
    chaosEffect,
    makeChoice,
    nextSprint,
    restartGame,
    performRitual,
    addLogEntry
  };
};
