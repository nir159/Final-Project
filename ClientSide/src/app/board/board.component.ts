import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: any;
  @Output() resetBoards = new EventEmitter();

  constructor(private api: ApiService, private config: ConfigService) { }

  ngOnInit() {
  }
  
  removeBoard() {
    let list = this.config.getConfig().boards.boardslist;
    list.splice(list.indexOf(this.board), 1);
    /*this.api.removeBoard(localStorage.getItem('currentUser'), board).subscribe(
      data => {
        this.resetBoards.emit();
      },
      error => {
        console.log(error);
      });*/
  }

  shareBoard() {
    /*this.api.shareBoard(localStorage.getItem('currentUser'), targetUser, boardId, msg).subscribe(
      data => {
        this.resetBoards.emit();
      },
      error => {
        console.log(error);
      });*/
  }
}
