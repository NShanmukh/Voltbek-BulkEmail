import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestCache } from 'app/http-interceptors/request-cache.service';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailtypesService {
  private baseUrl = environment.apiURL;
  constructor(private http: HttpClient, private cache: RequestCache) { }

  getEmailContentTypes() {
    return this.http.get(this.baseUrl + environment.apiEndPoints.getAllEmailContents).pipe(map(data => {
      this.cache.delete(this.baseUrl + environment.apiEndPoints.getAllEmailContents);
      return data;
    }));
  }

  createEmailContentTypes(body: any) {
    return this.http.post(this.baseUrl + environment.apiEndPoints.createNewEmailContent, body).pipe(map(data => {
      this.cache.delete(this.baseUrl + environment.apiEndPoints.createNewEmailContent);
      return data;
    }));
  }
}
