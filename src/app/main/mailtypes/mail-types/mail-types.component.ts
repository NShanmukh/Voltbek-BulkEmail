import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { EmailtypesService } from 'app/services/emailtypes.service';
import { SnackbarService } from 'app/services/snackbar.service';

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

  constructor(private emailService: EmailtypesService, private snackBar: SnackbarService, private loaderService: FuseSplashScreenService) {
    this.dataSource = new MatTableDataSource(this.mailContentTypes);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getEmailContentTypes();
  }

  getEmailContentTypes() {
    this.loaderService.show();
    this.emailService.getEmailContentTypes().subscribe((data: any) => {
      if (data.success) {
        if (data.result) {
          this.loaderService.hide();
          this.dataSource = new MatTableDataSource(data.result);
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
  applyFilter(filterValue) {
    this.dataSource.filter = filterValue;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
