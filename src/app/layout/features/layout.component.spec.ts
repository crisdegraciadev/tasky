import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';

describe('DashboardComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        LayoutComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should display a dialog to create a new task when the 'New Task' button is clicked", () => {
    const openDialogSpy = spyOn(component.dialog, 'open');

    const newTaskButton = fixture.debugElement.query(
      By.css('[data-testid=button-new-task]'),
    );

    expect(newTaskButton).toBeTruthy();

    newTaskButton.nativeElement.click();

    expect(openDialogSpy).toHaveBeenCalled();
  });
});
