import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardUser {
  constructor(private AuthService: AuthService, private router: Router) {}
  canActivate(): boolean {
    const currentUser = this.AuthService.currentuser;
    const requiredRole = 'user';
    if (currentUser && currentUser.role === requiredRole) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
