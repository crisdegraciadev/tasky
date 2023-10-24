import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../shared/types/task';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  @Input()
  task!: Task;
}
