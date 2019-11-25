import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorDepenSubdepenEmpleReporteComponent } from './por-depen-subdepen-emple-reporte.component';

describe('PorDepenSubdepenEmpleReporteComponent', () => {
  let component: PorDepenSubdepenEmpleReporteComponent;
  let fixture: ComponentFixture<PorDepenSubdepenEmpleReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorDepenSubdepenEmpleReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorDepenSubdepenEmpleReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
