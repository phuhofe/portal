import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@app/env';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const hasBaseURL = /^(http|https):/i.test(request.url);

    if (!hasBaseURL
      && request.url.indexOf('assets/locale') < 0
      && request.url.indexOf('assets/images') < 0
    ) {
      const url = environment.production
        ? `${environment.apiBaseURL}${request.url}`
        : `${environment.apiBaseURL}${request.url}`;

      request = request.clone({url});
    }

    return next.handle(request);
  }
}
