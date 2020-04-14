import { Component, OnInit, HostListener, ViewChild, ElementRef, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { WebsocketService } from './../websocket.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-board-object',
  templateUrl: './board-object.component.html',
  styleUrls: ['./board-object.component.css']
})
export class BoardObjectComponent implements OnInit, OnDestroy {
  @Output() back = new EventEmitter();
  @Output() sendUpdate = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() updatesChange = new EventEmitter();
  @Input() updates = [];
  @Input() usersList = [];

  title = 'board';
  text  = '';
  italic = false;
  font = "Ariel";
  textAlign = "center";
  dlname = '';
  history = true;
  users = true;
  lineWidth = 5;
  imgSize = "9999-9999";
  innerColor = "rgba(255,255,255,0)";
  outterColor = "blue";
  currShape = "circle";
  currSrc = "";

  subscription: Subscription;

  //begins here
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx;
  mouse = {x: undefined, y: undefined};
  lastColors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    //this.sendUpdate.emit();
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.mouse.x = Math.floor( ( e.clientX - rect.left ) / ( rect.right - rect.left ) * this.ctx.canvas.width );
    this.mouse.y = Math.floor( ( e.clientY - rect.top ) / ( rect.bottom - rect.top ) * this.ctx.canvas.height );
  }
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e) {
    //this.sendUpdate.emit();
    if(this.updates.length > 0) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      this.mouse.x = Math.floor( ( e.clientX - rect.left ) / ( rect.right - rect.left ) * this.ctx.canvas.width );
      this.mouse.y = Math.floor( ( e.clientY - rect.top ) / ( rect.bottom - rect.top ) * this.ctx.canvas.height );
      this.updates[this.updates.length-1].unfocus();
      this.wsService.sendMsg({json_board: this.updates});
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  constructor(private api: ApiService, private wsService: WebsocketService) {
    this.subscription = wsService.createSocket(environment.wsurl + api.getBoard().id + '/')
    .subscribe(
      msg => {
        if (JSON.parse(msg).json_board != this.updates) {
          this.updates = JSON.parse(msg).json_board;
          this.updatesChange.emit(this.updates);
          this.resetShapes();
        }
      },
      err => console.log(err)
    )
  }

  ngOnInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.resetShapes();
    
    /* this.intervalCheck = setInterval(() => {
      this.api.getBoardById(this.board.id).subscribe(
        data => {
          console.log(data);
          if (this.updates != JSON.parse(JSON.stringify(data)).json_board) {
            this.updates = JSON.parse(JSON.parse(JSON.stringify(data)).json_board);
            this.resetShapes();
          }
        },
        error => {
          console.log(error);
      });
    }, 20000); */

    this.updatesChange.emit(this.updates);
    this.animate();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetShapes() {
    for(let i = 0; i < this.updates.length; i++) {
      switch (this.updates[i].shapeName) {
        case "Circle":
          this.updates[i] = new Circle(this.updates[i].x, this.updates[i].y, this.updates[i].radius, this.updates[i].outterColor, this.updates[i].innerColor, this.updates[i].lineWidth, false);
          break;
        case "Rectangle":
          this.updates[i] = new Rectangle(this.updates[i].x, this.updates[i].y, this.updates[i].width, this.updates[i].height, this.updates[i].outterColor, this.updates[i].innerColor, this.updates[i].lineWidth, false);
          break;
        case "Line":
          this.updates[i] = new Line(new Point(this.updates[i].firstPoint.x, this.updates[i].firstPoint.y), new Point(this.updates[i].secondPoint.x, this.updates[i].secondPoint.y), this.updates[i].outterColor, this.updates[i].lineWidth, "round", "round", false);
          break;
        case "FreeHand":
          this.updates[i] = new FreeHand(this.updates[i].outterColor, this.updates[i].lineWidth, -1, -1, this.updates[i].points, false);
          break;
        case "ImageShape":
          this.updates[i] = new ImageShape(this.updates[i].x, this.updates[i].y, this.updates[i].imgSize, this.updates[i].src, false);
          break;
        case "Text":
          this.updates[i] = new Text(this.updates[i].x, this.updates[i].y, this.updates[i].outterColor, this.updates[i].text, this.updates[i].lineWidth, this.updates[i].italic, this.updates[i].font, this.updates[i].innerColor, this.updates[i].textAlign, false, this.updates[i].lines);
          break;
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    if(this.updateRequired(this.updates)) {
      this.updates[this.updates.length-1].update(this.mouse);
    }
    var markedShapes = [];
    this.updates.forEach(element => {
      if (element.isMarked()) {
        markedShapes.push(element);
      } else {
        element.draw(this.ctx);
      }
    });
    markedShapes.forEach(element => {
      element.marked(this.ctx);
    });
    requestAnimationFrame(this.animate.bind(this));
  }

  updateRequired(shapes) {
    if (shapes.length == 0) {
      return false;
    }
    return shapes[shapes.length-1].isFocused();
    /* shapes.forEach(shape => {
      if (shape.isFocused) {
        return true;
      }
    });
    return false; */
  }

  hideUpdates(index: number) {
    event.preventDefault();
    // this.currUpdate = index+1;
    this.updates = this.updates.slice(0, index);
    this.wsService.sendMsg({json_board: this.updates});
  }

  hideUpdate(index: number) {
    // this.currUpdate = index+1;
    this.updates.splice(index, 1);
    this.wsService.sendMsg({json_board: this.updates});
  }

  markShapes(index) {
    this.updates[index].markShape();
  }
  
  unmarkShapes(index) {
    this.updates[index].unmark();
  }

  usersChanged() {
    this.users = !this.users;
  }

  historyChanged() {
    this.history = !this.history;
  }

  save() {
    this.onSave.emit();
    this.updatesChange.emit(this.updates);
  }

  clear() {
    this.updates = [];
    this.onClear.emit();
    this.updatesChange.emit(this.updates);
    this.wsService.sendMsg({json_board: this.updates});
  }

  onCanvas(e) {
    //this.sendUpdate.emit();
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.mouse.x = Math.floor( ( e.clientX - rect.left ) / ( rect.right - rect.left ) * this.ctx.canvas.width );
    this.mouse.y = Math.floor( ( e.clientY - rect.top ) / ( rect.bottom - rect.top ) * this.ctx.canvas.height );
    switch (this.currShape) {
      case "circle":
        this.updates.push(new Circle(this.mouse.x, this.mouse.y, 1, this.outterColor, this.innerColor, this.lineWidth));
        break;
      case "rect":
        this.updates.push(new Rectangle(this.mouse.x, this.mouse.y, 1, 1, this.outterColor, this.innerColor, this.lineWidth));
        break;
      case "line":
        this.updates.push(new Line(new Point(this.mouse.x, this.mouse.y), new Point(this.mouse.x+1, this.mouse.y+1), this.outterColor, this.lineWidth, "round", "round"));
        break;
      case "freeHand":
        this.updates.push(new FreeHand(this.outterColor, this.lineWidth, this.mouse.x, this.mouse.y));
        break;
      case "text":
        this.updates.push(new Text(this.mouse.x, this.mouse.y, this.outterColor, this.text, this.lineWidth, this.italic, this.font, this.innerColor, this.textAlign));
        break;
      case "img":
        if (this.currSrc) {
          this.updates.push(new ImageShape(this.mouse.x, this.mouse.y, this.imgSize, this.currSrc));
        }
        break;
      case "move":
        this.updates.forEach(shape => {
          if(shape.clicked()) {
            shape.markShape();
            shape.updatePosition(this.mouse);
          }
        });
        break;
    }
    this.updatesChange.emit(this.updates);
  }

  handleFileInput(files) {
    var file = files[0];
    var url = window.URL;
    var src = url.createObjectURL(file);
    var newImage = new ImageShape(this.mouse.x, this.mouse.y, this.imgSize, src);
    this.shapeChanged('img');
    this.updates.push(newImage);
    this.currSrc = newImage.createUrl(file);
  }

  shapeChanged(shape) {
    this.currShape = shape;
  }

  download() {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;
  
    /// the key here is to set the download attribute of the a tag
    lnk.download = this.dlname;
  
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = this.canvas.nativeElement.toDataURL("image/png;base64");
  
    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
  
      lnk.dispatchEvent(e);
    }
  }

  resetLineWidth() {
    this.lineWidth = 5;
  }

  resetImgSize() {
    this.imgSize = "9999-9999";
  }

  outterColorChanged(e) {
    this.outterColor = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + e.color.rgb.a + ")";
  }

  innerColorChanged(e) {
    this.innerColor = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + e.color.rgb.a + ")";
  }

  colorChanged(e) {
    this.lastColors.push(e);
  }

  onRightClick(e) {
    if(this.updates.length > 0) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      this.mouse.x = Math.floor( ( e.clientX - rect.left ) / ( rect.right - rect.left ) * this.ctx.canvas.width );
      this.mouse.y = Math.floor( ( e.clientY - rect.top ) / ( rect.bottom - rect.top ) * this.ctx.canvas.height );
      this.updates[this.updates.length-2].unfocus();
      this.wsService.sendMsg({json_board: this.updates});
    }
  }

  goBack() {
    this.back.emit();
  }
}

