import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }
  private _refresh$ = new Subject();
  get refresh(): any{
    return this._refresh$;
  }
  getAllComment(): Observable<any>
  {
    return this.http.get(`${this.url}/comments`);
  }

  getOneComments(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/comments/${id}`);
  }

  deleteComment(id: number): Observable<any>
  {
    return this.http.delete(`${this.url}/comments/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      }));
  }

  addComments(comment: any): Observable<any>
  {
    return this.http.post(`${this.url}/comments`, comment).pipe(
      tap(() => {
        this._refresh$.next();
      }));
  }

  putPosts(id: number, comment: any): Observable<any>
  {
    return this.http.put(`${this.url}/comments/${id}`, comment).pipe(
      tap(() => {
        this._refresh$.next();
      }));
  }
}
