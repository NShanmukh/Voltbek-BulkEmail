import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { EmailtypesService } from 'app/services/emailtypes.service';
import { SnackbarService } from 'app/services/snackbar.service';
import { QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-mail-types-create',
  templateUrl: './mail-types-create.component.html',
  styleUrls: ['./mail-types-create.component.scss']
})
export class MailTypesCreateComponent implements OnInit {
  form: FormGroup;
  hide = false;

  @ViewChild('editor') editor: QuillEditorComponent
  constructor(private fb: FormBuilder, private snackBar: SnackbarService, private emailService: EmailtypesService, private loaderService: FuseSplashScreenService) { }

  ngOnInit() {

    this.form = this.fb.group({
      tdsTitle: ['TDSMail', Validators.required],
      tdsSubject: ['', Validators.required],
      tdsEmailFrom: ['', Validators.required],
      tdsEmailCc: [''],
      tdsEmailBody: ['', Validators.required]
    });
    this.form
      .controls
      .tdsEmailBody
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        console.log('native fromControl value changes with debounce', data)
      });

    this.editor
      .onContentChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        console.log('view child + directly subscription', data)
      });
  }

  patchValue() {
    this.form.controls['editor'].patchValue(`${this.form.controls['editor'].value} patched!`)
  }

  onEmailBodySumit() {
    debugger
    this.loaderService.show();
    if (this.form.invalid) {
      this.snackBar.errorPopup('Please fill all mandatory fields');
      this.loaderService.hide();
      return;
    }
    this.emailService.createEmailContentTypes(this.form.value).subscribe((data: any) => {
      if (data.success) {
        if (data.result) {
          this.loaderService.hide();
          this.snackBar.successPopup('Email content saved successfully', ['/mailTypes/mailTypes'])
        }
      } else {
        this.loaderService.hide();
        this.snackBar.errorPopup('Error occured, Please try again!')
      }
    }, err => {
      this.loaderService.hide();
      this.snackBar.errorPopup('Error occured, Please try again!')
    });
  }
}
