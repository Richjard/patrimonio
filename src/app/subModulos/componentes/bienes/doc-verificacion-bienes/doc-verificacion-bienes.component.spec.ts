import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificacionBienesComponent } from './doc-verificacion-bienes.component';

describe('DocVerificacionBienesComponent', () => {
  let component: DocVerificacionBienesComponent;
  let fixture: ComponentFixture<DocVerificacionBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificacionBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificacionBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
