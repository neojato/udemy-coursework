import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

}
