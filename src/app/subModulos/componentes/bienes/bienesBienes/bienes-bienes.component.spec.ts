import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienesBienesComponent } from './bienes-bienes.component';

describe('BienesBienesComponent', () => {
  let component: BienesBienesComponent;
  let fixture: ComponentFixture<BienesBienesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienesBienesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienesBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
