import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }
  private _refresh$ = new Subject();
  get refresh(): any{
    return this._refresh$;
  }

  getAllPosts(): Observable<any>
  {
    return this.http.get(`${this.url}/posts`);
  }

  getAllCommentOfOnePost(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/posts/${id}/comments`);
  }

  getOnePosts(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/posts/${id}`);
  }

  deletePosts(id: number): Observable<any>
  {
    return this.http.delete(`${this.url}/posts/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      }));
  }


  addPosts(post: any): Observable<any>
  {
    return this.http.post(`${this.url}/posts`, post).pipe(
      tap(() => {
        this._refresh$.next();
      }));

  }

  putPosts(id: number, post: any): Observable<any>
  {
    return this.http.put(`${this.url}/posts/${id}`, post).pipe(
      tap(() => {
        this._refresh$.next();
      }));
  }
  s
}
