import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  files = ["Test"];
  fileName='';

  constructor() { }

  ngOnInit() {
  }

  createFile() {
    this.files.push(this.fileName);
    this.fileName = '';
  }

  removeFile(file: string) {
      this.files.splice(this.files.indexOf(file), 1);
  }
}
