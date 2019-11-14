import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependeciaUbicacionComponent } from './dependecia-ubicacion.component';

describe('DependeciaUbicacionComponent', () => {
  let component: DependeciaUbicacionComponent;
  let fixture: ComponentFixture<DependeciaUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependeciaUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependeciaUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
