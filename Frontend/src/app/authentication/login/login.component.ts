import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/core/service/user.service';
import { TokenService } from 'src/app/core/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cookiService: CookieService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.cookiService.set('token', response.data.token, { path: '/' });
          this.tokenService.setToken(response.data.token);
          this.tokenService.setCurrentUser({
            id: response.data.loggedInUser._id,
            username: response.data.loggedInUser.user_name,
            role: response.data.loggedInUser.role,
          });
          this.router.navigate(['/home']);
          Swal.fire({ text: response.message, icon: 'success' });
        },
        error: (error) => {
          Swal.fire({ text: error.error.message, icon: 'error' });
        },
      });
    }
  }
}
