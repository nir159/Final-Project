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

    this.users.push(this.api.getBoard().owner);
    this.api.getBoard().users.split(' ').forEach(user => {
      this.users.push(user);
    });

    if (this.api.getBoard().json_board) {
      this.updates = JSON.parse(this.api.getBoard().json_board);
      /* setTimeout(() => {
        this.drawCanvas();
      }, 100); */
    }

    /* this.intervalCheck = setInterval(() => {
      this.api.getBoardById(this.board.id).subscribe(
        data => {
          console.log(data);
          if (this.updates != JSON.parse(JSON.stringify(data)).json_board) {
            this.updates = JSON.parse(JSON.parse(JSON.stringify(data)).json_board);
            setTimeout(() => {
              this.drawCanvas();
            }, 100);
          }
        },
        error => {
          console.log(error);
      });
    }, 20000); */
  }

  ngOnDestroy() {
    /* if (this.intervalCheck) {
      clearInterval(this.intervalCheck);
    } */
  }

  hideUpdates(index: number) {
    // this.currUpdate = index+1;
    this.updates = this.updates.slice(0, index);
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
    this.saveCanvas();
  }

  onCanvasUndo(updateUUID: string) {
    this.updates.pop();
    this._canvasWhiteboardService.undoCanvas(this.updates[this.updates.length-1][0].UUID);
    // this._canvasWhiteboardService.undoCanvas(this.updates[i][0].UUID);
  }

  onCanvasRedo(updateUUID: string) {
    // if it can be done:
    // this.currUpdate++;
    // this._canvasWhiteboardService.redoCanvas(this.updates[1][0].UUID);
  }
  
  saveCanvas() {
    var clearedShapes = [...this.updates];
    clearedShapes.forEach(shape => {
      if(shape.shapeName == "ImageShape") {
        delete shape.img;
      }
    });
    this.board.json_board = JSON.stringify(clearedShapes);
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
}