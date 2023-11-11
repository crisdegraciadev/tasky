import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, effect } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AppRoute } from '@shared/types/routes';
import { Profile } from '@shared/types/user';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, AvatarModule, MatListModule, MatDividerModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  @Input() currentLocation!: AppRoute;

  @Input() profile!: Profile;

  @Output() locationSelected = new EventEmitter<AppRoute>();

  @Output() taskCreation = new EventEmitter();

  @Output() logoutClick = new EventEmitter();

  version = '0.0.1';

  ngOnInit(): void {
    console.log(this.profile);
  }

  createTask() {
    this.taskCreation.emit();
  }

  selectLocation(location: AppRoute) {
    this.locationSelected.emit(location);
    this.currentLocation = location;
  }

  handleLogout() {
    this.logoutClick.emit();
  }
}
