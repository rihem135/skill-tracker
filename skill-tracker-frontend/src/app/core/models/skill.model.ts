export interface Skill {
  id?: string;
  nom: string;
  description: string;
  categorie: string;
  niveauRequis: string;
  technologiesAssociees: string[];

  createdAt?: Date;
  updatedAt?: Date;
  niveau?: number;
}