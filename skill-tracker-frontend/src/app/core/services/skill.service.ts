import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/all-models';

@Injectable({ providedIn: 'root' })
export class SkillService {

  private apiUrl = '/api/skills';

  constructor(private http: HttpClient) {}

  // ✅ GET ALL (compatible avec ou sans paramètres)
  getAll(categorie?: string, search?: string): Observable<Skill[]> {

    let params = new HttpParams();

    if (categorie) {
      params = params.set('categorie', categorie);
    }

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Skill[]>(this.apiUrl, { params });
  }

  // ✅ GET BY ID
  getById(id: string): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  // ✅ CREATE
  create(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill);
  }

  // ✅ UPDATE
  update(id: string, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill);
  }

  // ✅ DELETE
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ SAVE USER SKILLS
  saveUserSkills(ids: string[]): Observable<any> {
    return this.http.post('/api/user/skills', ids);
  }
}