
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  alienSpecies, 
  marketingPlatforms, 
  adFormats,
  Campaign
} from '../utils/gameData';

interface CampaignBuilderProps {
  unlockedSpecies: string[];
  unlockedPlatforms: string[];
  budget: number;
  onCreateCampaign: (campaign: Campaign) => void;
}

const CampaignBuilder = ({ 
  unlockedSpecies, 
  unlockedPlatforms, 
  budget,
  onCreateCampaign
}: CampaignBuilderProps) => {
  const [step, setStep] = useState(1);
  const [targetSpecies, setTargetSpecies] = useState<string[]>([]);
  const [platform, setPlatform] = useState('');
  const [adFormat, setAdFormat] = useState('');
  const [messageType, setMessageType] = useState<'emotional' | 'logical' | 'visual' | 'audio'>('visual');
  const [campaignName, setCampaignName] = useState('');
  const [campaignBudget, setCampaignBudget] = useState(1000);
  const [description, setDescription] = useState('');
  
  const availableSpecies = alienSpecies.filter(species => 
    unlockedSpecies.includes(species.id)
  );
  
  const availablePlatforms = marketingPlatforms.filter(p => 
    unlockedPlatforms.includes(p.id)
  );
  
  // Clear form when step is 1
  useEffect(() => {
    if (step === 1) {
      setTargetSpecies([]);
      setPlatform('');
      setAdFormat('');
      setMessageType('visual');
      setCampaignName('');
      setCampaignBudget(1000);
      setDescription('');
    }
  }, [step]);
  
  const handleSpeciesToggle = (id: string) => {
    if (targetSpecies.includes(id)) {
      setTargetSpecies(targetSpecies.filter(s => s !== id));
    } else {
      setTargetSpecies([...targetSpecies, id]);
    }
  };
  
  const selectedPlatform = marketingPlatforms.find(p => p.id === platform);
  const selectedFormat = adFormats.find(f => f.id === adFormat);
  
  const handleSubmit = () => {
    if (!campaignName) {
      toast.error("Please name your campaign");
      return;
    }
    
    if (targetSpecies.length === 0) {
      toast.error("Please select at least one target species");
      return;
    }
    
    if (!platform) {
      toast.error("Please select a marketing platform");
      return;
    }
    
    if (!adFormat) {
      toast.error("Please select an ad format");
      return;
    }
    
    if (campaignBudget > budget) {
      toast.error("Your budget is insufficient for this campaign");
      return;
    }
    
    if (campaignBudget < 1000) {
      toast.error("Minimum budget is §1,000");
      return;
    }
    
    const campaign: Campaign = {
      id: Date.now().toString(),
      name: campaignName,
      targetSpecies,
      platform,
      adFormat,
      messageType,
      budget: campaignBudget,
      description
    };
    
    onCreateCampaign(campaign);
    setStep(1);
    toast.success("Campaign launched successfully!");
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-nova-nebula/10">
        <h2 className="text-xl font-medium tracking-tight">Campaign Builder</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {step === 1 && "Select your target audience for this campaign."}
          {step === 2 && "Choose your marketing platform and ad format."}
          {step === 3 && "Finalize your campaign details and launch."}
        </p>
      </div>
      
      <div className="p-6">
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-lg mb-4">Target Species</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {availableSpecies.map(species => (
                <div 
                  key={species.id}
                  onClick={() => handleSpeciesToggle(species.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    targetSpecies.includes(species.id) 
                      ? 'bg-nova-nebula/20 ring-1 ring-nova-nebula' 
                      : 'bg-nova-stardust hover:bg-nova-stardust/70'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border ${
                      targetSpecies.includes(species.id) 
                        ? 'border-nova-nebula bg-nova-nebula' 
                        : 'border-muted-foreground'
                    }`}>
                      {targetSpecies.includes(species.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">{species.name}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2">{species.description}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {species.values.slice(0, 2).map(value => (
                      <span 
                        key={value}
                        className="text-xs px-2 py-0.5 bg-nova-stardust rounded-full"
                      >
                        {value}
                      </span>
                    ))}
                    {species.values.length > 2 && (
                      <span className="text-xs px-2 py-0.5 bg-nova-stardust rounded-full">
                        +{species.values.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <div></div>
              <button
                onClick={() => setStep(2)}
                disabled={targetSpecies.length === 0}
                className={`px-6 py-2 rounded-lg font-medium text-sm nova-button ${
                  targetSpecies.length === 0
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-nova-nebula text-white'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h3 className="text-lg mb-4">Marketing Platform</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availablePlatforms.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      platform === p.id
                        ? 'bg-nova-nebula/20 ring-1 ring-nova-nebula'
                        : 'bg-nova-stardust hover:bg-nova-stardust/70'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-sm text-muted-foreground">§{p.cost.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
                    <div className="mt-3">
                      <div className="text-xs text-muted-foreground mb-1">Reach Potential</div>
                      <div className="w-full bg-muted h-1.5 rounded-full">
                        <div
                          className="bg-nova-comet h-full rounded-full"
                          style={{ width: `${p.reach * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg mb-4">Ad Format</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adFormats.map(f => (
                  <div
                    key={f.id}
                    onClick={() => setAdFormat(f.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      adFormat === f.id
                        ? 'bg-nova-nebula/20 ring-1 ring-nova-nebula'
                        : 'bg-nova-stardust hover:bg-nova-stardust/70'
                    }`}
                  >
                    <span className="font-medium">{f.name}</span>
                    <p className="text-sm text-muted-foreground mt-2">{f.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {f.suitableFor.map(species => (
                        <span
                          key={species}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            targetSpecies.includes(species.toLowerCase())
                              ? 'bg-nova-nebula/30'
                              : 'bg-nova-stardust'
                          }`}
                        >
                          {species}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg mb-4">Message Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(['emotional', 'logical', 'visual', 'audio'] as const).map(type => (
                  <div
                    key={type}
                    onClick={() => setMessageType(type)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      messageType === type
                        ? 'bg-nova-nebula/20 ring-1 ring-nova-nebula'
                        : 'bg-nova-stardust hover:bg-nova-stardust/70'
                    }`}
                  >
                    <span className="font-medium capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 rounded-lg font-medium text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!platform || !adFormat}
                className={`px-6 py-2 rounded-lg font-medium text-sm nova-button ${
                  !platform || !adFormat
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-nova-nebula text-white'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h3 className="text-lg mb-4">Campaign Details</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter a name for your campaign"
                  className="w-full p-2 bg-nova-space/50 border border-nova-nebula/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-nova-nebula"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Budget (§{campaignBudget.toLocaleString()})</label>
                <div className="flex items-center">
                  <span className="mr-3 text-xs">§1,000</span>
                  <input
                    type="range"
                    min="1000"
                    max={budget}
                    step="1000"
                    value={campaignBudget}
                    onChange={(e) => setCampaignBudget(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-nova-space rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-nova-nebula"
                  />
                  <span className="ml-3 text-xs">§{budget.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Campaign Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your campaign strategy and goals..."
                  className="w-full p-2 bg-nova-space/50 border border-nova-nebula/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-nova-nebula min-h-[100px]"
                />
              </div>
            </div>
            
            <div className="bg-nova-stardust rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2">Campaign Summary</h4>
              
              <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <span className="text-muted-foreground">Target Species:</span>
                  <div>
                    {targetSpecies.map(id => (
                      alienSpecies.find(s => s.id === id)?.name
                    )).join(', ')}
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Platform:</span>
                  <div>{selectedPlatform?.name}</div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Ad Format:</span>
                  <div>{selectedFormat?.name}</div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Message Type:</span>
                  <div className="capitalize">{messageType}</div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Budget:</span>
                  <div>§{campaignBudget.toLocaleString()}</div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Platform Cost:</span>
                  <div>§{selectedPlatform ? selectedPlatform.cost.toLocaleString() : 0}</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 rounded-lg font-medium text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg font-medium text-sm bg-nova-nebula text-white nova-button"
              >
                Launch Campaign
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignBuilder;
