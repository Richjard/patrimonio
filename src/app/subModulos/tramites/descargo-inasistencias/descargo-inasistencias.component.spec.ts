import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargoInasistenciasComponent } from './descargo-inasistencias.component';

describe('DescargoInasistenciasComponent', () => {
  let component: DescargoInasistenciasComponent;
  let fixture: ComponentFixture<DescargoInasistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargoInasistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargoInasistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
