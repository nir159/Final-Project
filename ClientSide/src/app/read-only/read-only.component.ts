import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-read-only',
  templateUrl: './read-only.component.html',
  styleUrls: ['./read-only.component.css']
})
export class ReadOnlyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReadOnlyComponent>) { }

  ngOnInit() {
    
  }

}
