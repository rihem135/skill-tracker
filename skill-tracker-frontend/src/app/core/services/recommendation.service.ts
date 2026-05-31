import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recommendation, RecommendationDTO } from '../models/all-models';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private apiUrl = '/api/recommendations';

  constructor(private http: HttpClient) {}

  generer(employeeId: string): Observable<RecommendationDTO[]> {
    return this.http.get<RecommendationDTO[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  getSaved(employeeId: string): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(`${this.apiUrl}/saved/${employeeId}`);
  }

  marquerVue(id: string): Observable<Recommendation> {
    return this.http.patch<Recommendation>(`${this.apiUrl}/${id}/vue`, {});
  }

  marquerSuivie(id: string): Observable<Recommendation> {
    return this.http.patch<Recommendation>(`${this.apiUrl}/${id}/suivie`, {});
  }
}