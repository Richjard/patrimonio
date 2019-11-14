import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosFormTablasGeneralesComponent } from './modelos-form-tablas-generales.component';

describe('ModelosFormTablasGeneralesComponent', () => {
  let component: ModelosFormTablasGeneralesComponent;
  let fixture: ComponentFixture<ModelosFormTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelosFormTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelosFormTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
