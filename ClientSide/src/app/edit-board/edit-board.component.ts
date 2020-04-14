import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {CanvasWhiteboardComponent, CanvasWhiteboardService, CanvasWhiteboardShapeService, CircleShape, RectangleShape, CanvasWhiteboardShape, CanvasWhiteboardPoint, CanvasWhiteboardShapeOptions, CanvasWhiteboardUpdate} from 'ng2-canvas-whiteboard';
import { ConfigService } from '../config.service';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnInit, OnDestroy {
  @ViewChild('canvasWhiteboard', {static: true}) canvasWhiteboard: CanvasWhiteboardComponent;
  usersTable = true;
  historyTable = true;
  board;
  lineWidth = 5;
  updates = [];
  users = [];
  intervalCheck;
  // currUpdate = 0; [ngClass]="{'danger-zone':i>this.currUpdate}"

  constructor(private api: ApiService, private _canvasWhiteboardService: CanvasWhiteboardService, private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService, private router: Router, private location: Location, private route: ActivatedRoute, private config: ConfigService) {
    
  }

  ngOnInit() {
    this.board = this.api.getBoard();
    if(!this.board) {
      this.router.navigate(['404']);
    }

    //i'm active

    this.users = JSON.parse(this.api.getBoard().users);
    this.users.push(this.api.getBoard().owner);

    if (this.api.getBoard().json_board) {
      this.updates = JSON.parse(this.api.getBoard().json_board);
    }
  }

  ngOnDestroy() {
    /* if (this.intervalCheck) {
      clearInterval(this.intervalCheck);
    } */
  }

  hideUpdates(index: number) {
    event.preventDefault();
    // this.currUpdate = index+1;
    this.updates = this.updates.slice(0, index);
    this.saveCanvas();
  }

  hideUpdate(index: number) {
    // this.currUpdate = index+1;
    this.updates.splice(index, 1);
    this.saveCanvas();
  }

  historyChanged(bool) {
    this.historyTable = bool;
  }

  usersChanged(bool) {
    this.usersTable = bool;
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
    this.location.back();
  }

  markShapes(index) {
    this.updates[index].markShape();
  }
  
  unmarkShapes(index) {
    this.updates[index].unmark();
  }
}