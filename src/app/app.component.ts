import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardComponent } from './dashboard/features/dashboard.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'tasky';
}
