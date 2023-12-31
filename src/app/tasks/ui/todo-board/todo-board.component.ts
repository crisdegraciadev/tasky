import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Task } from '@shared/types/task';
import { Board } from '@tasks/utils/types';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-todo-board',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, TaskCardComponent, MatDividerModule],
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoBoardComponent {
  @Input() board!: Board;

  @Output() boardUpdate = new EventEmitter<Board>();

  drop(event: CdkDragDrop<Task[]>) {
    const movementInSameList = event.previousContainer === event.container;

    movementInSameList ? this.moveInSameList(event) : this.moveToOtherList(event);

    this.boardUpdate.emit({
      ...this.board
    });
  }

  private moveInSameList(moveEvent: CdkDragDrop<Task[]>) {
    moveItemInArray(moveEvent.container.data, moveEvent.previousIndex, moveEvent.currentIndex);
  }

  private moveToOtherList(moveEvent: CdkDragDrop<Task[]>) {
    transferArrayItem(
      moveEvent.previousContainer.data,
      moveEvent.container.data,
      moveEvent.previousIndex,
      moveEvent.currentIndex
    );
  }
}
