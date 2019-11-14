import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCostoEmpleadoTablaGeneralesComponent } from './centro-costo-empleado-tabla-generales.component';

describe('CentroCostoEmpleadoTablaGeneralesComponent', () => {
  let component: CentroCostoEmpleadoTablaGeneralesComponent;
  let fixture: ComponentFixture<CentroCostoEmpleadoTablaGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroCostoEmpleadoTablaGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCostoEmpleadoTablaGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
