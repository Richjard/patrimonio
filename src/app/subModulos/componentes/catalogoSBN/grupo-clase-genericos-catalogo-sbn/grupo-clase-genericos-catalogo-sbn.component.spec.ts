import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoClaseGenericosCatalogoSBNComponent } from './grupo-clase-genericos-catalogo-sbn.component';

describe('GrupoClaseGenericosCatalogoSBNComponent', () => {
  let component: GrupoClaseGenericosCatalogoSBNComponent;
  let fixture: ComponentFixture<GrupoClaseGenericosCatalogoSBNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoClaseGenericosCatalogoSBNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoClaseGenericosCatalogoSBNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
