import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthState, Credentials } from '@shared/types/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { defer, from } from 'rxjs';
import { AUTH } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(AUTH);

  // sources
  private user$ = authState(this.auth);

  // state
  private state = signal<AuthState>({
    user: undefined,
    status: 'fetching'
  });

  // selectors
  user = computed(() => this.state().user);
  status = computed(() => this.state().status);

  constructor() {
    // redeucers
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) =>
      this.state.update((state) => ({
        ...state,
        user,
        status: user === null ? 'unauthenticated' : 'authenticated'
      }))
    );
  }

  login({ email, password }: Credentials) {
    return from(defer(() => signInWithEmailAndPassword(this.auth, email, password)));
  }

  logout() {
    signOut(this.auth);
  }

  createAccount(credentials: Credentials) {
    return from(defer(() => createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)));
  }
}
