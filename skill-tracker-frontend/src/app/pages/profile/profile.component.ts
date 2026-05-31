import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillService } from '../../core/services/skill-user.service';
import { TrainingService } from '../../core/services/training.service';
import { AuthService } from '../../core/services/auth.service';

import { Skill } from '../../core/models/skill.model';
import { Training } from '../../core/models/training.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],   // ✅ IMPORTANT FIX
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;

  userSkills: Skill[] = [];
  userTrainings: Training[] = [];
  recommendations: any[] = [];

  loading = false;

  constructor(
    private skillService: SkillService,
    private trainingService: TrainingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadSkills();
    this.loadUserTrainings();
  }

  // 👤 USER
  loadUser(): void {
    this.user = this.authService.getCurrentUser();
    console.log("USER:", this.user);
  }

  // ⭐ SKILLS
  loadSkills(): void {
    this.skillService.getMySkills().subscribe({
      next: (data: Skill[]) => {
        this.userSkills = data ?? [];
        console.log("SKILLS:", this.userSkills);
      },
      error: (err) => {
        console.error("Skills error:", err);
        this.userSkills = [];
      }
    });
  }

  // 📚 TRAININGS
  loadUserTrainings(): void {

    this.trainingService.getUserTrainings().subscribe({
      next: (ids: string[]) => {

        console.log("TRAINING IDS:", ids);

        this.trainingService.getAll().subscribe({
          next: (all: Training[]) => {

            this.userTrainings = (all ?? []).filter(t =>
              ids.includes(t.id || (t as any)._id)
            );

            console.log("USER TRAININGS:", this.userTrainings);

          },
          error: (err) => {
            console.error("ALL TRAININGS ERROR:", err);
            this.userTrainings = [];
          }
        });

      },
      error: (err) => {
        console.error("USER TRAININGS IDS ERROR:", err);
        this.userTrainings = [];
      }
    });
  }
}