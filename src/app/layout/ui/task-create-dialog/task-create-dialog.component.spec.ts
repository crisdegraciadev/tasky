import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateDialogComponent } from './task-create-dialog.component';
import { By } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('TaskCreateDialogComponent', () => {
  let component: TaskCreateDialogComponent;
  let fixture: ComponentFixture<TaskCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TaskCreateDialogComponent,
        BrowserAnimationsModule,
        MatNativeDateModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    });
    fixture = TestBed.createComponent(TaskCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('template', () => {
    it('should contain elements inside the dialog', () => {
      const dialog = fixture.debugElement.query(
        By.css('[data-testid=task-create-dialog]'),
      );

      expect(dialog).toBeTruthy();
    });
    it("should have a title with value 'Create Task'", () => {
      const title = fixture.debugElement.query(
        By.css(
          '[data-testid=task-create-dialog] > [data-testid=tast-create-dialog-title]',
        ),
      );

      expect(title).toBeTruthy();

      const h1: HTMLHeadingElement = title.nativeElement!;

      expect(h1.textContent).toMatch('Create Task');
    });

    it('should have a form to create the task', () => {
      const form = fixture.debugElement.query(
        By.css('[data-testid=task-create-form]'),
      );

      expect(form).toBeTruthy();
      expect(form.nativeElement instanceof HTMLFormElement).toBeTrue();
    });

    it('should have a field title', () => {
      const field = fixture.debugElement.query(
        By.css(
          '[data-testid=task-create-form] [data-testid=task-create-title-field]',
        ),
      );

      expect(field).toBeTruthy();
    });

    it('should have a field description', () => {
      const field = fixture.debugElement.query(
        By.css(
          '[data-testid=task-create-form] [data-testid=task-create-description-field]',
        ),
      );

      expect(field).toBeTruthy();
    });

    it('should have a field rangeDate', () => {
      const field = fixture.debugElement.query(
        By.css(
          '[data-testid=task-create-form] [data-testid=task-create-range-date-field]',
        ),
      );

      expect(field).toBeTruthy();
    });

    it('should have a field creationDate');

    it('should have a field expirationDate');

    it('should have a field tags');
  });
});
