import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBoardsComponent } from './public-boards.component';

describe('PublicBoardsComponent', () => {
  let component: PublicBoardsComponent;
  let fixture: ComponentFixture<PublicBoardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicBoardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
