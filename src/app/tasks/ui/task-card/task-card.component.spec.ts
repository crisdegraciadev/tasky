import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Task } from '@shared/types/task';
import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  const MOCKECD_TASK: Task = {
    title: 'Create an essay',
    description: '',
    tags: [{ value: 'English', color: '#D32F2F' }],
    startDate: new Date()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskCardComponent]
    });
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    component.task = MOCKECD_TASK;
    fixture.detectChanges();
  });

  describe('template', () => {
    it('should display a card', () => {
      const card = fixture.debugElement.query(By.css('[data-testid=card-container]'));

      expect(card).toBeTruthy();
    });

    it('should display a title', () => {
      const title = fixture.debugElement.query(
        By.css('[data-testid=card-container] > [data-testid=card-header]  [data-testid=card-header-title]')
      );

      expect(title).toBeTruthy();
    });

    it('should display a description', () => {
      const description = fixture.debugElement.query(
        By.css('[data-testid=card-container] > [data-testid=card-header]  [data-testid=card-header-description]')
      );

      expect(description).toBeTruthy();
    });

    it('should display range date');
  });

  describe('input: item', () => {
    it('should display "Create an essay" as title', () => {
      const title = fixture.debugElement.query(
        By.css('[data-testid=card-container] > [data-testid=card-header]  [data-testid=card-header-title]')
      ).nativeElement!;

      expect(title.textContent).toMatch(MOCKECD_TASK.title);
    });
  });
});
