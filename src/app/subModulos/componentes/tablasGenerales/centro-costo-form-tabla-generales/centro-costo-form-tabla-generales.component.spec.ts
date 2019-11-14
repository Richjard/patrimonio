import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCostoFormTablaGeneralesComponent } from './centro-costo-form-tabla-generales.component';

describe('CentroCostoFormTablaGeneralesComponent', () => {
  let component: CentroCostoFormTablaGeneralesComponent;
  let fixture: ComponentFixture<CentroCostoFormTablaGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroCostoFormTablaGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCostoFormTablaGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
