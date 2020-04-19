import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.css']
})
export class NewBoardComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<NewBoardComponent>, @Inject(MAT_DIALOG_DATA) public info: any) { }

  ngOnInit() {
    
  }

}
