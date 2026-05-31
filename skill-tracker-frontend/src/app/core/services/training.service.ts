import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../models/training.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {

  private apiUrl = '/api/trainings';

  constructor(private http: HttpClient) {}

  getAll(skillId?: string, gratuit?: boolean): Observable<Training[]> {

    let params = new HttpParams();

    if (skillId) params = params.set('skillId', skillId);
    if (gratuit !== undefined) params = params.set('gratuit', String(gratuit));

    return this.http.get<Training[]>(this.apiUrl, { params });
  }

  getById(id: string): Observable<Training> {
    return this.http.get<Training>(`${this.apiUrl}/${id}`);
  }

  create(training: Training): Observable<Training> {
    return this.http.post<Training>(this.apiUrl, training);
  }

  update(id: string, training: Training): Observable<Training> {
    return this.http.put<Training>(`${this.apiUrl}/${id}`, training);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ⭐ SAVE USER TRAININGS (FIX JWT)
  saveUserTrainings(ids: string[]) {

    const token = localStorage.getItem('token');

    return this.http.post(
      '/api/user/trainings',
      ids,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  // 📥 GET USER TRAININGS (FIX JWT)
  getUserTrainings(): Observable<string[]> {

    const token = localStorage.getItem('token');

    return this.http.get<string[]>(
      '/api/user/trainings',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  // 💾 SAVE PROGRESS (CRITICAL FIX)
  saveProgress(data: any) {

  const token = localStorage.getItem('token');

  return this.http.post(
    '/api/user/training/progress',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
}