import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcTablasGeneralesComponent } from './oc-tablas-generales.component';

describe('OcTablasGeneralesComponent', () => {
  let component: OcTablasGeneralesComponent;
  let fixture: ComponentFixture<OcTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
