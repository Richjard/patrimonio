import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenSustitutorioComponent } from './examen-sustitutorio.component';

describe('ExamenSustitutorioComponent', () => {
  let component: ExamenSustitutorioComponent;
  let fixture: ComponentFixture<ExamenSustitutorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenSustitutorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenSustitutorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
