import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoginFormData } from '../../utils/types';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() formSubmit = new EventEmitter<LoginFormData>();

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  #formErrors$ = new BehaviorSubject({ email: false, password: false });
  formErrors$ = this.#formErrors$.asObservable();

  onSubmit() {
    const { email, password } = this.loginForm.value;
    const currentErrors = this.#formErrors$.getValue();

    if (!email) {
      return this.#formErrors$.next({ ...currentErrors, email: true });
    }

    if (!password) {
      return this.#formErrors$.next({ ...currentErrors, password: true });
    }

    this.#formErrors$.next({ email: false, password: false });
    this.formSubmit.emit({ email, password });
  }
}
