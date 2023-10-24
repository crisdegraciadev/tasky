import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).overrideComponent(NavbarComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('template', () => {
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

    it('should have background-color: #d32f2f', () => {
      const navbar = fixture.debugElement.query(By.css('[data-testid=navbar]'));

      expect(
        navbar.nativeElement
          .computedStyleMap()
          .get('background-color')
          ?.toString(),
      ).toBe('rgb(63, 81, 181)');
    });
  });

  describe('input: location', () => {
    it("should display 'Tasks' as current location", () => {
      component.location = 'Tasks';

      fixture.detectChanges();

      const location = fixture.debugElement.query(
        By.css('[data-testid=navbar] > [data-testid=navbar-location]'),
      );

      expect(location.nativeElement.textContent).toMatch('Tasks');
    });
  });
});
