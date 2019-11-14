import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTablasGeneralesComponent } from './plan-tablas-generales.component';

describe('PlanTablasGeneralesComponent', () => {
  let component: PlanTablasGeneralesComponent;
  let fixture: ComponentFixture<PlanTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
