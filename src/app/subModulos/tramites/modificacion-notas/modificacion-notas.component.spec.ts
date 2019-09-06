import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionNotasComponent } from './modificacion-notas.component';

describe('ModificacionNotasComponent', () => {
  let component: ModificacionNotasComponent;
  let fixture: ComponentFixture<ModificacionNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
