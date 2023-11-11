import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { provideRouter } from '@angular/router';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidebarComponent } from './sidebar.component';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { TasksSchedulerComponent } from '@tasks/features/tasks-scheduler.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarComponent, HttpClientTestingModule],
      providers: [provideRouter([{ path: 'tasks', component: TasksSchedulerComponent }])]
    }).overrideComponent(SidebarComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('template', () => {
    it('should have a logo with name "Tasky"', () => {
      const logo = fixture.debugElement.query(By.css('[data-testid=logo]'));

      const h1 = logo.nativeElement!;

      expect(h1).toBeTruthy();
      expect(h1.textContent).toContain('Tasky');
    });

    it('should have a button with text "New Task"', () => {
      const newTaskButton = fixture.debugElement.query(By.css('[data-testid=button-new-task]'));

      const button: HTMLButtonElement = newTaskButton.nativeElement!;

      expect(newTaskButton).toBeTruthy();
      expect(button.textContent?.trim()).toBe('New Task');
    });

    it('should have a navigation menu', () => {
      const menu = fixture.debugElement.query(By.css('[data-testid=navigation-menu]'));

      expect(menu).toBeTruthy();
    });

    it('should have a dashboard link in the navigation menu', () => {
      const dashboardLink = fixture.debugElement.query(
        By.css('[data-testid=navigation-menu] > [data-testid=navigation-dashboard-link]')
      );

      const button: HTMLButtonElement = dashboardLink.nativeElement!;

      expect(dashboardLink).toBeTruthy();
      expect(button.textContent).toMatch('Dashboard');
    });

    it('should have a home icon in dashboard link', () => {
      const icon = fixture.debugElement.query(
        By.css(
          '[data-testid=navigation-menu] > [data-testid=navigation-dashboard-link] > [data-testid=navigation-dashboard-link-icon]'
        )
      );

      expect(icon).toBeTruthy();
      expect(icon.nativeElement!.textContent).toBe('home');
    });

    it('should have a tasks link in the navigation menu', () => {
      const tasksLink = fixture.debugElement.query(
        By.css('[data-testid=navigation-menu] > [data-testid=navigation-tasks-link]')
      );

      const button: HTMLButtonElement = tasksLink.nativeElement!;

      expect(tasksLink).toBeTruthy();
      expect(button.textContent).toMatch('Tasks');
    });

    it('should have an edit icon in tasks link', () => {
      const icon = fixture.debugElement.query(
        By.css(
          '[data-testid=navigation-menu] > [data-testid=navigation-tasks-link] > [data-testid=navigation-tasks-link-icon]'
        )
      );

      expect(icon).toBeTruthy();
      expect(icon.nativeElement!.textContent).toBe('edit');
    });

    it('should have a reminders link in the navigation menu', () => {
      const remindersLink = fixture.debugElement.query(
        By.css('[data-testid=navigation-menu] > [data-testid=navigation-reminders-link]')
      );

      const button: HTMLButtonElement = remindersLink.nativeElement!;

      expect(remindersLink).toBeTruthy();
      expect(button.textContent).toMatch('Reminders');
    });

    it('should have an event icon in reminders link', () => {
      const icon = fixture.debugElement.query(
        By.css(
          '[data-testid=navigation-menu] > [data-testid=navigation-reminders-link] > [data-testid=navigation-reminders-link-icon]'
        )
      );

      expect(icon).toBeTruthy();
      expect(icon.nativeElement!.textContent).toBe('event');
    });

    it('should display an avatar in profile section', () => {
      const avatar = fixture.debugElement.query(By.css('[data-testid=profile]> [data-testid=avatar]'));

      expect(avatar).toBeTruthy();
    });

    it('should display the user name in profile section', () => {
      const name = fixture.debugElement.query(By.css('[data-testid=profile]> [data-testid=name]'));

      expect(name).toBeTruthy();
    });

    it('should have a settings navigation link', () => {
      const settings = fixture.debugElement.query(By.css('[data-testid=footer-settings-button]'));

      expect(settings).toBeTruthy();
      expect(settings.nativeElement.textContent).toMatch('Settings');
    });

    it('should have a settings navigation link', () => {
      const settings = fixture.debugElement.query(
        By.css('[data-testid=footer-menu] > [data-testid=footer-settings-button]')
      );

      expect(settings).toBeTruthy();
      expect(settings.nativeElement.textContent).toMatch('Settings');
    });

    it('should have a settings icon in settings link', () => {
      const icon = fixture.debugElement.query(
        By.css(
          '[data-testid=footer-menu] > [data-testid=footer-settings-button] > [data-testid=footer-settings-button-icon]'
        )
      );

      expect(icon).toBeTruthy();
      expect(icon.nativeElement!.textContent).toBe('settings');
    });

    it('should have a logout navigation link', () => {
      const logout = fixture.debugElement.query(
        By.css('[data-testid=footer-menu] > [data-testid=footer-logout-button]')
      );

      expect(logout).toBeTruthy();
      expect(logout.nativeElement.textContent).toMatch('Logout');
    });

    it('should have a logout icon in logout link', () => {
      const icon = fixture.debugElement.query(
        By.css(
          '[data-testid=footer-menu] > [data-testid=footer-logout-button] > [data-testid=footer-logout-button-icon]'
        )
      );

      expect(icon).toBeTruthy();
      expect(icon.nativeElement!.textContent).toBe('logout');
    });

    it('should have active class when an element is clicked', fakeAsync(() => {
      const tasksLink = fixture.debugElement.query(
        By.css('[data-testid=navigation-menu] > [data-testid=navigation-tasks-link]')
      );

      const button: HTMLButtonElement = tasksLink.nativeElement!;

      expect(button.classList).not.toContain('active');

      tasksLink.triggerEventHandler('click');
      fixture.detectChanges();

      expect(button.classList).toContain('active');
    }));

    it('should have "background-color: #f5f5f5" when an element is clicked', () => {
      const tasksLink = fixture.debugElement.query(
        By.css('[data-testid=navigation-menu] > [data-testid=navigation-tasks-link]')
      );

      const button: HTMLButtonElement = tasksLink.nativeElement!;

      expect(button.computedStyleMap().get('background-color')?.toString()).toBe('rgba(0, 0, 0, 0)');

      tasksLink.triggerEventHandler('click');
      fixture.detectChanges();

      expect(button.computedStyleMap().get('background-color')?.toString()).toBe('rgb(245, 245, 245)');
    });
  });

  describe('input: currentLocation', () => {
    it('should add active class to the link with the matching location', () => {
      component.currentLocation = 'tasks';

      fixture.detectChanges();

      const tasksLink = fixture.debugElement.query(
        By.css('[data-testid=navigation-menu] > [data-testid=navigation-tasks-link]')
      );

      const button: HTMLButtonElement = tasksLink.nativeElement!;

      expect(button.classList).toContain('active');
    });
  });

  describe('output: locationSelected', () => {
    it('should emit "tasks" as selected location when clicking the link', () => {
      const observerSpy = subscribeSpyTo(component.locationSelected);

      const tasksLink = fixture.debugElement.query(
        By.css('[data-testid=navigation-menu] > [data-testid=navigation-tasks-link]')
      ).nativeElement!;

      tasksLink.click();

      expect(observerSpy.getLastValue()).toBe('tasks');
    });
  });

  describe('output: taskCreation', () => {
    it('should emit an event to create a new task', () => {
      const observerSpy = subscribeSpyTo(component.taskCreation);

      const newTaskButton: HTMLButtonElement = fixture.debugElement.query(By.css('[data-testid=button-new-task]'))
        .nativeElement!;

      newTaskButton.click();

      expect(observerSpy.receivedNext()).toBeTruthy();
    });
  });
});
