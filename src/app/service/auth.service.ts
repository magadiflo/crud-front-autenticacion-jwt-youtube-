import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NuevoUsuario } from '../models/nuevo-usuario';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL: string = `${environment.authURL}/auth`;

  constructor(private http: HttpClient) { }

  nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(`${this.authURL}/nuevo`, nuevoUsuario);
  }

  login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(`${this.authURL}/login`, loginUsuario);
  }
}
