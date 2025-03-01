
import { useState } from 'react';
import { AlienSpecies } from '../utils/gameData';

interface SpeciesCardProps {
  species: AlienSpecies;
  selected: boolean;
  onSelect: (id: string) => void;
}

const SpeciesCard = ({ species, selected, onSelect }: SpeciesCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div 
      className={`relative flex flex-col bg-nova-stardust rounded-xl overflow-hidden transition-all duration-300 ${
        selected ? 'ring-2 ring-nova-nebula glow' : 'ring-1 ring-nova-nebula/10'
      } ${showDetails ? 'h-auto' : 'h-52'}`}
    >
      <div 
        className={`absolute top-2 right-2 w-4 h-4 rounded-full ${
          selected ? 'bg-nova-nebula' : 'bg-muted'
        } transition-colors duration-300`}
      ></div>
      
      <div 
        className="w-full bg-gradient-to-r from-nova-nebula/20 to-nova-comet/20 p-4 cursor-pointer"
        onClick={() => onSelect(species.id)}
      >
        <h3 className="text-lg font-medium tracking-wide">{species.name}</h3>
        <p className="text-sm text-muted-foreground">{species.communication}</p>
      </div>
      
      <div className="flex-1 p-4">
        <p className="text-sm mb-3">{species.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {species.values.map(value => (
            <span 
              key={value} 
              className="inline-block px-2 py-1 text-xs bg-nova-nebula/10 rounded-full"
            >
              {value}
            </span>
          ))}
        </div>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-nova-nebula hover:text-nova-supernova animated-underline transition-colors"
        >
          {showDetails ? 'Show Less' : 'Show More'}
        </button>
        
        {showDetails && (
          <div className="mt-4 animate-fade-in">
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Interests</h4>
              <ul className="text-xs text-muted-foreground">
                {species.interests.map(interest => (
                  <li key={interest} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-nova-comet rounded-full mr-2"></span>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Dislikes</h4>
              <ul className="text-xs text-muted-foreground">
                {species.dislikes.map(dislike => (
                  <li key={dislike} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-destructive rounded-full mr-2"></span>
                    {dislike}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Marketing Tip</h4>
              <p className="text-xs italic">{species.marketingTips}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Response Rates</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Emotional</span>
                  <div className="w-full bg-muted h-1.5 rounded-full">
                    <div 
                      className="bg-nova-nebula h-full rounded-full"
                      style={{ width: `${species.responseRate.emotional * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Logical</span>
                  <div className="w-full bg-muted h-1.5 rounded-full">
                    <div 
                      className="bg-nova-nebula h-full rounded-full"
                      style={{ width: `${species.responseRate.logical * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Visual</span>
                  <div className="w-full bg-muted h-1.5 rounded-full">
                    <div 
                      className="bg-nova-nebula h-full rounded-full"
                      style={{ width: `${species.responseRate.visual * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Audio</span>
                  <div className="w-full bg-muted h-1.5 rounded-full">
                    <div 
                      className="bg-nova-nebula h-full rounded-full"
                      style={{ width: `${species.responseRate.audio * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeciesCard;
