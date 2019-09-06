import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprogramacionExamenesComponent } from './reprogramacion-examenes.component';

describe('ReprogramacionExamenesComponent', () => {
  let component: ReprogramacionExamenesComponent;
  let fixture: ComponentFixture<ReprogramacionExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprogramacionExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprogramacionExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
