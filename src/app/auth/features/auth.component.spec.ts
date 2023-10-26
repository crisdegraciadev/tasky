import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthComponent, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template', () => {
    it("should have a title with value 'Tasky'", () => {
      const title = fixture.debugElement.query(
        By.css('[data-testid=auth-page-title]'),
      );

      expect(title).toBeTruthy();
      expect(title.nativeElement.textContent).toBe('Tasky');
    });
  });
});
