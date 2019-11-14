import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoNoPatrimonialTablasGeneralesComponent } from './catalogo-no-patrimonial-tablas-generales.component';

describe('CatalogoNoPatrimonialTablasGeneralesComponent', () => {
  let component: CatalogoNoPatrimonialTablasGeneralesComponent;
  let fixture: ComponentFixture<CatalogoNoPatrimonialTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoNoPatrimonialTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoNoPatrimonialTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
