import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-mail-types',
  templateUrl: './mail-types.component.html',
  styleUrls: ['./mail-types.component.scss']
})
export class MailTypesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['EmailType', 'FromAdd', 'Subject', 'createdOn', 'actions'];
  form: FormGroup;
  hide = false;

  @ViewChild('editor') editor: QuillEditorComponent
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      editor: ['test']
    });
    this.form
      .controls
      .editor
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

  applyFilter(filterValue) {

  }
}
