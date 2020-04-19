import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.css']
})
export class AreYouSureComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AreYouSureComponent>) { }

  ngOnInit() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
