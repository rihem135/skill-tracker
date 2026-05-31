import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainingService } from '../../core/services/training.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-learning-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class LearningDashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  loading = false;

  userTrainings: any[] = [];

  private intervals: { [key: string]: any } = {};

  // ✅ POPUP
  showPopup = false;
  popupMessage = '';

  // =========================
  // 📊 CHARTS (AJOUT UNIQUEMENT)
  // =========================
  @ViewChild('statusChart') statusChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('progressChart') progressChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('hoursChart') hoursChartRef!: ElementRef<HTMLCanvasElement>;


  
  private charts: Chart<any, any, any>[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.loadTrainings();
  }

  ngAfterViewInit(): void {
    // safe init (DOM ready)
  }

  // 📚 LOAD TRAININGS (INCHANGÉ)
  loadTrainings(): void {

    this.loading = true;

    this.trainingService.getUserTrainings().subscribe({

      next: (ids: string[]) => {

        this.trainingService.getAll().subscribe({

          next: (all: any[]) => {

            const newTrainings = (all ?? [])
              .filter(t => ids.includes(t.id || (t as any)._id))
              .map(t => {

                const existing = this.userTrainings.find(x => x.id === t.id);

                return {
                  ...t,
                  timeSpentSeconds: existing?.timeSpentSeconds ?? 0,
                  progress: existing?.progress ?? 0,
                  status: existing?.status ?? 'DEBUT',
                  isRunning: false
                };
              });

            const map = new Map();

            this.userTrainings.forEach(t => map.set(t.id, t));
            newTrainings.forEach(t => map.set(t.id, t));

            this.userTrainings = Array.from(map.values());

            this.loading = false;

            // 🔥 UPDATE CHARTS ICI
            setTimeout(() => this.initCharts(), 0);
          },

          error: (err) => {
            console.error("getAll error", err);
            this.loading = false;
          }

        });

      },

      error: (err) => {
        console.error("getUserTrainings error", err);
        this.loading = false;
      }

    });
  }

  // ▶ TIMER START / PAUSE (INCHANGÉ)
  toggleTimer(training: any): void {

    training.isRunning = !training.isRunning;

    const id = training.id;
    const totalSeconds = training.dureeHeures * 3600;

    if (training.isRunning) {

      this.intervals[id] = setInterval(() => {

        training.timeSpentSeconds++;

        training.progress =
          Math.min((training.timeSpentSeconds / totalSeconds) * 100, 100);

        if (training.progress < 40) {
          training.status = 'DEBUT';
        } else if (training.progress < 100) {
          training.status = 'INTERMEDIAIRE';
        } else {
          training.status = 'COMPLET';

          this.completeTraining(training);
          this.toggleTimer(training);
        }

      }, 1000);

    } else {
      clearInterval(this.intervals[id]);
    }
  }

  // 🎉 FIN FORMATION (INCHANGÉ)
  completeTraining(training: any): void {
    this.popupMessage = `🎉 Formation terminée : ${training.titre}`;
    this.showPopup = true;

    // 🔥 refresh charts
    this.initCharts();
  }

  // 💾 SAVE PROGRESS (INCHANGÉ)
  saveProgress(training: any): void {

    const payload = {
      trainingId: training.id,
      timeSpentSeconds: training.timeSpentSeconds,
      progress: training.progress,
      status: training.status
    };

    this.trainingService.saveProgress(payload).subscribe({

      next: () => {
        console.log("✅ Progress saved");
        alert("Progression sauvegardée !");
      },

      error: (err) => {
        console.error("❌ Save error:", err);
        alert("Erreur sauvegarde progression");
      }

    });
  }

  // =========================
  // 📊 CHARTS ONLY (NEW PART)
  // =========================

  initCharts(): void {

    this.destroyCharts();

    if (!this.userTrainings.length) return;

    const labels = this.userTrainings.map(t =>
      t.titre?.length > 18 ? t.titre.slice(0, 16) + '…' : (t.titre || '—')
    );

    // ======================
    // DONUT STATUS
    // ======================
    if (this.statusChartRef?.nativeElement) {

      this.charts.push(
        new Chart(this.statusChartRef.nativeElement, {
          type: 'doughnut',
          data: {
            labels: ['Complet', 'Intermédiaire', 'Début'],
            datasets: [{
              data: [
                this.userTrainings.filter(t => t.status === 'COMPLET').length,
                this.userTrainings.filter(t => t.status === 'INTERMEDIAIRE').length,
                this.userTrainings.filter(t => t.status === 'DEBUT').length
              ],
              backgroundColor: ['#1D9E75', '#378ADD', '#888780'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
              legend: { display: false }
            }
          }
        }) as any
      );
    }

    // ======================
    // PROGRESS BAR
    // ======================
    if (this.progressChartRef?.nativeElement) {

      this.charts.push(
        new Chart(this.progressChartRef.nativeElement, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Progression %',
              data: this.userTrainings.map(t => Math.round(t.progress || 0)),
              backgroundColor: this.userTrainings.map(t =>
                t.progress >= 100 ? '#1D9E75' :
                t.progress >= 40 ? '#378ADD' : '#888780'
              ),
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, max: 100 }
            }
          }
        }) as any
      );
    }

    // ======================
    // HOURS CHART
    // ======================
    if (this.hoursChartRef?.nativeElement) {

      this.charts.push(
        new Chart(this.hoursChartRef.nativeElement, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Temps passé (min)',
                data: this.userTrainings.map(t =>
                  Math.round((t.timeSpentSeconds || 0) / 60)
                ),
                backgroundColor: '#3266ad'
              },
              {
                label: 'Durée totale (min)',
                data: this.userTrainings.map(t =>
                  (t.dureeHeures || 0) * 60
                ),
                backgroundColor: '#9FE1CB'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        }) as any
      );
    }
  }

  destroyCharts(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
  }

  // 💥 POPUP
  closePopup(): void {
    this.showPopup = false;
  }

  ngOnDestroy(): void {
    Object.values(this.intervals).forEach(clearInterval);
    this.destroyCharts();
  }
}