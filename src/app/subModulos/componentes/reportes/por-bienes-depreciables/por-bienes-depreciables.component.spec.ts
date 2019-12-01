import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorBienesDepreciablesComponent } from './por-bienes-depreciables.component';

describe('PorBienesDepreciablesComponent', () => {
  let component: PorBienesDepreciablesComponent;
  let fixture: ComponentFixture<PorBienesDepreciablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorBienesDepreciablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorBienesDepreciablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
