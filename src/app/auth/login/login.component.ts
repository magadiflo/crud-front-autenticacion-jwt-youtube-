import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../../service/token.service';
import { AuthService } from '../../service/auth.service';
import { LoginUsuario } from '../../models/login-usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  isLoginFail: boolean = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(
    private tokenSservice: TokenService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (this.tokenSservice.token) { //Sí estamos logueados
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenSservice.authorities;
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario)
      .subscribe(
        data => {
          this.isLogged = true;
          this.isLoginFail = false;

          this.tokenSservice.setToken(data.token);
          this.tokenSservice.setUsername(data.nombreUsuario);
          this.tokenSservice.setAuthorities(data.authorities);

          this.roles = data.authorities;
          this.router.navigate(['/']);
        },
        err => {
          this.isLogged = false;
          this.isLoginFail = true;
          this.errMsj = err.error.message;
          console.log(this.errMsj);
        });
  }

}
