import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { b64toBlob } from './utils';

@Component({
  selector: 'image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})

export class ImageCropperComponent implements OnChanges {
  isDragMouseDown: boolean = false;
  isResizeMouseDown: boolean = false;
  parent;
  child;
  canvas;
  context;
  result: any = {};

  drag = {
    startX: 0,
    startY: 0
  };

  resizer: any = {};

  @Input() quality: number = 77;
  @Input() ratio: string = "250x250";
  @Input() dataURI: string;
  @Input() format: 'png' | 'jpeg' | 'bmp' | 'webp' | 'ico' = 'png';


  @Output() onCrop: EventEmitter<any> = new EventEmitter();


  @ViewChild('parentSource', { static: true }) parentSource: ElementRef;
  @ViewChild('imageSource', { static: true }) imageSource: ElementRef;
  @ViewChild('childSource', { static: true }) childSource: ElementRef;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.dataURI) {
      await setTimeout(() => this.init(), 50);
    }
  }

  private getQuality(): number {
    return Math.min(1, Math.max(0, this.quality / 100));
  }

  private getFormat() {
    return 'image/' + this.format;
  }

  init() {
    this.parent = this.parentSource.nativeElement;
    this.child = this.childSource.nativeElement;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    let pa = this.getBounding(this.parent);

    let ratio = this.ratio.split('x');
    let width = parseFloat(ratio[0]), height = parseFloat(ratio[1]);

    this.canvas.width = width;
    this.canvas.height = height;

    let lensW = (pa.w - 200) * (width > height ? 1 : width / height),
      lensH = height * lensW / width;

    this.child.style.width = `${lensW}px`;
    this.child.style.height = `${lensH}px`;

    this.child.style.left = `${((pa.w / 2) - (lensW / 2))}px`;
    this.child.style.top = `${((pa.h / 2) - (lensH / 2))}px`;

    this.resizer.ratio = lensW / lensH;
  }


  /* Crop */

  crop() {
    let ch = this.getBounding(this.child), pa = this.getBounding(this.parent);

    let image = new Image();
    image.src = this.dataURI;

    let ratX = image.width / pa.w;
    let ratY = image.height / pa.h;

    let startX = (ch.x - pa.x) * ratX;
    let startY = (ch.y - pa.y) * ratY;

    let scaleW = ch.w * ratX;
    let scaleH = ch.h * ratY;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(image, startX, startY, scaleW, scaleH, 0, 0, this.canvas.width, this.canvas.height);
    let result = this.canvas.toDataURL(this.getFormat(), this.getQuality());

    this.result = { blob: b64toBlob(result, this.getFormat()), base64: result }

    this.onCrop.emit(this.result);

  }


  /* Resize */
  startResize(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    let pos = this.getCursorPos(event), ch = this.getBounding(this.child), pa = this.getBounding(this.parent);
    this.resizer.maxW = pa.w - (ch.x - pa.x);
    this.resizer.maxH = pa.h - (ch.y - pa.y);

    this.resizer.orgW = ch.w;

    this.resizer.startX = pos.x;
    this.resizer.startY = pos.y;
    this.isResizeMouseDown = true;
  }

  resize(event) {
    if (!this.isResizeMouseDown) return;
    let pos = this.getCursorPos(event);
    let step = Math.max(pos.x - this.resizer.startX, pos.y - this.resizer.startY);

    let tempWidth = Math.round(Math.min(this.resizer.orgW + step, this.resizer.maxW));
    let newWidth = Math.max(tempWidth, 25);

    let newHeight = newWidth / this.resizer.ratio;

    if (newHeight > this.resizer.maxH) {
      let old_height = newHeight;
      newHeight = this.resizer.maxH;
      newWidth = newWidth * newHeight / old_height;
    }

    this.child.style.width = newWidth + 'px';
    this.child.style.height = newHeight + 'px';
  }

  /* Drag */

  startMoving(event) {
    event.preventDefault();
    this.isDragMouseDown = true;
    let pos = this.getCursorPos(event), ch = this.getBounding(this.child);
    this.drag = {
      startX: pos.x - ch.x,
      startY: pos.y - ch.y
    }
  }

  stopMoving() {
    if (!this.isDragMouseDown && !this.isResizeMouseDown) return;
    this.isDragMouseDown = false;
    this.isResizeMouseDown = false;
    this.crop();
  }

  moving(event) {
    if (!this.isDragMouseDown) return;

    let pos, con, ch, x, y;

    pos = this.getCursorPos(event);
    con = this.getBounding(this.parent);
    ch = this.getBounding(this.child);

    x = pos.x - con.l - this.drag.startX;
    y = pos.y - con.t - this.drag.startY;
    x = (x > con.w - ch.w) ? (con.w - ch.w) : (x < 0 ? 0 : x);
    y = (y > con.h - ch.h) ? (con.h - ch.h) : (y < 0 ? 0 : y);

    this.child.style.left = x + "px";
    this.child.style.top = y + "px";
  }


  /* Universal */

  getBounding(element) {
    let a = element.getBoundingClientRect();

    return {
      w: a.width,
      h: a.height,
      l: a.left,
      t: a.top,
      x: a.x,
      y: a.y
    };

  }

  getCursorPos(e) {
    e = (e.touches && e.touches[0] ? e.touches[0] : e);
    return { x: e.pageX, y: e.pageY };
  }

}



