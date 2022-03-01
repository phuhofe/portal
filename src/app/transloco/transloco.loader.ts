import {Injectable} from '@angular/core';

import {from, Observable} from 'rxjs';
import {TRANSLOCO_LOADER, Translation, TranslocoLoader} from '@ngneat/transloco';

@Injectable()
export class TranslocoHttpLoader implements TranslocoLoader {

  constructor() {}

  getTranslation(langPath: string): Observable<Translation> {
    return from(import(`src/assets/i18n/${langPath}.json`));
  }
}

export const translocoLoader = {
  provide: TRANSLOCO_LOADER,
  useClass: TranslocoHttpLoader
};
