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

  constructor(private api: ApiService, private config: ConfigService) { }

  ngOnInit() {
  }
  
  removeBoard() {
    let list = this.config.getConfig().boards.boardslist;
    list.splice(list.indexOf(this.board), 1);
    // this.api.removeBoard(user, board);
  }

  shareBoard() {
    // this.api.shareBoard(srcUser, targetUser, boardId, msg);
  }
}
