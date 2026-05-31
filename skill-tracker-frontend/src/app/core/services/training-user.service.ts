import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingUser {

  private apiUrl = '/api/trainings';

  constructor(private http: HttpClient) {}

  // 📚 ALL TRAININGS
  getAllTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.apiUrl);
  }

  // 💾 SAVE USER SELECTION
  saveUserTrainings(ids: string[]) {
    return this.http.post(
      '/api/user/trainings',
      ids
    );
  }

  // 👤 GET USER TRAININGS IDS
  getUserTrainings(): Observable<string[]> {
    return this.http.get<string[]>(
      '/api/user/trainings'
    );
  }
}