import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../ui/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../ui/navbar/navbar.component';
import { BehaviorSubject } from 'rxjs';
import { Routes } from '../../shared/consts/routes.const';
import { AppRoute } from '../../shared/types/routes';

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
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private _currentLocation$ = new BehaviorSubject<AppRoute>(
    Routes.Dashboard.BASE,
  );
  currentLocation$ = this._currentLocation$.asObservable();

  constructor(
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setCurrentLocation();
  }

  private setCurrentLocation() {
    const currentLocation = this.location.path().substring(1);
    if (this.isValidLocation(currentLocation)) {
      this._currentLocation$.next(currentLocation);
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
}
