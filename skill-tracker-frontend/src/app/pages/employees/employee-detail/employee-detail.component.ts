// ─────────────────────────────────────────────
// src/app/pages/employees/employee-detail/employee-detail.component.ts
// ─────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { RecommendationService } from '../../../core/services/recommendation.service';
import { CareerGoalService } from '../../../core/services/career-goal.service';
import { Employee, RecommendationDTO, CareerGoal } from '../../../core/models/all-models';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  recommendations: RecommendationDTO[] = [];
  goals: CareerGoal[] = [];
  loading = true;
  activeTab = 'profil';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private recoService: RecommendationService,
    private goalService: CareerGoalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getById(id).subscribe({
      next: (emp) => {
        this.employee = emp;
        this.loading = false;
        this.recoService.generer(id).subscribe({ next: (r) => this.recommendations = r });
        this.goalService.getByEmployee(id).subscribe({ next: (g) => this.goals = g });
      },
      error: () => { this.loading = false; }
    });
  }

  getInitials(): string {
    if (!this.employee) return '?';
    return (this.employee.prenom[0] + this.employee.nom[0]).toUpperCase();
  }

  getNiveauStars(niveau: number): string {
    return '★'.repeat(niveau) + '☆'.repeat(5 - niveau);
  }

  getScoreColor(score: number): string {
    if (score >= 80) return '#059669';
    if (score >= 60) return '#d97706';
    return '#dc2626';
  }
}

