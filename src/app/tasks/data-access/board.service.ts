import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@shared/data-access/auth.service';
import { User } from '@shared/types/user';
import { BoardState, Board } from '@tasks/utils/types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { Observable, Subject, defer, map, switchMap } from 'rxjs';
import { FIRESTORE } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private firestore = inject(FIRESTORE);
  private authService = inject(AuthService);

  // sources
  board$ = this.getBoard();

  update$ = new Subject<Board>();

  // state
  private state = signal<BoardState>({
    board: {
      backlog: [],
      todo: [],
      doing: [],
      done: []
    },
    loaded: false
  });

  // selectors
  board = computed(() => this.state().board);
  loaded = computed(() => this.state().loaded);

  constructor() {
    // reducers
    this.board$.pipe(takeUntilDestroyed()).subscribe((board) =>
      this.state.update((state) => ({
        ...state,
        board,
        loaded: true
      }))
    );

    this.update$
      .pipe(
        takeUntilDestroyed(),
        switchMap((newBoard) => this.updateBoard(newBoard))
      )
      .subscribe((newBoard) =>
        this.state.update((state) => ({
          ...state,
          ...newBoard
        }))
      );
  }

  private getBoard(): Observable<Board> {
    const userDoc$ = defer(() => getDoc(doc(this.firestore, 'users', this.authService.user()!.uid)));

    return userDoc$.pipe(
      map((doc) => {
        const user = doc.data() as User;
        const { backlog, todo, doing, done } = user;
        return { backlog, todo, doing, done };
      })
    );
  }

  private updateBoard(newBoard: Board) {
    return defer(() =>
      updateDoc(doc(this.firestore, 'users', this.authService.user()!.uid), {
        ...newBoard
      })
    ).pipe(switchMap(() => this.getBoard()));
  }
}
