import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-rename-board',
  templateUrl: './rename-board.component.html',
  styleUrls: ['./rename-board.component.css']
})
export class RenameBoardComponent implements OnInit {

  name = "";
  desc = "";
  users = [];
  permissions = [];
  onUser = new EventEmitter();

  constructor(private api: ApiService, public dialogRef: MatDialogRef<RenameBoardComponent>, @Inject(MAT_DIALOG_DATA) public board: any) {
    this.board = board.board;
    this.name = this.board.name;
    this.desc = this.board.desc;
    this.users = JSON.parse(this.board.users);
    this.permissions = JSON.parse(this.board.permissions);
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

  permissionsChanged(user) {
    if (this.permissions[this.users.indexOf(user)] == 'r') {
      this.permissions[this.users.indexOf(user)] = 'w';
    } else {
      this.permissions[this.users.indexOf(user)] = 'r';
    }
    this.board.permissions = JSON.stringify(this.permissions);
    this.api.updateBoard(this.board).subscribe(
      data => {
        
      },
      error => {
        console.log(error);
    });
  }
}
