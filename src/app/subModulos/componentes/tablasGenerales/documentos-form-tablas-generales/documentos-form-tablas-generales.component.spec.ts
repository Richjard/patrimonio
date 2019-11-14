import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosFormTablasGeneralesComponent } from './documentos-form-tablas-generales.component';

describe('DocumentosFormTablasGeneralesComponent', () => {
  let component: DocumentosFormTablasGeneralesComponent;
  let fixture: ComponentFixture<DocumentosFormTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosFormTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosFormTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
