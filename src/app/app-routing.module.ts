import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { VideocallPJComponent } from './videocall-pj/videocall-pj.component';
import { WebRTCComponent } from './web-rtc/web-rtc.component';
import { SignupComponent } from './signup/signup.component';
import { SpecificDocumentListComponent } from './specific-document-list/specific-document-list.component';
import { KurentoComponent } from "./kurento/kurento.component";
import { GdprComponent } from './gdpr/gdpr.component';
import { DataTakeoutComponent } from './data-takeout/data-takeout.component';

import { DeviceComponent } from './device/device.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'gdpr', component: GdprComponent },
  { path: 'data-takeout', component: DataTakeoutComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'pocPJ/:visitId', component: VideocallPJComponent, canActivate: [AuthGuard]},
  { path: 'WebRTC/:visitId', component: WebRTCComponent, canActivate: [AuthGuard]},
  { path: 'kurento/:visitId', component: KurentoComponent, canActivate: [AuthGuard]},
  { path: 'patient/:patientId', component: SpecificDocumentListComponent, canActivate: [AuthGuard]},
  { path: 'device', component: DeviceComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
