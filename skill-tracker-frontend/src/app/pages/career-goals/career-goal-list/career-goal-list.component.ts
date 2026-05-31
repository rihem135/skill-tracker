// ─────────────────────────────────────────────
// src/app/pages/career-goals/career-goal-list/career-goal-list.component.ts
// ─────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CareerGoalService } from '../../../core/services/career-goal.service';
import { CareerGoal } from '../../../core/models/all-models';

@Component({
  selector: 'app-career-goal-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './career-goal-list.component.html',
  styleUrls: ['./career-goal-list.component.css']
})
export class CareerGoalListComponent implements OnInit {
  goals: CareerGoal[] = [];
  loading = true;

  constructor(private goalService: CareerGoalService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.goalService.getAll().subscribe({
      next: (data) => { this.goals = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  delete(id: string): void {
    if (!confirm('Supprimer cet objectif de carrière ?')) return;
    this.goalService.delete(id!).subscribe({ next: () => this.load() });
  }

  getStatusClass(status: string): string {
    const m: any = { en_cours: 'badge-info', atteint: 'badge-success', abandonne: 'badge-danger' };
    return m[status] || 'badge-secondary';
  }
}

