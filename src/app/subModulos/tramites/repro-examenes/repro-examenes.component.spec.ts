import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproExamenesComponent } from './repro-examenes.component';

describe('ReproExamenesComponent', () => {
  let component: ReproExamenesComponent;
  let fixture: ComponentFixture<ReproExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