export class Point {

  constructor(private x, private y) { }

  getX() { return this.x }
  getY() { return this.y }
  setX(x) { this.x = x }
  setY(y) { this.y = y }

}

export class Circle { // new Circle(this.x, this.y, this.radius, this.outsideColor, this.outterColor, this.lineWidth)

  constructor(private x, private y, private radius, private outterColor, private innerColor, private lineWidth, private focus = true, private shapeName = "Circle", private mark = false) { }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.strokeStyle = this.outterColor;
    ctx.fillStyle = this.innerColor;
    ctx.fill();
    ctx.stroke();
  }

  update(mouse) {
    if (mouse.x == this.x && mouse.y == this.y) {
      this.radius = 1;
    }
    else {
      this.radius = Math.sqrt(Math.pow(mouse.x-this.x, 2) + Math.pow(mouse.y-this.y, 2));
    }
  }

  marked(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth + 2;
    ctx.arc(this.x, this.y, this.radius + 1, 0, Math.PI*2, false);
    ctx.strokeStyle = "#FDFF00";
    ctx.fillStyle = "#FF7A00";
    ctx.fill();
    ctx.stroke();
  }

  clicked() {
    return true;
  }

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
  markShape() { this.mark = true; }
  unmark() { this.mark = false; }
  isMarked() { return this.mark; }
}

