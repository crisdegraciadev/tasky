import { Route } from '@angular/router';
import { Routes } from './shared/consts/routes.const';

export const APP_ROUTES: Route[] = [
  {
    path: Routes.Tasks.BASE,
    loadChildren: () =>
      import('./tasks/features/tasks-scheduler.routes').then(
        (mod) => mod.TASKS_ROUTES,
      ),
  },
];
