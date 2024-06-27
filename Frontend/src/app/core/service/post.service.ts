import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContent } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  addPost(content: IContent): Observable<any> {
    return this.http.post(`${this.url}/add`, content, {
      withCredentials: true,
    });
  }

  getAllPost(): Observable<any> {
    return this.http.get(`${this.url}/all-posts`, { withCredentials: true });
  }
}


