import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerificacionFormBienesComponent } from './doc-verificacion-form-bienes.component';

describe('DocVerificacionFormBienesComponent', () => {
  let component: DocVerificacionFormBienesComponent;
  let fixture: ComponentFixture<DocVerificacionFormBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVerificacionFormBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerificacionFormBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
