import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiURL;
  constructor(private http: HttpClient, private router: Router) { }
  
  public getToken(): string {
    const userInfo: any = JSON.parse(sessionStorage.getItem('token'));
    if (userInfo) {
      return userInfo;
    }
    else { return null; }
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // tslint:disable-next-line: typedef
  signIn(UserName: string, Password: string) {
    const body = {
      'username': UserName,
      'password': Password
    };
    return this.http.post(this.baseUrl + environment.apiEndPoints.login, body).pipe(map((data:any) => {
      return data;
    }));
  }

  signOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
