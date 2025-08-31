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
  const performRitual = useCallback((ritualType: 'pastries' | 'refactor' | 'coffee' | 'demo' | 'overtime' | 'raise' | 'intern' | 'consultant' | 'architect' | 'pizza') => {
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
      case 'raise':
        effects = { morale: +15, velocity: +3, happiness: +5 };
        message = '> boost: salary_boost.announce() // +15 team_spirit, +3 velocity, +5 client_sat';
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
    }

    setGameState(prev => ({
      ...prev,
      stats: applyEffects(prev.stats, effects),
      usedRituals: [...prev.usedRituals, ritualType]
    }));

    addLogEntry(message, 'ritual');
  }, [gameState.gameStatus, gameState.cardActionsCompleted, gameState.usedRituals, addLogEntry]);

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

  // Development shortcut: Ctrl+Shift+W to trigger victory
  const triggerDevVictory = useCallback(() => {
    // Try multiple ways to check for development mode
    const isDev = import.meta.env.DEV ||
                  import.meta.env.MODE === 'development' ||
                  import.meta.env.NODE_ENV === 'development';

    if (isDev) {
      console.log('🎯 DEV SHORTCUT: Setting victory state...');
      setGameState(prev => ({
        ...prev,
        gameStatus: 'victory'
      }));
      console.log('🎯 DEV SHORTCUT: Victory state set!');
    } else {
      console.log('🎯 DEV SHORTCUT: Not in dev mode, ignoring victory trigger');
    }
  }, []);

  // Listen for development shortcuts
  useEffect(() => {
    console.log('🎯 DEV SHORTCUT: Checking dev mode...', {
      DEV: import.meta.env.DEV,
      MODE: import.meta.env.MODE,
      NODE_ENV: import.meta.env.NODE_ENV,
      VITE_MODE: import.meta.env.VITE_MODE
    });

    // Try multiple ways to check for development mode
    const isDev = import.meta.env.DEV ||
                  import.meta.env.MODE === 'development' ||
                  import.meta.env.NODE_ENV === 'development';

    console.log('🎯 DEV SHORTCUT: Is dev?', isDev);

    if (!isDev) {
      console.log('🎯 DEV SHORTCUT: Disabled (not in dev mode)');
      return; // Only in development
    }

    console.log('🎯 DEV SHORTCUT: Enabled (Ctrl+Shift+W)');

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('🎯 DEV SHORTCUT: Key pressed:', {
        key: event.key,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
      });

      if (event.ctrlKey && event.shiftKey && event.key === 'W') {
        event.preventDefault();
        console.log('🎯 DEV SHORTCUT: Triggering victory...');
        triggerDevVictory();
        console.log('🎯 DEV SHORTCUT: Victory triggered (Ctrl+Shift+W)');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      console.log('🎯 DEV SHORTCUT: Cleaning up event listener');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [triggerDevVictory]);

  return {
    gameState,
    numberAnimations,
    chaosEffect,
    makeChoice,
    nextSprint,
    restartGame,
    performRitual,
    addLogEntry,
    triggerDevVictory
  };
};
