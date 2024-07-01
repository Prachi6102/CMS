import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, ILogin } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.url}/register`, userData, {
      withCredentials: true,
    });
  }

  login(loginData: ILogin): Observable<any> {
    return this.http.post(`${this.url}/login`, loginData, {
      withCredentials: true,
    });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.url}/profile`, { withCredentials: true });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.url}/users`, { withCredentials: true });
  }
}
