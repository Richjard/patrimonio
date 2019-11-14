import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplazamientoBienesComponent } from './desplazamiento-bienes.component';

describe('DesplazamientoBienesComponent', () => {
  let component: DesplazamientoBienesComponent;
  let fixture: ComponentFixture<DesplazamientoBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplazamientoBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplazamientoBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
