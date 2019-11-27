import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorPlanContableComponent } from './por-plan-contable.component';

describe('PorPlanContableComponent', () => {
  let component: PorPlanContableComponent;
  let fixture: ComponentFixture<PorPlanContableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorPlanContableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorPlanContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
