import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { VariablesService } from '../services/variables/variables.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  password: String;
  passwordAgain: String;

  constructor(private http: HttpClient, private router: Router, private variables: VariablesService, private user: UserService) { }

  ngOnInit() {
  }

  passwordReset() {
    if (this.password === this.passwordAgain) {
      this.http.put(this.variables.urlBackend + "/" + this.user.id, { username: this.user.username, password: this.password }).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
