import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasFormTablasGeneralesComponent } from './marcas-form-tablas-generales.component';

describe('MarcasFormTablasGeneralesComponent', () => {
  let component: MarcasFormTablasGeneralesComponent;
  let fixture: ComponentFixture<MarcasFormTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcasFormTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasFormTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
