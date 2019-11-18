import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverFormBienesComponent } from './mover-form-bienes.component';

describe('MoverFormBienesComponent', () => {
  let component: MoverFormBienesComponent;
  let fixture: ComponentFixture<MoverFormBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoverFormBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoverFormBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
