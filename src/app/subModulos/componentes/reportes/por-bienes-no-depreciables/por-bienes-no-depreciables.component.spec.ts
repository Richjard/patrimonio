import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorBienesNoDepreciablesComponent } from './por-bienes-no-depreciables.component';

describe('PorBienesNoDepreciablesComponent', () => {
  let component: PorBienesNoDepreciablesComponent;
  let fixture: ComponentFixture<PorBienesNoDepreciablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorBienesNoDepreciablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorBienesNoDepreciablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
