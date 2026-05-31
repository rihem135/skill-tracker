// ─────────────────────────────────────────────
// src/app/pages/recommendations/recommendation-list/recommendation-list.component.ts
// ─────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecommendationService } from '../../../core/services/recommendation.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee, RecommendationDTO } from '../../../core/models/all-models';

@Component({
  selector: 'app-recommendation-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recommendation-list.component.html',
  styleUrls: ['./recommendation-list.component.css']
})
export class RecommendationListComponent implements OnInit {
  employee: Employee | null = null;
  recommendations: RecommendationDTO[] = [];
  loading = true;
  generating = false;
  employeeId = '';

  constructor(
    private route: ActivatedRoute,
    private recoService: RecommendationService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('employeeId')!;
    this.employeeService.getById(this.employeeId).subscribe({
      next: (emp) => { this.employee = emp; this.generate(); }
    });
  }

  generate(): void {
    this.generating = true;
    this.recoService.generer(this.employeeId).subscribe({
      next: (data) => { this.recommendations = data; this.generating = false; this.loading = false; },
      error: () => { this.generating = false; this.loading = false; }
    });
  }

  getScoreClass(score: number): string {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  }

  getScoreBg(score: number): string {
    if (score >= 80) return '#d1fae5';
    if (score >= 60) return '#fef3c7';
    return '#fee2e2';
  }

  getScoreColor(score: number): string {
    if (score >= 80) return '#059669';
    if (score >= 60) return '#d97706';
    return '#dc2626';
  }
}

