import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposGenericosCatalogoSBNComponent } from './grupos-genericos-catalogo-sbn.component';

describe('GruposGenericosCatalogoSBNComponent', () => {
  let component: GruposGenericosCatalogoSBNComponent;
  let fixture: ComponentFixture<GruposGenericosCatalogoSBNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposGenericosCatalogoSBNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposGenericosCatalogoSBNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
