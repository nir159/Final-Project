import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameBoardComponent } from './rename-board.component';

describe('RenameBoardComponent', () => {
  let component: RenameBoardComponent;
  let fixture: ComponentFixture<RenameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
