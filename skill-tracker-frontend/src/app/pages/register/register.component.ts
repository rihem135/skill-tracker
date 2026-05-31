import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom = '';
  prenom = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = 'EMPLOYEE';
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.nom || !this.prenom || !this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    this.authService.register({
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res) => {

  localStorage.setItem('token', res.token);
  localStorage.setItem('role', res.role);

  if (res.role === 'ADMIN') {
    this.router.navigate(['/dashboard']);
  } else {
    this.router.navigate(['/dashboard-user']);
  }

  this.loading = false;
},
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors de l\'inscription';
        this.loading = false;
      }
    });
  }
}