export class Rectangle { // new Rectangle(this.mouse.x, this.mouse.y, 1, 1, this.outterColor, this.innerColor, this.lineWidth)

  constructor(private x, private y, private width, private height, private outterColor, private innerColor, private lineWidth, private focus = true, private shapeName = "Rectangle", private mark = false) { }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.lineJoin = "round"; // miter/bevel/round
    ctx.lineCap = "round"; // butt/square/round
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = this.outterColor;
    ctx.fillStyle = this.innerColor;
    ctx.fill();
    ctx.stroke();
  }

  update(mouse) {
    if (mouse.x == this.x && mouse.y == this.y) {
      this.height = 1;
      this.width = 1;
    }
    else {
      this.height = mouse.y - this.y;
      this.width = mouse.x - this.x;
    }
  }

  marked(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth + 2;
    ctx.lineJoin = "round"; // miter/bevel/round
    ctx.lineCap = "round"; // butt/square/round
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = "#FDFF00";
    ctx.fillStyle = "#FF7A00";
    ctx.fill();
    ctx.stroke();
  }

  clicked() {
    return true;
  }

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
  markShape() { this.mark = true; }
  unmark() { this.mark = false; }
  isMarked() { return this.mark; }
}

export class Line { // new Line(new Point(this.mouse.x, this.mouse.y), new Point(this.mouse.x+1, this.mouse.y+1), this.outterColor, this.lineWidth)

  constructor(private firstPoint, private secondPoint, private outterColor, private lineWidth, private lineJoin = "mitter", private lineCap = "butt", private focus = true, private shapeName = "Line", private mark = false) { }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.lineJoin = this.lineJoin; // miter/bevel/round
    ctx.lineCap = this.lineCap; // butt/square/round
    ctx.moveTo(this.firstPoint.getX(), this.firstPoint.getY());
    ctx.lineTo(this.secondPoint.getX(), this.secondPoint.getY());
    ctx.strokeStyle = this.outterColor;
    ctx.fill();
    ctx.stroke();
  }

  update(mouse) {
    this.secondPoint.setX(mouse.x);
    this.secondPoint.setY(mouse.y);
  }

  marked(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth + 2;
    ctx.lineJoin = this.lineJoin; // miter/bevel/round
    ctx.lineCap = this.lineCap; // butt/square/round
    ctx.moveTo(this.firstPoint.getX(), this.firstPoint.getY());
    ctx.lineTo(this.secondPoint.getX(), this.secondPoint.getY());
    ctx.strokeStyle = "#FDFF00";
    ctx.fill();
    ctx.stroke();
  }

  clicked() {
    return true;
  }

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
  markShape() { this.mark = true; }
  unmark() { this.mark = false; }
  isMarked() { return this.mark; }
}

export class FreeHand { // new FreeHand(this.outterColor, this.lineWidth, this.mouse.x, this.mouse.y)

  constructor(private outterColor, private lineWidth, x, y, private points = [], private focus = true,  private shapeName = "FreeHand", private mark = false) {
    if (points.length == 0) {
      this.points.push(x, y);
    } else {
      var newPoints = [];
      for (let i = 0; i < points.length; i+=2) {
        newPoints.push(points[i], points[i+1]);
      }
      this.points = newPoints;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.lineJoin = "round"; // miter/bevel/round
    ctx.lineCap = "round"; // butt/square/round
    ctx.strokeStyle = this.outterColor;
    ctx.fill();
    ctx.moveTo(this.points[0], this.points[1]);
    for (var i = 2; i < this.points.length; i+=2) {
      ctx.lineTo(this.points[i], this.points[i+1]);
    }
    ctx.stroke();
  }

  update(mouse) {
    //this.updates.push(new Circle(mouse.x, mouse.y, 1, this.outsideColor, "#fff", this.lineWidth));
    //this.lines[this.lines.length-1].update(mouse);
    this.points.push(mouse.x, mouse.y);
  }

  marked(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth + 2;
    ctx.lineJoin = "round"; // miter/bevel/round
    ctx.lineCap = "round"; // butt/square/round
    ctx.strokeStyle = "#FDFF00";
    ctx.fill();
    ctx.moveTo(this.points[0], this.points[1]);
    for (var i = 2; i < this.points.length; i+=2) {
      ctx.lineTo(this.points[i], this.points[i+1]);
    }
    ctx.stroke();
  }

  clicked() {
    return true;
  }

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
  markShape() { this.mark = true; }
  unmark() { this.mark = false; }
  isMarked() { return this.mark; }
}

export class ImageShape {
  img = new Image();
  
