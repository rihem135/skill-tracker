import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/all-models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

  this.loading = true;

  this.userService.getAllUsers().subscribe({
    next: (data) => {

      this.users = data.filter(
        user => user.role?.toUpperCase() !== 'ADMIN'
      );

      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
    }
  });

}

  deleteUser(user: User): void {

    const confirmed = confirm(
      `Voulez-vous supprimer ${user.prenom} ${user.nom} ?`
    );

    if (!confirmed) {
      return;
    }

    this.userService.deleteUser(user.id!).subscribe({

      next: () => {

        this.users =
          this.users.filter(
            u => u.id !== user.id
          );

        alert('✅ Utilisateur supprimé');

      },

      error: (err) => {
        console.error(err);
        alert('❌ Erreur lors de la suppression');
      }

    });

  }
}