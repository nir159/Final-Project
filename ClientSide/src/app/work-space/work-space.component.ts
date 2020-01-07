import { Component, OnInit, ViewChild } from '@angular/core';
import {CanvasWhiteboardComponent} from 'ng2-canvas-whiteboard';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})

export class WorkSpaceComponent implements OnInit {

  @ViewChild('canvasWhiteboard', {static: true}) canvasWhiteboard: CanvasWhiteboardComponent;

  onCanvasClear(){
    let context = this.canvasWhiteboard.context;
    console.log(context);
  }

  constructor() { }

  ngOnInit() {
  }

}
