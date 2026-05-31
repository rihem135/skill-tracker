export interface Training {

  id: string;

  titre: string;
  description: string;

  plateforme: string;
  url: string;

  niveau: string;
  dureeHeures: number;
  rating: number;
  gratuit: boolean;

  skillsCiblesIds: string[];

  // ⏱ temps réel (tracking)
timeSpentSeconds: number;

  // 🎯 statut MANUEL (dropdown)
  status: 'DEBUT' | 'INTERMEDIAIRE' | 'COMPLET';

  // 📊 progression libre (optionnel)
  progress: number;

  // ▶ timer state
  isRunning?: boolean;

  
}