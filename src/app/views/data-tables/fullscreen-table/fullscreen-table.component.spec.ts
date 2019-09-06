import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenTableComponent } from './fullscreen-table.component';

describe('FullscreenTableComponent', () => {
  let component: FullscreenTableComponent;
  let fixture: ComponentFixture<FullscreenTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullscreenTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
