import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@shared/data-access/auth.service';
import { Task } from '@shared/types/task';
import { User } from '@shared/types/user';
import { BoardState, BoardUpdate, TaskListType } from '@tasks/utils/types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { Observable, Subject, defer, forkJoin, map, switchMap } from 'rxjs';
import { FIRESTORE } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private firestore = inject(FIRESTORE);
  private authService = inject(AuthService);

  // sources
  backlog$ = this.getTasks('backlog');
  todo$ = this.getTasks('todo');
  doing$ = this.getTasks('doing');
  done$ = this.getTasks('done');

  update$ = new Subject<BoardUpdate>();

  // state
  private state = signal<BoardState>({
    backlog: {
      tasks: [],
      loaded: false,
    },
    todo: {
      tasks: [],
      loaded: false,
    },
    doing: {
      tasks: [],
      loaded: false,
    },
    done: {
      tasks: [],
      loaded: false,
    },
  });

  // selectors
  backlog = computed(() => this.state().backlog);
  todo = computed(() => this.state().todo);
  doing = computed(() => this.state().doing);
  done = computed(() => this.state().done);

  constructor() {
    // reducers
    this.backlog$.pipe(takeUntilDestroyed()).subscribe((tasks) =>
      this.state.update((state) => ({
        ...state,
        backlog: {
          tasks,
          loaded: true,
        },
      })),
    );

    this.todo$.pipe(takeUntilDestroyed()).subscribe((tasks) =>
      this.state.update((state) => ({
        ...state,
        todo: {
          tasks,
          loaded: true,
        },
      })),
    );

    this.doing$.pipe(takeUntilDestroyed()).subscribe((tasks) =>
      this.state.update((state) => ({
        ...state,
        doing: {
          tasks,
          loaded: true,
        },
      })),
    );

    this.done$.pipe(takeUntilDestroyed()).subscribe((tasks) =>
      this.state.update((state) => ({
        ...state,
        done: {
          tasks,
          loaded: true,
        },
      })),
    );

    this.update$
      .pipe(
        takeUntilDestroyed(),
        switchMap((newBoard) => this.updateBoard(newBoard)),
      )
      .subscribe((newBoard) =>
        this.state.update((state) => ({
          ...state,
          ...newBoard,
        })),
      );
  }

  private getTasks(listType: TaskListType): Observable<Task[]> {
    const docs$ = defer(() =>
      getDoc(doc(this.firestore, 'users', this.authService.user()!.uid)),
    );

    return docs$.pipe(map((doc) => (doc.data() as User)[listType]));
  }

  private updateBoard(newBoard: BoardUpdate) {
    return defer(() =>
      updateDoc(doc(this.firestore, 'users', this.authService.user()!.uid), {
        ...newBoard,
      }),
    ).pipe(
      switchMap(() => {
        const backlog$ = this.getTasks('backlog');
        const todo$ = this.getTasks('todo');
        const doing$ = this.getTasks('doing');
        const done$ = this.getTasks('done');

        return forkJoin([backlog$, todo$, doing$, done$]).pipe(
          map(([backlogTasks, todoTasks, doingTasks, doneTasks]) => ({
            backlog: {
              tasks: backlogTasks,
              loaded: true,
            },
            todo: {
              tasks: todoTasks,
              loaded: true,
            },
            doing: {
              tasks: doingTasks,
              loaded: true,
            },
            done: {
              tasks: doneTasks,
              loaded: true,
            },
          })),
        );
      }),
    );
  }
}
