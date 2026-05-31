import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TrainingService } from '../../core/services/training.service';
import { Training } from '../../core/models/training.model';

@Component({
  selector: 'app-my-training',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-training.component.html',
  styleUrls: ['./my-training.component.css']
})
export class MyTrainingComponent implements OnInit {

  trainings: Training[] = [];
  selectedTrainings: Training[] = [];

  loading = false;
  showPopup = false;

  searchTerm: string = '';

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.loadTrainings();
  }

  // 📚 LOAD ALL TRAININGS
  loadTrainings(): void {

    this.loading = true;

    this.trainingService.getAll().subscribe({

      next: (data) => {
        this.trainings = data || [];
        this.loading = false;
      },

      error: (err) => {
        console.error("LOAD ERROR:", err);
        this.loading = false;
      }

    });
  }

  // 🔍 FILTER
  filteredTrainings(): Training[] {

    return this.trainings.filter(t =>
      t.titre?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      t.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      t.plateforme?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // ⭐ SELECT / UNSELECT
  toggleTraining(training: Training): void {

    const index = this.selectedTrainings.findIndex(t => t.id === training.id);

    if (index !== -1) {
      this.selectedTrainings.splice(index, 1);
    } else {
      this.selectedTrainings.push(training);
    }
  }

  // ⭐ CHECK
  isSelected(training: Training): boolean {
    return this.selectedTrainings.some(t => t.id === training.id);
  }

  // 💾 SAVE TRAININGS
  saveTrainings(): void {

    const ids = this.selectedTrainings
      .map(t => t.id)
      .filter(Boolean);

    console.log("🚀 IDS SENT =", ids);

    this.trainingService.saveUserTrainings(ids).subscribe({

      next: () => {
        console.log("✅ SAVE OK");
        this.showPopup = true;
      },

      error: (err) => {
  console.log("STATUS =", err.status);
  console.log("ERROR BODY =", err.error);
  console.log("FULL ERROR =", err);
                     }
    });
  }

  // ❌ CLOSE POPUP
  closePopup(): void {
    this.showPopup = false;
  }

  trackById(index: number, item: Training): string {
    return item.id;
  }
}