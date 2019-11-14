import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcFormTablasGeneralesComponent } from './oc-form-tablas-generales.component';

describe('OcFormTablasGeneralesComponent', () => {
  let component: OcFormTablasGeneralesComponent;
  let fixture: ComponentFixture<OcFormTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcFormTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcFormTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
