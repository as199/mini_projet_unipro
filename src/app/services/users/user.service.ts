import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }
  private _refresh$ = new Subject();
  get refresh(): any{
    return this._refresh$;
  }

  getAllUsers(): Observable<any>
  {
    return this.http.get(`${this.url}/users`);
  }
  getAllPostOfOneUser(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/users/${id}/posts`);
  }
  getOneUsers(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/users/${id}`);
  }

  deleteUsers(id: number): Observable<any>
  {
    return this.http.delete(`${this.url}/users/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      }));
  }

  addUsers(user: any): Observable<any>
  {
    return this.http.post(`${this.url}/users`, user);
  }

 putUsers(id: number, user: any): Observable<any>
  {
    return this.http.put(`${this.url}/users/${id}`, user);
  }
}
