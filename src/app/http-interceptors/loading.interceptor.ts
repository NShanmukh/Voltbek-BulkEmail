import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import { LoaderService, LoadingOverlayRef } from '../services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loadingRef: LoadingOverlayRef;

    // This is a little hacky and related to change detection (ExpressionChangedAfterItHasBeenCheckedError).
    // More informations here:
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
    let url = req.url;
    let positionIndicator: string = 'api/';
    let position = url.indexOf(positionIndicator);
    let destination: string = url.substr(position + positionIndicator.length);
    let k = destination.indexOf("/", destination.indexOf("/") + 1)
    let res = destination.substring(0, k);
    if (res !== 'Vendor/SearchVendorsNew') {
      Promise.resolve(null).then(() => loadingRef = this.loadingService.open()).catch(() => loadingRef.close());
    }

    return next.handle(req).do(event => {
      if (event instanceof HttpResponse && loadingRef) {
        loadingRef.close();
      }
      else {
        if (loadingRef) {
          loadingRef.close();
        }
      }
    }).catch(error => {
      if (loadingRef) {
        loadingRef.close();
      }

      return Observable.throw(error);
    });
  }
}
