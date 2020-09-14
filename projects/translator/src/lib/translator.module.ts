import { NgModule } from '@angular/core';
import { TranslatorPipe } from './translator.pipe';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  declarations: [TranslatorPipe],
  exports: [TranslatorPipe]
})

export class TranslatorModule {

  public static forRoot(TranslatorConfig: {
    allowedLocales: Object,
    defaultLocale: string
  }): ModuleWithProviders {
    return {
      ngModule: TranslatorModule,
      providers: [
        { provide: 'TranslatorConfig', useValue: TranslatorConfig }
      ]
    };
  }

}
