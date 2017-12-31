import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  login (user: User) {
    console.log('logging in....', user);
  }

  ngOnInit() {
  }

}
