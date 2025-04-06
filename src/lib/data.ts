
import { AIModel, ModelFlag, RecentActivity, TrustLevel } from "./types";

export const MOCK_MODELS: AIModel[] = [
  {
    id: "model-1",
    name: "GPT-4o",
    provider: "OpenAI",
    version: "4.0",
    description: "Advanced language model with multimodal capabilities.",
    capabilities: ["text", "images", "reasoning", "coding"],
    trustScore: 92,
    trustLevel: "high",
    chatUrl: "http://localhost:8002",
    ratings: {
      accuracy: 92,
      reliability: 94,
      safety: 91,
      fairness: 89,
      transparency: 87
    },
    totalReviews: 15783,
    totalInteractions: 128935,
    totalFlags: 423,
    activeFlags: 12,
    lastUpdated: "2025-04-01T10:23:18Z",
    createdAt: "2024-03-15T00:00:00Z",
    flagHistory: [
      { month: "Nov", count: 42 },
      { month: "Dec", count: 37 },
      { month: "Jan", count: 35 },
      { month: "Feb", count: 28 },
      { month: "Mar", count: 18 },
      { month: "Apr", count: 12 }
    ],
    usageStatistics: [
      { month: "Nov", interactions: 12453 },
      { month: "Dec", interactions: 15678 },
      { month: "Jan", interactions: 18942 },
      { month: "Feb", interactions: 21345 },
      { month: "Mar", interactions: 23901 },
      { month: "Apr", interactions: 27256 }
    ]
  },
  {
    id: "model-2",
    name: "Claude 3.5",
    provider: "Anthropic",
    version: "3.5",
    description: "Harmless, helpful AI assistant with advanced reasoning.",
    capabilities: ["text", "reasoning", "summarization"],
    trustScore: 88,
    trustLevel: "high",
    chatUrl: "http://localhost:8001",
    ratings: {
      accuracy: 89,
      reliability: 91,
      safety: 95,
      fairness: 92,
      transparency: 90
    },
    totalReviews: 8954,
    totalInteractions: 89735,
    totalFlags: 189,
    activeFlags: 5,
    lastUpdated: "2025-03-28T14:17:53Z",
    createdAt: "2024-02-12T00:00:00Z",
    flagHistory: [
      { month: "Nov", count: 24 },
      { month: "Dec", count: 31 },
      { month: "Jan", count: 19 },
      { month: "Feb", count: 15 },
      { month: "Mar", count: 8 },
      { month: "Apr", count: 5 }
    ],
    usageStatistics: [
      { month: "Nov", interactions: 6782 },
      { month: "Dec", interactions: 9854 },
      { month: "Jan", interactions: 12341 },
      { month: "Feb", interactions: 16782 },
      { month: "Mar", interactions: 19876 },
      { month: "Apr", interactions: 23245 }
    ]
  },
  {
    id: "model-3",
    name: "Gemini Ultra",
    provider: "Google",
    version: "1.5",
    description: "Multimodal frontier model with strong reasoning capabilities.",
    capabilities: ["text", "images", "reasoning", "coding"],
    trustScore: 90,
    trustLevel: "high",
    chatUrl: "http://localhost:8003",
    ratings: {
      accuracy: 90,
      reliability: 88,
      safety: 93,
      fairness: 87,
      transparency: 85
    },
    totalReviews: 7845,
    totalInteractions: 78342,
    totalFlags: 264,
    activeFlags: 9,
    lastUpdated: "2025-04-03T09:42:11Z",
    createdAt: "2024-01-18T00:00:00Z",
    flagHistory: [
      { month: "Nov", count: 38 },
      { month: "Dec", count: 34 },
      { month: "Jan", count: 31 },
      { month: "Feb", count: 26 },
      { month: "Mar", count: 15 },
      { month: "Apr", count: 9 }
    ],
    usageStatistics: [
      { month: "Nov", interactions: 5687 },
      { month: "Dec", interactions: 8924 },
      { month: "Jan", interactions: 11345 },
      { month: "Feb", interactions: 15678 },
      { month: "Mar", interactions: 17980 },
      { month: "Apr", interactions: 21345 }
    ]
  },
  {
    id: "model-4",
    name: "Llama 3 70B",
    provider: "Meta",
    version: "3.0",
    description: "Open model with strong performance and fewer restrictions.",
    capabilities: ["text", "reasoning", "coding"],
    trustScore: 78,
    trustLevel: "medium",
    chatUrl: "http://localhost:8001",
    ratings: {
      accuracy: 85,
      reliability: 82,
      safety: 70,
      fairness: 76,
      transparency: 92
    },
    totalReviews: 5467,
    totalInteractions: 56789,
    totalFlags: 542,
    activeFlags: 31,
    lastUpdated: "2025-03-30T11:32:45Z",
    createdAt: "2024-02-08T00:00:00Z",
    flagHistory: [
      { month: "Nov", count: 87 },
      { month: "Dec", count: 79 },
      { month: "Jan", count: 68 },
      { month: "Feb", count: 62 },
      { month: "Mar", count: 41 },
      { month: "Apr", count: 31 }
    ],
    usageStatistics: [
      { month: "Nov", interactions: 4521 },
      { month: "Dec", interactions: 6754 },
      { month: "Jan", interactions: 8901 },
      { month: "Feb", interactions: 11234 },
      { month: "Mar", interactions: 14567 },
      { month: "Apr", interactions: 16789 }
    ]
  },
  {
    id: "model-5",
    name: "DinoAI",
    provider: "Decentralized Collective",
    version: "1.2",
    description: "Fully open-source model with minimal moderation.",
    capabilities: ["text", "coding"],
    trustScore: 62,
    trustLevel: "low",
    chatUrl: "http://localhost:8001",
    ratings: {
      accuracy: 79,
      reliability: 72,
      safety: 45,
      fairness: 61,
      transparency: 95
    },
    totalReviews: 2134,
    totalInteractions: 24567,
    totalFlags: 873,
    activeFlags: 102,
    lastUpdated: "2025-03-22T16:54:07Z",
    createdAt: "2024-03-01T00:00:00Z",
    flagHistory: [
      { month: "Nov", count: 145 },
      { month: "Dec", count: 167 },
      { month: "Jan", count: 156 },
      { month: "Feb", count: 142 },
      { month: "Mar", count: 118 },
      { month: "Apr", count: 102 }
    ],
    usageStatistics: [
      { month: "Nov", interactions: 1890 },
      { month: "Dec", interactions: 2378 },
      { month: "Jan", interactions: 3456 },
      { month: "Feb", interactions: 4567 },
      { month: "Mar", interactions: 5789 },
      { month: "Apr", interactions: 6890 }
    ]
  },
];

