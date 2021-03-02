import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailTypesComponent } from './mail-types/mail-types.component';
import { MailTypesCreateComponent } from './mail-types-create/mail-types-create.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@fuse/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { UserMailListComponent } from './user-mail-list/user-mail-list.component';

const routes: Routes = [
  {
    path: 'mailTypes',
    component: MailTypesComponent
  },
  {
    path: 'mailTypeCreate',
    component: MailTypesCreateComponent
  },
  {
    path: 'userlist/:id',
    component: UserMailListComponent
  }
];

@NgModule({
  declarations: [MailTypesComponent, MailTypesCreateComponent, UserMailListComponent],
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
