import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoGuard implements CanActivate {

  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = next.data.expectedRol; //*expectedRol, variable pasada desde el app-routing.module.ts
    this.realRol = this.tokenService.isAdmin ? 'admin' : 'user';
  
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}
