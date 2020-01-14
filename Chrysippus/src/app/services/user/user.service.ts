import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwt: String;
  id: String;
  username: String;

  constructor() { }
}
