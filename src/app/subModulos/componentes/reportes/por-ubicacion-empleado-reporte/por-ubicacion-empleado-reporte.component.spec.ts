import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorUbicacionEmpleadoReporteComponent } from './por-ubicacion-empleado-reporte.component';

describe('PorUbicacionEmpleadoReporteComponent', () => {
  let component: PorUbicacionEmpleadoReporteComponent;
  let fixture: ComponentFixture<PorUbicacionEmpleadoReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorUbicacionEmpleadoReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorUbicacionEmpleadoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
