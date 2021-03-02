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

  // selectedFile: any;
  // selectedExcelFile: any;
  selectedFile = [];
  selectedExcelFile = [];
  availabledisplayedColumns: string[] = ['Sno', 'filename', 'actions'];
  displayedColumns: string[] = ['Sno', 'objType', 'filename', 'actions'];
  dataSource: MatTableDataSource<any>;
  availableDataSource: MatTableDataSource<any>;

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
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].size < 5000000) {
        const uploadFile = event.target.files[i].name;
        const uploadType = uploadFile.split('.');
        this.imageType = uploadType[1];
        // this.selectedFile = [];
        // this.selectedExcelFile = [];
        this.imageType = this.imageType.toLocaleLowerCase();
        if (this.imageType.toLocaleLowerCase() === 'pdf' || this.imageType.toLocaleLowerCase() === 'xlsx') {
          if (this.imageType.toLocaleLowerCase() === 'pdf') {
            this.selectedFile.push(event.target.files[i]);
            this.selection = 'selected';
          }
          else if (this.imageType.toLocaleLowerCase() === 'xlsx') {
            this.selectedExcelFile.push(event.target.files[i]);
            this.selection = 'selected';
          }
          const selectedFiles = [];
          this.selectedFile.forEach(element => {
            selectedFiles.push(element);
          });
          this.selectedExcelFile.forEach(element => {
            selectedFiles.push(element);
          });
          this.availableDataSource = new MatTableDataSource(selectedFiles);
        }
        else if (this.imageType.toLocaleLowerCase() !== 'xlsx' && this.imageType.toLocaleLowerCase() !== 'pdf') {
          this.selection = '';
          this.popupRef = this.dialog.open(PopupDialogComponent, {
            disableClose: false
          });
          this.popupRef.componentInstance.confirmMessage = "Please upload only " + ' PDF/Excel ' + ' ' + 'files';
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
    // if (this.selectedFile) {
    formData.append('ExcelFile', JSON.stringify(this.selectedExcelFile));
    formData.append('PdfFiles', JSON.stringify(this.selectedFile));
    formData.append('TdsId', this.tdsId);
    this.loaderService.show();
    this.emailService.uploadEmailContentDocs(formData).subscribe((data: any) => {
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

    // }
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
