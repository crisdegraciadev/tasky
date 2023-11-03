import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { ChangeDetectionStrategy } from '@angular/core';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginFormComponent, BrowserAnimationsModule]
    }).overrideComponent(LoginFormComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    });

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template', () => {
    it('should display a card', () => {
      const card = fixture.debugElement.query(By.css('[data-testid=login-form-card]'));

      expect(card).toBeTruthy();
    });

    it('should display a login title', () => {
      const title = fixture.debugElement.query(By.css('[data-testid=login-form-title]'));

      expect(title).toBeTruthy();
      expect(title.nativeElement.textContent).toBe('Login');
    });

    it('should display an input for email', () => {
      const input = fixture.debugElement.query(By.css('[data-testid=login-form-email-input]'));

      const nativeInput: HTMLInputElement = input.nativeElement!;

      expect(input).toBeTruthy();
      expect(nativeInput.type).toBe('email');
      expect(nativeInput.placeholder).toBe('ana@gmail.com');
    });

    it('should display an input for password', () => {
      const input = fixture.debugElement.query(By.css('[data-testid=login-form-password-input]'));

      const nativeInput: HTMLInputElement = input.nativeElement!;

      expect(input).toBeTruthy();
      expect(nativeInput.type).toBe('password');
      expect(nativeInput.placeholder).toBe('Your password');
    });

    it('should display a submit button', () => {
      const button = fixture.debugElement.query(By.css('[data-testid=login-form-submit-button]'));
      const nativeButton: HTMLButtonElement = button.nativeElement!;

      expect(button).toBeTruthy();
      expect(nativeButton.textContent).toMatch('Login');
      expect(nativeButton.type).toMatch('submit');
    });
  });

  describe('output: formSubmit', () => {
    const FORM_DATA = { email: 'ana@gmail.com', password: '1234' };

    it('should submit form data when inputs are filled', () => {
      const observerSpy = subscribeSpyTo(component.formSubmit);

      const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid=login-form-email-input]'))
        .nativeElement!;

      emailInput.value = FORM_DATA.email;
      emailInput.dispatchEvent(new Event('input'));

      const passwordInput: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=login-form-password-input]')
      ).nativeElement!;

      passwordInput.value = FORM_DATA.password;
      passwordInput.dispatchEvent(new Event('input'));

      const submitButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('[data-testid=login-form-submit-button]')
      ).nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      expect(observerSpy.getLastValue()).toEqual(FORM_DATA);
    });

    it('should NOT submit form data when email input is not filled', () => {
      const observerSpy = subscribeSpyTo(component.formSubmit);

      const passwordInput: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=login-form-password-input]')
      ).nativeElement!;

      passwordInput.value = FORM_DATA.password;
      passwordInput.dispatchEvent(new Event('input'));

      const submitButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('[data-testid=login-form-submit-button]')
      ).nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      expect(observerSpy.getLastValue()).toBeUndefined();
    });

    it('should show error message when email input is not filled', () => {
      const passwordInput: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=login-form-password-input]')
      ).nativeElement!;

      passwordInput.value = FORM_DATA.password;
      passwordInput.dispatchEvent(new Event('input'));

      const submitButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('[data-testid=login-form-submit-button]')
      ).nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      const failHint = fixture.debugElement.query(By.css('[data-testid=login-form-email-error]'));

      expect(failHint).toBeTruthy();
      expect(failHint.nativeElement.textContent).toMatch('Email field is required');
    });

    it('should NOT submit form data when password input is not filled', () => {
      const observerSpy = subscribeSpyTo(component.formSubmit);

      const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid=login-form-email-input]'))
        .nativeElement!;

      emailInput.value = FORM_DATA.email;
      emailInput.dispatchEvent(new Event('input'));

      const submitButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('[data-testid=login-form-submit-button]')
      ).nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      expect(observerSpy.getLastValue()).toBeUndefined();
    });

    it('should show error message when password input is not filled', () => {
      const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid=login-form-email-input]'))
        .nativeElement!;

      emailInput.value = FORM_DATA.email;
      emailInput.dispatchEvent(new Event('input'));

      const submitButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('[data-testid=login-form-submit-button]')
      ).nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      const failHint = fixture.debugElement.query(By.css('[data-testid=login-form-password-error]'));

      expect(failHint).toBeTruthy();
      expect(failHint.nativeElement.textContent).toMatch('Password field is required');
    });
  });
});
