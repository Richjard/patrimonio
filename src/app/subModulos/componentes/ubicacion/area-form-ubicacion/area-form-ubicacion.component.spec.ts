import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFormUbicacionComponent } from './area-form-ubicacion.component';

describe('AreaFormUbicacionComponent', () => {
  let component: AreaFormUbicacionComponent;
  let fixture: ComponentFixture<AreaFormUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaFormUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaFormUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
