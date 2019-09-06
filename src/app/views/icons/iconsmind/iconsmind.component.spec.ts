import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsmindComponent } from './iconsmind.component';

describe('IconsmindComponent', () => {
  let component: IconsmindComponent;
  let fixture: ComponentFixture<IconsmindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsmindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsmindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
