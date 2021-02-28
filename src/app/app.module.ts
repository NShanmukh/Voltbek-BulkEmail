import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { QuillModule } from 'ngx-quill';
import { LoginComponent } from './main/auth/login/login.component';
import { MaterialModule } from '@fuse/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadFileDialogComponent } from './main/dialogs/upload-file-dialog/upload-file-dialog.component';
import { PopupDialogComponent } from './main/dialogs/popup-dialog/popup-dialog.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth/login',
        component: LoginComponent,
    },
    {
        path: 'mailTypes',
        loadChildren: './main/mailtypes/mailtypes.module#MailtypesModule',
    }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UploadFileDialogComponent,
        PopupDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        QuillModule.forRoot(),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        // App modules
        LayoutModule
    ],
    entryComponents: [
        UploadFileDialogComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
