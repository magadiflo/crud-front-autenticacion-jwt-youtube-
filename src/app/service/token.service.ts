import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY: string = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: string[] = [];

  constructor(private router: Router) { }

  get token(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  get username(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.token;
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;

    return username;
  }

  get isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.token;
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    return roles.indexOf('ROLE_ADMIN') != -1;
  }

  setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  isLogged(): boolean {
    return this.token ? true : false;
  }

  logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
