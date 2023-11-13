import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LayoutComponent } from '@layout/layout.component';
import { Routes } from '@shared/consts/routes.const';
import { AuthService } from '@shared/data-access/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigateByUrl(Routes.AUTH);
      }
    });
  }
}
