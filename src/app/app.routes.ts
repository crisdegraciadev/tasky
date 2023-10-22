import { Route } from '@angular/router';
import { Routes } from './shared/consts/routes.const';

export const APP_ROUTES: Route[] = [
  {
    path: Routes.Dashboard.BASE,
    loadChildren: () =>
      import('./dashboard/features/dashboard.routes').then(
        (mod) => mod.DASHBOARD_ROUTES,
      ),
  },
];
