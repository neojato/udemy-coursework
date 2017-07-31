import { Router } from '@angular/router';
import { AuthService } from './../shared/security/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  isPasswordMatch() {
    const val = this.form.value;
    return val && val.password && val.password === val.confirm;
  }

  signUp() {
    const val = this.form.value;
    this._authService.signUp(val.email, val.password)
      .subscribe(
        () => {
          alert('User created sucessfully!');
          this._router.navigateByUrl('/home');
        },
        err => alert(err)
      );
  }

}
