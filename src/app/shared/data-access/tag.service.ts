import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TagState } from '@shared/utils/types';
import { defer, map } from 'rxjs';
import { FIRESTORE } from 'src/app/app.config';
import { AuthService } from './auth.service';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '@shared/types/user';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private firestore = inject(FIRESTORE);
  private authService = inject(AuthService);

  // sources
  private tags$ = this.getTags();

  // state
  private state = signal<TagState>({
    tags: []
  });

  // selectors
  tags = computed(() => this.state().tags);

  constructor() {
    // reducers
    this.tags$.pipe(takeUntilDestroyed()).subscribe((newTags) =>
      this.state.update((state) => ({
        ...state,
        tags: newTags
      }))
    );
  }

  private getTags() {
    const userDoc$ = defer(() => getDoc(doc(this.firestore, 'users', this.authService.user()!.uid)));

    return userDoc$.pipe(
      map((doc) => {
        const user = doc.data() as User;
        const { tags } = user;
        return tags;
      })
    );
  }
}
