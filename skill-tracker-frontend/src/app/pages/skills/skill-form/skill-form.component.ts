// ─────────────────────────────────────────────
// src/app/pages/skills/skill-form/skill-form.component.ts
// ─────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillService } from '../../../core/services/skill.service';
import { Skill } from '../../../core/models/all-models';

@Component({
  selector: 'app-skill-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {
  isEdit = false;
  skillId: string | null = null;
  loading = false;
  saving = false;
  successMessage = '';
  errorMessage = '';

  skill: Partial<Skill> = {
    nom: '', categorie: 'technique', description: '', niveauRequis: 'intermediaire', technologiesAssociees: []
  };
  techInput = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.skillId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.skillId;
    if (this.isEdit) this.loadSkill();
  }

  loadSkill(): void {
    this.loading = true;
    this.skillService.getById(this.skillId!).subscribe({
      next: (data) => { this.skill = { ...data }; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  addTech(): void {
    if (!this.techInput.trim()) return;
    if (!this.skill.technologiesAssociees) this.skill.technologiesAssociees = [];
    this.skill.technologiesAssociees.push(this.techInput.trim());
    this.techInput = '';
  }

  removeTech(i: number): void {
    this.skill.technologiesAssociees?.splice(i, 1);
  }

  onSubmit(): void {
    this.saving = true;
    this.errorMessage = '';

    const obs = this.isEdit
      ? this.skillService.update(this.skillId!, this.skill as Skill)
      : this.skillService.create(this.skill as Skill);

    obs.subscribe({
      next: () => {
        this.successMessage = this.isEdit ? 'Compétence modifiée avec succès !' : 'Compétence créée avec succès !';
        setTimeout(() => this.router.navigate(['/skills']), 1200);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
        this.saving = false;
      }
    });
  }
}

