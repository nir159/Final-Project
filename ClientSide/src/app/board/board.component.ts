import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';
import { MatDialog } from '@angular/material/dialog';

import { RenameBoardComponent } from '../rename-board/rename-board.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: any;
  @Output() resetBoards = new EventEmitter();
  @Input() owner: any;
  notOwner = true;

  constructor(private api: ApiService, private config: ConfigService, public dialog: MatDialog) { }

  ngOnInit() {
    this.notOwner = false;//JSON.parse(localStorage.getItem('currentUser')).email.split('@')[0] != this.owner;

    this.api.getBoardById(this.board.id).subscribe(
      data => {
        this.board = data;
      },
      error => {
        console.log(error);
    });
  }
  
  removeBoard() {
    this.api.removeBoard(this.board.owner, this.board.id).subscribe(
      data => {
        this.resetBoards.emit();
      },
      error => {
        let list = this.config.getConfig().boards.boardslist;
        list.splice(list.indexOf(this.board), 1);
        console.log(error);
        this.resetBoards.emit();
    });
  }

  setBoard() {
    this.api.setBoard(this.board);
  }

  openRename() {
    let dialogRef = this.dialog.open(RenameBoardComponent, {
      width: '250px',
      data: {name: this.board}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Time to rename if name was choosen');
      ;
    });
  }
}
