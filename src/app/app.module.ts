import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { VideocallPJComponent } from './videocall-pj/videocall-pj.component';
import { VisitListComponent } from './visit/visit-list/visit-list.component';
import { WebRTCComponent } from './web-rtc/web-rtc.component';
import { NgxWebrtcModule } from 'ngx-webrtc';
import { CallFormComponent } from './call-form/call-form.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { SignupComponent } from './signup/signup.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { SpecificDocumentListComponent } from './specific-document-list/specific-document-list.component';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { HeaderComponent } from './header/header.component';
import { getItalianPaginatorIntl } from './visit/visit-list/italian-paginator';
import { KurentoComponent } from './kurento/kurento.component';
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatGridListModule} from "@angular/material/grid-list";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GdprComponent } from './gdpr/gdpr.component';
import { DataTakeoutComponent } from './data-takeout/data-takeout.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule, NgbModal, NgbDatepickerModule, NgbCollapseModule, NgbNavModule  } from '@ng-bootstrap/ng-bootstrap';
import { DeviceComponent } from './device/device.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    VideocallPJComponent,
    VisitListComponent,
    WebRTCComponent,
    CallFormComponent,
    DocumentListComponent,
    PatientListComponent,
    SpecificDocumentListComponent,
    HeaderComponent,
    KurentoComponent,
    GdprComponent,
    DataTakeoutComponent,
    DialogComponent,
    DeviceComponent,


  ],
  imports: [
    NgbCollapseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NgxWebrtcModule.forRoot({
      userIdentifier: 'id',
      debug: true
    }),
    MatCardModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    NgbModule,
    NgbDatepickerModule,
    NgbNavModule,
    MatFormFieldModule, MatDatepickerModule,
    ReactiveFormsModule

  ],
  exports: [
    MatTableModule,
    MatButtonModule
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getItalianPaginatorIntl() }, {provide: LocationStrategy, useClass: HashLocationStrategy},provideNativeDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'it-IT'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
