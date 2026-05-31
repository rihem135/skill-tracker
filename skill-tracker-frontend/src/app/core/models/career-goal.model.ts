export interface CareerGoal {
  id?: string;
  employeeId: string;
  titre: string;
  description?: string;
  statut: 'en_cours' | 'atteint' | 'abandonne';
  dateEcheance?: string;
  progression: number;
  skillsCibleesIds?: string[];
}

