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
  hand: [],
  actionsLeft: 2, // 2 actions per sprint
  maxActions: 2,
  ritualsUsed: 0,
  maxRituals: 1, // 1 ritual per sprint max
  cardActionsCompleted: 0,
  playedCards: [], // Track all played cards across the entire game
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
          // Failure
          if (choice.ritual.onFailure) {
            newStats = applyEffects(newStats, choice.ritual.onFailure);
          }
          if (choice.ritual.failureMessage) {
            messages.push(`💀 ${choice.ritual.failureMessage}`);
          }
        }
      }

      // Check for game end
      const gameEnd = checkGameEnd(newStats);
      const newGameStatus = gameEnd.ended ? 'defeat' : prev.gameStatus;

      // Remove card from hand
      const newHand = prev.hand.filter(c => c.id !== card.id);

      return {
        ...prev,
        stats: newStats,
        hand: newHand,
        actionsLeft: prev.actionsLeft - 1,
        cardActionsCompleted: prev.cardActionsCompleted + 1,
        playedCards: [...prev.playedCards, card.id],
        gameStatus: newGameStatus,
        defeatReason: gameEnd.reason
      };
    });

    // Add log entry for the choice
    const effectsText = Object.entries(choice.effects)
      .filter(([_, value]) => value !== 0)
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
        ritualsUsed: 0,
        cardActionsCompleted: 0
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

  // Perform sprint boost actions (limited actions)
  const performRitual = useCallback((ritualType: 'pastries' | 'refactor' | 'coffee' | 'demo' | 'overtime' | 'raise') => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.ritualsUsed >= gameState.maxRituals) {
      addLogEntry('# ERROR: Sprint boost energy depleted for this sprint', 'system');
      return;
    }
    if (gameState.cardActionsCompleted === 0) {
      addLogEntry('# ERROR: Complete card actions first before sprint boosts', 'system');
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
      case 'raise':
        effects = { morale: +15, velocity: +3, happiness: +5 };
        message = '> boost: salary_boost.announce() // +15 team_spirit, +3 velocity, +5 client_sat';
        break;
    }

    setGameState(prev => ({
      ...prev,
      stats: applyEffects(prev.stats, effects),
      ritualsUsed: prev.ritualsUsed + 1
    }));

    addLogEntry(message, 'ritual');
  }, [gameState.gameStatus, gameState.ritualsUsed, gameState.maxRituals, gameState.cardActionsCompleted, addLogEntry]);

  // Initialize hand on first load
  useEffect(() => {
    if (gameState.hand.length === 0 && gameState.gameStatus === 'playing') {
      setGameState(prev => ({
        ...prev,
        hand: drawHand(3, prev.playedCards) // Pass played cards to avoid duplicates
      }));
    }
  }, [gameState.hand.length, gameState.gameStatus, gameState.playedCards]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Track number changes for animations
  useEffect(() => {
    const prev = prevValuesRef.current;
    const current = gameState;
    
    // Calculate available rituals
    const currentRitualsAvailable = current.cardActionsCompleted >= 1 && current.ritualsUsed < current.maxRituals ? 1 : 0;
    
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
  }, [gameState.actionsLeft, gameState.ritualsUsed, gameState.cardActionsCompleted, gameState.sprint]);

  return {
    gameState,
    numberAnimations,
    makeChoice,
    nextSprint,
    restartGame,
    performRitual,
    addLogEntry
  };
};
