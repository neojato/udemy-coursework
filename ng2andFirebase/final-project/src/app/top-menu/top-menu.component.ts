import { AuthInfo } from './../shared/security/auth-info';
import { AuthService } from './../shared/security/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  authInfo: AuthInfo;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }

  logout() {
    this._authService.logout();
  }

}
