
// Game data and logic for Nova Marketing

// Alien Species
export interface AlienSpecies {
  id: string;
  name: string;
  description: string;
  communication: string;
  values: string[];
  interests: string[];
  dislikes: string[];
  marketingTips: string;
  responseRate: {
    emotional: number;
    logical: number;
    visual: number;
    audio: number;
  };
}

export const alienSpecies: AlienSpecies[] = [
  {
    id: "glorathian",
    name: "Glorathians",
    description: "Highly logical silicon-based beings that value knowledge and technological advancement.",
    communication: "Direct, fact-based communication with precise data points.",
    values: ["Knowledge", "Efficiency", "Technology", "Order"],
    interests: ["Artificial Intelligence", "Quantum Computing", "Data Analysis", "Mathematics"],
    dislikes: ["Ambiguity", "Emotional Appeals", "Exaggerations", "Inefficiency"],
    marketingTips: "Use detailed technical specifications and logical arguments. Include verifiable data.",
    responseRate: {
      emotional: 0.2,
      logical: 0.9,
      visual: 0.5,
      audio: 0.4
    }
  },
  {
    id: "zenthorian",
    name: "Zenthorians",
    description: "Fast-metabolizing energy beings that process information rapidly and appreciate dynamic stimuli.",
    communication: "Quick, vibrant exchanges with rich sensory components.",
    values: ["Speed", "Energy", "Novelty", "Sensation"],
    interests: ["Racing", "Light Art", "Kinetic Sculptures", "Vibration Music"],
    dislikes: ["Slow Pacing", "Static Content", "Repetition", "Lengthy Explanations"],
    marketingTips: "Create fast-paced, visually stimulating content with quick transitions and bright colors.",
    responseRate: {
      emotional: 0.7,
      logical: 0.4,
      visual: 0.9,
      audio: 0.8
    }
  },
  {
    id: "aquarii",
    name: "Aquarii",
    description: "Empathic aquatic species that communicate through emotional resonance and value community connections.",
    communication: "Emotional resonance and community-oriented messaging.",
    values: ["Harmony", "Community", "Emotional Depth", "Sustainability"],
    interests: ["Collective Activities", "Emotional Arts", "Ocean Conservation", "Telepathic Music"],
    dislikes: ["Conflict", "Isolation", "Competitive Messaging", "Artificial Environments"],
    marketingTips: "Focus on community benefits and emotional connections. Use flowing visuals and harmonious sounds.",
    responseRate: {
      emotional: 0.95,
      logical: 0.4,
      visual: 0.7,
      audio: 0.8
    }
  },
  {
    id: "crystalline",
    name: "Crystalline Collective",
    description: "Hive-minded crystal entities that communicate through light patterns and value symmetry and resonance.",
    communication: "Light patterns, geometric symbols, and resonant frequencies.",
    values: ["Unity", "Symmetry", "Resonance", "Growth"],
    interests: ["Crystal Harmonics", "Geometric Art", "Light Shows", "Structural Design"],
    dislikes: ["Dissonance", "Asymmetry", "Individualism", "Opacity"],
    marketingTips: "Use geometric patterns, crystal imagery, and synchronized light displays. Focus on group benefits.",
    responseRate: {
      emotional: 0.5,
      logical: 0.7,
      visual: 0.9,
      audio: 0.6
    }
  },
  {
    id: "nebulite",
    name: "Nebulites",
    description: "Gas-based intelligences that exist within nebulae and think in vast, interconnected concepts.",
    communication: "Abstract concepts, cosmic imagery, and diffuse messaging.",
    values: ["Expansion", "Interconnection", "Transcendence", "Mystery"],
    interests: ["Cosmic Phenomena", "Cloud Formations", "Diffuse Art", "Conceptual Sciences"],
    dislikes: ["Boundaries", "Rigid Structures", "Simplification", "Direct Approaches"],
    marketingTips: "Create dreamy, expansive visuals with cosmic themes. Use metaphors and allow for interpretation.",
    responseRate: {
      emotional: 0.7,
      logical: 0.5,
      visual: 0.8,
      audio: 0.3
    }
  }
];

// Marketing Platforms
export interface MarketingPlatform {
  id: string;
  name: string;
  description: string;
  cost: number;
  reach: number;
  bestFor: string[];
}

