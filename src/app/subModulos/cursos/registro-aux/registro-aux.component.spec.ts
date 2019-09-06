import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAuxComponent } from './registro-aux.component';

describe('RegistroAuxComponent', () => {
  let component: RegistroAuxComponent;
  let fixture: ComponentFixture<RegistroAuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
