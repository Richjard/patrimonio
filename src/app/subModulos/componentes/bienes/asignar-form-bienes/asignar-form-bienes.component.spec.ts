import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarFormBienesComponent } from './asignar-form-bienes.component';

describe('AsignarFormBienesComponent', () => {
  let component: AsignarFormBienesComponent;
  let fixture: ComponentFixture<AsignarFormBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarFormBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarFormBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
