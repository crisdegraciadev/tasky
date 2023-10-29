import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@shared/data-access/auth.service';
import { Credentials } from '@shared/types/auth';
import { Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  authService = inject(AuthService);

  // sources
  login$ = new Subject<Credentials>();

  userAuthenticated$ = this.login$.pipe(
    switchMap((credentials) => this.authService.login(credentials)),
  );

  constructor() {
    this.userAuthenticated$.pipe(takeUntilDestroyed()).subscribe();
    this.login$.pipe(takeUntilDestroyed()).subscribe();
  }
}
