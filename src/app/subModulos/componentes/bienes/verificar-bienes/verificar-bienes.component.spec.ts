import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarBienesComponent } from './verificar-bienes.component';

describe('VerificarBienesComponent', () => {
  let component: VerificarBienesComponent;
  let fixture: ComponentFixture<VerificarBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
