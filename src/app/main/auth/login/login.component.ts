import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { SnackbarService } from 'app/services/snackbar.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _fuseConfigService: FuseConfigService, private router: Router, private snackBar: SnackbarService) {
    this._fuseConfigService.config = {
      layout: {
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        }
      }
    };
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['']
    });
  }

  onLoginClick() {
    if (this.loginForm.invalid) {
      this.snackBar.errorPopup('Please fill all mandatory fields');
      return;
    }
    if ((this.loginForm.value.userName.toLocaleLowerCase() === 'user000001' || this.loginForm.value.userName.toLocaleLowerCase()==='admin') && this.loginForm.value.password === '123456') {
      this.router.navigate(["/mailTypes/mailTypes"]);
    }
    else{
      this.snackBar.errorPopup('Invalid credentials');
    }
  }
}
