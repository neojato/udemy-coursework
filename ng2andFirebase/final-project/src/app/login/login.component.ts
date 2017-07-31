import { Router } from '@angular/router';
import { AuthService } from './../shared/security/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    const formValue = this.form.value;
    this._authService.login(formValue.email, formValue.password)
      .subscribe(
        () => this._router.navigate(['/home']),
        alert
      );
  }

}
