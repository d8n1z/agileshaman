import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { GameBoard } from './components/game/GameBoard';
import { CardBrowser } from './components/CardBrowser';
import { MobileNotSupported } from './components/MobileNotSupported';
import { useMobileDetection } from './hooks/useMobileDetection';
import './index.css';

type AppState = 'landing' | 'game' | 'cards';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [mobileWarningShown, setMobileWarningShown] = useState(false);
  const { isMobile } = useMobileDetection();

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const targetView = event.state?.view || 'landing';
      
      // If trying to leave game, check if game is in progress
      if (currentView === 'game' && targetView !== 'game') {
        const savedGame = localStorage.getItem('agile-shaman-game-state');
        if (savedGame) {
          try {
            const parsed = JSON.parse(savedGame);
            if (parsed.gameStatus === 'playing') {
              // Prevent the navigation and show confirmation
              window.history.pushState({ view: 'game' }, '', '#game');
              // Trigger the game's exit confirmation
              const exitEvent = new CustomEvent('requestGameExit');
              window.dispatchEvent(exitEvent);
              return;
            }
          } catch (error) {
            console.warn('Failed to parse saved game state:', error);
          }
        }
      }
      
      setCurrentView(targetView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  // Function to navigate with history
  const navigateTo = (view: AppState) => {
    setCurrentView(view);
    window.history.pushState({ view }, '', `#${view}`);
  };

  // Check for existing game state on mount
  useEffect(() => {
    // Check URL hash first
    const hash = window.location.hash.slice(1) as AppState;
    if (hash && ['landing', 'game', 'cards'].includes(hash)) {
      setCurrentView(hash);
      return;
    }

    // Then check for saved game
    const savedGame = localStorage.getItem('agile-shaman-game-state');
    if (savedGame) {
      try {
        const parsed = JSON.parse(savedGame);
        // If there's a valid game in progress, start directly
        if (parsed.gameStatus === 'playing' && parsed.sprint > 1) {
          navigateTo('game');
        }
      } catch (error) {
        console.warn('Failed to parse saved game state:', error);
      }
    }
  }, []);

  // Show mobile warning if on mobile and warning hasn't been shown yet
  if (isMobile && !mobileWarningShown) {
    return <MobileNotSupported onContinue={() => setMobileWarningShown(true)} />;
  }

  switch (currentView) {
    case 'landing':
      return (
        <LandingPage
          onStartGame={() => navigateTo('game')}
          onBrowseCards={() => navigateTo('cards')}
          isMobilePreview={isMobile && mobileWarningShown}
        />
      );
    case 'game':
      return <GameBoard onBackToMenu={() => navigateTo('landing')} />;
    case 'cards':
      return <CardBrowser onBack={() => navigateTo('landing')} />;
    default:
      return <LandingPage onStartGame={() => navigateTo('game')} onBrowseCards={() => navigateTo('cards')} isMobilePreview={isMobile && mobileWarningShown} />;
  }
}

export default App;