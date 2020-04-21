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
  @Output() deletedBoard = new EventEmitter();
  @Output() onUser = new EventEmitter();
  @Input() owner: any;
  notOwner = true;

  constructor(private api: ApiService, private config: ConfigService, public dialog: MatDialog) { }

  ngOnInit() {
    this.notOwner = JSON.parse(localStorage.getItem('currentUser')).email.split('@')[0] != this.owner;
    this.api.getBoardById(this.board.id).subscribe(
      data => {
        this.board = data;
      },
      error => {
        console.log(error);
    });
  }

  onFileChanged(event) {
    this.api.boardPicture(this.board, event.target.files[0]).subscribe(event => {
      localStorage.setItem('currentBoard', JSON.stringify(event));
      this.resetBoards.emit();
    },
    error => {
      console.log(error);
    });
  }
  
  removeBoard() {
    if (this.notOwner) {
      this.board.users = JSON.parse(this.board.users)
      const index = this.board.users.indexOf(JSON.parse(localStorage.getItem('currentUser')).email);
      if (index > -1) {
        this.board.permissions = JSON.parse(this.board.permissions);
        this.board.permissions.splice(index, 1);
        this.board.permissions = JSON.stringify(this.board.permissions);
        this.board.users.splice(index, 1);
        this.board.users = JSON.stringify(this.board.users);
        this.api.updateBoard(this.board).subscribe(
          data => {
            this.resetBoards.emit();
          },
          error => {
            console.log(error);
        });
      }
    } else {
      this.api.removeBoard(this.board.owner, this.board.id).subscribe(
        data => {
          this.resetBoards.emit();
          this.deletedBoard.emit(this.board);
        },
        error => {
          let list = this.config.getConfig().boards.boardslist;
          list.splice(list.indexOf(this.board), 1);
          console.log(error);
          this.resetBoards.emit();
      });
    }
  }

  setBoard() {
    this.api.setBoard(this.board);
  }

  openRename() {
    let dialogRef = this.dialog.open(RenameBoardComponent, {
      width: '400px',
      height: 'auto',
      data: {board: this.board}
    });

    const sub = dialogRef.componentInstance.onUser.subscribe(msg => {
      this.onUser.emit({email: msg, board: this.board});
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name && result.desc) {
        if (result.name != this.board.name || result.desc != this.board.desc) {
          this.board.name = result.name;
          this.board.desc = result.desc;
          this.api.updateBoard(this.board).subscribe(
            data => {
              this.resetBoards.emit();
            },
            error => {
              console.log(error);
          });
        }
      }
    });
  }
}
