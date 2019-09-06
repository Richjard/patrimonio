import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproClasesComponent } from './repro-clases.component';

describe('ReproClasesComponent', () => {
  let component: ReproClasesComponent;
  let fixture: ComponentFixture<ReproClasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproClasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
