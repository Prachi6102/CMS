import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = 'http://localhost:3000/api/category';

  constructor(private http: HttpClient) {}

  addCategory(details: ICategory): Observable<any> {
    return this.http.post(`${this.url}/add`, details, {
      withCredentials: true,
    });
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.url}/categories`, { withCredentials: true });
  }
}
