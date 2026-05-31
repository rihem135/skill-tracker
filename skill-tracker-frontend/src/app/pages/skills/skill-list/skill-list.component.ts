// ─────────────────────────────────────────────
// src/app/pages/skills/skill-list/skill-list.component.ts
// ─────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../../../core/services/skill.service';
import { Skill } from '../../../core/models/all-models';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
  skills: Skill[] = [];
  showForm = false;
  editingSkill: Skill | null = null;
  saving = false;
  loading = true;

  newSkill: Partial<Skill> = {
    nom: '', categorie: 'technique', description: '', niveauRequis: 'intermediaire', technologiesAssociees: []
  };
  techInput = '';

  constructor(private skillService: SkillService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.skillService.getAll().subscribe({
      next: (data) => { this.skills = data; this.loading = false; }
    });
  }

  openAdd(): void { this.showForm = true; this.editingSkill = null; }

  openEdit(skill: Skill): void {
    this.editingSkill = skill;
    this.newSkill = { ...skill };
    this.showForm = true;
  }

  addTech(): void {
    if (!this.techInput.trim()) return;
    if (!this.newSkill.technologiesAssociees) this.newSkill.technologiesAssociees = [];
    this.newSkill.technologiesAssociees.push(this.techInput.trim());
    this.techInput = '';
  }

  removeTech(i: number): void {
    this.newSkill.technologiesAssociees?.splice(i, 1);
  }

  save(): void {
    this.saving = true;
    const obs = this.editingSkill
      ? this.skillService.update(this.editingSkill.id!, this.newSkill as Skill)
      : this.skillService.create(this.newSkill as Skill);

    obs.subscribe({
      next: () => { this.load(); this.showForm = false; this.saving = false; this.resetForm(); }
    });
  }

  delete(id: string): void {
    if (!confirm('Supprimer cette compétence ?')) return;
    this.skillService.delete(id).subscribe({ next: () => this.load() });
  }

  resetForm(): void {
    this.newSkill = { nom: '', categorie: 'technique', description: '', niveauRequis: 'intermediaire', technologiesAssociees: [] };
    this.techInput = '';
    this.editingSkill = null;
  }

  getCatColor(cat: string): string {
    const m: any = { technique: '#dbeafe', soft_skill: '#d1fae5', management: '#ede9fe' };
    return m[cat] || '#f3f4f6';
  }

  getCatTextColor(cat: string): string {
    const m: any = { technique: '#1d4ed8', soft_skill: '#065f46', management: '#5b21b6' };
    return m[cat] || '#374151';
  }
}

