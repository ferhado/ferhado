import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  imports: [
    HttpClientModule
  ]
})

export class NgxFerhadoHttpModule {
  public static forRoot(HttpConfig?: {
    requestUrlPrefix?: string
  }): ModuleWithProviders {
    return {
      ngModule: NgxFerhadoHttpModule,
      providers: [
        { provide: 'HttpConfig', useValue: HttpConfig }
      ]
    };
  }
}