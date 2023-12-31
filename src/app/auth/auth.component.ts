import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Routes } from '@shared/consts/routes.const';
import { AuthService } from '@shared/data-access/auth.service';
import { Credentials } from '@shared/types/auth';
import { LoginService } from './data-access/login.service';
import { LoginFormComponent } from './ui/login-form/login-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, MatSnackBarModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  authService: AuthService = inject(AuthService);
  loginService: LoginService = inject(LoginService);

  private snackbar = inject(MatSnackBar);

  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigateByUrl(Routes.TASKS);
      }
    });

    effect(() => {
      if (this.loginService.status() === 'error') {
        this.snackbar.open('Invalid credentials', 'Close');
      }
    });
  }

  onFormSubmit(credentials: Credentials) {
    this.loginService.login$.next(credentials);
  }
}
