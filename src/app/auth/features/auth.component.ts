import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../ui/login-form/login-form.component';
import { AuthService } from '@shared/data-access/auth.service';
import { Router } from '@angular/router';
import { Routes } from '@shared/consts/routes.const';
import { Credentials } from '@shared/types/auth';
import { LoginService } from '../data-access/login.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  authService: AuthService = inject(AuthService);
  loginService: LoginService = inject(LoginService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigateByUrl(Routes.TASKS);
      }
    });
  }

  onFormSubmit(credentials: Credentials) {
    this.loginService.login$.next(credentials);
  }
}
