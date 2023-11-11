import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { TaskCreateDialogComponent } from './task-create-dialog.component';
import { Tag } from '@shared/types/task';

describe('TaskCreateDialogComponent', () => {
  let component: TaskCreateDialogComponent;
  let fixture: ComponentFixture<TaskCreateDialogComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskCreateDialogComponent, BrowserAnimationsModule, MatNativeDateModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(TaskCreateDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      tags: [{ value: 'Ingles', color: '#D32F2F' }]
    };
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  describe('template', () => {
    it('should contain elements inside the dialog', () => {
      const dialog = fixture.debugElement.query(By.css('[data-testid=task-create-dialog]'));

      expect(dialog).toBeTruthy();
    });

    it('should have a title with value "Create Task"', () => {
      const title = fixture.debugElement.query(
        By.css('[data-testid=task-create-dialog] > [data-testid=tast-create-dialog-title]')
      );

      expect(title).toBeTruthy();

      const h1: HTMLHeadingElement = title.nativeElement!;

      expect(h1.textContent).toMatch('Create Task');
    });

    it('should have a form to create the task', () => {
      const form = fixture.debugElement.query(By.css('[data-testid=task-create-form]'));

      expect(form).toBeTruthy();
      expect(form.nativeElement instanceof HTMLFormElement).toBeTrue();
    });

    it('should have a field title', () => {
      const field = fixture.debugElement.query(
        By.css('[data-testid=task-create-form] [data-testid=task-create-title-field]')
      );

      expect(field).toBeTruthy();
    });

    it('should have a field description', () => {
      const field = fixture.debugElement.query(
        By.css('[data-testid=task-create-form] [data-testid=task-create-description-field]')
      );

      expect(field).toBeTruthy();
    });

    it('should have a field rangeDate', () => {
      const field = fixture.debugElement.query(
        By.css('[data-testid=task-create-form] [data-testid=task-create-range-date-field]')
      );

      expect(field).toBeTruthy();
    });

    it('should have a field startDate', () => {
      const field = fixture.debugElement.query(
        By.css('[data-testid=task-create-form] [data-testid=task-create-start-date]')
      );

      expect(field).toBeTruthy();
    });

    it('should have a field endDate', () => {
      const field = fixture.debugElement.query(
        By.css('[data-testid=task-create-form] [data-testid=task-create-end-date]')
      );

      expect(field).toBeTruthy();
    });

    it('should have a field tags', () => {
      const field = fixture.debugElement.query(By.css('[data-testid=task-create-form] [data-testid=task-create-tags]'));

      expect(field).toBeTruthy();
    });

    it('should have a button to create the task', () => {
      const button = fixture.debugElement.query(
        By.css('[data-testid=task-create-form] [data-testid=task-create-button]')
      );

      expect(button).toBeTruthy();
      expect(button.nativeElement.type).toBe('submit');
      expect(button.nativeElement.textContent).toMatch('Create');
    });
  });

  describe('output: formSubmit', () => {
    const FORM_DATA = {
      title: 'Examén de ingles',
      description: 'Estudiar temas 2 y 3.',
      tags: [{ value: 'Ingles', color: '#D32F2F' }],
      startDate: '11/3/2023'
    };

    it('should submit form data', async () => {
      const observerSpy = subscribeSpyTo(component.formSubmit);

      const titleInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid=task-create-title-field]'))
        .nativeElement!;

      titleInput.value = FORM_DATA.title;
      titleInput.dispatchEvent(new Event('input'));

      const descriptionField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-description-field]')
      ).nativeElement!;

      descriptionField.value = FORM_DATA.description;
      descriptionField.dispatchEvent(new Event('input'));

      const startDateField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-start-date]')
      ).nativeElement!;

      startDateField.value = FORM_DATA.startDate;
      startDateField.dispatchEvent(new Event('input'));

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();

      await options[0].click();

      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid=task-create-button]'))
        .nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      const { title, description, tags, startDate } = FORM_DATA;

      expect(observerSpy.receivedNext()).toBeTrue();

      expect(observerSpy.getLastValue()?.title).toBe(title);
      expect(observerSpy.getLastValue()?.description).toBe(description);
      expect(observerSpy.getLastValue()?.startDate.getDate()).toBe(new Date(startDate).getDate());
      expect(observerSpy.getLastValue()?.tags).toEqual(tags as Tag[]);
    });

    it('should NOT emit form data when input title is empty', async () => {
      const observerSpy = subscribeSpyTo(component.formSubmit);

      const descriptionField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-description-field]')
      ).nativeElement!;

      descriptionField.value = FORM_DATA.description;
      descriptionField.dispatchEvent(new Event('input'));

      const startDateField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-start-date]')
      ).nativeElement!;

      startDateField.value = FORM_DATA.startDate;
      startDateField.dispatchEvent(new Event('input'));

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();

      await options[0].click();

      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid=task-create-button]'))
        .nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      expect(observerSpy.receivedNext()).toBeFalse();
    });

    it('should show error message when input title is not filled', async () => {
      const descriptionField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-description-field]')
      ).nativeElement!;

      descriptionField.value = FORM_DATA.description;
      descriptionField.dispatchEvent(new Event('input'));

      const startDateField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-start-date]')
      ).nativeElement!;

      startDateField.value = FORM_DATA.startDate;
      startDateField.dispatchEvent(new Event('input'));

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();

      await options[0].click();

      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid=task-create-button]'))
        .nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      const failHint = fixture.debugElement.query(By.css('[data-testid=task-create-title-error]'));

      expect(failHint).toBeTruthy();
      expect(failHint.nativeElement.textContent).toMatch('Title field is required');
    });

    it('should NOT emit form data when input description is empty', async () => {
      const observerSpy = subscribeSpyTo(component.formSubmit);

      const titleInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid=task-create-title-field]'))
        .nativeElement!;

      titleInput.value = FORM_DATA.title;
      titleInput.dispatchEvent(new Event('input'));

      const startDateField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-start-date]')
      ).nativeElement!;

      startDateField.value = FORM_DATA.startDate;
      startDateField.dispatchEvent(new Event('input'));

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();

      await options[0].click();

      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid=task-create-button]'))
        .nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      expect(observerSpy.receivedNext()).toBeFalse();
    });

    it('should show error message when input description is not filled', async () => {
      const titleInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid=task-create-title-field]'))
        .nativeElement!;

      titleInput.value = FORM_DATA.title;
      titleInput.dispatchEvent(new Event('input'));

      const startDateField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-start-date]')
      ).nativeElement!;

      startDateField.value = FORM_DATA.startDate;
      startDateField.dispatchEvent(new Event('input'));

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();

      await options[0].click();

      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid=task-create-button]'))
        .nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      const failHint = fixture.debugElement.query(By.css('[data-testid=task-create-description-error]'));

      expect(failHint).toBeTruthy();
      expect(failHint.nativeElement.textContent).toMatch('Description field is required');
    });

    it('should NOT emit form data when input tags is empty', () => {
      const observerSpy = subscribeSpyTo(component.formSubmit);

      const titleInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid=task-create-title-field]'))
        .nativeElement!;

      titleInput.value = FORM_DATA.title;
      titleInput.dispatchEvent(new Event('input'));

      const descriptionField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-description-field]')
      ).nativeElement!;

      descriptionField.value = FORM_DATA.description;
      descriptionField.dispatchEvent(new Event('input'));

      const startDateField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-start-date]')
      ).nativeElement!;

      startDateField.value = FORM_DATA.startDate;
      startDateField.dispatchEvent(new Event('input'));

      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid=task-create-button]'))
        .nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      expect(observerSpy.receivedNext()).toBeFalse();
    });

    it('should show error message when input tags is not filled', () => {
      const titleInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid=task-create-title-field]'))
        .nativeElement!;

      titleInput.value = FORM_DATA.title;
      titleInput.dispatchEvent(new Event('input'));

      const descriptionField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-description-field]')
      ).nativeElement!;

      descriptionField.value = FORM_DATA.description;
      descriptionField.dispatchEvent(new Event('input'));

      const startDateField: HTMLInputElement = fixture.debugElement.query(
        By.css('[data-testid=task-create-start-date]')
      ).nativeElement!;

      startDateField.value = FORM_DATA.startDate;
      startDateField.dispatchEvent(new Event('input'));

      const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid=task-create-button]'))
        .nativeElement!;

      submitButton.click();
      fixture.detectChanges();

      const failHint = fixture.debugElement.query(By.css('[data-testid=task-create-tags-error]'));

      expect(failHint).toBeTruthy();
      expect(failHint.nativeElement.textContent).toMatch('At least 1 tag should be selected');
    });
  });
});
