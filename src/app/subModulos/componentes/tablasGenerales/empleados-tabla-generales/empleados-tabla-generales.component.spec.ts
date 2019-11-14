import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosTablaGeneralesComponent } from './empleados-tabla-generales.component';

describe('EmpleadosTablaGeneralesComponent', () => {
  let component: EmpleadosTablaGeneralesComponent;
  let fixture: ComponentFixture<EmpleadosTablaGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosTablaGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosTablaGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
