import { Component, OnInit, Inject } from '@angular/core';
import { RenameBoardComponent } from '../rename-board/rename-board.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rename-user',
  templateUrl: './rename-user.component.html',
  styleUrls: ['./rename-user.component.css']
})
export class RenameUserComponent implements OnInit {

  first = "";
  last = "";

  constructor(public dialogRef: MatDialogRef<RenameUserComponent>, @Inject(MAT_DIALOG_DATA) public name: any) {
    this.first = name.first;
    this.last = name.last;
  }

  ngOnInit() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
