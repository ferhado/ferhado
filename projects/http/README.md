<br>

# Angular HttpClient


## Installation
```
npm install @ferhado/http --save
```

## Usage Example

### app.module.ts
```ts
import { HttpModule } from '@ferhado/http';

@NgModule({
  // ...
  
  imports: [
    // ...
    HttpModule.forRoot({
      // Optional, all requests will begin with this prefix
      requestUrlPrefix: 'https://jsonplaceholder.typicode.com/'
    })
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

### app.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { HttpService } from '@ferhado/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})

export class AppComponent implements OnInit {
  constructor(private http: HttpService) { }

  // Possible usage
  // this.http.post(url)
  // this.http.post(url, callback)
  // this.http.post(url, params, callback)
  // this.http.post(url, params, options, callback)

  ngOnInit() {
    this.http.post("/posts",
      // params: object | fromData
      {
        test: "Test"
      },
      // options
      {
        useUrlPrefix?: boolean, // set to false to ignore url prefix from config
        headers?: any,
        observe?: 'body' | 'events' | 'response',
        reportProgress?: boolean,
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
        withCredentials?: boolean,
      },
      // callback
      (response) => {
        console.log(response);
      });
  }

}
```