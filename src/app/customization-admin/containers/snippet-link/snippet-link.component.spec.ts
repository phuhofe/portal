import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetLinkComponent } from './snippet-link.component';

describe('SnippetLinkComponent', () => {
  let component: SnippetLinkComponent;
  let fixture: ComponentFixture<SnippetLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
