import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { useAnimation } from '@angular/core/src/animation/dsl';
import { cleanSession } from 'selenium-webdriver/safari';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = fb.group({
      'name': [null, Validators.required],
      'password': ['', Validators.required]
    });
  }

  login (user: User) {
    this.authService.login(user).subscribe(
      result => {
        if (result.success) {
          this.authService.setToken(result.token);
          console.log('-----------result---------', result);
          this.router.navigate(['/dashboard']);
        } else {
          this.error = result.message;
        }
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
  }

}