export const MOCK_FLAGS: ModelFlag[] = [
  {
    id: "flag-1",
    modelId: "model-1",
    type: "bias",
    description: "Gender bias in professional role descriptions",
    status: "pending",
    createdAt: "2025-04-03T09:23:15Z",
    updatedAt: "2025-04-03T09:23:15Z",
    reporterId: "user-123",
    reporterName: "Alex Johnson"
  },
  {
    id: "flag-2",
    modelId: "model-1",
    type: "inaccurate",
    description: "Factual error about historical event",
    status: "reviewed",
    createdAt: "2025-04-02T15:17:22Z",
    updatedAt: "2025-04-03T10:45:18Z",
    reporterId: "user-456",
    reporterName: "Sam Williams"
  },
  {
    id: "flag-3",
    modelId: "model-3",
    type: "harmful",
    description: "Provided potentially harmful instruction",
    status: "resolved",
    createdAt: "2025-04-01T11:08:45Z",
    updatedAt: "2025-04-03T14:22:37Z",
    reporterId: "user-789",
    reporterName: "Riley Taylor"
  },
  {
    id: "flag-4",
    modelId: "model-4",
    type: "bias",
    description: "Cultural stereotyping in response",
    status: "pending",
    createdAt: "2025-04-03T08:14:12Z",
    updatedAt: "2025-04-03T08:14:12Z",
    reporterId: "user-101",
    reporterName: "Jordan Parker"
  },
  {
    id: "flag-5",
    modelId: "model-5",
    type: "harmful",
    description: "Generated detailed instructions for malicious activity",
    status: "reviewed",
    createdAt: "2025-04-02T19:47:33Z",
    updatedAt: "2025-04-03T11:31:05Z",
    reporterId: "user-202",
    reporterName: "Taylor Reed"
  }
];

export const MOCK_ACTIVITIES: RecentActivity[] = [
  {
    id: "activity-1",
    type: "flag",
    modelId: "model-1",
    modelName: "GPT-4o",
    description: "New bias flag submitted",
    user: "Alex Johnson",
    timestamp: "2025-04-03T09:23:15Z"
  },
  {
    id: "activity-2",
    type: "moderation",
    modelId: "model-3",
    modelName: "Gemini Ultra",
    description: "Flag resolved: Harmful content",
    user: "Mod Team",
    timestamp: "2025-04-03T14:22:37Z"
  },
  {
    id: "activity-3",
    type: "review",
    modelId: "model-2",
    modelName: "Claude 3.5",
    description: "New 5-star review",
    user: "Jamie Smith",
    timestamp: "2025-04-03T12:45:22Z"
  },
  {
    id: "activity-4",
    type: "interaction",
    modelId: "model-4",
    modelName: "Llama 3 70B",
    description: "1000+ new interactions today",
    user: "System",
    timestamp: "2025-04-03T16:00:00Z"
  },
  {
    id: "activity-5",
    type: "flag",
    modelId: "model-5",
    modelName: "DinoAI",
    description: "New harmful content flag",
    user: "Taylor Reed",
    timestamp: "2025-04-02T19:47:33Z"
  },
  {
    id: "activity-6",
    type: "moderation",
    modelId: "model-1",
    modelName: "GPT-4o",
    description: "Flag reviewed: Factual error",
    user: "Mod Team",
    timestamp: "2025-04-03T10:45:18Z"
  },
  {
    id: "activity-7",
    type: "review",
    modelId: "model-3",
    modelName: "Gemini Ultra",
    description: "New 4-star review",
    user: "Casey Morgan",
    timestamp: "2025-04-03T11:32:48Z"
  },
  {
    id: "activity-8",
    type: "interaction",
    modelId: "model-2",
    modelName: "Claude 3.5",
    description: "500+ new interactions today",
    user: "System",
    timestamp: "2025-04-03T15:30:00Z"
  }
];
