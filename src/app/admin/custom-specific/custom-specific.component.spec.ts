import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSpecificComponent } from './custom-specific.component';

describe('CustomSpecificComponent', () => {
  let component: CustomSpecificComponent;
  let fixture: ComponentFixture<CustomSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
