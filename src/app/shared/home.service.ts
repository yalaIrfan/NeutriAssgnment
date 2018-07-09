import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {

  private _register = "/users/register";

  private _login = "/users/login";

  constructor(private http: HttpClient) { }

  registerUser(user) {
    console.log('2 .in service user', JSON.stringify(user));
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.post(this._register, user, { headers });

  }


  login(user): Observable<any> {
    console.log('in login ', JSON.stringify(user));
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.post(this._login, user, { headers });
  }



}
