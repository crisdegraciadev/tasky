import { Route } from '@angular/router';
import { Routes } from 'src/app/shared/consts/routes.const';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Route[] = [
  { path: Routes.Dashboard.BASE, component: DashboardComponent },
];
