import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposTablasGeneralesComponent } from './tipos-tablas-generales.component';

describe('TiposTablasGeneralesComponent', () => {
  let component: TiposTablasGeneralesComponent;
  let fixture: ComponentFixture<TiposTablasGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposTablasGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposTablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
