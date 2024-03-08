import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user';
import { NgbNav, NgbNavItem, NgbNavLink } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuCollapsed = true;
  user: User = new User('', '', '', 0, '');
  constructor(private authService: AuthService, private userService: UserService) {}


  ngOnInit() {
    this.userService.getUserData().subscribe(resp => {
      if(resp.status == 200) {
        this.user = new User(resp.body.nome, resp.body.cognome, resp.body.email, resp.body.id_persona, resp.body.tipo);
      }
    });
  }
  onLogout() {
    this.authService.logout();
  }
}
