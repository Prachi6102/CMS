import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private url = 'http://localhost:3000/api/author';
  constructor(private http: HttpClient) {}

  add(authorData: FormData): Observable<any> {
    return this.http.post(`${this.url}/add`, authorData, {
      withCredentials: true,
    });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/authors`, { withCredentials: true });
  }

  update(id: string, authorData: FormData): Observable<any> {
    return this.http.patch(`${this.url}/update/${id}`, authorData, {
      withCredentials: true,
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`, { withCredentials: true });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`, {
      withCredentials: true,
    });
  }
}
