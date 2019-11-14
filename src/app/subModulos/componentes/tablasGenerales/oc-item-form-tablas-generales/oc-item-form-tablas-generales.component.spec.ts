import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcItemFormTablasGeneralesComponent } from './oc-item-form-tablas-generales.component';

describe('OcItemFormTablasGeneralesComponent', () => {
  let component: OcItemFormTablasGeneralesComponent;
  let fixture: ComponentFixture<OcItemFormTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcItemFormTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcItemFormTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
