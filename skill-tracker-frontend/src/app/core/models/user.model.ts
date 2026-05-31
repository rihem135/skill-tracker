export interface User {
  id?: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
}

