import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAsistenciaComponent } from './gestion-asistencia.component';

describe('GestionAsistenciaComponent', () => {
  let component: GestionAsistenciaComponent;
  let fixture: ComponentFixture<GestionAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
