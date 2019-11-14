import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosTablasGeneralesComponent } from './documentos-tablas-generales.component';

describe('DocumentosTablasGeneralesComponent', () => {
  let component: DocumentosTablasGeneralesComponent;
  let fixture: ComponentFixture<DocumentosTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
