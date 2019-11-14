import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoClaseGenericosFormCatalogoSBNComponent } from './grupo-clase-genericos-form-catalogo-sbn.component';

describe('GrupoClaseGenericosFormCatalogoSBNComponent', () => {
  let component: GrupoClaseGenericosFormCatalogoSBNComponent;
  let fixture: ComponentFixture<GrupoClaseGenericosFormCatalogoSBNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoClaseGenericosFormCatalogoSBNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoClaseGenericosFormCatalogoSBNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
