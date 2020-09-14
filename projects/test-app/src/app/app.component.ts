import { Component, OnInit } from '@angular/core';
import { HttpService } from '@ferhado/http';
import { TranslatorService } from '@ferhado/translator';

declare const require;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})

export class AppComponent implements OnInit {
  constructor(private http: HttpService, public tr: TranslatorService) { }

  ngOnInit() {
    let translation = require(`../assets/i18n/${this.tr.locale}.json`);
    this.tr.setTranslationObject(translation);

    this.http.post("/posts", { test: "Test" }, {
      headers: {},
    }, (response) => {
      console.table(response);
    });

  }

}
