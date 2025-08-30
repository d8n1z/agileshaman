import type { GameConfig, GameStats } from '../types/game';

export const GAME_CONFIGS: Record<string, GameConfig> = {
  apprentice: {
    startingStats: {
      velocity: 60,
      morale: 60, 
      happiness: 60,
      techDebt: 15
    },
    maxSprints: 6,
    actionsPerSprint: 3,
    chaosChance: 0.15,
    ritualPowerMultiplier: 1.0
  },
  
  shaman: {
    startingStats: {
      velocity: 50,
      morale: 50,
      happiness: 50, 
      techDebt: 20
    },
    maxSprints: 8,
    actionsPerSprint: 2,
    chaosChance: 0.25,
    ritualPowerMultiplier: 1.2
  },
  
  archShaman: {
    startingStats: {
      velocity: 40,
      morale: 40,
      happiness: 40,
      techDebt: 30
    },
    maxSprints: 10,
    actionsPerSprint: 2,
    chaosChance: 0.35,
    ritualPowerMultiplier: 1.5
  }
};

export const DEFAULT_CONFIG = GAME_CONFIGS.shaman;

// Utility function to clamp stats between 0-100
export const clampStat = (value: number): number => Math.max(0, Math.min(100, value));

// Apply effects to stats with clamping
export const applyEffects = (baseStats: GameStats, effects: Partial<GameStats>): GameStats => ({
  velocity: clampStat(baseStats.velocity + (effects.velocity ?? 0)),
  morale: clampStat(baseStats.morale + (effects.morale ?? 0)),
  happiness: clampStat(baseStats.happiness + (effects.happiness ?? 0)),
  techDebt: clampStat(baseStats.techDebt + (effects.techDebt ?? 0))
});

// Check for game end conditions
export const checkGameEnd = (stats: GameStats): { ended: boolean; reason?: string } => {
  if (stats.velocity <= 0) {
    return { ended: true, reason: 'The spirits of velocity have abandoned you. Your project fossilizes in eternal planning.' };
  }
  if (stats.morale <= 0) {
    return { ended: true, reason: 'The dev tribe has scattered to the winds. None remain to carry the sacred code.' };
  }
  if (stats.happiness <= 0) {
    return { ended: true, reason: 'The business shamans have cast you out. Your blessing is revoked.' };
  }
  if (stats.techDebt >= 100) {
    return { ended: true, reason: 'The legacy demons have consumed everything. The ancient codebase collapses into chaos.' };
  }
  return { ended: false };
};

// Chaos events that can randomly occur
export const CHAOS_EVENTS: Array<{ effects: Partial<GameStats>; message: string }> = [
  {
    effects: { velocity: -10, happiness: -5 },
    message: 'The WiFi spirits grow restless. Productivity wanes.'
  },
  {
    effects: { morale: -8, techDebt: +5 },
    message: 'A merge conflict of cosmic proportions disrupts the harmony.'
  },
  {
    effects: { velocity: +8, morale: +5 },
    message: 'The coffee gods smile upon your tribe. Energy flows freely.'
  },
  {
    effects: { techDebt: +12 },
    message: 'Legacy demons whisper shortcuts into vulnerable ears.'
  },
  {
    effects: { happiness: -15 },
    message: 'A stakeholder summons an emergency meeting. Dark energies gather.'
  },
  {
    effects: { velocity: +5, happiness: +10 },
    message: 'The deployment pipeline achieves perfect alignment. All rejoice.'
  }
];
