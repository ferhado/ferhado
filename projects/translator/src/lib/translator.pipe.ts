import { Pipe, PipeTransform } from '@angular/core';
import { TranslatorService } from './translator.service';


@Pipe({
  name: 'tr',
  pure: false
})

export class TranslatorPipe implements PipeTransform {
  constructor(private _translate: TranslatorService) { }

  transform(value: any, key: any = null) {
    if (!value) return;
    if (key) {
      if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
        return value[key];
      } else {
        return this._translate.get(value)[key];
      }
    }
    return this._translate.get(value);
  }

}