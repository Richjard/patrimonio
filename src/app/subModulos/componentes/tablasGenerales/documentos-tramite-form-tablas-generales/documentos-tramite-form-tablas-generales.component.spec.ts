import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosTramiteFormTablasGeneralesComponent } from './documentos-tramite-form-tablas-generales.component';

describe('DocumentosTramiteFormTablasGeneralesComponent', () => {
  let component: DocumentosTramiteFormTablasGeneralesComponent;
  let fixture: ComponentFixture<DocumentosTramiteFormTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosTramiteFormTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosTramiteFormTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
