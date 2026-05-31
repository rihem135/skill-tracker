import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './core/services/auth.service';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SidebarUserComponent } from './shared/sidebar-user/sidebar-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    SidebarUserComponent
  ],
  template: `
    <div class="app-wrapper">

      <!-- Sidebar ADMIN -->
      <app-sidebar
        *ngIf="isLoggedIn() && isAdmin()">
      </app-sidebar>

      <!-- Sidebar USER -->
      <app-sidebar-user
        *ngIf="isLoggedIn() && !isAdmin()">
      </app-sidebar-user>

      <div class="content-area" [class.with-sidebar]="isLoggedIn()">
        <router-outlet></router-outlet>
      </div>

    </div>
  `,
  styles: [`
    .app-wrapper {
      display: flex;
      min-height: 100vh;
    }

    .content-area {
      flex: 1;
      background: #f9fafb;
    }

    .content-area.with-sidebar {
      margin-left: 240px;
    }
  `]
})
export class AppComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }
}