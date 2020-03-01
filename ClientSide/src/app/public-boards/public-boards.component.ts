import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-public-boards',
  templateUrl: './public-boards.component.html',
  styleUrls: ['./public-boards.component.css']
})
export class PublicBoardsComponent implements OnInit {

  publicBoards;

  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.publicBoards = this.getImages();
  }

  getImages() {
    return this.config.getConfig().gallery;
  }
}
