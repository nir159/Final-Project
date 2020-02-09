import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {CanvasWhiteboardComponent} from 'ng2-canvas-whiteboard';
import { ConfigService } from '../config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnInit {
  @ViewChild('canvasWhiteboard', {static: true}) canvasWhiteboard: CanvasWhiteboardComponent;
  board;
  lineWidth = 5;
  moves = [];

  onCanvasClear(){
    let context = this.canvasWhiteboard.context;
    console.log(context);
  }

  sendBatchUpdate(info) {
    this.moves.push(info);
    console.log(info);
  }

  onCanvasUndo(e) {
    console.log(e);
  }

  constructor(private router: Router, private location: Location, private route: ActivatedRoute, private config: ConfigService) { }

  ngOnInit() {
    this.board = this.config.getBoardById(+this.route.snapshot.paramMap.get('id'));
    if(!this.board) {
      this.router.navigate(['404']);
    }
  }

  goBack() {
    this.location.back();
  }
}
