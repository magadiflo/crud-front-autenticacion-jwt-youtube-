import { Injectable } from '@angular/core';

const TOKEN_KEY: string = 'AuthToken';
const USERNAME_KEY: string = 'AuthUserName';
const AUTHORITIES_KEY: string = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: string[] = [];

  constructor() { }

  get token(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  get username(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  get authorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority: any) => {
        console.log(authority);
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  setUsername(username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  logOut(): void {
    window.sessionStorage.clear();
  }

}
