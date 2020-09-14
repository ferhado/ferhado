import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@ferhado/http';
import { TranslatorModule } from '@ferhado/translator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule.forRoot({
      requestUrlPrefix: 'https://jsonplaceholder.typicode.com/'
    }),
    TranslatorModule.forRoot({
      defaultLocale: "en",
      allowedLocales: ["en", "de"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
