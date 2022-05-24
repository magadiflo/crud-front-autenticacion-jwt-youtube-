import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';

import { TokenService } from '../service/token.service';
import { JwtDTO } from '../models/jwt-dto';
import { AuthService } from '../service/auth.service';

const AUTHORIZATION: string = 'Authorization';

/**
 * Un Interceptor no es nada más que un servicio
 * que se encarga de interceptar las peticiones HTTP.
 */

@Injectable({
    providedIn: 'root'
})
export class ProductoInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
        private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.tokenService.isLogged) {
            return next.handle(req);
        }
        let intReq = req;
        const token = this.tokenService.token;

        intReq = this.addToken(req, token);

        return next.handle(intReq)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    //*Si nos devuelve el 401 (significa que ya expiró el token) y además estamos logueados, entonces volvemos a refrescar el token
                    if (err.status === 401 && this.tokenService.isLogged()) {
                        //*Refresh token
                        const dto: JwtDTO = new JwtDTO(this.tokenService.token);
                        return this.authService.refresh(dto)
                            .pipe(
                                concatMap((data: any) => {
                                    console.log('refreshing...');
                                    this.tokenService.setToken(data.token);
                                    intReq = this.addToken(req, data.token);
                                    return next.handle(intReq);
                                })
                            );
                    } else { //* Cualquier otro tipo de error lo deslogueamos
                        this.tokenService.logOut();
                        return throwError(err);
                    }
                })
            );
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({
            headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token)
        });
    }

}