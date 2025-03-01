
import { CampaignResults } from '../utils/gameData';

interface AnalyticsPanelProps {
  results: CampaignResults;
  showDetails?: boolean;
}

const AnalyticsPanel = ({ results, showDetails = true }: AnalyticsPanelProps) => {
  const { engagement, reach, conversion, roi, feedback } = results;
  
  // Determine performance level for color coding
  const getPerformanceColor = (value: number, metric: 'engagement' | 'reach' | 'conversion' | 'roi') => {
    const thresholds = {
      engagement: { low: 40, medium: 70 },
      reach: { low: 30, medium: 60 },
      conversion: { low: 20, medium: 50 },
      roi: { low: 0.8, medium: 1.2 }
    };
    
    if (value < thresholds[metric].low) return 'bg-destructive/60';
    if (value < thresholds[metric].medium) return 'bg-nova-planet/60';
    return 'bg-nova-comet/60';
  };
  
  return (
    <div className="bg-nova-stardust/80 rounded-xl overflow-hidden border border-nova-nebula/10">
      <div className="p-4 border-b border-nova-nebula/10">
        <h3 className="font-medium">Campaign Analytics</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Engagement</div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-muted h-2 rounded-full">
                <div
                  className={`h-full rounded-full ${getPerformanceColor(engagement, 'engagement')}`}
                  style={{ width: `${engagement}%` }}
                ></div>
              </div>
              <span className="text-sm font-mono">{engagement}%</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground mb-1">Reach</div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-muted h-2 rounded-full">
                <div
                  className={`h-full rounded-full ${getPerformanceColor(reach, 'reach')}`}
                  style={{ width: `${reach}%` }}
                ></div>
              </div>
              <span className="text-sm font-mono">{reach}%</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground mb-1">Conversion</div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-muted h-2 rounded-full">
                <div
                  className={`h-full rounded-full ${getPerformanceColor(conversion, 'conversion')}`}
                  style={{ width: `${conversion}%` }}
                ></div>
              </div>
              <span className="text-sm font-mono">{conversion}%</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground mb-1">ROI</div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-muted h-2 rounded-full">
                <div
                  className={`h-full rounded-full ${getPerformanceColor(roi, 'roi')}`}
                  style={{ width: `${Math.min(roi * 50, 100)}%` }}
                ></div>
              </div>
              <span className="text-sm font-mono">{roi}x</span>
            </div>
          </div>
        </div>
        
        {showDetails && (
          <div>
            <div className="text-sm text-muted-foreground mb-1">Analysis</div>
            <p className="text-sm">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPanel;
