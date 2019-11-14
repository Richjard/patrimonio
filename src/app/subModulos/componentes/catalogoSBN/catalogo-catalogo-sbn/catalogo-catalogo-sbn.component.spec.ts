import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCatalogoSBNComponent } from './catalogo-catalogo-sbn.component';

describe('CatalogoCatalogoSBNComponent', () => {
  let component: CatalogoCatalogoSBNComponent;
  let fixture: ComponentFixture<CatalogoCatalogoSBNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoCatalogoSBNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoCatalogoSBNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
