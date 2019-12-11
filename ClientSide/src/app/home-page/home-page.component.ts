import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
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
