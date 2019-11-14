import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcItemTablasGeneralesComponent } from './oc-item-tablas-generales.component';

describe('OcItemTablasGeneralesComponent', () => {
  let component: OcItemTablasGeneralesComponent;
  let fixture: ComponentFixture<OcItemTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcItemTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcItemTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
