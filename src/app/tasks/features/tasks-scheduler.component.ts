import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { TodoBoardComponent } from '../ui/todo-board/todo-board.component';

@Component({
  selector: 'app-tasks-scheduler',
  standalone: true,
  imports: [CommonModule, MatCardModule, TodoBoardComponent],
  templateUrl: './tasks-scheduler.component.html',
  styleUrls: ['./tasks-scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksSchedulerComponent {}
