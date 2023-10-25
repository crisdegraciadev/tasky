import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { Tag } from '../../../shared/types/task';

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
    ReactiveFormsModule,
  ],
  templateUrl: './task-create-dialog.component.html',
  styleUrls: ['./task-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreateDialogComponent {
  @Input() tags!: Tag[];

  newTaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl<string[]>([]),
    creationDate: new FormControl(new Date()),
    expirationDate: new FormControl(new Date()),
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public dialogRef: MatDialogRef<TaskCreateDialogComponent>) {}
}
