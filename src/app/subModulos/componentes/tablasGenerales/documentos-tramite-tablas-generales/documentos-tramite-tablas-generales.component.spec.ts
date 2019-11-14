import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosTramiteTablasGeneralesComponent } from './documentos-tramite-tablas-generales.component';

describe('DocumentosTramiteTablasGeneralesComponent', () => {
  let component: DocumentosTramiteTablasGeneralesComponent;
  let fixture: ComponentFixture<DocumentosTramiteTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosTramiteTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosTramiteTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
