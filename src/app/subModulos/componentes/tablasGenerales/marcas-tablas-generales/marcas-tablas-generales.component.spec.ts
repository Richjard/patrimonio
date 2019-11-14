import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasTablasGeneralesComponent } from './marcas-tablas-generales.component';

describe('MarcasTablasGeneralesComponent', () => {
  let component: MarcasTablasGeneralesComponent;
  let fixture: ComponentFixture<MarcasTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcasTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
