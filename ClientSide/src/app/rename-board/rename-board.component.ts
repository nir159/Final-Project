import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-rename-board',
  templateUrl: './rename-board.component.html',
  styleUrls: ['./rename-board.component.css']
})
export class RenameBoardComponent implements OnInit {

  name = "";
  desc = "";
  users = [];
  onUser = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<RenameBoardComponent>, @Inject(MAT_DIALOG_DATA) public board: any) {
    board = board.board;
    this.name = board.name;
    this.desc = board.desc;
    this.users = JSON.parse(board.users);
  }

  ngOnInit() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeUser(i) {
    this.onUser.emit(this.users[i]);
    this.users.splice(i, 1);
  }
}
