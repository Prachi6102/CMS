import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(CookieService);
  const routes = inject(Router);
  if (!service.get('token')) {
    routes.navigate(['/auth/login']);
    return false;
  }
  return true;
};
