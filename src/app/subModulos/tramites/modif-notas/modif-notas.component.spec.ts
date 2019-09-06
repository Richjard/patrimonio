import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifNotasComponent } from './modif-notas.component';

describe('ModifNotasComponent', () => {
  let component: ModifNotasComponent;
  let fixture: ComponentFixture<ModifNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
