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
export class EditBoardComponent implements OnInit {
  @ViewChild('canvasWhiteboard', {static: true}) canvasWhiteboard: CanvasWhiteboardComponent;
  board;
  lineWidth = 5;
  boardUrl;
  updates = [];
  users = [];
  boardString = "{}";
  // currUpdate = 0; [ngClass]="{'danger-zone':i>this.currUpdate}"

  constructor(private api: ApiService, private _canvasWhiteboardService: CanvasWhiteboardService, private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService, private router: Router, private location: Location, private route: ActivatedRoute, private config: ConfigService) {
    
  }

  ngOnInit() {
    this.board = this.api.getBoard();
    if(!this.board) {
      this.router.navigate(['404']);
    }
    let i = 0;
    let update = [];
    let element;

    //im active

    this.api.getUsers(this.api.getBoard().id).subscribe(
      data => {
        JSON.parse(JSON.stringify(data)).forEach(instance => {
          /* if (instance.isActive) {
            this.users.push(instance.user);
          } */
          this.users.push(instance.user);
        });
      },
      error => {
        console.log(error);
    });
    
    if (this.api.getBoard().json_board != '{}') {
      this.boardString = this.api.getBoard().json_board;
      this.api.getBoard().json_board.split('|').forEach(el => {
        element = JSON.parse(el);
        if (element.selectedShape != undefined) {
          this.updates.push([element]);
        }
        else {
          this.updates[this.updates.length-1].push(element);
        }
      });
      setTimeout(() => {
        this.drawCanvas();
      }, 100);
    }
  }

  hideUpdates(index: number) {
    for (let i=index; i<this.updates.length; i++) {
      console.log(this.updates[i][0]);
      this._canvasWhiteboardService.undoCanvas(this.updates[i][0].UUID);
    }
    // this.currUpdate = index+1;
    this.updates = this.updates.slice(0, index);
  }

  onCanvasClear(){
    this.updates = [];
    this.boardString = "{}";
    // this.currUpdate = 0;
  }

  sendBatchUpdate(update: CanvasWhiteboardUpdate[]) {
    this.board.json_board = this.boardString;
    this.api.setBoard(this.board);
    this.saveCanvas();
    update.forEach(change => {
      if(change.selectedShape == undefined) {
        this.updates[this.updates.length-1].push(change);
      }
      else {
        /* if (this.updates.length > this.currUpdate) {
          if (this.currUpdate == 0){
            this.updates = [];
          }
          else {
            this.updates = this.updates.slice(0, this.currUpdate-1);
          }
        } */
        this.updates.push([change]);
        // this.currUpdate++;
      }
      if (this.boardString == "{}") {
        this.boardString = JSON.stringify(change);
      }
      else {
        this.boardString = this.boardString.concat("|" + JSON.stringify(change));
      }
    });
  }

  drawCanvas() {
    this.updates.forEach(element => {
      this._canvasWhiteboardService.drawCanvas(element);
    });
  }

  onCanvasUndo(updateUUID: string) {
    this.updates.pop();
    if (this.updates.length) {
      this.boardString = this.updates.join('|');
    }
    else {
      this.boardString = "{}";
    }
    // this._canvasWhiteboardService.undoCanvas(this.updates[i][0].UUID);
  }

  onCanvasRedo(updateUUID: string) {
    // if it can be done:
    // this.currUpdate++;
    // this._canvasWhiteboardService.redoCanvas(this.updates[1][0].UUID);
  }
  
  saveCanvas() {
    this.api.saveCanvas(this.boardString).subscribe(
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
}