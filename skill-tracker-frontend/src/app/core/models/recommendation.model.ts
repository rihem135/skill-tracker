export interface RecommendationDTO {
  trainingId: string;
  titreFormation: string;
  plateforme: string;
  url: string;
  niveau: string;
  dureeHeures: number;
  rating: number;
  gratuit: boolean;
  scoreRelevance: number;
  raisonRecommandation: string;
}

export interface Recommendation {
  id?: string;
  employeeId: string;
  trainingId: string;
  titreFormation: string;
  plateforme: string;
  url: string;
  scoreRelevance: number;
  raisonRecommandation: string;
  vue: boolean;
  suivie: boolean;
  createdAt?: string;
}

