import { Routes } from '@angular/router';
import { AppRoutes } from './constants/app-routes';
import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';

export const APP_ROUTES: Routes = [
  {
    path: AppRoutes.REGISTRATION,
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./registration/registration.component').then(
        (c) => c.RegistrationComponent
      ),
  },
  {
    path: AppRoutes.LOGIN,
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: AppRoutes.STUDENT,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/student/student.component').then(
        (c) => c.StudentComponent
      ),
  },
  {
    path: AppRoutes.TEACHER,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/teacher/teacher.component').then(
        (c) => c.TeacherComponent
      ),
  },
  {
    path: '',
    redirectTo: AppRoutes.LOGIN,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: AppRoutes.LOGIN, pathMatch: 'full' },
];
