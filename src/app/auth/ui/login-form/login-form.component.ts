import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginFormData } from '../../utils/types';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Output() formSubmit = new EventEmitter<LoginFormData>();

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  formErrors = signal({
    email: false,
    password: false
  });

  onSubmit() {
    const { email, password } = this.loginForm.getRawValue();

    this.formErrors.update((state) => ({
      ...state,
      email: !email,
      password: !password
    }));

    if (email && password) {
      this.formSubmit.emit({ email, password });
    }
  }
}
