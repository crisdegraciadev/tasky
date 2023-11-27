import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '@layout/ui/navbar/navbar.component';
import { SidebarComponent } from '@layout/ui/sidebar/sidebar.component';
import { Routes } from '@shared/consts/routes.const';
import { AuthService } from '@shared/data-access/auth.service';
import { ProfileService } from '@shared/data-access/profile.service';
import { TagService } from '@shared/data-access/tag.service';
import { TaskService } from '@shared/data-access/task.service';
import { AppRoute } from '@shared/types/routes';
import { TaskCreateDialogComponent } from '@shared/ui/task-create-dialog/task-create-dialog.component';
import { take } from 'rxjs';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  taskService = inject(TaskService);
  tagService = inject(TagService);

  dialog = inject(MatDialog);

  private location = inject(Location);
  private router = inject(Router);

  currentRoute = signal<AppRoute>(Routes.TASKS);

  ngOnInit(): void {
    this.setCurrentLocation();
  }

  private setCurrentLocation() {
    const currentRoute = this.location.path().substring(1);
    if (this.isValidLocation(currentRoute)) {
      this.currentRoute.update(() => currentRoute);
    }
  }

  private isValidLocation(location: string): location is AppRoute {
    const validRoutes = new Set(['dashboard', 'tasks', 'reminders', 'settings']);

    return validRoutes.has(location);
  }

  onLocationSelected(route: AppRoute) {
    this.router.navigateByUrl(route);
  }

  onTaskCreation() {
    const dialog = this.dialog.open(TaskCreateDialogComponent, {
      data: {
        tags: this.tagService.tags()
      }
    });

    dialog.componentInstance.formSubmit.pipe(take(1)).subscribe((newTask) => this.taskService.add$.next(newTask));
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
