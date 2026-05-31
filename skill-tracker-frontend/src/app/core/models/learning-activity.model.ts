export interface LearningActivity {
  id?: string;
  userId: string;
  activityType: 'video' | 'quiz' | 'exercise' | 'reading' | 'project' | 'certification';
  trainingId?: string;
  skillId?: string;
  duration: number; // minutes
  engagementScore: number; // 0-100
  successRate?: number; // 0-100
  date: Date;
  metadata?: {
    title?: string;
    moduleName?: string;
    score?: number;
    attempts?: number;
    completedModules?: string[];
  };
}

export interface LearningAnalytics {
  dailyActivity: {
    date: Date;
    totalMinutes: number;
    activitiesCount: number;
    averageEngagement: number;
  }[];
  weeklyTrend: {
    week: number;
    progress: number;
    timeSpent: number;
    skillsImproved: number;
  }[];
  recommendations: {
    type: string;
    title: string;
    description: string;
    priority: string;
    actionUrl?: string;
  }[];
}