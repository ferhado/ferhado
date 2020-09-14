# Angular Translator

## Installation

```
npm install @ferhado/translator --save
```

## Usage Example

#### app.module.ts
```ts
import { TranslatorModule } from '@ferhado/translator';

@NgModule({
  // ...
  
  imports: [
    // ...
    TranslatorModule.forRoot({
      allowedLocales: ["en", "de"],
      defaultLocale: "de"
    })
  ],
  bootstrap: [AppComponent]
})
 
export class AppModule { }
```

#### app.component.ts
```ts
import { Component, OnInit } from '@angular/core';
import { TranslatorService } from '@ferhado/tTranslator';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

  constructor(public tr: TranslatorService) {
    let translation = require('path/to/translation/file.json');
    this.tr.setTranslationObject(translation)
  }

  ngOnInit() {
    console.log(this.tr.get("key"));
  }

}

```

#### app.component.html

```html

<button (click)="tr.setLanguage('en')">English</button>
<button (click)="tr.setLanguage('de')">Deutsch</button>

<h1>{{'key' | tr}}</h1>
<h1>{{tr.locale}}</h1>
<h1>{{tr.dir}}</h1>

```