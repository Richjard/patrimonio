import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargoInasistComponent } from './descargo-inasist.component';

describe('DescargoInasistComponent', () => {
  let component: DescargoInasistComponent;
  let fixture: ComponentFixture<DescargoInasistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargoInasistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargoInasistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
