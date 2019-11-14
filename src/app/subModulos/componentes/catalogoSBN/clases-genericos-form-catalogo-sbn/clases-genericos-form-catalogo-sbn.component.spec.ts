import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesGenericosFormCatalogoSBNComponent } from './clases-genericos-form-catalogo-sbn.component';

describe('ClasesGenericosFormCatalogoSBNComponent', () => {
  let component: ClasesGenericosFormCatalogoSBNComponent;
  let fixture: ComponentFixture<ClasesGenericosFormCatalogoSBNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesGenericosFormCatalogoSBNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesGenericosFormCatalogoSBNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
