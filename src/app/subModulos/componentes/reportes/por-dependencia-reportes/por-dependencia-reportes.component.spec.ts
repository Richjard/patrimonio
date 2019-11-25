import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorDependenciaReportesComponent } from './por-dependencia-reportes.component';

describe('PorDependenciaReportesComponent', () => {
  let component: PorDependenciaReportesComponent;
  let fixture: ComponentFixture<PorDependenciaReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorDependenciaReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorDependenciaReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
