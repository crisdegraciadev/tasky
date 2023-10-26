import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AppRoute } from '@shared/types/routes';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    AvatarModule,
    MatListModule,
    MatDividerModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() currentLocation!: AppRoute;

  @Output() locationSelected = new EventEmitter<AppRoute>();

  @Output() taskCreation = new EventEmitter();

  createTask() {
    this.taskCreation.emit();
  }

  selectLocation(location: AppRoute) {
    this.locationSelected.emit(location);
    this.currentLocation = location;
  }
}
