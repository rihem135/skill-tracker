import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-sidebar-user',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar-user">

      <div class="sidebar-logo">
        <div class="logo-icon">SC</div>
        <span class="logo-text">SkillCareer</span>
      </div>

      <nav class="sidebar-nav">

        <a class="nav-item" routerLink="/progress" routerLinkActive="active">
          <span>🏠</span><span>Dashboard</span>
        </a>

    

        <a class="nav-item" routerLink="/profile" routerLinkActive="active">
          <span>👤</span><span>Mon profil</span>
        </a>

        <a class="nav-item" routerLink="/my-skills" routerLinkActive="active">
          <span>🎯</span><span>Compétences</span>
        </a>

        <a class="nav-item" routerLink="/my-training" routerLinkActive="active">
          <span>📚</span><span>Formations</span>
        </a>

        

        

      </nav>

      <div class="sidebar-footer" *ngIf="currentUser">
        <div class="user-avatar">{{ getInitials() }}</div>

        <div class="user-info">
  <span class="user-name">
    {{ currentUser.prenom }} {{ currentUser.nom }}
  </span>

  <span class="user-role">
    {{ currentUser.role }}
  </span>
</div>

        <button (click)="logout()">⏏</button>
      </div>

    </aside>
  `,
styleUrls: ['./sidebar-user.component.css']})
export class SidebarUserComponent {

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