import { Component, OnInit } from '@angular/core';
import { HttpService } from '@ferhado/http';
import { TranslatorService } from '@ferhado/translator';
import { image2base64 } from '@ferhado/image-cropper';

declare const require;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})

export class AppComponent implements OnInit {
  constructor(private http: HttpService, public tr: TranslatorService) { }
  dataUri;

  setLanguage(lang) {
    let translation = require(`../assets/i18n/${lang}.json`);
    this.tr.setTranslationObject(translation);
    this.tr.setLanguage(lang);
  }

  ngOnInit() {
    this.setLanguage(this.tr.locale);

    this.http.post("/posts", { test: "Test" }, {
      headers: {},
    }, (response) => {
      console.table(response);
    });

  }

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
