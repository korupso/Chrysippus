import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * This component manages the backend of the "/signup" page.
 * 
 * @author Joel Meccariello
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  /**
   * This method sends the user's data to the backend, where it will create a new user, using the data, after a successful check.
   * 
   * @author Joel Meccariello
   */
  register() {
    this.http.post("http://localhost:3000/users/register", { username: this.username, password: this.password }).subscribe(
      (res) => {
        if ((res as any).token) this.router.navigate(["/groups"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
