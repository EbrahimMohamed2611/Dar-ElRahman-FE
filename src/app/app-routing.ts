import { Routes } from '@angular/router';
import { AppRoutes } from './constants/app-routes';

export const APP_ROUTES: Routes = [
  {
    path: AppRoutes.BAGARAH_TO_HADEED,
    loadComponent: () =>
      import('./components/pages/bagarah-to-hadeed/bagarah-to-hadeed.component').then(
        (c) => c.BagarahToHadeedComponent
      )
  },
  {
    path: '',
    redirectTo: AppRoutes.BAGARAH_TO_HADEED,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: AppRoutes.BAGARAH_TO_HADEED , pathMatch: 'full' },
];
