import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from '@layout/ui/navbar/navbar.component';
import { SidebarComponent } from '@layout/ui/sidebar/sidebar.component';
import { AppRoute } from '@shared/types/routes';
import { Routes } from '@shared/consts/routes.const';
import { TaskCreateDialogComponent } from '@layout/ui/task-create-dialog/task-create-dialog.component';
import { AuthService } from '@shared/data-access/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    NavbarComponent,
    SidebarComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  authService = inject(AuthService);

  dialog = inject(MatDialog);

  private location = inject(Location);
  private router = inject(Router);

  currentLocation$ = new BehaviorSubject<AppRoute>(Routes.TASKS);

  ngOnInit(): void {
    this.setCurrentLocation();
  }

  private setCurrentLocation() {
    const currentLocation = this.location.path().substring(1);
    if (this.isValidLocation(currentLocation)) {
      this.currentLocation$.next(currentLocation);
    }
  }

  private isValidLocation(location: string): location is AppRoute {
    const validRoutes = new Set([
      'dashboard',
      'tasks',
      'reminders',
      'settings',
    ]);

    return validRoutes.has(location);
  }

  onLocationSelected(route: AppRoute) {
    this.router.navigateByUrl(route);
  }

  onTaskCreation() {
    this.dialog.open(TaskCreateDialogComponent);
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
