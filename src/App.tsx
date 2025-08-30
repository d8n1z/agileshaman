import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { GameBoard } from './components/game/GameBoard';
import './index.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  // Check for existing game state on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('agile-shaman-game-state');
    if (savedGame) {
      try {
        const parsed = JSON.parse(savedGame);
        // If there's a valid game in progress, start directly
        if (parsed.gameStatus === 'playing' && parsed.sprint > 1) {
          setGameStarted(true);
        }
      } catch (error) {
        console.warn('Failed to parse saved game state:', error);
      }
    }
  }, []);

  if (!gameStarted) {
    return <LandingPage onStartGame={() => setGameStarted(true)} />;
  }

  return <GameBoard />;
}

export default App;