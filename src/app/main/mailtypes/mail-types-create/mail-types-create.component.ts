import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
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
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      tdsTitle: ['TDSMail'],
      tdsSubject: [''],
      tdsEmailFrom: [''],
      tdsEmailCc: [''],
      tdsEmailBody: ['']
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

}
