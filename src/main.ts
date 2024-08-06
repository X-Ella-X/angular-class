import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { loadTranslations } from '@angular/localize';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID } from '@angular/core';

async function setupLocale() {
  if (localStorage.getItem('locale') != 'de') {
    return 'en-US';
  }
  const response = await fetch('assets/messages.de.json');
  const result = await response.json();
  loadTranslations(result.translations);
  registerLocaleData(localeDe);
  return 'de';
}

setupLocale().then((localeValue) => {
  platformBrowserDynamic([{ provide: LOCALE_ID, useValue: localeValue }])
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
