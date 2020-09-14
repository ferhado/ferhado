import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FerhadoHttpModule } from '@ferhado/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FerhadoHttpModule.forRoot({
      requestUrlPrefix: 'https://jsonplaceholder.typicode.com/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
