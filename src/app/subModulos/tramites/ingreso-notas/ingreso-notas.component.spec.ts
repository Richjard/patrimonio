import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoNotasComponent } from './ingreso-notas.component';

describe('IngresoNotasComponent', () => {
  let component: IngresoNotasComponent;
  let fixture: ComponentFixture<IngresoNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
