import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDetallesUbicacionComponent } from './local-detalles-ubicacion.component';

describe('LocalDetallesUbicacionComponent', () => {
  let component: LocalDetallesUbicacionComponent;
  let fixture: ComponentFixture<LocalDetallesUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalDetallesUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDetallesUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
