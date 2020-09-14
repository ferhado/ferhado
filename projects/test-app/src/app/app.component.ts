import { Component, OnInit } from '@angular/core';
import { NgxFerhadoHttp } from '@ferhado/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})

export class AppComponent implements OnInit {
  constructor(private http: NgxFerhadoHttp) { }

  ngOnInit() {
    this.http.post("/posts", { test: "Test" }, {
      headers: {},
    }, (response) => {
      console.table(response);
    });
  }

}
