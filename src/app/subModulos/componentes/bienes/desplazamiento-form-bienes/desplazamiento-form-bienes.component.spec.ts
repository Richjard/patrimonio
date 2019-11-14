import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplazamientoFormBienesComponent } from './desplazamiento-form-bienes.component';

describe('DesplazamientoFormBienesComponent', () => {
  let component: DesplazamientoFormBienesComponent;
  let fixture: ComponentFixture<DesplazamientoFormBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplazamientoFormBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplazamientoFormBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
