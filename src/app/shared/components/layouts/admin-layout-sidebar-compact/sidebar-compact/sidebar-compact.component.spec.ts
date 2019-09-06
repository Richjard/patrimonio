import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCompactComponent } from './sidebar-compact.component';

describe('SidebarCompactComponent', () => {
  let component: SidebarCompactComponent;
  let fixture: ComponentFixture<SidebarCompactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCompactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
