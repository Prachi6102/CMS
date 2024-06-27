import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(TokenService);

  const expectedRole = route.data['expectedRole'];
  const currentUser = service.getCurrentUser();
  if (currentUser && currentUser.role === expectedRole) {
    return true;
  } else {
    // Redirect or handle unauthorized access
    router.navigate(['/pages/unauthorized']);
    return false;
  }
};
