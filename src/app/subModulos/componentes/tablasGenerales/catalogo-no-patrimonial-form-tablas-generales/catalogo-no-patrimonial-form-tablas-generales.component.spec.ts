import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoNoPatrimonialFormTablasGeneralesComponent } from './catalogo-no-patrimonial-form-tablas-generales.component';

describe('CatalogoNoPatrimonialFormTablasGeneralesComponent', () => {
  let component: CatalogoNoPatrimonialFormTablasGeneralesComponent;
  let fixture: ComponentFixture<CatalogoNoPatrimonialFormTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoNoPatrimonialFormTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoNoPatrimonialFormTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
