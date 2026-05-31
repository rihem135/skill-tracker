import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,],
  template: `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">SC</div>
        <span class="logo-text">SkillCareer</span>
      </div>

      <nav class="sidebar-nav">
        <a class="nav-item" routerLink="/dashboard" routerLinkActive="active">
          <span class="nav-icon">⊞</span><span>Dashboard</span>
        </a>
        <a class="nav-item" routerLink="/employees" routerLinkActive="active">
          <span class="nav-icon">👥</span><span>Employés</span>
        </a>
        <a class="nav-item" routerLink="/skills" routerLinkActive="active">
          <span class="nav-icon">🎯</span><span>Compétences</span>
        </a>
        <a class="nav-item" routerLink="/trainings" routerLinkActive="active">
          <span class="nav-icon">📚</span><span>Formations</span>
        </a>
      </nav>

      <div class="sidebar-footer" *ngIf="currentUser">
        <div class="user-avatar">{{ getInitials() }}</div>
        <div class="user-info">
          <span class="user-name">{{ currentUser.prenom }} {{ currentUser.nom }}</span>
          <span class="user-role">{{ currentUser.role }}</span>
        </div>
        <button class="logout-btn" (click)="logout()" title="Déconnexion">⏏</button>
      </div>
    </aside>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  currentUser: ReturnType<AuthService['getCurrentUser']> = null;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.getCurrentUser();
  }

  getInitials(): string {
    if (!this.currentUser) return '?';
    return (this.currentUser.prenom[0] + this.currentUser.nom[0]).toUpperCase();
  }

  logout(): void { this.authService.logout(); }
}

