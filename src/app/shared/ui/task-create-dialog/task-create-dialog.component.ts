import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskCreateDialogData, TaskCreateFormData } from '@layout/utils/types';

@Component({
  selector: 'app-task-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-create-dialog.component.html',
  styleUrls: ['./task-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCreateDialogComponent {
  data: TaskCreateDialogData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<TaskCreateDialogData>);

  @Output() formSubmit = new EventEmitter<TaskCreateFormData>();

  newTaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl<string[]>([], { nonNullable: true }),
    startDate: new FormControl(new Date()),
    endDate: new FormControl()
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];

  formErrors = signal({
    title: false,
    description: false,
    tags: false,
    startDate: false
  });

  onSubmit() {
    const { title, description, tags, startDate, endDate } = this.newTaskForm.getRawValue();

    this.formErrors.update((state) => ({
      ...state,
      title: !title,
      description: !description,
      tags: !tags || tags?.length < 1,
      startDate: !startDate
    }));

    if (title && description && tags?.length >= 1 && startDate) {
      this.formSubmit.emit({ title, description, tags, startDate, endDate });
    }
  }
}
