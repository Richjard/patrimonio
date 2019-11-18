import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaFormBienesComponent } from './baja-form-bienes.component';

describe('BajaFormBienesComponent', () => {
  let component: BajaFormBienesComponent;
  let fixture: ComponentFixture<BajaFormBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaFormBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaFormBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
