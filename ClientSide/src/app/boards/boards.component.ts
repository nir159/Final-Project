import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { PagerService } from '../pager.service';
import { ApiService } from '../api.service';
import { JsonPipe } from '@angular/common';

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
  user = localStorage.getItem('currentUser');
  owner = "";

  constructor(private api: ApiService, private config: ConfigService, private pagerService: PagerService) { }

  ngOnInit() {
    this.boards = this.config.getConfig().boards;
    this.resetBoards();
  }

  resetBoards() {
    this.api.getId(JSON.parse(localStorage.getItem('currentUser')).email).subscribe(
      data => {
        this.owner = data[0].first_name + " " + data[0].last_name;
        this.api.getBoards(data[0].id).subscribe(
          res => {
            this.allItems = res;
          },
          error => {
            this.allItems = this.boards.boardslist;
            console.log(error);
          }).add(() => {
            this.setPage(1);
        });
      },
      error => {
        this.allItems = this.boards.boardslist;
        this.owner = "You";
        console.log(error);
        this.setPage(1);
    });
  }

  setPage(pageNumber: number) {
    // create a pager
    this.pager = this.pagerService.getPager(this.allItems.length, pageNumber, this.pageSize);
    this.pages = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
