import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosTablasGeneralesComponent } from './modelos-tablas-generales.component';

describe('ModelosTablasGeneralesComponent', () => {
  let component: ModelosTablasGeneralesComponent;
  let fixture: ComponentFixture<ModelosTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelosTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelosTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
