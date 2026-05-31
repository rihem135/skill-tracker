import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DashboardStats } from '../models/all-models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = '/api/dashboard';

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {

    return this.http.get<DashboardStats>(
      `${this.apiUrl}/stats`
    );
  }

  getDashboardData(): Observable<any> {

    return this.http.get(
      '/api/dashboard'
    );
  }
}