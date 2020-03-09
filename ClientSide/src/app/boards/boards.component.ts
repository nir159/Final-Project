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
  pageSize = 6;
  pager: any = {};
  user = JSON.parse(localStorage.getItem('currentUser'));
  owner = "";

  constructor(private api: ApiService, private config: ConfigService, private pagerService: PagerService) { }

  ngOnInit() {
    this.boards = this.config.getConfig().boards;
    this.resetBoards();
  }

  resetBoards() {
    this.api.getAllBoards().subscribe(
      data => {
        let e = JSON.parse(localStorage.getItem('currentUser')).email;
        JSON.parse(JSON.stringify(data)).forEach(board => {
          console.log(board.users);
          if (e == board.owner || board.users.include(e)) {
            console.log(board);
            this.allItems.push(data);
          }
        });
        this.owner = JSON.parse(localStorage.getItem('currentUser')).first_name + " " + JSON.parse(localStorage.getItem('currentUser')).last_name;
      },
      error => {
        this.allItems = this.boards.boardslist;
        console.log(error);
      }).add(() => {
        this.setPage(1);
    });
  }

  setPage(pageNumber: number) {
    // create a pager
    this.pager = this.pagerService.getPager(this.allItems.length, pageNumber, this.pageSize);
    this.pages = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
