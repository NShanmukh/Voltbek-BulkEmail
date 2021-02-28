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

  mailContentTypes = [
    {
      EmailType: 'Q1',
      FromAdd: 'vserveq@voltasworld.com',
      Subject: 'Regarding Q1 Results',
      createdOn: new Date()
    },
    {
      EmailType: 'Q2',
      FromAdd: 'vserveq@voltasworld.com',
      Subject: 'Regarding Q2 Results',
      createdOn: new Date()
    },
    {
      EmailType: 'Q3',
      FromAdd: 'vserveq@voltasworld.com',
      Subject: 'Regarding Q3 Results',
      createdOn: new Date()
    },
    {
      EmailType: 'Q4',
      FromAdd: 'vserveq@voltasworld.com',
      Subject: 'Regarding Q4 Results',
      createdOn: new Date()
    },
    {
      EmailType: 'Q5',
      FromAdd: 'vserveq@voltasworld.com',
      Subject: 'Regarding Q5 Results',
      createdOn: new Date()
    }
  ]

  @ViewChild('editor') editor: QuillEditorComponent
  constructor(private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource(this.mailContentTypes);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  applyFilter(filterValue) {

  }
}
