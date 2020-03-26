import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardObjectComponent } from './board-object.component';

describe('BoardObjectComponent', () => {
  let component: BoardObjectComponent;
  let fixture: ComponentFixture<BoardObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
