import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosFormTablaGeneralesComponent } from './empleados-form-tabla-generales.component';

describe('EmpleadosFormTablaGeneralesComponent', () => {
  let component: EmpleadosFormTablaGeneralesComponent;
  let fixture: ComponentFixture<EmpleadosFormTablaGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosFormTablaGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosFormTablaGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
