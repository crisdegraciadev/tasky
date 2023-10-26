import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBoardComponent } from './todo-board.component';
import { By } from '@angular/platform-browser';

describe('TodoBoardComponent', () => {
  let component: TodoBoardComponent;
  let fixture: ComponentFixture<TodoBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoBoardComponent],
    });
    fixture = TestBed.createComponent(TodoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('template', () => {
    it('should display a board', () => {
      const board = fixture.debugElement.queryAll(
        By.css('[data-testid=todo-board-container]'),
      );

      expect(board).toBeTruthy();
    });

    it('should have 4 columns', () => {
      const columns = fixture.debugElement.queryAll(
        By.css('[data-testid=todo-board-container] > .column-container'),
      );

      expect(columns.length).toBe(4);
    });

    it('should have a backlog column', () => {
      const column = fixture.debugElement.query(
        By.css(
          '[data-testid=todo-board-container] > [data-testid=backlog-column]',
        ),
      );

      expect(column).toBeTruthy();

      const h2: HTMLTitleElement = column.query(By.css('h2')).nativeElement!;

      expect(h2.textContent).toMatch('Backlog');
    });

    it('should have a todo column', () => {
      const column = fixture.debugElement.query(
        By.css(
          '[data-testid=todo-board-container] > [data-testid=todo-column]',
        ),
      );

      expect(column).toBeTruthy();

      const h2: HTMLTitleElement = column.query(By.css('h2')).nativeElement!;

      expect(h2.textContent).toMatch('To Do');
    });

    it('should have a doing column', () => {
      const column = fixture.debugElement.query(
        By.css(
          '[data-testid=todo-board-container] > [data-testid=doing-column]',
        ),
      );

      expect(column).toBeTruthy();

      const h2: HTMLTitleElement = column.query(By.css('h2')).nativeElement!;

      expect(h2.textContent).toMatch('Doing');
    });

    it('should have a done column', () => {
      const column = fixture.debugElement.query(
        By.css(
          '[data-testid=todo-board-container] > [data-testid=done-column]',
        ),
      );

      expect(column).toBeTruthy();

      const h2: HTMLTitleElement = column.query(By.css('h2')).nativeElement!;

      expect(h2.textContent).toMatch('Done');
    });
  });
});
