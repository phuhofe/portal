import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSettingsComponent } from './save-settings.component';

describe('SaveSettingsComponent', () => {
  let component: SaveSettingsComponent;
  let fixture: ComponentFixture<SaveSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
