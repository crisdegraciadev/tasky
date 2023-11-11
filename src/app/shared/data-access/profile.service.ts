import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Profile, User } from '@shared/types/user';
import { ProfileState } from '@shared/utils/types';
import { doc, getDoc } from 'firebase/firestore';
import { Observable, defer, map } from 'rxjs';
import { FIRESTORE } from 'src/app/app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private authService = inject(AuthService);
  private firestore = inject(FIRESTORE);

  // sources
  private profile$ = this.getProfile();

  // state
  private state = signal<ProfileState>({
    profile: undefined,
    loaded: false
  });

  // selectors
  profile = computed(() => this.state().profile);
  loaded = computed(() => this.state().loaded);

  constructor() {
    // reducers
    this.profile$.pipe(takeUntilDestroyed()).subscribe((profile) =>
      this.state.update((state) => ({
        ...state,
        profile,
        loaded: true
      }))
    );
  }

  private getProfile(): Observable<Profile> {
    const { uid } = this.authService.user()!;

    console.log({ uid });

    const userDoc$ = defer(() => getDoc(doc(this.firestore, 'users', uid)));

    return userDoc$.pipe(
      map((doc) => {
        const user = doc.data() as User;
        const { profile } = user;
        return profile;
      })
    );
  }
}
