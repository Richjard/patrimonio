import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorDepenSubdepenReporteComponent } from './por-depen-subdepen-reporte.component';

describe('PorDepenSubdepenReporteComponent', () => {
  let component: PorDepenSubdepenReporteComponent;
  let fixture: ComponentFixture<PorDepenSubdepenReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorDepenSubdepenReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorDepenSubdepenReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
