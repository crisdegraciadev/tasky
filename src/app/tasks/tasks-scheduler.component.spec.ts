import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskService } from '@shared/data-access/task.service';
import { TasksSchedulerComponent } from './tasks-scheduler.component';
import { computed } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Board } from './utils/types';

describe('TasksSchedulerComponent', () => {
  let component: TasksSchedulerComponent;
  let fixture: ComponentFixture<TasksSchedulerComponent>;

  let taskServiceStub: Partial<TaskService>;

  beforeEach(() => {
    taskServiceStub = {
      loaded: computed(() => true),
      board: computed<Board>(() => ({ backlog: [], todo: [], doing: [], done: [] }))
    };

    TestBed.configureTestingModule({
      imports: [TasksSchedulerComponent],
      providers: [{ provide: TaskService, useValue: taskServiceStub }]
    });

    fixture = TestBed.createComponent(TasksSchedulerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('template', () => {
    it('should show a board when data is provided', () => {
      const todoBoardComponent = fixture.debugElement.query(By.css('[data-testid=todo-board]'));
      expect(todoBoardComponent).toBeTruthy();
    });

    it('should show a loading spinner when service is fetching data', () => {
      taskServiceStub.loaded = computed(() => false);
      fixture.detectChanges();

      const loadingSpinner = fixture.debugElement.query(By.css('[data-testid=loading-board]'));
      expect(loadingSpinner).toBeTruthy();
    });
  });
});
