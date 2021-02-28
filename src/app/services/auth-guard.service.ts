import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CanActivateChild, CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  path: import('@angular/router').ActivatedRouteSnapshot[];
  route: import('@angular/router').ActivatedRouteSnapshot;
  
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(): boolean {
    const isUserAuthenticated = this.authService.isAuthenticated();
    if (!isUserAuthenticated) {
      this.router.navigate(['/auth/login']);
    }
    return isUserAuthenticated;
  }

  canActivateChild(): boolean {
    console.log('checking child route access');
    return true;
  }

  canLoad(): boolean {
    const isUserAuthenticated = this.authService.isAuthenticated();
    if (!isUserAuthenticated) {
      this.router.navigate(['/auth/login']);
    }
    return isUserAuthenticated;
  }
}
