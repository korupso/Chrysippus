import { Injectable } from '@angular/core';

/**
 * This class is a singleton and is used as a service to store user data.
 *
 * @author Joel Meccariello
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * This variable stores the JSON-Web-Token of the user, once authenticated.
   *
   * @author Joel Meccariello
   */
  jwt: string;

  /**
   * This variable stores the ID of the user, once authenticated.
   *
   * @author Joel Meccariello
   */
  id: string;

  /**
   * This variable stores the username of the user, once authenticated.
   *
   * @author Joel Meccariello
   */
  username: string;

  /**
   * This constructor does effectively nothing.
   * 
   * @author Joel Meccariello
   */
  constructor() { }

  /**
   * This method sets all the variables in the singleton to the values given in the parameter.
   * 
   * @param user Contains the user's ID, JWT and username.
   * 
   * @author Joel Meccariello
   */
  setUserInfo(user: { _id: string, token: string, username: string }) {
    this.id = user._id;
    this.jwt = user.token;
    this.username = user.username;
  }

  /**
   * This method gets all the saved user info from the singleton to the caller of the method.
   * 
   * @author Joel Meccariello
   */
  getUserInfo(): { id: string, jwt: string, username: string } {
    return { id: this.id, jwt: this.jwt, username: this.username };
  }

  /**
   * This method wipes all user data stored in this service. Useful for a fast logout.
   * 
   * @author Joel Meccariello
   */
  wipeUserInfo() {
    this.id = undefined;
    this.jwt = undefined;
    this.username = undefined;
  }
}
