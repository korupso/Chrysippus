import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

/**
 * This component manages the backend of the "/login" page.
 *
 * @author Joel Meccariello
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * This variable stores the user's username.
   * 
   * @author Joel Meccariello
   */
  username: String;

  /**
   * This variable stores the user's password.
   *
   * @author Joel Meccariello
   */
  password: String;

  /**
   * This construction injects a HttpClient object and a Router object.
   *
   * @param http    The HttpClient object, used to make http requests.
   * @param router  The Router object, used to navigate to other components.
   *
   * @author Joel Meccariello
   */
  constructor(private http: HttpClient, private router: Router, private user: UserService) { }

  ngOnInit() {
  }

  /**
   * This method sends the user's data to the backend for a check. If the check succeeds, the user will be given a JWT, granting him access to his personal page.
   */
  authenticate() {
    this.http.post("http://localhost:3000/users/authenticate", { username: this.username, password: this.password }).subscribe(
      (res) => {
        if ((res as any).token) {
          this.user.id = (res as any)._id;

          this.router.navigate(["/password-reset"]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
