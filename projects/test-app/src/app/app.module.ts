import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxFerhadoHttpModule } from '@ferhado/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFerhadoHttpModule.forRoot({
      requestUrlPrefix: 'https://jsonplaceholder.typicode.com/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
