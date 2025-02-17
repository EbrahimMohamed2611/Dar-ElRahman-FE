import { Routes } from '@angular/router';
import {AppRoutes} from "../../constants/app-routes";

export const HOME_CHILDREN_ROUTES: Routes = [
  {
    path: AppRoutes.STUDENT,
    loadComponent: () =>
      import('./student/student.component').then(
        (c) => c.StudentComponent,
      ),
  },
  {
    path: AppRoutes.TEACHER,
    loadComponent: () =>
      import('./teacher/teacher.component').then(
        (c) => c.TeacherComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.STUDENT,
  },
];
