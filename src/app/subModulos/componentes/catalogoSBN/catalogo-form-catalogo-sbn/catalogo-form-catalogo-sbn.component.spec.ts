import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoFormCatalogoSBNComponent } from './catalogo-form-catalogo-sbn.component';

describe('CatalogoFormCatalogoSBNComponent', () => {
  let component: CatalogoFormCatalogoSBNComponent;
  let fixture: ComponentFixture<CatalogoFormCatalogoSBNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoFormCatalogoSBNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoFormCatalogoSBNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
