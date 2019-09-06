import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNotasComponent } from './gestion-notas.component';

describe('GestionNotasComponent', () => {
  let component: GestionNotasComponent;
  let fixture: ComponentFixture<GestionNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