  constructor(private x, private y, private imgSize, private src, private focus = true, private shapeName = "ImageShape", private mark = false) {
    this.img.src = src;
  }

  draw(ctx) {
    if (!(this.imgSize == "9999-9999" || this.imgSize.split('-').length != 2)) {
      ctx.drawImage(this.img, this.x, this.y, parseInt(this.imgSize.split('-')[0], 10), parseInt(this.imgSize.split('-')[1], 10));
    } else {
      ctx.drawImage(this.img, this.x, this.y);
    }
  }

  update(mouse) {
    this.x = mouse.x;
    this.y = mouse.y;
  }

  marked(ctx) {
    if (!(this.imgSize == "9999-9999" || this.imgSize.split('-').length != 2)) {
      ctx.drawImage(this.img, this.x, this.y, parseInt(this.imgSize.split('-')[0], 10), parseInt(this.imgSize.split('-')[1], 10));
    } else {
      ctx.drawImage(this.img, this.x, this.y);
    }
  }

  createUrl(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      this.img.src = reader.result.toString();
    };
    return this.img.src;
  }

  clicked() {
    return true;
  }
  
  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
  markShape() { this.mark = true; }
  unmark() { this.mark = false; }
  isMarked() { return this.mark; }
}

export class Text {
  
  constructor(private x, private y, private outterColor = "black", text = "Hello!", private lineWidth = 18, private italic = false, private font = "Arial", private innerColor = "rgba(255,255,255,0)", private textAlign = "center", private focus = true, private lines = [], private shapeName = "Text", private mark = false) {
    if (lines.length == 0) {
      this.lines = text.split('\n');
      if (text == "") {
        this.lines = ["Hello!"];
      }
    }
  }

  draw(ctx) {
    if (this.italic) {
      ctx.font = "italic " + this.lineWidth.toString() + "px " + this.font;
    } else {
      ctx.font = this.lineWidth.toString() + "px " + this.font;
    }
    var hFactor = 0;
    this.lines.forEach(line => {
      if (this.innerColor != "rgba(255,255,255,0)") {
        ctx.fillStyle = this.innerColor;
        var width = ctx.measureText(line).width;
        switch (this.textAlign) {
          case "center":
            ctx.fillRect(this.x - width/2-5, this.y - parseInt(this.lineWidth.toString(), 10)/2 + hFactor, width+10, parseInt(this.lineWidth.toString(), 10));
            break;
          case "left":
            ctx.fillRect(this.x-5, this.y - parseInt(this.lineWidth.toString(), 10)/2 + hFactor, width+10, parseInt(this.lineWidth.toString(), 10));
            break;
          case "right":
            ctx.fillRect(this.x-width-5, this.y - parseInt(this.lineWidth.toString(), 10)/2 + hFactor, width+10, parseInt(this.lineWidth.toString(), 10));
            break;
        }
      }
      ctx. textBaseline = 'middle';
      ctx.textAlign = this.textAlign;
      ctx.fillStyle = this.outterColor;
      ctx.fillText(line, this.x, this.y + hFactor); 
      hFactor += parseInt(this.lineWidth.toString(), 10);
    });
  }

  update(mouse) {
    this.x = mouse.x;
    this.y = mouse.y;
  }

  marked(ctx) {
    ctx.font = "italic " + this.lineWidth.toString() + "px " + this.font;
    var hFactor = 0;
    this.lines.forEach(line => {
      ctx.fillStyle = "#FF7A00";
      var width = ctx.measureText(line).width;
      ctx.fillRect(this.x - width/2-5, this.y - parseInt(this.lineWidth.toString(), 10)/2 + hFactor, width+10, parseInt(this.lineWidth.toString(), 10));
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = "#FDFF00";
      ctx.fillText(line, this.x, this.y + hFactor); 
      hFactor += parseInt(this.lineWidth.toString(), 10);
    });
  }

  clicked() {
    return true;
  }

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
  markShape() { this.mark = true; }
  unmark() { this.mark = false; }
  isMarked() { return this.mark; }
}