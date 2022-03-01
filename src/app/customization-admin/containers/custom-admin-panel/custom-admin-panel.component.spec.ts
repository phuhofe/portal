import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAdminPanelComponent } from './custom-admin-panel.component';

describe('CustomAdminPanelComponent', () => {
  let component: CustomAdminPanelComponent;
  let fixture: ComponentFixture<CustomAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAdminPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
