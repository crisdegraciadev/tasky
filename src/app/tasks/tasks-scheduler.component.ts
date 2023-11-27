import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { TodoBoardComponent } from '@tasks/ui/todo-board/todo-board.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Board } from '@tasks/utils/types';
import { Task } from '@shared/types/task';
import { TaskService } from '@shared/data-access/task.service';

@Component({
  selector: 'app-tasks-scheduler',
  standalone: true,
  imports: [CommonModule, MatCardModule, TodoBoardComponent, MatTabsModule, MatProgressSpinnerModule],
  templateUrl: './tasks-scheduler.component.html',
  styleUrls: ['./tasks-scheduler.component.scss']
})
export class TasksSchedulerComponent {
  taskService = inject(TaskService);

  constructor() {}

  updateBoard(newBoard: Board) {
    this.taskService.update$.next(newBoard);
  }
}
