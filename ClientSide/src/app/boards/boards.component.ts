import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { PagerService } from '../pager.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  boards;
  allItems: any;
  pages: any[];
  pageSize = 3;
  pager: any = {};
  

  constructor(private api: ApiService, private config: ConfigService, private pagerService: PagerService) { }

  ngOnInit() {
    this.boards = this.getBoards();
    this.api.getBoards(localStorage.getItem('currentUser')).subscribe(
      data => {
        this.allItems = data;
      },
      error => {
        this.allItems = this.boards.boardslist;
        console.log(error);
      }).add(() => {
        this.setPage(1);
    });
  }

  

  getBoards() {
    return this.config.getConfig().boards;
  }

  setPage(pageNumber: number) {
    // create a pager
    this.pager = this.pagerService.getPager(this.allItems.length, pageNumber, this.pageSize);
    this.pages = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
