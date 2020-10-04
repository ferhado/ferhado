<br>

# Image Cropper


## Installation
```
npm install @ferhado/image-cropper --save
```

## Usage Example

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

}
```

### app.component.html
```html
<input type="file" (change)="selectFile($event.target.files[0])">
<image-cropper ratio="900x300" [dataURI]="dataUri" #crop></image-cropper>

<img [src]="crop.result?.base64" height="300" style="margin-top: 20px;">

```