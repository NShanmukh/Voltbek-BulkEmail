import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { UploadFileDialogComponent } from 'app/main/dialogs/upload-file-dialog/upload-file-dialog.component';
import { EmailtypesService } from 'app/services/emailtypes.service';
import { SnackbarService } from 'app/services/snackbar.service';

@Component({
  selector: 'app-mail-types',
  templateUrl: './mail-types.component.html',
  styleUrls: ['./mail-types.component.scss']
})

export class MailTypesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  dialogRef: MatDialogRef<UploadFileDialogComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['tdsTitle', 'tdsEmailFrom', 'tdsSubject', 'tdsCreatedOn', 'tdsCreatedBy', 'actions'];
  form: FormGroup;
  hide = false;

  constructor(private emailService: EmailtypesService, private router: Router, private snackBar: SnackbarService, private loaderService: FuseSplashScreenService, private dialog: MatDialog) {

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
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
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

  openConfirmationDialog(recId: any) {
    this.dialogRef = this.dialog.open(UploadFileDialogComponent, {
      disableClose: true
    });
    this.dialogRef.componentInstance.tdsId = recId;
  }

  viewEmailUserList(id, status) {
    sessionStorage.setItem('completedStatus', status);
    this.router.navigate(['/mailTypes/userlist', id])
  }
}
