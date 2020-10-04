import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ferhado-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})

export class CropperComponent implements OnInit {
  isMouseDown: boolean = false;
  len: any = {}; //Lens

  orgImage; //Canvas Image

  container;
  image;
  lens;
  canvas;
  context;
  croped;

  startX: number = 0;
  startY: number = 0;

  lensWidth: number;
  lensHeight: number;

  /*  */
  @Input() target: string;
  @Input() width: number = 0;
  @Input() height: number = 0;
  /*  */
  @ViewChild('containerSource', { static: true }) containerSource: ElementRef;
  @ViewChild('imageSource', { static: true }) imageSource: ElementRef;
  @ViewChild('lensSource', { static: true }) lensSource: ElementRef;
  @ViewChild('cropSource', { static: true }) cropedSource: ElementRef;

  constructor(private sanitizer: DomSanitizer) { }

  async ngOnInit() {

    await setTimeout(() => {
      let container = this.containerSource.nativeElement;
      this.container = container.getBoundingClientRect();

      this.image = this.imageSource.nativeElement;
      this.lens = this.lensSource.nativeElement;

      let canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.canvas = canvas;
      this.context = canvas.getContext('2d');

      this.orgImage = new Image();
      this.orgImage.src = this.image.src;

      let ming = Math.min(this.image.width, this.image.height) - 5;

      if (this.width == this.height) {
        this.lensWidth = this.lensHeight = ming;
      } else if (this.width > this.height) {
        this.lensWidth = ming;
        this.lensHeight = ming * this.height / this.width;
      } else if (this.height > this.width) {
        this.lensHeight = ming;
        this.lensWidth = ming * this.width / this.height;
      }

      this.len = { w: this.lensWidth, h: this.lensHeight };

    }, 50);
  }


  stopMoving() {
    this.isMouseDown = false;
  }

  startMoving(e) {
    let pos = this.getCursorPos(e);
    this.startX = pos.x - this.lens.offsetLeft;
    this.startY = pos.y - this.lens.offsetTop;
    this.isMouseDown = true;
    this.moving(e);
  }


  moving(e) {
    if (!this.isMouseDown) return;
    var pos, x, y;
    pos = this.getCursorPos(e);
    x = pos.x - this.startX;
    y = pos.y - this.startY;
    x = (x > pos.w - this.len.w) ? (pos.w - this.len.w) : (x < 0 ? 0 : x);
    y = (y > pos.h - this.len.h) ? (pos.h - this.len.h) : (y < 0 ? 0 : y);
    this.lens.style.left = x + "px";
    this.lens.style.top = y + "px";
    this.preview(x, y);
  }

  preview(x, y) {
    let canvas = this.canvas;
    let con = this.container;
    let ratioX = this.orgImage.width / con.width;
    let ratioY = this.orgImage.height / con.height;
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    let scaleX = x * ratioX;
    let scaleY = y * ratioY;
    let scaleW = this.len.w * ratioX;
    let scaleH = this.len.h * ratioY;
    this.context.drawImage(this.orgImage, scaleX, scaleY, scaleW, scaleH, 0, 0, canvas.width, canvas.height);
    let base64Img = this.canvas.toDataURL('image/jpeg', .77);
    let croped = this.b64toBlob(base64Img, 'jpg');
    this.croped = this.sanitize(window.URL.createObjectURL(croped));
    console.log(this.croped);
  }

  getCursorPos(e?) {
    var a, x = 0, y = 0, w, h;
    e = e || window.event;
    a = this.container;

    x = e.pageX - a.left;
    y = e.pageY - a.top;

    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    w = a.width;
    h = a.height;

    const maxW = Math.max(x, w - x);
    const maxH = Math.max(y, h - y);
    const m = Math.sqrt((maxW * maxW) + (maxH * maxH));
    return { x, y, m, w, h };
  }

  crop() {
    try {
      var base64Img = this.canvas.toDataURL('image/png', .77);
      this.croped = base64Img;
    } catch (error) { }
  }

  b64toBlob(dataURI, type) {
    var byteString = atob(dataURI.split(',').pop());
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
