import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesControlComponent } from './estudiantes-control.component';

describe('EstudiantesControlComponent', () => {
  let component: EstudiantesControlComponent;
  let fixture: ComponentFixture<EstudiantesControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
