<br>

# Image Cropper


## Installation
```
npm install @ferhado/image-cropper --save
```

## Usage Example

<a href="https://stackblitz.com/edit/angular-ferhado-image-cropper?file=src%2Fapp%2Fapp.component.ts" target="_blank">demo</a>

### app.module.ts
```ts
import { ImageCropperModule } from '@ferhado/image-cropper';

@NgModule({
  // ...
  
  imports: [
    // ...
    ImageCropperModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

### app.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { image2base64 } from '@ferhado/image-cropper';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})

export class AppComponent implements OnInit {
  dataUri;

  selectFile(file) {
    image2base64(file, (base64) => {
      this.dataUri = base64;
    })
  }

  onCrop(result) {
    console.log(result.base64);
    console.log(result.blob);
  }

}
```

### app.component.html
```html
<input type="file" (change)="selectFile($event.target.files[0])">

<!-- format: 'png' | 'jpeg' | 'bmp' | 'webp' | 'ico', default is png -->
<image-cropper ratio="450x350" [dataURI]="dataUri" format="jpeg" (onCrop)="onCrop($event)" #crop></image-cropper>

<img [src]="crop.result?.base64" height="300" style="margin-top: 20px;">

```
