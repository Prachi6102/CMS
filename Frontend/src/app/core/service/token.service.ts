import { Injectable } from '@angular/core';
import { IToken } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  setToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  getTokens(): string {
    return JSON.parse(localStorage.getItem('token') ?? '{}');
  }

  setCurrentUser(userDetail: IToken) {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(userDetail));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }

  clearLocalStorage() {
    localStorage.clear();
  }
  
}
