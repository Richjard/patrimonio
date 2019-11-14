import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposFormTablasGeneralesComponent } from './tipos-form-tablas-generales.component';

describe('TiposFormTablasGeneralesComponent', () => {
  let component: TiposFormTablasGeneralesComponent;
  let fixture: ComponentFixture<TiposFormTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposFormTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposFormTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
