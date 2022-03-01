import {TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule} from '@ngneat/transloco';
import {NgModule} from '@angular/core';
import {translocoLoader} from './transloco.loader';
import {environment} from '@app/env';
import {customMissingHandler} from './transloco.missing-handler';

const translocoConfig: TranslocoConfig = {
  availableLangs: ['cs', 'da', 'de', 'en', 'es', 'nb', 'nl', 'sk', 'sv'],
  defaultLang: 'en',
  reRenderOnLangChange: true,
  prodMode: environment.production,
};

const translocoProvider = {
  provide: TRANSLOCO_CONFIG,
  useValue: translocoConfig
};

@NgModule({
  exports: [TranslocoModule],
  providers: [
    translocoProvider,
    translocoLoader,
    customMissingHandler
  ]
})
export class TranslocoRootModule {
}
