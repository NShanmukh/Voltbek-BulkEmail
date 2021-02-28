import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private router: Router, private _snackBar: MatSnackBar) { }
  
  successPopup(successText: string, commands: any[]): void {
    this._snackBar.open(successText, 'x', {
      verticalPosition: 'top', horizontalPosition: 'end', duration: 3000,
      panelClass: ['sucess-snackbar']
    });
    // this.router.navigate(['user', 'list']);
    if (commands && commands.length) {
      this.router.navigate(commands);
    }
  }

  errorPopup(errorText: string): void {
    this._snackBar.open(errorText, 'x', {
      verticalPosition: 'top', horizontalPosition: 'end', duration: 3000,
      panelClass: ['error-snackbar']
    });

  }
  warnPopup(wanrText: string): void {
    this._snackBar.open(wanrText, 'x', {
      verticalPosition: 'top', horizontalPosition: 'end', duration: 3000,
      panelClass: ['warn-snackbar']
    });

  }
}