export const marketingPlatforms: MarketingPlatform[] = [
  {
    id: "holographic",
    name: "Holographic Billboards",
    description: "Giant interactive 3D displays visible from space, featuring immersive holographic content.",
    cost: 5000,
    reach: 0.7,
    bestFor: ["Zenthorians", "Crystalline Collective"]
  },
  {
    id: "neural",
    name: "Neural Network Ads",
    description: "Direct-to-mind advertising that creates customized experiences based on recipient's thought patterns.",
    cost: 8000,
    reach: 0.4,
    bestFor: ["Glorathians", "Nebulites"]
  },
  {
    id: "quantum",
    name: "Quantum Social Media",
    description: "Platforms that exist in multiple states simultaneously, allowing for personalized content delivery.",
    cost: 3000,
    reach: 0.8,
    bestFor: ["Aquarii", "Zenthorians"]
  },
  {
    id: "telepathic",
    name: "Telepathic Broadcasts",
    description: "Emotional and conceptual messages transmitted via psionic wavelengths across vast distances.",
    cost: 6000,
    reach: 0.5,
    bestFor: ["Aquarii", "Nebulites"]
  },
  {
    id: "light",
    name: "Light Pattern Networks",
    description: "Communication channels that use complex light patterns and colors to convey detailed information.",
    cost: 4000,
    reach: 0.6,
    bestFor: ["Crystalline Collective", "Zenthorians"]
  }
];

// Ad Formats
export interface AdFormat {
  id: string;
  name: string;
  description: string;
  effectiveness: number;
  suitableFor: string[];
}

export const adFormats: AdFormat[] = [
  {
    id: "video",
    name: "Cinematic Space Ads",
    description: "Short, visually stunning video content featuring cosmic imagery and compelling narratives.",
    effectiveness: 0.8,
    suitableFor: ["Zenthorians", "Nebulites"]
  },
  {
    id: "data",
    name: "Data Visualization Streams",
    description: "Complex, interactive data displays that allow users to explore information at their own pace.",
    effectiveness: 0.75,
    suitableFor: ["Glorathians", "Crystalline Collective"]
  },
  {
    id: "emotional",
    name: "Emotional Resonance Fields",
    description: "Broadcasts that transmit authentic emotional states and build genuine connections.",
    effectiveness: 0.85,
    suitableFor: ["Aquarii", "Nebulites"]
  },
  {
    id: "interactive",
    name: "Interactive Reality Shapers",
    description: "Ads that allow users to modify and interact with content in real-time for personalized experiences.",
    effectiveness: 0.9,
    suitableFor: ["Zenthorians", "Crystalline Collective"]
  },
  {
    id: "conceptual",
    name: "Abstract Concept Maps",
    description: "Complex, multi-layered advertisements that convey ideas rather than literal messages.",
    effectiveness: 0.7,
    suitableFor: ["Glorathians", "Nebulites"]
  }
];

// Crisis Events
export interface CrisisEvent {
  id: string;
  title: string;
  description: string;
  affectedSpecies: string[];
  options: {
    id: string;
    text: string;
    outcome: string;
    effect: {
      reputation: number;
      budget: number;
    };
  }[];
}

export const crisisEvents: CrisisEvent[] = [
  {
    id: "cultural-misunderstanding",
    title: "Cultural Misinterpretation Crisis",
    description: "Your latest ad campaign was misinterpreted by the Crystalline Collective as a sign of aggression due to the use of asymmetrical patterns.",
    affectedSpecies: ["Crystalline Collective"],
    options: [
      {
        id: "apologize",
        text: "Issue a formal apology with symmetric patterns",
        outcome: "The Crystalline Collective appreciates your swift response and understanding of their cultural values. Relations improve.",
        effect: {
          reputation: 5,
          budget: -1000
        }
      },
      {
        id: "explain",
        text: "Launch an educational campaign about your design choices",
        outcome: "The educational approach is partially effective, but some members remain skeptical of your intentions.",
        effect: {
          reputation: 0,
          budget: -2000
        }
      },
      {
        id: "ignore",
        text: "Ignore the issue and continue with current designs",
        outcome: "The Crystalline Collective boycotts your campaign, leading to significant setbacks in that market.",
        effect: {
          reputation: -10,
          budget: 0
        }
      }
    ]
  },
  {
    id: "rival-campaign",
    title: "Rival Marketing Initiative",
    description: "A competing marketing agency has launched a campaign targeting the same species as yours with similar messaging but higher production value.",
    affectedSpecies: ["Glorathians", "Zenthorians"],
    options: [
      {
        id: "outspend",
        text: "Increase your budget to create even better content",
        outcome: "Your enhanced campaign outshines the competition, but at significant cost.",
        effect: {
          reputation: 8,
          budget: -5000
        }
      },
      {
        id: "differentiate",
        text: "Pivot to a unique angle that highlights your distinctive vision",
        outcome: "Your creative approach stands out from the competition, gaining attention for originality.",
        effect: {
          reputation: 10,
          budget: -2000
        }
      },
      {
        id: "partnership",
        text: "Approach the rival for a potential collaboration",
        outcome: "After initial hesitation, they agree to collaborate, resulting in a stronger combined campaign.",
        effect: {
          reputation: 5,
          budget: -1000
        }
      }
    ]
  },
  {
    id: "technical-failure",
    title: "Neural Network Malfunction",
    description: "A glitch in your neural network ads caused users to experience random memories from other species, creating confusion.",
    affectedSpecies: ["Nebulites", "Aquarii"],
    options: [
      {
        id: "compensation",
        text: "Offer compensation to affected users",
        outcome: "Users appreciate the gesture, and most return to engaging with your content.",
        effect: {
          reputation: 3,
          budget: -4000
        }
      },
      {
        id: "fix-improve",
        text: "Fix the issue and release an improved version with new features",
        outcome: "The improved version generates excitement and attracts new users despite the initial problem.",
        effect: {
          reputation: 7,
          budget: -3000
        }
      },
      {
        id: "blame-provider",
        text: "Publicly blame your technology provider",
        outcome: "While some believe your explanation, the technology provider cuts ties, limiting your future capabilities.",
        effect: {
          reputation: -5,
          budget: 0
        }
      }
    ]
  }
];

