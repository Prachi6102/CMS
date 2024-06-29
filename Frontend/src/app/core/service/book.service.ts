import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = 'http://localhost:3000/api/book';

  constructor(private http: HttpClient) {}

  addBook(bookData: FormData): Observable<any> {
    return this.http.post(`${this.url}/add`, bookData, {
      withCredentials: true,
    });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/books`, { withCredentials: true });
  }
}
