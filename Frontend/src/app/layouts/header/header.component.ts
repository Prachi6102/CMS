import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private tokenService: TokenService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  currentUser = this.tokenService.getCurrentUser();
  username = this.currentUser.username;

  signout() {
    this.tokenService.clearLocalStorage();
    this.cookieService.delete('token', '/', 'localhost');
    this.router.navigate(['/auth/login']);
  }
}
