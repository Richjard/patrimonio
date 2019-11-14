import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFormTablasGeneralesComponent } from './plan-form-tablas-generales.component';

describe('PlanFormTablasGeneralesComponent', () => {
  let component: PlanFormTablasGeneralesComponent;
  let fixture: ComponentFixture<PlanFormTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanFormTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanFormTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
