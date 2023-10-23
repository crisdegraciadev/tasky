import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatars';
import { BehaviorSubject } from 'rxjs';
import { Routes } from '../../../shared/consts/routes.const';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    AvatarModule,
    MatListModule,
    MatDividerModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  readonly Routes = {
    DASHBOARD: Routes.Dashboard.BASE,
    TASKS: Routes.Tasks.BASE,
    REMINDERS: Routes.Reminders.BASE,
  };

  private location$ = new BehaviorSubject<string>(Routes.Dashboard.BASE);
  currentPath$ = this.location$.asObservable();

  constructor(
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const [_, ...currentLocation] = this.location.path();
    this.location$.next(currentLocation.join(''));
  }

  navigate(route: string) {
    this.location$.next(route);
    this.router.navigateByUrl(route);
  }
}
