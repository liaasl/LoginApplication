import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    
    constructor(private storageService: StorageService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
      const isLoggedIn = this.storageService.isLoggedIn();
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
        return false;
      }

      // get role from route data
      const expectedRole = route.data['role'];
      if (expectedRole) {
        const user = this.storageService.getUser();
        const userRole = user.role;

        if (expectedRole !== userRole) {
          this.router.navigate(['/welcome']);
          return false;
        }
      }


      return true;
    }
}