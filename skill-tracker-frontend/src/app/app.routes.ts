import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MySkillsComponent } from './pages/my-skills/my-skills.component';
import { MyTrainingComponent } from './pages/my-training/my-training.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/progress',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./pages/progress/progress.component').then(m => m.LearningDashboardComponent),
    canActivate: [authGuard]
  },
  {
     path: 'my-skills',
     component: MySkillsComponent
  },
  {
     path: 'my-training',
     component: MyTrainingComponent
  },
  
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  
  {
    path: 'employees',
    loadComponent: () =>
      import('./pages/employees/employee-list/employee-list.component').then(m => m.EmployeeListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/new',
    loadComponent: () =>
      import('./pages/employees/employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/:id',
    loadComponent: () =>
      import('./pages/employees/employee-detail/employee-detail.component').then(m => m.EmployeeDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/:id/edit',
    loadComponent: () =>
      import('./pages/employees/employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./pages/skills/skill-list/skill-list.component').then(m => m.SkillListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'trainings',
    loadComponent: () =>
      import('./pages/trainings/training-list/training-list.component').then(m => m.TrainingListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./pages/progress/progress.component').then(m => m.LearningDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'recommendations/:employeeId',
    loadComponent: () =>
      import('./pages/recommendations/recommendation-list/recommendation-list.component').then(m => m.RecommendationListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'career-goals/:employeeId',
    loadComponent: () =>
      import('./pages/career-goals/career-goal-list/career-goal-list.component').then(m => m.CareerGoalListComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/progress'
  }
];

