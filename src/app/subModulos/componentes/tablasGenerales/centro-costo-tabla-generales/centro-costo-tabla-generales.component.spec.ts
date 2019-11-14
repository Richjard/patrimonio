import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCostoTablaGeneralesComponent } from './centro-costo-tabla-generales.component';

describe('CentroCostoTablaGeneralesComponent', () => {
  let component: CentroCostoTablaGeneralesComponent;
  let fixture: ComponentFixture<CentroCostoTablaGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroCostoTablaGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCostoTablaGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
