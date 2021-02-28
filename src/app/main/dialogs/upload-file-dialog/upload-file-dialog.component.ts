import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { EmailtypesService } from 'app/services/emailtypes.service';
import { SnackbarService } from 'app/services/snackbar.service';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit {
  fileType: string;
  tdsId: any;
  imageType = '';
  selection = '';

  popupRef: MatDialogRef<PopupDialogComponent>;

  selectedFile = null;

  displayedColumns: string[] = ['Sno', 'objType', 'filename', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(public dialogRef: MatDialogRef<UploadFileDialogComponent>, private loaderService: FuseSplashScreenService, private dialog: MatDialog, private emailService: EmailtypesService, private snackBar: SnackbarService) { }

  ngOnInit() {
    this.getEmailContentDocs();
  }

  getEmailContentDocs() {
    this.loaderService.show();
    this.emailService.getEmailContentDocs(this.fileType, this.tdsId).subscribe((data: any) => {
      if (data.success) {
        if (data.result) {
          this.loaderService.hide();
          this.dataSource = new MatTableDataSource(data.result);
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

  onFileSelected(event): void {
    if (event.target.files[0]) {
      if (event.target.files[0].size < 5000000) {
        const uploadFile = event.target.files[0].name;
        const uploadType = uploadFile.split('.');
        this.imageType = uploadType[1];
        this.imageType = this.imageType.toLocaleLowerCase();
        if (this.imageType.toLocaleLowerCase() === 'jpg' || this.imageType.toLocaleLowerCase() === 'pdf') {
          this.selectedFile = event.target.files[0];
          this.selection = 'selected';
        }
        else if (this.imageType.toLocaleLowerCase() !== 'jpg' && this.imageType.toLocaleLowerCase() !== 'pdf') {
          this.selection = '';
          this.popupRef = this.dialog.open(PopupDialogComponent, {
            disableClose: false
          });
          this.popupRef.componentInstance.confirmMessage = "Please upload only " + ' PDF/JPG ' + ' ' + 'files';
          this.popupRef.componentInstance.id = '1';
        }
      }
      else {
        this.selection = '';
        this.popupRef = this.dialog.open(PopupDialogComponent, {
          disableClose: false
        });
        this.popupRef.componentInstance.confirmMessage = "Please upload files within size of 5MB";
        this.popupRef.componentInstance.id = '1';
      }
    }
  }

  deleteAttacment(id) {
    this.popupRef = this.dialog.open(PopupDialogComponent, {
      disableClose: true
    });
    this.popupRef.componentInstance.deleteId = '100';
    this.popupRef.componentInstance.confirmMessage = 'Are you sure, Do you want to delete?';

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDocument(id);
      }
    });
  }


  deleteDocument(id) {
    this.loaderService.show();
    this.emailService.deleteEmailDocs(id).subscribe((data: any) => {
      if (data.success) {
        this.loaderService.hide();
        this.snackBar.errorPopup('Document deleted successfully.');
        this.getEmailContentDocs();
      }
      else {
        this.loaderService.hide();
        this.snackBar.errorPopup('Error occurred.Please try again!');
      }
    }, err => {
      this.loaderService.hide();
      this.snackBar.errorPopup('Error occurred.Please try again!');
    });

  }

  onDocSubmit() {
    this.loaderService.show();
    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('ExcelFile', this.selectedFile);
      // formData.append('VSTypeId', this.typeID);
      formData.append('TdsId', this.tdsId);
      this.loaderService.show();
      this.emailService.deleteEmailDocs(formData).subscribe((data: any) => {
        if (data.success) {
          if (data.result) {
            this.snackBar.successPopup('Document uploaded successfully', []);
            this.getEmailContentDocs();
            this.ResetSelection();
          }
          this.loaderService.hide();
        }
      }, err => {
        this.loaderService.hide();
        this.snackBar.errorPopup('Error occurred!Please try again.')
      });

    }
  }

  ResetSelection(): void {
    this.selection = '';
  }

  openConfirmationDialog(id) {
    this.popupRef = this.dialog.open(PopupDialogComponent, {
      disableClose: false
    });
    this.popupRef.componentInstance.confirmMessage = 'Are you sure, Do you want to delete?';
    this.popupRef.componentInstance.deleteId = '1000';

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDocument(id);
      }
    })
  }
}
