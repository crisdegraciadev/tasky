import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';
import { ProfileService } from '@shared/data-access/profile.service';
import { computed } from '@angular/core';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, LayoutComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: ProfileService,
          useValue: {
            loaded: computed(() => true),
            profile: computed(() => ({ name: 'ana', email: 'ana@gmail.com' }))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a dialog to create a new task when the "New Task" button is clicked', () => {
    const spy = spyOn(component, 'onTaskCreation');

    const newTaskButton = fixture.debugElement.query(By.css('[data-testid=button-new-task]'));
    expect(newTaskButton).toBeTruthy();

    newTaskButton.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });
});
