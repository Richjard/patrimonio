import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciacionFormBienesComponent } from './depreciacion-form-bienes.component';

describe('DepreciacionFormBienesComponent', () => {
  let component: DepreciacionFormBienesComponent;
  let fixture: ComponentFixture<DepreciacionFormBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepreciacionFormBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepreciacionFormBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
