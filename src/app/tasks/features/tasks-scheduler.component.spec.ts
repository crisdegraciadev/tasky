import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSchedulerComponent } from './tasks-scheduler.component';
import { By } from '@angular/platform-browser';

describe('TasksSchedulerComponent', () => {
  let component: TasksSchedulerComponent;
  let fixture: ComponentFixture<TasksSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TasksSchedulerComponent],
    });
    fixture = TestBed.createComponent(TasksSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM', () => {
    it('should have a card container element', () => {
      const container = fixture.debugElement.query(
        By.css('[data-testid=tasks-scheduler-container]'),
      );

      expect(container).toBeTruthy();
    });
  });
});
