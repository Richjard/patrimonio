import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienesFormBienesComponent } from './bienes-form-bienes.component';

describe('BienesFormBienesComponent', () => {
  let component: BienesFormBienesComponent;
  let fixture: ComponentFixture<BienesFormBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienesFormBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienesFormBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
