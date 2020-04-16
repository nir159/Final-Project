import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-rename-board',
  templateUrl: './rename-board.component.html',
  styleUrls: ['./rename-board.component.css']
})
export class RenameBoardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RenameBoardComponent>, @Inject(MAT_DIALOG_DATA) public board: any) { }

  ngOnInit() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
