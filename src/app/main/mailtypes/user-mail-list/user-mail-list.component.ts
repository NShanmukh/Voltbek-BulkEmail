import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { PopupDialogComponent } from 'app/main/dialogs/popup-dialog/popup-dialog.component';
import { EmailtypesService } from 'app/services/emailtypes.service';
import { SnackbarService } from 'app/services/snackbar.service';

@Component({
  selector: 'app-user-mail-list',
  templateUrl: './user-mail-list.component.html',
  styleUrls: ['./user-mail-list.component.scss']
})
export class UserMailListComponent implements OnInit {
  tdsId: any
  status: string;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialogRef: MatDialogRef<PopupDialogComponent>;

  displayedColumns = ['tdsUserName', 'tdsMailId', 'tdsPdfName', 'tdsIsMailSended', 'createdOn', 'createdBy', 'actions'];

  hide = false;

  constructor(private route: ActivatedRoute, private mailService: EmailtypesService, private snackBar: SnackbarService, private loaderService: FuseSplashScreenService, private router: Router, private dialog: MatDialog) {
    route.paramMap.subscribe((params: any) => {
      this.tdsId = params['params'].id;

    });
    this.status = sessionStorage.getItem('completedStatus');
  }

  ngOnInit() {
    this.getEmailUsersList();
  }

  getEmailUsersList() {
    this.loaderService.show();
    this.mailService.getEmailListOfUsers(this.tdsId).subscribe((data: any) => {
      if (data.success) {
        if (data.result) {
          this.loaderService.hide();
          this.dataSource = new MatTableDataSource(data.result)
        }
      }
      else {
        this.loaderService.hide();
        this.snackBar.errorPopup('Error occured, Please try again!');
      }
    }, err => {
      this.loaderService.hide();
      this.snackBar.errorPopup('Error occured, Please try again!');
    });
  }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sendMailToUsers() {
    this.loaderService.show();
    this.mailService.sendEmailListToUsers(this.tdsId).subscribe((data: any) => {
      if (data.success) {
        if (data.result) {
          if (data.result.statusCode === 201) {
            this.loaderService.hide();
            this.snackBar.successPopup('Mail sent successfully', ['/mailTypes/mailTypes']);
          }
          else {
            this.loaderService.hide();
            this.snackBar.errorPopup(data.result.responseMessage);
            return;
          }
        }
      }
      else {
        this.loaderService.hide();
        this.snackBar.errorPopup('Error occured, please try agian!');
      }
    }, err => {
      this.loaderService.hide();
      this.snackBar.errorPopup('Error occured, please try agian!');
    });
  }

  openConfirmationDialog(id: any) {
    this.dialogRef = this.dialog.open(PopupDialogComponent, {
      disableClose: true
    });
    this.dialogRef.componentInstance.deleteId = '100';
    this.dialogRef.componentInstance.confirmMessage = 'Select the type of record to be deleted';
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result === 'Yes') {
          this.mailService.deleteEmailDocs(id).subscribe((data: any) => {
            if (data.success) {
              if (data.result) {
                this.getEmailUsersList();
                this.snackBar.successPopup('PDF document removed successfully', []);
              }
            }
            else {
              this.snackBar.errorPopup('Error occured, please try again!');
            }
          });
        }
        else if (result === 'No') {
          this.mailService.deleteUserMailRecord(id).subscribe((data: any) => {
            if (data.success) {
              if (data.result) {
                this.getEmailUsersList();
                this.snackBar.successPopup('User removed successfully', []);
              }
            }
            else {
              this.snackBar.errorPopup('Error occured, please try again!');
            }
          });
        }
      }
    })
  }
}
