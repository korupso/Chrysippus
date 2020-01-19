import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VariablesService } from '../services/variables/variables.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  password: String;
  cpassword: String;

  constructor(private http: HttpClient, private variables: VariablesService, private user: UserService, private router: Router) { }

  ngOnInit() {
  }

  resetPassword() {
    if (this.password === this.cpassword) {
      this.http.put(this.variables.urlBackend + "/users/" + this.user.id, { password: this.password }).subscribe(
        res => {
          this.router.navigate(["/dashboard"]);
        }
      )
    }
  }

}
