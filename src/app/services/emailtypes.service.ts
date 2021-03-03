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

  getEmailListOfUsers(tdsId: any) {
    return this.http.get(this.baseUrl + environment.apiEndPoints.getAllEmailUserList + '/' + tdsId).pipe(map(data => {
      this.cache.delete(this.baseUrl + environment.apiEndPoints.getAllEmailUserList);
      return data;
    }));
  }

  sendEmailListToUsers(tdsId: any) {
    return this.http.get(this.baseUrl + environment.apiEndPoints.sendEmailToUserList + '/' + tdsId).pipe(map(data => {
      this.cache.delete(this.baseUrl + environment.apiEndPoints.sendEmailToUserList);
      return data;
    }));
  }

  getEmailContentDocs(type: string, tdsId: any) {
    return this.http.get(this.baseUrl + environment.apiEndPoints.getAllEmailDocsByType + '/' + type + '/' + tdsId).pipe(map(data => {
      this.cache.delete(this.baseUrl + environment.apiEndPoints.getAllEmailDocsByType);
      return data;
    }));
  }

  uploadContentPdfDocs(body: any) {
    return this.http.post(this.baseUrl + environment.apiEndPoints.uploadEmailContentPdfDocs, body).pipe(map(data => {
      this.cache.delete(this.baseUrl + environment.apiEndPoints.uploadEmailContentPdfDocs);
      return data;
    }));
  }

  uploadEmailContentDocs(body: any) {
    return this.http.post(this.baseUrl + environment.apiEndPoints.uploadEmailToUserExcel, body).pipe(map(data => {
      this.cache.delete(this.baseUrl + environment.apiEndPoints.uploadEmailToUserExcel);
      return data;
    }));
  }

  deleteEmailDocs(tdsId) {
    return this.http.delete(this.baseUrl + environment.apiEndPoints.deleteEmailDocsByType + '/' + tdsId).pipe(map(data => {
      this.cache.delete(this.baseUrl + environment.apiEndPoints.deleteEmailDocsByType);
      return data;
    }));
  }

  deleteUserMailRecord(tdsId){
    return this.http.delete(this.baseUrl + environment.apiEndPoints.deleteEmailUserRecord + '/' + tdsId).pipe(map(data => {
      this.cache.delete(this.baseUrl + environment.apiEndPoints.deleteEmailUserRecord);
      return data;
    }));
  }
}
