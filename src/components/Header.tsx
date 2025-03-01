
import { useState } from 'react';
import { toast } from 'sonner';

interface HeaderProps {
  playerName: string;
  reputation: number;
  budget: number;
  day: number;
  onNewGame: () => void;
}

const Header = ({ playerName, reputation, budget, day, onNewGame }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleNewGame = () => {
    if (window.confirm("Are you sure you want to start a new game? All progress will be lost.")) {
      onNewGame();
      toast.success("New game started!");
    }
  };

  return (
    <header className="relative z-10 w-full py-4 px-6 flex items-center justify-between bg-nova-space/80 backdrop-blur-lg border-b border-nova-nebula/20">
      <div className="flex items-center space-x-3">
        <div className="relative w-10 h-10 rounded-full bg-nova-nebula animate-pulse-glow flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-nova-space flex items-center justify-center">
            <span className="text-nova-nebula font-bold">N</span>
          </div>
        </div>
        <div className="text-xl font-semibold tracking-tight">
          <span className="text-gradient">Nova Marketing</span>
        </div>
      </div>

      <div className="flex-1 hidden md:flex items-center justify-center">
        <h1 className="text-xl font-light text-center tracking-wider">
          Unite the Galaxy Through Strategy
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-6">
          <div className="text-sm font-medium flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Reputation</span>
            <span className="text-lg font-mono">{reputation}%</span>
          </div>
          
          <div className="text-sm font-medium flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Budget</span>
            <span className="text-lg font-mono">§{budget.toLocaleString()}</span>
          </div>
          
          <div className="text-sm font-medium flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Campaign Day</span>
            <span className="text-lg font-mono">{day}</span>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 px-3 py-2 rounded-full bg-nova-stardust/50 hover:bg-nova-stardust transition duration-200"
          >
            <span className="text-sm font-medium">{playerName}</span>
            <span className="w-6 h-6 rounded-full bg-nova-nebula flex items-center justify-center text-xs">
              {playerName.charAt(0).toUpperCase()}
            </span>
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-nova-stardust rounded-lg shadow-lg border border-nova-nebula/20 animate-fade-in">
              <button 
                onClick={handleNewGame}
                className="w-full text-left px-4 py-2 text-sm hover:bg-nova-nebula/10 transition duration-150"
              >
                New Game
              </button>
              <div className="border-t border-nova-nebula/10 my-1"></div>
              <div className="px-4 py-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Reputation:</span>
                  <span>{reputation}%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Budget:</span>
                  <span>§{budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Day:</span>
                  <span>{day}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
