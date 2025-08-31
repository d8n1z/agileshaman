# Agile Shaman - Software Architecture Documentation

## 🎮 Project Overview

**Agile Shaman** is a satirical card-based sprint management survival game where players navigate the mystical arts of agile software development. Players guide their development team through 8 challenging sprints, balancing four critical aspects while dealing with chaos events and making strategic decisions.

## 🏗️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with Gruvbox color palette  
- **Animations**: Framer Motion
- **Font**: Monospace (Source Code Pro)
- **State Management**: React Hooks (useState, useCallback)

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── game/            # Game-specific components
│   │   ├── GameBoard.tsx       # Main game interface
│   │   ├── Card.tsx           # Individual card component (legacy)
│   │   ├── StatBar.tsx        # Stat display component  
│   │   └── SprintDiary.tsx    # Sprint log component (legacy)
│   ├── layout/          # Layout components (empty)
│   ├── ui/              # Reusable UI components (empty)
│   └── LandingPage.tsx  # Game intro and start screen
├── data/                # Game data and configuration
│   ├── cards.ts         # Card definitions (72 cards total)
│   └── gameConfig.ts    # Game configuration and difficulty levels
├── hooks/               # Custom React hooks
│   └── useGameState.ts  # Main game state management hook
├── types/               # TypeScript type definitions
│   └── game.ts          # Game-related interfaces and types
├── utils/               # Utility functions (empty)
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind directives
```

## 🎯 Core Game Mechanics

### Game Flow
1. **Landing Page**: Introduction with lore and game rules
2. **8 Sprints**: Each sprint presents 3 scenario cards
3. **2 Actions per Sprint**: Players must choose 2 cards to play
4. **Sprint Boost Toolkit**: 10 one-time special actions available throughout game
5. **Win/Lose Conditions**: Based on stat thresholds

### Core Stats
- **⚡ Velocity**: Feature delivery speed (0-100)
- **♡ Team Spirit** (morale): Developer motivation & happiness (0-100)  
- **★ Client Satisfaction** (happiness): Stakeholder happiness (0-100)
- **⚠ Technical Debt**: Code quality burden (0-100, inverse)

## 🧩 Component Architecture

### `App.tsx`
- **Purpose**: Root component managing game/landing page state
- **State**: `gameStarted` boolean
- **Responsibility**: Conditional rendering between `LandingPage` and `GameBoard`

### `LandingPage.tsx`
- **Purpose**: Game introduction and start screen
- **Props**: `onStartGame: () => void`
- **Features**: 
  - Game lore and mission description
  - Stat explanations with grid layout
  - Author information
  - Animated start button using Framer Motion
- **Styling**: Full-screen layout with Gruvbox colors

### `GameBoard.tsx`
- **Purpose**: Main game interface and state orchestration
- **Features**:
  - Header with sprint info and action counters
  - Horizontal stats bar with progress visualization
  - 3-column card grid with visual feedback
  - Event journal with timestamped entries
  - Bottom action bar with ritual options
  - Game end states (victory/defeat) with restart options
- **Visual Feedback**:
  - Last card highlighting with yellow ring
  - Special message for final sprint decisions
  - Enhanced hover states for final card choices

### `useGameState.ts` Hook
- **Purpose**: Complete game state management and business logic
- **State Management**:
  - Game stats, sprint progress, card hand
  - Action tracking and ritual limitations
  - Played cards tracking for visual feedback
  - Event logging system
- **Key Functions**:
  - `makeChoice()`: Handle card selections and effects
  - `nextSprint()`: Advance game state and reset counters
  - `performRitual()`: Execute limited bonus actions
  - `restartGame()`: Reset to initial state
- **Game Logic**:
  - Effect application with stat clamping (0-100)
  - Chaos event triggering (25% chance)
  - Win/lose condition checking
  - Ritual failure/success RNG mechanics

## 🎴 Card System

### Card Structure
```typescript
interface Card {
  id: string;           // Unique identifier
  title: string;        // Display name
  scenario: string;     // Descriptive text (enhanced for immersion)
  icon: string;         // Emoji representation
  rarity: 'common' | 'rare' | 'legendary';
  theme: 'mystical' | 'agile' | 'chaos' | 'wisdom';
  choices: Choice[];    // 2-3 decision options
}

interface Choice {
  id: string;
  label: string;        // Action name
  effects: Partial<GameStats>;  // Stat modifications
  ritual?: RitualEffect;        // Optional RNG outcome
}
```

### Card Categories (72 Total)
- **Common Cards (~55)**: Everyday development challenges
- **Rare Cards (~15)**: Major team/project disruptions  
- **Legendary Cards (~2)**: Game-changing scenarios

### Card Themes
- **Social Dynamics**: Team morale, office culture, remote work
- **Technical Challenges**: Databases, legacy systems, deployments
- **Business Pressures**: Client demands, budget constraints, deadlines
- **Industry Trends**: AI adoption, crypto integration, tech hype
- **Crisis Management**: Production fires, disasters, intern mistakes

## 🧰 Sprint Boost Toolkit System

### Toolkit Overview
- **10 total items** available throughout the entire game
- **One-time use** - each can only be consumed once per game
- **Persistent tracking** via `usedRituals` array in game state
- **Unlock condition** - must complete card actions first each sprint

### Toolkit Categories

#### **Core Boosts (6 items)**
- **🥐 ./pastries**: Pure team morale boost
- **☕ ./coffee**: Velocity + morale combination  
- **🔧 ./refactor**: Tech debt cleanup (slow)
- **🎭 ./demo**: Client satisfaction (distraction)
- **⚡ ./overtime**: High velocity at team cost
- **💰 ./raise**: Expensive but powerful all-around boost

#### **Advanced Boosts (4 items)**
- **🎓 ./intern**: Fast but messy (adds tech debt)
- **🧙 ./consultant**: Expert help (expensive, impressive)
- **🏗️ ./architect**: Major cleanup (lots of meetings)
- **🍕 ./pizza**: Universal developer happiness

### Implementation Details
```typescript
interface GameState {
  // ... other fields
  usedRituals: string[];  // Tracks consumed toolkit items
}

