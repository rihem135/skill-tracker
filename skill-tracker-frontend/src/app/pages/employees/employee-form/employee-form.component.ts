// ─────────────────────────────────────────────
// src/app/pages/employees/employee-form/employee-form.component.ts
// ─────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { SkillService } from '../../../core/services/skill.service';
import { Employee, Skill, CompetenceEntry } from '../../../core/models/all-models';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  isEdit = false;
  employeeId: string | null = null;
  loading = false;
  saving = false;
  skills: Skill[] = [];
  successMessage = '';
  errorMessage = '';

  employee: Partial<Employee> = {
    nom: '', prenom: '', email: '', telephone: '',
    poste: '', departement: '', niveauExperience: 'junior',
    competences: [], objectifsCarriereIds: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.employeeId;
    this.loadSkills();
    if (this.isEdit) this.loadEmployee();
  }

  loadSkills(): void {
    this.skillService.getAll().subscribe({ next: (data) => { this.skills = data; } });
  }

  loadEmployee(): void {
    this.loading = true;
    this.employeeService.getById(this.employeeId!).subscribe({
      next: (data) => { this.employee = { ...data }; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  addCompetence(): void {
    if (!this.employee.competences) this.employee.competences = [];
    this.employee.competences.push({
      skillId: '', nom: '', niveau: 1, dateAcquisition: '', commentaire: ''
    });
  }

  removeCompetence(index: number): void {
    this.employee.competences?.splice(index, 1);
  }

  onSkillChange(comp: CompetenceEntry, skillId: string): void {
    const skill = this.skills.find(s => s.id === skillId);
    if (skill) { comp.skillId = skill.id!; comp.nom = skill.nom; }
  }

  onSubmit(): void {
    this.saving = true;
    this.errorMessage = '';

    const obs = this.isEdit
      ? this.employeeService.update(this.employeeId!, this.employee)
      : this.employeeService.create(this.employee);

    obs.subscribe({
      next: () => {
        this.successMessage = this.isEdit ? 'Employé modifié avec succès !' : 'Employé créé avec succès !';
        setTimeout(() => this.router.navigate(['/employees']), 1200);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
        this.saving = false;
      }
    });
  }
}

