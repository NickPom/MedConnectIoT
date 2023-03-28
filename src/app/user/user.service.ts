import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getUserData() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authService.getToken(),
    });

    return this.httpClient.get<any>("https://" + environment.apiLocation + ":8080" + '/user', {
      headers: reqHeader,
      observe: 'response'
    });
  }
}
