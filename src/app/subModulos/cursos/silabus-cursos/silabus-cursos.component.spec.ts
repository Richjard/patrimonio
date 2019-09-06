import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SilabusCursosComponent } from './silabus-cursos.component';

describe('SilabusCursosComponent', () => {
  let component: SilabusCursosComponent;
  let fixture: ComponentFixture<SilabusCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilabusCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilabusCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
