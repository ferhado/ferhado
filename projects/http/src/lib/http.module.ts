import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  imports: [
    HttpClientModule
  ]
})

export class HttpModule {
  public static forRoot(HttpConfig?: {
    requestUrlPrefix?: string
  }): ModuleWithProviders {
    return {
      ngModule: HttpModule,
      providers: [
        { provide: 'HttpConfig', useValue: HttpConfig }
      ]
    };
  }
}