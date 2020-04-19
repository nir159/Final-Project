import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDeletedComponent } from './board-deleted.component';

describe('BoardDeletedComponent', () => {
  let component: BoardDeletedComponent;
  let fixture: ComponentFixture<BoardDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
