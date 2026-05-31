import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkillService } from '../../core/services/skill-user.service';
import { Skill } from '../../core/models/skill.model';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.css']
})
export class MySkillsComponent implements OnInit {

  skills: Skill[] = [];
  selectedSkills: Skill[] = [];

  loading = false;

  // 🔍 SEARCH
  searchTerm: string = '';

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  // 📥 LOAD SKILLS
  loadSkills(): void {
    this.loading = true;

    this.skillService.getAllSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("ERROR LOAD:", err);
        this.loading = false;
      }
    });
  }

  // 🔍 FILTER SKILLS
  filteredSkills(): Skill[] {

    return this.skills.filter(skill =>

      skill.nom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

      skill.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

      skill.categorie?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

      skill.niveauRequis?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())

    );
  }

  // ⭐ SELECT / UNSELECT
  toggleSkill(skill: Skill): void {

    const exists = this.selectedSkills.some(s => s.id === skill.id);

    if (exists) {
      this.selectedSkills =
        this.selectedSkills.filter(s => s.id !== skill.id);
    } else {
      this.selectedSkills.push(skill);
    }
  }

  // ⭐ CHECK SELECTED
  isSelected(skill: Skill): boolean {
    return this.selectedSkills.some(s => s.id === skill.id);
  }

  // ❌ REMOVE
  removeSkill(skill: Skill): void {
    this.selectedSkills =
      this.selectedSkills.filter(s => s.id !== skill.id);
  }

  // 💾 SAVE
  saveSkills(): void {

    const ids: string[] = this.selectedSkills
      .map(s => s.id)
      .filter((id): id is string => id !== undefined);

    console.log("Skills à sauvegarder:", ids);

    this.skillService.saveUserSkills(ids).subscribe({
      next: () => {
        alert("Compétences sauvegardées !");
      },
      error: (err) => {
        console.error("SAVE ERROR:", err);
      }
    });
  }
}