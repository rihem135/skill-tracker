// ─────────────────────────────────────────────
// src/app/pages/trainings/training-list/training-list.component.ts
// ─────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainingService } from '../../../core/services/training.service';
import { SkillService } from '../../../core/services/skill.service';
import { Training, Skill } from '../../../core/models/all-models';

@Component({
  selector: 'app-training-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];
  skills: Skill[] = [];
  showForm = false;
  saving = false;
  loading = true;
  filterGratuit = '';

  newTraining: Partial<Training> = {
    titre: '', description: '', plateforme: 'Udemy', url: '',
    niveau: 'intermediaire', dureeHeures: 10, rating: 4.0,
    gratuit: false, skillsCiblesIds: []
  };

  constructor(private trainingService: TrainingService, private skillService: SkillService) {}

  ngOnInit(): void {
    this.load();
    this.skillService.getAll().subscribe({ next: (d) => this.skills = d });
  }

  load(): void {
    this.trainingService.getAll().subscribe({
      next: (data) => { this.trainings = data; this.loading = false; }
    });
  }

  toggleSkill(skillId: string): void {
    if (!this.newTraining.skillsCiblesIds) this.newTraining.skillsCiblesIds = [];
    const idx = this.newTraining.skillsCiblesIds.indexOf(skillId);
    if (idx >= 0) this.newTraining.skillsCiblesIds.splice(idx, 1);
    else this.newTraining.skillsCiblesIds.push(skillId);
  }

  isSkillSelected(skillId: string): boolean {
    return !!this.newTraining.skillsCiblesIds?.includes(skillId);
  }

  save(): void {
    this.saving = true;
    this.trainingService.create(this.newTraining as Training).subscribe({
      next: () => { this.load(); this.showForm = false; this.saving = false; this.resetForm(); }
    });
  }

  delete(id: string): void {
    if (!confirm('Supprimer cette formation ?')) return;
    this.trainingService.delete(id!).subscribe({ next: () => this.load() });
  }

  resetForm(): void {
    this.newTraining = {
      titre: '', description: '', plateforme: 'Udemy', url: '',
      niveau: 'intermediaire', dureeHeures: 10, rating: 4.0,
      gratuit: false, skillsCiblesIds: []
    };
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }
}

