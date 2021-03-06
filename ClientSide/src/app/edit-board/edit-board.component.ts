import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {CanvasWhiteboardComponent, CanvasWhiteboardService, CanvasWhiteboardShapeService, CircleShape, RectangleShape, CanvasWhiteboardShape, CanvasWhiteboardPoint, CanvasWhiteboardShapeOptions, CanvasWhiteboardUpdate} from 'ng2-canvas-whiteboard';
import { ConfigService } from '../config.service';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnInit, OnDestroy {
  @ViewChild('canvasWhiteboard', {static: true}) canvasWhiteboard: CanvasWhiteboardComponent;
  board;
  lineWidth = 5;
  updates = [];
  users = [];
  intervalCheck;
  allowed;
  // currUpdate = 0; [ngClass]="{'danger-zone':i>this.currUpdate}"

  constructor(private api: ApiService, private _canvasWhiteboardService: CanvasWhiteboardService, private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService, private router: Router, private location: Location, private route: ActivatedRoute, private config: ConfigService) {
    
  }

  ngOnInit() {
    this.board = this.api.getBoard();
    if(!this.board) {
      this.router.navigate(['404']);
    }

    this.users = JSON.parse(this.api.getBoard().users);
    this.users.push(this.api.getBoard().owner);

    if (this.api.getBoard().json_board) {
      this.updates = JSON.parse(this.api.getBoard().json_board);
    }
  }

  ngOnDestroy() {
    
  }

  onCanvasClear() {
    // this.currUpdate = this.updates.length;
  }

  sendUpdate() {
    //this.saveCanvas();
  }
  
  saveCanvas() {
    var saveUpdates = JSON.parse(JSON.stringify(this.updates));
    this.board.json_board = JSON.stringify(saveUpdates);
    this.api.setBoard(this.board);
    this.api.updateBoard(this.board).subscribe(
      data => {

      },
      error => {
        console.log(error);
    });
  }
  
  onCanvasSave(e) {
    this.saveCanvas();
  }

  goBack() {
    this.saveCanvas();
    this.location.back();
  }
}