import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent implements OnInit {
  deleteId: string;
  confirmMessage: string;
  id: string;
  deleteType = 'Yes';
  constructor(public dialogRef: MatDialogRef<PopupDialogComponent>) { }

  ngOnInit() {
  }

}
