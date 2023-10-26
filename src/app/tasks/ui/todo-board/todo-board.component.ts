import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '@shared/types/task';
import { BACKLOG_DATA, TODO_DATA } from './todo-board.data';

@Component({
  selector: 'app-todo-board',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    TaskCardComponent,
    MatDividerModule,
  ],
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoBoardComponent {
  backlog: Task[] = BACKLOG_DATA;
  todo: Task[] = TODO_DATA;
  doing: Task[] = [];
  done: Task[] = [];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
