import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';
import { EmployeeService } from '../../core/services/employee.service';
import { DashboardStats, Employee } from '../../core/models/all-models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: DashboardStats | null = null;
  recentEmployees: Employee[] = [];
  loading = true;

  constructor(
    private dashboardService: DashboardService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 🔐 ROLE CHECK (ADMIN ONLY)
    const role = localStorage.getItem('role');

    if (role !== 'ADMIN') {
      this.router.navigate(['/profile']);
      return;
    }

    this.loadStats();
    this.loadEmployees();
  }

  // 📊 Stats
  loadStats(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // 👥 Employees
  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.recentEmployees = data.slice(0, 5);
      },
      error: () => {
        this.recentEmployees = [];
      }
    });
  }

  // 🏷 Badge skill level
  getBadgeClass(niveau: string): string {
    const map: any = {
      junior: 'badge-junior',
      mid: 'badge-mid',
      senior: 'badge-senior'
    };
    return map[niveau] || 'badge-junior';
  }

  // 👤 Initiales sécurisées
  getInitials(emp: Employee): string {
    return (
      (emp.prenom?.[0] || '') +
      (emp.nom?.[0] || '')
    ).toUpperCase();
  }

  // 🎨 Avatar colors
  getAvatarColor(i: number): string {
    const colors = [
      '#dbeafe',
      '#d1fae5',
      '#fef3c7',
      '#ede9fe',
      '#fee2e2'
    ];
    return colors[i % colors.length];
  }

  getAvatarTextColor(i: number): string {
    const colors = [
      '#1d4ed8',
      '#065f46',
      '#92400e',
      '#5b21b6',
      '#991b1b'
    ];
    return colors[i % colors.length];
  }
}