import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesGenericosCatalogoSBNComponent } from './clases-genericos-catalogo-sbn.component';

describe('ClasesGenericosCatalogoSBNComponent', () => {
  let component: ClasesGenericosCatalogoSBNComponent;
  let fixture: ComponentFixture<ClasesGenericosCatalogoSBNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesGenericosCatalogoSBNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesGenericosCatalogoSBNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
