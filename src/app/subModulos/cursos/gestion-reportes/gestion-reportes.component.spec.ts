import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReportesComponent } from './gestion-reportes.component';

describe('GestionReportesComponent', () => {
  let component: GestionReportesComponent;
  let fixture: ComponentFixture<GestionReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
