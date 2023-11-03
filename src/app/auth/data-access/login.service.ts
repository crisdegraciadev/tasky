import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@shared/data-access/auth.service';
import { Credentials } from '@shared/types/auth';
import { EMPTY, Subject, catchError, switchMap } from 'rxjs';
import { LoginState } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authService = inject(AuthService);

  // sources
  login$ = new Subject<Credentials>();
  error$ = new Subject();

  userAuthenticated$ = this.login$.pipe(
    switchMap((credentials) =>
      this.authService.login(credentials).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      )
    )
  );

  // state
  private state = signal<LoginState>({
    status: 'pending'
  });

  // selectors
  status = computed(() => this.state().status);

  constructor() {
    // reducers
    this.userAuthenticated$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.state.update((state) => ({ ...state, status: 'success' })));

    this.login$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.state.update((state) => ({ ...state, status: 'authenticating' })));

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.state.update((state) => ({ ...state, status: 'error' })));
  }
}
