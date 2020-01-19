import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { tap } from "rxjs/operators";

/**
 * This class is a singleton and is used as an interceptor. It's goal is to intercept each http request and add the user's JWT.
 * 
 * @author Joel Meccariello
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  /**
   * This method intercepts each http request the client makes and adds the authorization header with the user's JWT.
   * 
   * @param { HttpRequest<any> } req  This is the http request, recieved by the client.
   * @param { HttpHandler } next      This is the http handler, used to forward the request, after adding the JWT.
   * 
   * @returns { Observable<HttpEvent<any>> } The result of the http request, after adding the JWT header.
   *
   * @author Joel Meccariello
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.user.jwt;
    if (token) return next.handle(req.clone({ headers: req.headers.append("Authorization", "Bearer " + token) }));
    else return next.handle(req);
  }

  /**
   * This constructor does nothing but inject a service.
   * 
   * @param { UserService } user The user service is injected here.
   * 
   * @author Joel Meccariello
   */
  constructor(private user: UserService, private http: HttpClient) { }
}
