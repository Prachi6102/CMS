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

  getPostById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`, { withCredentials: true });
  }

  updatePost(id: string, content: IContent): Observable<any> {
    return this.http.patch(`${this.url}/edit/${id}`, content, {
      withCredentials: true,
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`, {
      withCredentials: true,
    });
  }
}
