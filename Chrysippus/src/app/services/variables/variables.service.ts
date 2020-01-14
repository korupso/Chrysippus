import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  urlBackend: String = "http://localhost:3000";

  constructor() { }
}
