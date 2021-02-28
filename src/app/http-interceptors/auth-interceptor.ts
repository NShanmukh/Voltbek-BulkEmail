import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  // tslint:disable-next-line: typedef
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let authReq;
    const authToken = 'Bearer ' + this.auth.getToken();
    const boundary = Math.random().toString().substr(2);
    if (req.url.indexOf(environment.apiEndPoints.uploadVendorDocuments) > 0) {
      authReq = req.clone({
        setHeaders: {
          Authorization: authToken,
          'Accept': 'application/json',
        }
      });
    }
    else if
      (req.url.indexOf(environment.apiEndPoints.uploadIntimeProjectDetails) > 0) {
      authReq = req.clone({
        setHeaders: {
          Authorization: authToken,
          'Accept': 'application/json',
        }
      });
    }
    else if
      (req.url.indexOf(environment.apiEndPoints.uploadVendorProjectAttachment) > 0) {
      authReq = req.clone({
        setHeaders: {
          Authorization: authToken,
          'Accept': 'application/json',
        }
      });
    }
    else if
      (req.url.indexOf(environment.apiEndPoints.uploadSupplierrProjectAttachment) > 0) {
      authReq = req.clone({
        setHeaders: {
          Authorization: authToken,
          'Accept': 'application/json',
        }
      });
    }
    else {
      authReq = req.clone({
        setHeaders: {
          Authorization: authToken,
          'Content-Type': 'application/json'
        }
      });
    }

    // send cloned request with header to the next handler.
    return next.handle(authReq);


  }
}
