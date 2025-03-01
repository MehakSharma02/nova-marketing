
import { useState } from 'react';
import { CrisisEvent } from '../utils/gameData';

interface CrisisAlertProps {
  crisis: CrisisEvent;
  onResolve: (optionId: string) => void;
}

const CrisisAlert = ({ crisis, onResolve }: CrisisAlertProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-2xl glass-card rounded-xl overflow-hidden">
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-destructive/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-nova-nebula/30 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="p-6 border-b border-nova-nebula/10 flex items-center space-x-3">
            <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-destructive">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-medium">{crisis.title}</h2>
              <p className="text-sm text-muted-foreground">
                Affected Species: {crisis.affectedSpecies.join(', ')}
              </p>
            </div>
          </div>
          
          <div className="p-6">
            <p className="mb-6">{crisis.description}</p>
            
            <h3 className="text-sm font-medium mb-3">Choose Your Response:</h3>
            
            <div className="space-y-3 mb-6">
              {crisis.options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOption === option.id
                      ? 'bg-nova-nebula/20 ring-1 ring-nova-nebula'
                      : 'bg-nova-stardust hover:bg-nova-stardust/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.text}</span>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className={option.effect.reputation >= 0 ? 'text-nova-comet' : 'text-destructive'}>
                        {option.effect.reputation >= 0 ? '+' : ''}{option.effect.reputation} Rep
                      </span>
                      <span className={option.effect.budget >= 0 ? 'text-nova-comet' : 'text-destructive'}>
                        {option.effect.budget >= 0 ? '+' : ''}§{option.effect.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => selectedOption && onResolve(selectedOption)}
                disabled={!selectedOption}
                className={`px-6 py-2 rounded-lg font-medium text-sm ${
                  !selectedOption
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-nova-nebula text-white nova-button'
                }`}
              >
                Confirm Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisAlert;
