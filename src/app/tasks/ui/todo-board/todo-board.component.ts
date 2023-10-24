import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from '../../../shared/types/task';
import { TaskCardComponent } from '../task-card/task-card.component';
import { MatDividerModule } from '@angular/material/divider';

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
  backlog: Task[] = [
    {
      title: 'Develop a Website',
      description: 'Create a responsive website for a client',
      tags: [
        { value: 'Web Development', color: '#1976D2' },
        { value: 'Client Project', color: '#303F9F' },
      ],
      creationDate: new Date('2023-10-23'),
      expirationDate: new Date('2023-11-15'),
    },
    {
      title: 'Bug Fixing',
      description: 'Fix critical bug in the mobile app',
      tags: [
        { value: 'Mobile App', color: '#D32F2F' },
        { value: 'Bug', color: '#D32F2F' },
      ],
      creationDate: new Date('2023-10-24'),
      expirationDate: new Date('2023-10-30'),
    },
    {
      title: 'Data Analysis',
      description: 'Analyze sales data for the past quarter',
      tags: [
        { value: 'Data Analysis', color: '#1976D2' },
        { value: 'High Priority', color: '#D32F2F' },
      ],
      creationDate: new Date('2023-10-25'),
      expirationDate: new Date('2023-11-10'),
    },
    // Add more tasks as needed
  ];

  todo: Task[] = [
    {
      title: 'Data Analysis',
      description: 'Analyze sales data for the past quarter',
      tags: [
        { value: 'Data Analysis', color: '#1976D2' },
        { value: 'High Priority', color: '#D32F2F' },
      ],
      creationDate: new Date('2023-10-25'),
      expirationDate: new Date('2023-11-10'),
    },
  ];
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
