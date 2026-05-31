import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/all-models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getUserFromStorage();
      this.currentUserSubject.next(user);
    }
  }

  // ─── Connexion ────────────────────────────────────
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.saveSession(response))
    );
  }

  // ─── Inscription ──────────────────────────────────
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.saveSession(response))
    );
  }

  // ─── Deconnexion ──────────────────────────────────
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // ─── Sauvegarder la session ───────────────────────
  private saveSession(response: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', response.token);
      const user: User = {
        email: response.email,
        nom: response.nom,
        prenom: response.prenom,
        role: response.role
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    const user: User = {
      email: response.email,
      nom: response.nom,
      prenom: response.prenom,
      role: response.role
    };
    this.currentUserSubject.next(user);
  }

  // ─── Recuperer le token ───────────────────────────
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
  getRole(): string | null {
  const user = this.getCurrentUser();
  return user ? user.role : null;
}

  // ─── Verifier si connecte ─────────────────────────
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // ─── Recuperer l'utilisateur courant ─────────────
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // ─── Recuperer depuis localStorage ───────────────
  private getUserFromStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }
}

