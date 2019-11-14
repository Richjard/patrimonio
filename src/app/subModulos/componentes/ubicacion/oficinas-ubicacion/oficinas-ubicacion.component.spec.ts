import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinasUbicacionComponent } from './oficinas-ubicacion.component';

describe('OficinasUbicacionComponent', () => {
  let component: OficinasUbicacionComponent;
  let fixture: ComponentFixture<OficinasUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OficinasUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OficinasUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
