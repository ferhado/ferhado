import { Component, OnInit } from '@angular/core';
import { FerhadoHttp } from '@ferhado/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})

export class AppComponent implements OnInit {
  constructor(private http: FerhadoHttp) { }

  ngOnInit() {
    this.http.post("/posts", { test: "Test" }, {
      headers: {},
    }, (response) => {
      console.table(response);
    });
  }

}
