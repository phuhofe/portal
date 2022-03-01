import {Pipe, PipeTransform} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {Observable} from 'rxjs';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslocoService) {
  }

  transform(items: any): any {

    return new Observable(observer => {
      this.translateService.selectTranslate(items).subscribe(result => {
        observer.next(result);
      });

      this.translateService.langChanges$.subscribe(event => {
        this.translateService.selectTranslate(items).subscribe(result => {
          observer.next(result);
        });
      });
    });
  }
}
