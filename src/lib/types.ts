
export type TrustLevel = 'high' | 'medium' | 'low' | 'unknown';

export interface ModelRating {
  accuracy: number;
  reliability: number;
  safety: number;
  fairness: number;
  transparency: number;
}

export interface ModelFlag {
  id: string;
  modelId: string;
  type: 'bias' | 'harmful' | 'inaccurate' | 'other';
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  reporterId: string;
  reporterName: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  version: string;
  description: string;
  capabilities: string[];
  trustScore: number;
  ratings: ModelRating;
  trustLevel: TrustLevel;
  chatUrl: string;
  totalReviews: number;
  totalInteractions: number;
  totalFlags: number;
  activeFlags: number;
  lastUpdated: string;
  createdAt: string;
  flagHistory: Array<{
    month: string;
    count: number;
  }>;
  usageStatistics: Array<{
    month: string;
    interactions: number;
  }>;
}

export interface RecentActivity {
  id: string;
  type: 'flag' | 'review' | 'moderation' | 'interaction';
  modelId: string;
  modelName: string;
  description: string;
  user: string;
  timestamp: string;
}

export interface ModelTestResponse {
  id: string;
  modelId: string;
  prompt: string;
  response: string;
  timestamp: string;
  rating?: number;
}
