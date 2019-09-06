import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagInputsComponent } from './tag-inputs.component';

describe('TagInputsComponent', () => {
  let component: TagInputsComponent;
  let fixture: ComponentFixture<TagInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
