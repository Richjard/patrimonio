import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardV3Component } from './dashboard-v3.component';

describe('DashboardV3Component', () => {
  let component: DashboardV3Component;
  let fixture: ComponentFixture<DashboardV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
