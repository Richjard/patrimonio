import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoAsistenciaComponent } from './ingreso-asistencia.component';

describe('IngresoAsistenciaComponent', () => {
  let component: IngresoAsistenciaComponent;
  let fixture: ComponentFixture<IngresoAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
