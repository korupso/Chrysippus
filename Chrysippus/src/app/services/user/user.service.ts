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

  constructor() { }
}
