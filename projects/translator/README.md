<br>

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

declare const require;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  
  constructor(public tr: TranslatorService) { }

  ngOnInit() {
    this.setLanguage(this.tr.locale);
  }

  setLanguage(lang) {
    let translation = require(`../assets/i18n/${lang}.json`);
    this.tr.setTranslationObject(translation);
    this.tr.setLanguage(lang, false); // Set to true if you want to reload page after language changes
  }

}

```

#### app.component.html

```html

<button (click)="setLanguage('en')">English</button>
<button (click)="setLanguage('de')">Deutsch</button>

<h1>{{'key' | tr}}</h1>
<h1>{{tr.locale}}</h1>
<h1>{{tr.dir}}</h1>

``` 