// Campaign Performance Calculation
export interface Campaign {
  id: string;
  name: string;
  targetSpecies: string[];
  platform: string;
  adFormat: string;
  messageType: "emotional" | "logical" | "visual" | "audio";
  budget: number;
  description: string;
}

export interface CampaignResults {
  engagement: number;
  reach: number;
  conversion: number;
  roi: number;
  feedback: string;
}

export const calculateCampaignPerformance = (campaign: Campaign): CampaignResults => {
  // Get target species details
  const targetSpeciesDetails = campaign.targetSpecies.map(
    targetId => alienSpecies.find(species => species.id === targetId)
  ).filter(Boolean) as AlienSpecies[];
  
  // Get platform details
  const platform = marketingPlatforms.find(p => p.id === campaign.platform);
  
  // Get ad format details
  const format = adFormats.find(f => f.id === campaign.adFormat);
  
  if (!platform || !format || targetSpeciesDetails.length === 0) {
    return {
      engagement: 0,
      reach: 0,
      conversion: 0,
      roi: 0,
      feedback: "Campaign configuration error: missing platform, format, or target species."
    };
  }
  
  // Calculate base engagement based on species response to message type
  const avgResponseRate = targetSpeciesDetails.reduce(
    (sum, species) => sum + species.responseRate[campaign.messageType], 
    0
  ) / targetSpeciesDetails.length;
  
  // Calculate platform effectiveness based on suitability for target species
  const platformSuitability = targetSpeciesDetails.reduce((sum, species) => {
    return sum + (platform.bestFor.includes(species.name) ? 1 : 0.3);
  }, 0) / targetSpeciesDetails.length;
  
  // Calculate format effectiveness based on suitability for target species
  const formatSuitability = targetSpeciesDetails.reduce((sum, species) => {
    return sum + (format.suitableFor.includes(species.name) ? 1 : 0.4);
  }, 0) / targetSpeciesDetails.length;
  
  // Calculate budget effectiveness (diminishing returns)
  const budgetFactor = Math.min(1, Math.log10(campaign.budget / 1000) / 2);
  
  // Calculate overall performance metrics
  const engagement = avgResponseRate * formatSuitability * Math.random() * 0.3 + 0.7;
  const reach = platform.reach * budgetFactor * (Math.random() * 0.2 + 0.9);
  const conversion = engagement * platformSuitability * (Math.random() * 0.2 + 0.8);
  const roi = (conversion * reach * 10000) / campaign.budget;
  
  // Generate feedback
  let feedback = "";
  if (engagement > 0.7) {
    feedback += "Your content resonated well with the audience. ";
  } else {
    feedback += "Your content didn't fully connect with the audience. ";
  }
  
  if (reach > 0.6) {
    feedback += "The campaign achieved excellent visibility. ";
  } else {
    feedback += "The campaign had limited reach. ";
  }
  
  if (conversion > 0.5) {
    feedback += "Conversion rates were strong, indicating effective persuasion. ";
  } else {
    feedback += "Conversion rates were below target, suggesting messaging issues. ";
  }
  
  if (roi > 1.5) {
    feedback += "Outstanding return on investment!";
  } else if (roi > 1) {
    feedback += "Positive return on investment.";
  } else {
    feedback += "Investment did not yield sufficient returns.";
  }
  
  return {
    engagement: parseFloat((engagement * 100).toFixed(1)),
    reach: parseFloat((reach * 100).toFixed(1)),
    conversion: parseFloat((conversion * 100).toFixed(1)),
    roi: parseFloat(roi.toFixed(2)),
    feedback
  };
};

// Game state interface
export interface GameState {
  playerName: string;
  reputation: number;
  budget: number;
  day: number;
  completedCampaigns: {
    campaign: Campaign;
    results: CampaignResults;
  }[];
  activeCrisis: CrisisEvent | null;
  unlockedSpecies: string[];
  unlockedPlatforms: string[];
  gameProgress: number;
}

// Initialize a new game
export const initializeGame = (playerName: string): GameState => {
  return {
    playerName,
    reputation: 50,
    budget: 10000,
    day: 1,
    completedCampaigns: [],
    activeCrisis: null,
    unlockedSpecies: ["glorathian", "zenthorian"],
    unlockedPlatforms: ["holographic", "quantum"],
    gameProgress: 0
  };
};
