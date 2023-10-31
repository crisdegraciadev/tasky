import { Component, OnInit, effect, inject } from '@angular/core';
import { LayoutComponent } from './layout/features/layout.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@shared/data-access/auth.service';
import { Routes } from '@shared/consts/routes.const';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  isLoggedIn = false;

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigateByUrl(Routes.AUTH);
      }

      this.isLoggedIn = !!this.authService.user();
    });
  }
}
