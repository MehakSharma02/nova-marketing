
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '../components/Header';
import SpeciesCard from '../components/SpeciesCard';
import CampaignBuilder from '../components/CampaignBuilder';
import AnalyticsPanel from '../components/AnalyticsPanel';
import CrisisAlert from '../components/CrisisAlert';
import { 
  alienSpecies, 
  initializeGame, 
  GameState,
  Campaign,
  calculateCampaignPerformance,
  CampaignResults,
  crisisEvents,
  CrisisEvent,
  marketingPlatforms,
  adFormats
} from '../utils/gameData';

const Index = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [isNameModalOpen, setIsNameModalOpen] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [currentCampaignResults, setCurrentCampaignResults] = useState<{campaign: Campaign, results: CampaignResults} | null>(null);
  
  // Get available species for selection
  const availableSpecies = alienSpecies.filter(
    species => gameState?.unlockedSpecies.includes(species.id)
  );
  
  // Initialize a new game or load saved game
  useEffect(() => {
    const savedGame = localStorage.getItem('novaMarketingGame');
    if (savedGame) {
      try {
        setGameState(JSON.parse(savedGame));
        setIsNameModalOpen(false);
      } catch (e) {
        console.error("Error loading saved game:", e);
        setIsNameModalOpen(true);
      }
    }
  }, []);
  
  // Save game state when it changes
  useEffect(() => {
    if (gameState) {
      localStorage.setItem('novaMarketingGame', JSON.stringify(gameState));
    }
  }, [gameState]);
  
  // Start a new game
  const handleStartGame = () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name to begin");
      return;
    }
    
    const newGame = initializeGame(playerName);
    setGameState(newGame);
    setIsNameModalOpen(false);
    toast.success(`Welcome to Nova Marketing, ${playerName}!`);
  };
  
  // Reset the game
  const handleNewGame = () => {
    setIsNameModalOpen(true);
    setPlayerName('');
    setGameState(null);
    setSelectedSpecies([]);
    setCurrentCampaignResults(null);
  };
  
  // Toggle species selection
  const handleSpeciesSelect = (id: string) => {
    if (selectedSpecies.includes(id)) {
      setSelectedSpecies(selectedSpecies.filter(s => s !== id));
    } else {
      setSelectedSpecies([...selectedSpecies, id]);
    }
  };
  
  // Create and launch a new campaign
  const handleCreateCampaign = (campaign: Campaign) => {
    if (!gameState) return;
    
    // Calculate results
    const results = calculateCampaignPerformance(campaign);
    
    // Update game state
    const newState = { 
      ...gameState,
      budget: gameState.budget - campaign.budget,
      reputation: Math.min(100, Math.max(0, gameState.reputation + Math.round((results.conversion - 50) / 10))),
      day: gameState.day + 1,
      completedCampaigns: [
        ...gameState.completedCampaigns,
        { campaign, results }
      ]
    };
    
    // Check for unlocks based on reputation
    const newUnlockedSpecies = [...newState.unlockedSpecies];
    const newUnlockedPlatforms = [...newState.unlockedPlatforms];
    
    if (newState.reputation >= 60 && !newUnlockedSpecies.includes('aquarii')) {
      newUnlockedSpecies.push('aquarii');
      toast.success('New species unlocked: Aquarii!');
    }
    
    if (newState.reputation >= 70 && !newUnlockedPlatforms.includes('telepathic')) {
      newUnlockedPlatforms.push('telepathic');
      toast.success('New platform unlocked: Telepathic Broadcasts!');
    }
    
    if (newState.reputation >= 80 && !newUnlockedSpecies.includes('crystalline')) {
      newUnlockedSpecies.push('crystalline');
      toast.success('New species unlocked: Crystalline Collective!');
    }
    
    if (newState.reputation >= 90 && !newUnlockedSpecies.includes('nebulite')) {
      newUnlockedSpecies.push('nebulite');
      toast.success('New species unlocked: Nebulites!');
    }
    
    newState.unlockedSpecies = newUnlockedSpecies;
    newState.unlockedPlatforms = newUnlockedPlatforms;
    
    // Random chance of crisis
    if (Math.random() < 0.3 && !newState.activeCrisis) {
      const randomCrisis = crisisEvents[Math.floor(Math.random() * crisisEvents.length)];
      newState.activeCrisis = randomCrisis;
    }
    
    // Update state and show results
    setGameState(newState);
    setCurrentCampaignResults({ campaign, results });
  };
  
  // Resolve a crisis
  const handleResolveCrisis = (optionId: string) => {
    if (!gameState || !gameState.activeCrisis) return;
    
    const crisis = gameState.activeCrisis;
    const selectedOption = crisis.options.find(option => option.id === optionId);
    
    if (!selectedOption) return;
    
    // Update game state with crisis outcome
    const newState = {
      ...gameState,
      reputation: Math.min(100, Math.max(0, gameState.reputation + selectedOption.effect.reputation)),
      budget: gameState.budget + selectedOption.effect.budget,
      activeCrisis: null
    };
    
    setGameState(newState);
    toast.success(`Crisis resolved: ${selectedOption.outcome}`);
  };
  
  // Continue to next day
  const handleContinue = () => {
    setCurrentCampaignResults(null);
  };
  
  if (isNameModalOpen) {
    return (
      <div className="min-h-screen bg-nova-space stars-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-card rounded-xl overflow-hidden animate-scale-in">
          <div className="p-6 text-center">
            <h1 className="text-3xl font-light tracking-tight mb-2">
              <span className="text-gradient">Nova Marketing</span>
            </h1>
            <p className="text-muted-foreground mb-8">Unite the Galaxy Through Strategy</p>
            
            <div className="mb-6">
              <input 
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 bg-nova-space border border-nova-nebula/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-nova-nebula placeholder:text-muted-foreground/50 text-center"
              />
            </div>
            
            <button
              onClick={handleStartGame}
              className="w-full py-3 bg-nova-nebula text-white rounded-lg font-medium nova-button"
            >
              Begin Mission
            </button>
          </div>
          
          <div className="p-6 border-t border-nova-nebula/10 bg-nova-stardust/30">
            <h2 className="font-medium mb-2">Mission Briefing</h2>
            <p className="text-sm text-muted-foreground mb-4">
              The galaxy is divided! Your mission: launch an interstellar marketing 
              campaign to bring alien species together.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-nova-stardust p-3 rounded-lg">
                <h3 className="font-medium mb-1">Study Aliens</h3>
                <p className="text-xs text-muted-foreground">
                  Learn their preferences, communication styles, and values.
                </p>
              </div>
              
              <div className="bg-nova-stardust p-3 rounded-lg">
                <h3 className="font-medium mb-1">Create Ads</h3>
                <p className="text-xs text-muted-foreground">
                  Design campaigns on interstellar platforms with the right message.
                </p>
              </div>
              
              <div className="bg-nova-stardust p-3 rounded-lg">
                <h3 className="font-medium mb-1">Analyze Results</h3>
                <p className="text-xs text-muted-foreground">
                  Test campaigns and optimize for maximum engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!gameState) {
    return <div className="min-h-screen bg-nova-space flex items-center justify-center">
      <div className="loading-spinner"></div>
    </div>;
  }
  
  return (
    <div className="min-h-screen bg-nova-space stars-bg">
      <Header 
        playerName={gameState.playerName}
        reputation={gameState.reputation}
        budget={gameState.budget}
        day={gameState.day}
        onNewGame={handleNewGame}
      />
      
      <main className="container py-6 animate-fade-in">
        {currentCampaignResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <div>
              <div className="glass-card rounded-xl overflow-hidden mb-6">
                <div className="p-6 border-b border-nova-nebula/10">
                  <h2 className="text-xl font-medium tracking-tight">Campaign Results</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Review how your campaign performed
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="font-medium">{currentCampaignResults.campaign.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentCampaignResults.campaign.description || "No description provided."}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Target Audience</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentCampaignResults.campaign.targetSpecies.map(id => {
                          const species = alienSpecies.find(s => s.id === id);
                          return species ? (
                            <span key={id} className="text-xs px-2 py-1 bg-nova-stardust rounded-full">
                              {species.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Platform</h4>
                      <div className="text-sm">
                        {marketingPlatforms.find(p => p.id === currentCampaignResults.campaign.platform)?.name}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Ad Format</h4>
                      <div className="text-sm">
                        {adFormats.find(f => f.id === currentCampaignResults.campaign.adFormat)?.name}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Investment</h4>
                      <div className="text-sm font-mono">
                        §{currentCampaignResults.campaign.budget.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <AnalyticsPanel results={currentCampaignResults.results} />
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleContinue}
                      className="px-6 py-2 rounded-lg font-medium text-sm bg-nova-nebula text-white nova-button"
                    >
                      Continue to Day {gameState.day}
                    </button>
                  </div>
                </div>
              </div>
              
              {gameState.completedCampaigns.length > 1 && (
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-nova-nebula/10">
                    <h2 className="text-xl font-medium tracking-tight">Campaign History</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {gameState.completedCampaigns.slice(0, -1).reverse().map(({ campaign, results }) => (
                        <div key={campaign.id} className="bg-nova-stardust p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{campaign.name}</h3>
                            <div className="text-xs text-muted-foreground">Day {gameState.day - gameState.completedCampaigns.findIndex(c => c.campaign.id === campaign.id) - 1}</div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mb-3">
                            Budget: §{campaign.budget.toLocaleString()}
                          </div>
                          
                          <AnalyticsPanel results={results} showDetails={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-6 border-b border-nova-nebula/10">
                <h2 className="text-xl font-medium tracking-tight">Galaxy Status</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Track your progress in uniting the galaxy
                </p>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-1">Interstellar Unity Progress</div>
                  <div className="w-full bg-muted h-3 rounded-full">
                    <div
                      className="bg-gradient-to-r from-nova-nebula to-nova-comet h-full rounded-full transition-all duration-1000"
                      style={{ width: `${gameState.reputation}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Isolated</span>
                    <span>Connected</span>
                    <span>United</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Unlocked Species</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {alienSpecies.map(species => (
                      <div 
                        key={species.id}
                        className={`p-3 rounded-lg border ${
                          gameState.unlockedSpecies.includes(species.id)
                            ? 'bg-nova-stardust/70 border-nova-nebula/20'
                            : 'bg-nova-space/50 border-muted/10 opacity-30'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {gameState.unlockedSpecies.includes(species.id) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-nova-comet">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-muted-foreground">
                              <path d="M12 17v.01"></path>
                              <path d="M12 13a2 2 0 0 1 .15-3.99A2 2 0 0 1 14 11V9a1.98 1.98 0 0 0-1.4-1.88 2 2 0 0 0-2.6 1.9"></path>
                              <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                          )}
                          <span className="font-medium">{species.name}</span>
                        </div>
                        
                        {gameState.unlockedSpecies.includes(species.id) ? (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{species.description}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-1">Unlock at higher reputation levels</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Unlocked Platforms</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {marketingPlatforms.map(platform => (
                      <div 
                        key={platform.id}
                        className={`p-3 rounded-lg border ${
                          gameState.unlockedPlatforms.includes(platform.id)
                            ? 'bg-nova-stardust/70 border-nova-nebula/20'
                            : 'bg-nova-space/50 border-muted/10 opacity-30'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {gameState.unlockedPlatforms.includes(platform.id) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-nova-comet">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-muted-foreground">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                          )}
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        
                        {gameState.unlockedPlatforms.includes(platform.id) ? (
                          <p className="text-xs text-muted-foreground mt-1">{platform.description}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-1">Unlock at higher reputation levels</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl overflow-hidden mb-6">
                <div className="p-6 border-b border-nova-nebula/10">
                  <h2 className="text-xl font-medium tracking-tight">Target Species</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Choose which alien species to target
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {availableSpecies.map(species => (
                      <SpeciesCard
                        key={species.id}
                        species={species}
                        selected={selectedSpecies.includes(species.id)}
                        onSelect={handleSpeciesSelect}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <CampaignBuilder
                unlockedSpecies={gameState.unlockedSpecies}
                unlockedPlatforms={gameState.unlockedPlatforms}
                budget={gameState.budget}
                onCreateCampaign={handleCreateCampaign}
              />
            </div>
          </div>
        )}
      </main>
      
      {gameState.activeCrisis && (
        <CrisisAlert
          crisis={gameState.activeCrisis}
          onResolve={handleResolveCrisis}
        />
      )}
    </div>
  );
};

export default Index;
