import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../ui/login-form/login-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
