import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {

  constructor(private loaderService: LoaderService) { }
  private totalRequests = 0;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          this.decreaseRequests();
      }
    },
      (err: any) => {
        this.decreaseRequests();
        throw err;
      }));

  }

  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.onEnd();
    }
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    // this.loaderService.show();
  }

  private hideLoader(): void {
    // this.loaderService.hide();
  }

  
}
