// ─────────────────────────────────────────────
// src/app/pages/employees/employee-list/employee-list.component.ts
// ─────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/all-models';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filtered: Employee[] = [];
  searchTerm = '';
  filterDept = '';
  filterNiveau = '';
  loading = true;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => { this.employees = data; this.filtered = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  applyFilters(): void {
    this.filtered = this.employees.filter(e => {
      const matchSearch = !this.searchTerm ||
        `${e.nom} ${e.prenom} ${e.email} ${e.poste}`.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchDept = !this.filterDept || e.departement === this.filterDept;
      const matchNiveau = !this.filterNiveau || e.niveauExperience === this.filterNiveau;
      return matchSearch && matchDept && matchNiveau;
    });
  }

  getDepartements(): string[] {
    return [...new Set(this.employees.map(e => e.departement))];
  }

  delete(id: string): void {
    if (!confirm('Confirmer la suppression de cet employé ?')) return;
    this.employeeService.delete(id!).subscribe({
      next: () => this.load()
    });
  }

  getInitials(emp: Employee): string {
    return (emp.prenom[0] + emp.nom[0]).toUpperCase();
  }
}

