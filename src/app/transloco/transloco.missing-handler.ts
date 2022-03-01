import {TRANSLOCO_MISSING_HANDLER, TranslocoConfig, TranslocoMissingHandler} from '@ngneat/transloco';

export class CustomHandler implements TranslocoMissingHandler {
  handle(key: string, config: TranslocoConfig): string {
    return '...';
  }
}

export const customMissingHandler = {
  provide: TRANSLOCO_MISSING_HANDLER,
  useClass: CustomHandler
};
