import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSchedulerComponent } from './tasks-scheduler.component';
import { By } from '@angular/platform-browser';

describe('TasksSchedulerComponent', () => {
  let component: TasksSchedulerComponent;
  let fixture: ComponentFixture<TasksSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TasksSchedulerComponent]
    });
    fixture = TestBed.createComponent(TasksSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('template', () => {
    it('should show a board when data is provided');

    it('should show a loading spinner when service is fetching data');
  });
});
