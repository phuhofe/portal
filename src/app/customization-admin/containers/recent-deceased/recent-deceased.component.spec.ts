import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentDeceasedComponent } from './recent-deceased.component';

describe('RecentDeceasedComponent', () => {
  let component: RecentDeceasedComponent;
  let fixture: ComponentFixture<RecentDeceasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentDeceasedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentDeceasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
