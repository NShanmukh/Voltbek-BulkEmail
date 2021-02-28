import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _fuseConfigService: FuseConfigService, private router: Router) {
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
    this.router.navigate(["/mailTypes/mailTypes"]);
  }
}
