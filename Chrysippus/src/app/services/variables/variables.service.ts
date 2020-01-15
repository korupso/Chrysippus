import { Injectable } from '@angular/core';

/**
 * This service stores variables, that need to be the same globally.
 * 
 * @author Joel Meccariello
 */
@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  /**
   * This variable stores the url to the backend server. Every http request in this application uses this variable to direct it's request.
   * 
   * @author Joel Meccariello
   */
  urlBackend: String = "http://localhost:3000";

  /**
   * This constructor does effectively nothing.
   * 
   * @author Joel Meccariello
   */
  constructor() { }
}
