import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalesUbicacionComponent } from './locales-ubicacion.component';

describe('LocalesUbicacionComponent', () => {
  let component: LocalesUbicacionComponent;
  let fixture: ComponentFixture<LocalesUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalesUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalesUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
