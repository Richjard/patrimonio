import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinaFormUbicacionComponent } from './oficina-form-ubicacion.component';

describe('OficinaFormUbicacionComponent', () => {
  let component: OficinaFormUbicacionComponent;
  let fixture: ComponentFixture<OficinaFormUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OficinaFormUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OficinaFormUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
