import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    component.location = 'Tasks';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM', () => {
    it('should display a navbar', () => {
      const navbar = fixture.debugElement.query(By.css('[data-testid=navbar]'));
      expect(navbar).toBeTruthy();
    });

    it('should display the current location inside the navbar', () => {
      const location = fixture.debugElement.query(
        By.css('[data-testid=navbar] > [data-testid=navbar-location]'),
      );

      expect(location).toBeTruthy();
    });
  });

  describe('Input: location', () => {
    it("should display 'Tasks' as current location", () => {
      const location = fixture.debugElement.query(
        By.css('[data-testid=navbar] > [data-testid=navbar-location]'),
      );

      expect(location.nativeElement.textContent).toMatch('Tasks');
    });
  });
});
