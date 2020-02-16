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
  boardUrl;
  updates = [];
  boardString = "";
  // currUpdate = 0; [ngClass]="{'danger-zone':i>this.currUpdate}"

  constructor(private api: ApiService, private _canvasWhiteboardService: CanvasWhiteboardService, private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService, private router: Router, private location: Location, private route: ActivatedRoute, private config: ConfigService) {
    _canvasWhiteboardShapeService.registerShape(RandomShape);
    _canvasWhiteboardShapeService.registerShape(LineShape);
  }

  ngOnInit() {
    this.board = this.api.getBoard();
    if(!this.board) {
      this.router.navigate(['404']);
    }
    console.log(this.api.getBoard().json_board.split('|'));
    this.api.getBoard().json_board.split('|').forEach(change => {
      change = JSON.parse(change);
      console.log(change);
      if(change.selectedShape == undefined) {
        change.selectedShapeOptions = JSON.parse(change.selectedShapeOptions);
        this.updates[this.updates.length-1].push(change);
      }
      else {
        this.updates.push([change]);
      }
    });
  }

  ngOnDestroy() {
    this.saveCanvas();
  }

  hideUpdates(index: number) {
    for (let i=index; i<this.updates.length; i++) {
      this._canvasWhiteboardService.undoCanvas(this.updates[i][0].UUID);
    }
    // this.currUpdate = index+1;
    this.updates = this.updates.slice(0, index);
  }

  onCanvasClear(){
    this.updates = [];
    // this.currUpdate = 0;
  }

  sendBatchUpdate(update: CanvasWhiteboardUpdate[]) {
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
        /* if (this.updates.length%5 == 0) {
          this.saveCanvas(); // auto save canvas
        } */
      }
      if (this.boardString.length == 0) {
        this.boardString = this.boardString.concat(JSON.stringify(change));
      }
      else {
        this.boardString = this.boardString.concat("|" + JSON.stringify(change));
      }
    });
  }

  onCanvasUndo(updateUUID: string) {
    // if it can be done:
    // this.currUpdate--;
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

export class RandomShape extends CanvasWhiteboardShape {
  linePositions: Array<number>;

  constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions) {
      // Optional constructor if you need some additional setup
      super(positionPoint, options);
      this.linePositions = [];
  }

  getShapeName(): string {
      // Abstract method which should return a string with the shape name
      // Should be the same as the class name
      return 'RandomShape';
  }

  draw(context: CanvasRenderingContext2D): any {
      // Tell the canvas how to draw your shape here

      // Use the selected options from the canvas whiteboard
      Object.assign(context, this.options);

      // Start drawing
      context.save();
      context.beginPath();
      context.rect(20, 20, 150, 100);
      context.stroke();
      context.fill();
      context.closePath();
      context.restore();
  }

  drawPreview(context: CanvasRenderingContext2D): any {
      // Provide info or update this object when it's needed for preview drawing.
      // Example: The CIRCLE selects the center point and updates the radius.
      // Example: The RECT selects 0,0 and updates width and height to 100%.

      // Then call the draw method with the updated object if you want your shape
      // to have a proper preview.

      this.draw(context);
  }

  onUpdateReceived(update: CanvasWhiteboardUpdate): any {
      // Choose what your shape does when an update is registered for it
      // For example the CircleShape updates it's radius
  }

  onStopReceived(update: CanvasWhiteboardUpdate): void {
      // This method is optional but CAN be overriden
  }
}

export class LineShape extends CanvasWhiteboardShape {
  endPosition: CanvasWhiteboardPoint;

  constructor(positionPoint?: CanvasWhiteboardPoint,
              options?: CanvasWhiteboardShapeOptions,
              endPosition?: CanvasWhiteboardPoint) {
      super(positionPoint, options);
      this.endPosition = endPosition || new CanvasWhiteboardPoint(this.positionPoint.x, this.positionPoint.y);
  }

  getShapeName(): string {
      return 'LineShape';
  }

  draw(context: CanvasRenderingContext2D) {
      if (!this.endPosition) {
          return;
      }
      context.beginPath();
      Object.assign(context, this.options);

      context.moveTo(this.positionPoint.x, this.positionPoint.y);
      context.lineTo(this.endPosition.x, this.endPosition.y);

      context.closePath();
      context.stroke();
  }

  drawPreview(context: CanvasRenderingContext2D) {
      this.positionPoint = new CanvasWhiteboardPoint(0, 0);
      this.endPosition = new CanvasWhiteboardPoint(context.canvas.width, context.canvas.height);
      this.draw(context);
  }

  onUpdateReceived(update: CanvasWhiteboardUpdate) {
      this.endPosition = new CanvasWhiteboardPoint(update.x, update.y);
  }
}