import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCostoEmpleadoFormTablaGeneralesComponent } from './centro-costo-empleado-form-tabla-generales.component';

describe('CentroCostoEmpleadoFormTablaGeneralesComponent', () => {
  let component: CentroCostoEmpleadoFormTablaGeneralesComponent;
  let fixture: ComponentFixture<CentroCostoEmpleadoFormTablaGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroCostoEmpleadoFormTablaGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCostoEmpleadoFormTablaGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
