import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorEmpleadoReporteComponent } from './por-empleado-reporte.component';

describe('PorEmpleadoReporteComponent', () => {
  let component: PorEmpleadoReporteComponent;
  let fixture: ComponentFixture<PorEmpleadoReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorEmpleadoReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorEmpleadoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
