import { Route } from '@angular/router';
import { Routes } from './shared/consts/routes.const';
import { isAuthenticatedGuard } from '@shared/guards/auth.guard';

export const APP_ROUTES: Route[] = [
  {
    path: Routes.TASKS,
    canActivate: [isAuthenticatedGuard()],
    loadChildren: () =>
      import('./tasks/features/tasks-scheduler.routes').then(
        (mod) => mod.TASKS_ROUTES,
      ),
  },
  {
    path: Routes.AUTH,
    loadChildren: () =>
      import('./auth/features/auth.routes').then((mod) => mod.AUTH_ROUTES),
  },
];
