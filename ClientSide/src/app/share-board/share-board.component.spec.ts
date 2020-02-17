import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareBoardComponent } from './share-board.component';

describe('ShareBoardComponent', () => {
  let component: ShareBoardComponent;
  let fixture: ComponentFixture<ShareBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