// Ritual types
type RitualType = 'pastries' | 'refactor' | 'coffee' | 'demo' | 
                  'overtime' | 'raise' | 'intern' | 'consultant' | 
                  'architect' | 'pizza';
```

### Strategic Considerations
- **Resource management**: Players must plan usage across 8 sprints
- **Timing decisions**: When to use powerful boosts vs save them
- **Risk mitigation**: Emergency items for critical situations
- **Opportunity cost**: Using limited resources optimally

## ⚙️ Game Configuration

### Difficulty Levels
```typescript
// Current default: "shaman" mode
apprentice: 6 sprints, 3 actions, 15% chaos
shaman: 8 sprints, 2 actions, 25% chaos      ← ACTIVE
archShaman: 10 sprints, 2 actions, 35% chaos
```

### Ritual System
- **Limited Usage**: 1 ritual per sprint maximum
- **Prerequisites**: Must complete card actions first
- **Options**:
  - `./pastries`: +8 team spirit
  - `./refactor`: -8 tech debt, -3 velocity  
  - `./coffee`: +5 velocity, +3 team spirit

## 🎨 Design System

### Gruvbox Color Palette
- **Background**: Dark variants (`gruvbox-dark-bg0`, `gruvbox-dark-bg2`)
- **Text**: Foreground variants (`gruvbox-dark-fg`, `gruvbox-dark-fg2`)
- **Accents**: Bright colors for stats and highlights
  - Blue: Velocity
  - Green: Team Spirit  
  - Yellow: Client Satisfaction
  - Red: Technical Debt

### Typography
- **Primary Font**: Monospace (JetBrains Mono, Fira Code)
- **Theme**: Terminal/developer-friendly aesthetic
- **Sizing**: Responsive text scales for different screen sizes

### Visual Feedback
- **Card States**: 
  - Normal: Standard terminal card styling
  - Final Card: Yellow ring, enhanced hover states
  - Special message for critical decisions
- **Animations**: Subtle Framer Motion transitions
- **Responsive**: 3-column (desktop) → 2-column (tablet) → 1-column (mobile)

## 🔄 State Flow

### Sprint Lifecycle
1. **Sprint Start**: Draw 3 cards (avoid duplicates from entire game)
2. **Player Actions**: Choose 2 cards (track played cards across all sprints)
3. **Visual Feedback**: Highlight final card when 1 remains
4. **Toolkit Phase**: Optional one-time boosts (if actions completed)
5. **Sprint End**: Advance sprint, check win/lose (toolkit items remain used)
6. **Chaos Events**: Random disruptions (25% chance per action)

### Game End Conditions
- **Victory**: Complete 8 sprints with all stats > 0
- **Defeat**: Any stat reaches 0 or tech debt reaches 100

## 📝 Recent Enhancements

### Gameplay Improvements
- ✅ **Card Selection Tracking**: Visual feedback for played cards
- ✅ **Final Card Highlighting**: Special treatment for last remaining card
- ✅ **Enhanced Card Descriptions**: More immersive and engaging scenarios
- ✅ **Sprint Count Fix**: Corrected to 8 sprints (was incorrectly showing 10)
- ✅ **Card Deck Expansion**: Increased from 30 to 44 cards for better variety

### UI/UX Enhancements  
- ✅ **Single-Screen Layout**: No scrolling required
- ✅ **Terminal Aesthetic**: Monospace fonts and gruvbox colors
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Visual Feedback**: Clear indication of final decisions
- ✅ **Improved Landing Page**: Better content layout and theming

## 🚀 Future Considerations

### Potential Enhancements
- **Save/Load System**: Persist game progress
- **Difficulty Selection**: Let players choose game mode
- **Card Collection**: Unlock new cards through gameplay
- **Multiplayer Mode**: Collaborative sprint management
- **Analytics Dashboard**: Track player decisions and outcomes
- **Additional Rituals**: Expand bonus action variety
- **Achievement System**: Unlock rewards for specific outcomes

### Technical Debt
- **Legacy Components**: `Card.tsx` and `SprintDiary.tsx` are unused
- **Empty Directories**: Some placeholder directories (`layout/`, `ui/`, `utils/`)
- **Code Organization**: Could benefit from further modularization
- **Testing**: No unit tests currently implemented
- **Performance**: Could optimize re-renders with React.memo


