import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { TodoBoardComponent } from '@tasks/ui/todo-board/todo-board.component';
import { BoardService } from '@tasks/data-access/board.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Board } from '@tasks/utils/types';
import { Task } from '@shared/types/task';

@Component({
  selector: 'app-tasks-scheduler',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TodoBoardComponent,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tasks-scheduler.component.html',
  styleUrls: ['./tasks-scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksSchedulerComponent {
  boardService = inject(BoardService);

  constructor() {}

  updateBoard(newBoard: Board) {
    this.boardService.update$.next(newBoard);
  }
}
