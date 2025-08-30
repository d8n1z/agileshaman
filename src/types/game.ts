// Core game statistics representing spiritual energies
export interface GameStats {
  velocity: number;     // Flow of the Code Spirits ⚡
  morale: number;       // Harmony of the Dev Tribe 🧘
  happiness: number;    // Blessing of the Business Shamans 🌟
  techDebt: number;     // Curse of the Legacy Demons 💀
}

// Ritual effects for mystical outcomes
export interface RitualEffect {
  chance: number;           // 0-1 probability
  onSuccess?: Partial<GameStats>;
  onFailure?: Partial<GameStats>;
  successMessage?: string;
  failureMessage?: string;
}

// Player choices with mystical consequences
export interface Choice {
  id: string;
  label: string;
  description?: string;
  effects: Partial<GameStats>;
  ritual?: RitualEffect;
  icon?: string;
}

// Card rarity affects frequency and power
export type CardRarity = 'common' | 'rare' | 'legendary';

// Card themes for categorization
export type CardTheme = 'mystical' | 'agile' | 'chaos' | 'wisdom';

// Main card interface
export interface Card {
  id: string;
  title: string;
  scenario: string;
  icon: string;
  choices: Choice[];
  rarity: CardRarity;
  theme: CardTheme;
}

// Game state management
export interface GameState {
  stats: GameStats;
  sprint: number;
  maxSprints: number;
  hand: Card[];
  actionsLeft: number;
  maxActions: number;
  ritualsUsed: number;
  maxRituals: number;
  cardActionsCompleted: number;
  playedCards: string[]; // Track which cards have been played this sprint
  log: GameLogEntry[];
  gameStatus: 'playing' | 'victory' | 'defeat';
  defeatReason?: string;
}

// Log entry for the mystical diary
export interface GameLogEntry {
  id: string;
  sprint: number;
  timestamp: number;
  message: string;
  type: 'action' | 'ritual' | 'chaos' | 'system';
}

// Configuration for different difficulty levels
export interface GameConfig {
  startingStats: GameStats;
  maxSprints: number;
  actionsPerSprint: number;
  chaosChance: number;          // Random events probability
  ritualPowerMultiplier: number; // Amplifies ritual effects
}

// Language support structure
export interface GameTexts {
  stats: {
    velocity: string;
    morale: string;
    happiness: string;
    techDebt: string;
  };
  ui: {
    nextSprint: string;
    restart: string;
    actionsLeft: string;
    sprintDiary: string;
    mysticMeters: string;
    ancientRituals: string;
  };
  cards: Record<string, {
    title: string;
    scenario: string;
    choices: Record<string, {
      label: string;
      description?: string;
    }>;
  }>;
  messages: {
    victory: string;
    defeat: {
      velocity: string;
      morale: string;
      happiness: string;
      techDebt: string;
    };
    chaos: string[];
    ritualSuccess: string[];
    ritualFailure: string[];
  };
}

