import { Component, OnInit, HostListener, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-board-object',
  templateUrl: './board-object.component.html',
  styleUrls: ['./board-object.component.css']
})
export class BoardObjectComponent implements OnInit {
  @Output() back = new EventEmitter();
  @Output() sendUpdate = new EventEmitter();
  @Output() historySwitch = new EventEmitter<boolean>();
  @Output() userSwitch = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() updatesChange = new EventEmitter();
  @Input() updates = [];

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

  //begins here
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx;
  mouse = {x: undefined, y: undefined};
  updateRequired = false;
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
      this.updateRequired = false;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }
  
  ngOnInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');


    for(let i = 0; i < this.updates.length; i++) {
      switch (this.updates[i].shapeName) {
        case "Circle":
          this.updates[i] = new Circle(this.updates[i].x, this.updates[i].y, this.updates[i].radius, this.updates[i].outterColor, this.updates[i].innerColor, this.updates[i].lineWidth);
          break;
        case "Rectangle":
          this.updates[i] = new Rectangle(this.updates[i].x, this.updates[i].y, this.updates[i].width, this.updates[i].height, this.updates[i].outterColor, this.updates[i].innerColor, this.updates[i].lineWidth);
          break;
        case "Line":
          this.updates[i] = new Line(this.updates[i].firstPoint, this.updates[i].secondPoint, this.updates[i].outterColor, this.updates[i].lineWidth);
          break;
        case "FreeHand":
          this.updates[i] = new FreeHand(this.updates[i].outterColor, this.updates[i].lineWidth, -1, -1, this.updates[i].lines);
          break;
        case "ImageShape":
          this.updates[i] = new ImageShape(this.updates[i].x, this.updates[i].y, this.updates[i].imgSize, this.updates[i].src);
          break;
        case "Text":
          this.updates[i] = new Text(this.updates[i].x, this.updates[i].y, this.updates[i].outterColor, this.updates[i].text, this.updates[i].lineWidth, this.updates[i].italic, this.updates[i].font, this.updates[i].innerColor, this.updates[i].textAlign, this.updates[i].lines);
          break;
      }
    }
    this.updatesChange.emit(this.updates);
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    if(this.updateRequired) {
      this.updates[this.updates.length-1].update(this.mouse);
    }
    this.updates.forEach(element => {
      element.draw(this.ctx);
    });
    requestAnimationFrame(this.animate.bind(this));
  }

  save() {
    this.onSave.emit();
  }

  clear() {
    this.updates = [];
    this.updatesChange.emit(this.updates);
    this.onClear.emit();
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
        this.updates.push(new Line(new Point(this.mouse.x, this.mouse.y), new Point(this.mouse.x+1, this.mouse.y+1), this.outterColor, this.lineWidth));
        break;
      case "freeHand":
        this.updates.push(new FreeHand(this.outterColor, this.lineWidth, this.mouse.x, this.mouse.y));
        break;
      case "text":
        this.updates.push(new Text(this.mouse.x, this.mouse.y, this.outterColor, this.text, this.lineWidth, this.italic, this.font, this.innerColor, this.textAlign));
        break;
    }
    this.updateRequired = true;
    this.updatesChange.emit(this.updates);
  }

  handleFileInput(files) {
    var f = files[0];
    var url = window.URL;
    var src = url.createObjectURL(f);
    this.shapeChanged('img');
    this.updates.push(new ImageShape(this.mouse.x, this.mouse.y, this.imgSize, src));
    this.updateRequired = true;
    this.updatesChange.emit(this.updates);
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

  usersChanged() {
    this.users = !this.users;
    this.userSwitch.emit(this.users);
  }

  historyChanged() {
    this.history = !this.history;
    this.historySwitch.emit(this.history);
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
      this.updateRequired = false;
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

  focus = true;

  constructor(private x, private y, private radius, private outterColor, private innerColor, private lineWidth, private shapeName = "Circle") { }

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

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
}

export class Rectangle { // new Rectangle(this.mouse.x, this.mouse.y, 1, 1, this.outterColor, this.innerColor, this.lineWidth)

  focus = true;

  constructor(private x, private y, private width, private height, private outterColor, private innerColor, private lineWidth, private shapeName = "Rectangle") { }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
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

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
}

export class Line { // new Line(new Point(this.mouse.x, this.mouse.y), new Point(this.mouse.x+1, this.mouse.y+1), this.outterColor, this.lineWidth)

  focus = true;

  constructor(private firstPoint, private secondPoint, private outsideColor, private lineWidth, private lineJoin = "mitter", private lineCap = "butt", private shapeName = "Line") { }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.lineJoin = this.lineJoin; // miter/bevel/round
    ctx.lineCap = this.lineCap; // butt/square/round
    ctx.moveTo(this.firstPoint.getX(), this.firstPoint.getY());
    ctx.lineTo(this.secondPoint.getX(), this.secondPoint.getY());
    ctx.strokeStyle = this.outsideColor;
    ctx.fill();
    ctx.stroke();
  }

  update(mouse) {
    this.secondPoint.setX(mouse.x);
    this.secondPoint.setY(mouse.y);
  }

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
}

export class FreeHand { // new FreeHand(this.outterColor, this.lineWidth, this.mouse.x, this.mouse.y)

  focus = true;

  constructor(private outterColor, private lineWidth, x, y, private lines = [], private shapeName = "FreeHand") {
    if (lines.length == 0) {
      this.lines.push(new Line(new Point(x, y), new Point(x, y), this.outterColor, this.lineWidth, "round", "round"));
    } else {
      var newLines = []
      for(let i = 0; i < this.lines.length-2; i+=2) {
        newLines.push(new Line(new Point(this.lines[i], this.lines[i+1]), new Point(this.lines[i+2], this.lines[i+3]), this.outterColor, this.lineWidth, "round", "round"));
      }
      this.lines = newLines;
    }
  }

  draw(ctx) {
    this.lines.forEach(line => {
      line.draw(ctx);
    });
  }

  update(mouse) {
    //this.updates.push(new Circle(mouse.x, mouse.y, 1, this.outsideColor, "#fff", this.lineWidth));
    this.lines[this.lines.length-1].update(mouse);
    this.lines.push(new Line(new Point(mouse.x, mouse.y), new Point(mouse.x, mouse.y), this.outterColor, this.lineWidth, "round", "round"));
  }

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
}

export class ImageShape {
  focus = true;
  img = new Image();
  
  constructor(private x, private y, private imgSize, private src, private shapeName = "ImageShape") {
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

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
}

export class Text {
  focus = true;
  
  constructor(private x, private y, private outterColor = "black", text = "Hello!", private lineWidth = 18, private italic = false, private font = "Arial", private innerColor = "rgba(255,255,255,0)", private textAlign = "center", private lines = [], private shapeName = "Text") {
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

  unfocus() { this.focus = false; }
  select() { this.focus = true; }
  isFocused() { return this.focus; }
}