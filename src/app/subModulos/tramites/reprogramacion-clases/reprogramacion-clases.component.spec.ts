import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprogramacionClasesComponent } from './reprogramacion-clases.component';

describe('ReprogramacionClasesComponent', () => {
  let component: ReprogramacionClasesComponent;
  let fixture: ComponentFixture<ReprogramacionClasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprogramacionClasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprogramacionClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
