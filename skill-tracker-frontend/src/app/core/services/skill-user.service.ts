import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = '/api/skills';

  constructor(private http: HttpClient) {}

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }
  saveUserSkills(skillIds: string[]) {

  return this.http.post(
    '/api/user/skills/save',
    { skillIds }
  );
}
getMySkills(): Observable<Skill[]> {
  return this.http.get<Skill[]>(
    '/api/skills/my-skills'
  );
}
}