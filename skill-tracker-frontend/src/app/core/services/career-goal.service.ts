import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CareerGoal } from '../models/all-models';

@Injectable({ providedIn: 'root' })
export class CareerGoalService {
  private apiUrl = '/api/career-goals';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CareerGoal[]> {
    return this.http.get<CareerGoal[]>(this.apiUrl);
  }

  getByEmployee(employeeId: string): Observable<CareerGoal[]> {
    return this.http.get<CareerGoal[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  create(employeeId: string, goal: Partial<CareerGoal>): Observable<CareerGoal> {
    return this.http.post<CareerGoal>(`${this.apiUrl}/employee/${employeeId}`, goal);
  }

  updateProgression(id: string, progression: number): Observable<CareerGoal> {
    return this.http.patch<CareerGoal>(`${this.apiUrl}/${id}/progression`, { progression });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}