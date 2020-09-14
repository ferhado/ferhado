import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TranslatorService {

  private rtlLangs = ["ar", "fa", "ur"];
  private translationObject;
  public locale;
  public dir;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('TranslatorConfig') private config
  ) {

    let locale = localStorage.getItem('locale');

    if (this.config.allowedLocales.indexOf(locale) !== -1) {
      this.locale = locale;
    } else {
      this.locale = this.config.defaultLocale;
    }

    this.setSettings(this.locale);
  }

  setLanguage(value) {
    if (this.locale != value) {
      this.locale = value;
      location.reload(true);
      localStorage.setItem("locale", value);
      return;
    }
    this.setSettings(value);
  }

  setTranslationObject(language) {
    this.translationObject = language;
  }

  private setSettings(value) {
    localStorage.setItem("locale", value);
    this.dir = this.rtlLangs.indexOf(value) !== -1 ? 'rtl' : 'ltr';

    // Client Side Only.
    if (!isPlatformServer(this.platformId)) {
      let html = document.getElementsByTagName('html')[0];
      html.setAttribute('dir', this.dir);
      html.setAttribute('lang', this.locale);
    }

  }

  get(key) {
    try { return this.translationObject[key] || key.charAt(0).toUpperCase() + key.slice(1); } catch (error) { }
  }

}
