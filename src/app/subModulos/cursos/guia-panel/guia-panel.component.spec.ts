import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaPanelComponent } from './guia-panel.component';

describe('GuiaPanelComponent', () => {
  let component: GuiaPanelComponent;
  let fixture: ComponentFixture<GuiaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
