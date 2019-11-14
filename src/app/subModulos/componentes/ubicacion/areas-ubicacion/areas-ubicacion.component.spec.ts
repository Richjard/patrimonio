import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasUbicacionComponent } from './areas-ubicacion.component';

describe('AreasUbicacionComponent', () => {
  let component: AreasUbicacionComponent;
  let fixture: ComponentFixture<AreasUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
