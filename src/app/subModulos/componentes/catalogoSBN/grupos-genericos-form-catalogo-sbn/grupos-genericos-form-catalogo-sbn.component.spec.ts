import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposGenericosFormCatalogoSBNComponent } from './grupos-genericos-form-catalogo-sbn.component';

describe('GruposGenericosFormCatalogoSBNComponent', () => {
  let component: GruposGenericosFormCatalogoSBNComponent;
  let fixture: ComponentFixture<GruposGenericosFormCatalogoSBNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposGenericosFormCatalogoSBNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposGenericosFormCatalogoSBNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
