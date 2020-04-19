import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-deleted',
  templateUrl: './board-deleted.component.html',
  styleUrls: ['./board-deleted.component.css']
})
export class BoardDeletedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BoardDeletedComponent>, @Inject(MAT_DIALOG_DATA) public info: any) { }

  ngOnInit() {
    
  }

}
