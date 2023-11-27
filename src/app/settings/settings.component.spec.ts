import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  describe('template', () => {
    it('should display a tab group', () => {
      const tabGroup = fixture.debugElement.query(By.css('[data-testid=tab-group]'));
      expect(tabGroup).toBeTruthy();
    });

    it('should display a tab for tags', async () => {
      const tabGroup = await loader.getHarness(MatTabGroupHarness);
      await tabGroup.selectTab({ label: 'Tags' });

      const selectedTab = await tabGroup.getSelectedTab();
      const selectedTabLabel = await selectedTab.getLabel();
      expect(selectedTabLabel).toBe('Tags');
    });
  });
});
