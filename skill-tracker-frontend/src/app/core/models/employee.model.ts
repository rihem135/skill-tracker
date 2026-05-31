export interface CompetenceEntry {
  skillId: string;
  nom: string;
  niveau: number;
  dateAcquisition: string;
  commentaire?: string;
}

export interface Employee {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  poste: string;
  departement: string;
  niveauExperience: 'junior' | 'mid' | 'senior';
  competences: CompetenceEntry[];
  objectifsCarriereIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

