import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { tap } from 'rxjs/operators';
import { RequestCache } from './request-cache.service';
import { environment } from 'environments/environment';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method == 'GET' ) {
      const cachedResponse = this.cache.get(req);
      return cachedResponse ? Observable.of(cachedResponse) : this.sendRequest(req, next, this.cache);
    } else {
      return next.handle(req);
    }
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(req, event);
        }
      })
    );
  }
}