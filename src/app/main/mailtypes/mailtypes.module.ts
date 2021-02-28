import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailTypesComponent } from './mail-types/mail-types.component';
import { MailTypesCreateComponent } from './mail-types-create/mail-types-create.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@fuse/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
      path: 'mailTypes',
      component:MailTypesComponent
  },
  {
      path: 'mailTypeCreate',
      component:MailTypesCreateComponent
  },
];

@NgModule({
  declarations: [MailTypesComponent, MailTypesCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillModule
  ]
})
export class MailtypesModule { }
